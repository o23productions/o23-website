import React, { memo, useEffect, useLayoutEffect, useState, useRef } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  PanInfo
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export function useMediaQuery(query: string, { defaultValue = false, initializeWithValue = true } = {}) {
  const IS_SERVER = typeof window === "undefined"
  
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  const handleChange = () => setMatches(getMatches(query))

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

export interface MediaItem {
    type: 'image' | 'video' | 'youtube';
    url: string;
    alt: string;
    link?: string;
}

interface CarouselProps {
    handleClick: (item: MediaItem, index: number) => void;
    cards: MediaItem[];
    rotation: any;
    onDragStart: () => void;
    onDragEnd: (info: PanInfo) => void;
    onDrag: (info: PanInfo) => void;
    setHovering: (hover: boolean) => void;
}

const Carousel = memo(({ handleClick, cards, rotation, onDragStart, onDragEnd, onDrag, setHovering }: CarouselProps) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
  
  // 4:5 Aspect Ratio Dimensions - SCALED DOWN
  // Mobile: 150px width -> 187.5px height
  // Desktop: 210px width -> 262.5px height
  const cardWidth = isScreenSizeSm ? 150 : 210; 
  // Gap between cards
  const gap = isScreenSizeSm ? 20 : 40; 
  
  const faceCount = cards.length
  // Calculate circumference based on card width + gap to ensure perfect spacing
  const circumference = (cardWidth + gap) * faceCount;
  
  const cylinderWidth = circumference;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  
  const transform = useTransform(rotation, (value: number) => `rotate3d(0, 1, 0, ${value}deg)`)

  return (
    <div
      className="flex h-full items-center justify-center touch-action-none select-none"
      style={{
        perspective: "1100px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative flex h-full origin-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={(_, info) => onDragEnd(info)}
      >
        {cards.map((item, i) => (
          <motion.div
            key={`carousel-item-${i}`}
            className="absolute flex h-full origin-center items-center justify-center"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              backfaceVisibility: "visible",
            }}
            onClick={() => handleClick(item, i)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
             {/* Card Container Enforcing 4:5 Aspect Ratio */}
             <motion.div
                className="relative overflow-hidden rounded-xl shadow-xl bg-slate-900 border-[2px] border-white/10"
                style={{
                    width: `${cardWidth}px`,
                    aspectRatio: '4/5',
                }}
                whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'rgba(16,185,129,0.8)',
                    boxShadow: '0 0 30px rgba(16,185,129,0.3)'
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
             >
                {item.type === 'image' ? (
                  <motion.img
                    layoutId={`img-${item.url}`}
                    src={item.url}
                    alt={item.alt || `Portfolio item ${i}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    initial={{ scale: 1.1 }} // Slight zoom for parallax feel later if needed
                    animate={{ scale: 1 }}
                  />
                ) : item.type === 'youtube' ? (
                   <div className="w-full h-full bg-black pointer-events-none relative overflow-hidden">
                      <div className="absolute inset-0 z-10 bg-transparent" />
                      <iframe
                         width="100%"
                         height="100%"
                         src={`https://www.youtube.com/embed/${item.url}?autoplay=0&mute=1&controls=0&loop=1&playlist=${item.url}&playsinline=1&rel=0&showinfo=0&modestbranding=1&disablekb=1&iv_load_policy=3`}
                         title={item.alt}
                         className="w-full h-full object-cover opacity-90 scale-150"
                      ></iframe>
                   </div>
                ) : (
                  <motion.video
                    layoutId={`video-${item.url}`}
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                )}
                
                {/* Gloss/Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay"></div>
             </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
})

export function ThreeDPhotoCarousel({ mediaItems }: { mediaItems: MediaItem[] }) {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null)
  
  // Physics-based Rotation Logic
  const rotation = useMotionValue(0);
  const rotationVelocity = useRef(0);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  
  // Tuning parameters
  const autoRotateSpeed = -0.15; // Speed when idle
  const dragFactor = 0.15; // How much drag distance affects rotation
  const friction = 0.95; // Decay for inertia

  useAnimationFrame((time, delta) => {
      if (isDragging.current || activeItem) return;

      let currentVel = rotationVelocity.current;

      if (isHovering.current) {
          // Rapidly decelerate to stop when hovering
          currentVel *= 0.8;
      } else {
          // If free spinning (inertia), apply friction
          // Blend towards auto-rotation speed
          if (Math.abs(currentVel - autoRotateSpeed) > 0.01) {
             currentVel = currentVel * friction + autoRotateSpeed * (1 - friction);
          } else {
             currentVel = autoRotateSpeed;
          }
      }

      rotationVelocity.current = currentVel;
      
      // Update rotation
      const timeScale = delta / 16.66; 
      rotation.set(rotation.get() + currentVel * timeScale);
  });

  const handleDragStart = () => {
      isDragging.current = true;
      rotationVelocity.current = 0;
  }

  const handleDrag = (info: PanInfo) => {
      // 1:1 Drag mapping - update rotation directly for instant feedback
      rotation.set(rotation.get() + info.delta.x * dragFactor);
      // Track velocity for throw release
      rotationVelocity.current = info.delta.x * dragFactor;
  }

  const handleDragEnd = (info: PanInfo) => {
      isDragging.current = false;
      // Add throw velocity
      rotationVelocity.current = info.velocity.x * dragFactor * 0.01;
  }

  const handleClick = (item: MediaItem) => {
    if (isDragging.current) return;
    if (item.link) {
      window.open(item.link, '_blank');
      return;
    }
    setActiveItem(item)
  }

  const handleClose = () => {
    setActiveItem(null)
    rotationVelocity.current = 0; 
  }

  const setHovering = (hover: boolean) => {
      isHovering.current = hover;
  }

  return (
    <div className="relative w-full overflow-visible">
      <AnimatePresence mode="sync">
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 flex items-center justify-center z-[100] p-4 md:p-10"
            style={{ 
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(16px)"
            }}
            transition={transitionOverlay}
          >
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={handleClose} 
                  className="absolute top-4 right-4 text-white font-mono uppercase tracking-widest text-sm hover:text-emerald-400 z-50 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 transition-colors"
                >
                    Close [X]
                </button>
                
                {activeItem.type === 'image' ? (
                <motion.img
                    layoutId={`img-${activeItem.url}`}
                    src={activeItem.url}
                    alt={activeItem.alt}
                    className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl bg-slate-900 object-contain"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                ) : activeItem.type === 'youtube' ? (
                <motion.div
                    layoutId={`youtube-${activeItem.url}`}
                    className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                     <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${activeItem.url}?autoplay=1&rel=0`}
                        title={activeItem.alt}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                     ></iframe>
                </motion.div>
                ) : (
                <motion.video
                    layoutId={`video-${activeItem.url}`}
                    src={activeItem.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl bg-black"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Reduced Height for cleaner containment */}
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden cursor-grab active:cursor-grabbing">
        <Carousel
          handleClick={handleClick}
          cards={mediaItems}
          rotation={rotation}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          setHovering={setHovering}
        />
      </div>
    </div>
  )
}