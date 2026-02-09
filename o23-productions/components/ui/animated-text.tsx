import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "../../lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number
  delay?: number
  replay?: boolean
  className?: string
  textClassName?: string
  underlineClassName?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  underlineGradient?: string
  underlineHeight?: string
  underlineOffset?: string
  textGradient?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({
    text,
    duration = 0.08, // Slightly slower for typewriter feel
    delay = 0.1,
    replay = true,
    className,
    textClassName,
    underlineClassName,
    as: Component = "h1",
    underlineGradient = "from-emerald-400 via-emerald-600 to-emerald-400",
    underlineHeight = "h-1.5",
    underlineOffset = "-bottom-2",
    textGradient,
    ...props
  }, ref) => {
    const letters = Array.from(text)

    const container: Variants = {
      hidden: { 
        opacity: 0,
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { 
          staggerChildren: duration, 
          delayChildren: i * delay,
        }
      })
    }

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.1,
          ease: "easeOut"
        }
      },
      hidden: {
        opacity: 0,
        y: 5, // Subtle shift up
      }
    }

    const lineVariants: Variants = {
      hidden: {
        width: "0%",
        left: "0%", // Start from left
        opacity: 0
      },
      visible: {
        width: "100%", // Expand to full width
        left: "0%",
        opacity: 1,
        transition: {
          delay: letters.length * duration + delay + 0.2, // Start after text finishes
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    }

    const gradientClasses = textGradient 
      ? `bg-gradient-to-r ${textGradient} bg-clip-text text-transparent bg-[length:200%_auto]` 
      : "";

    return (
      <div 
        ref={ref} 
        className={cn("flex flex-col items-center justify-center gap-2", className)}
        {...props}
      >
        <div className="relative inline-block px-4">
          <motion.div
            style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center" }}
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            className={cn("text-4xl font-bold text-center", textClassName, gradientClasses)}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={child} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "absolute",
              underlineHeight,
              underlineOffset,
              "bg-gradient-to-r",
              underlineGradient,
              "rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]",
              underlineClassName
            )}
          />
        </div>
      </div>
    )
  }
)
AnimatedText.displayName = "AnimatedText"

export { AnimatedText }