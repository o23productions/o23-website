"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ShaderAnimationProps {
  className?: string;
}

export function ShaderAnimation({ className }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Fragment shader with optimized green color scheme ripple effect
    const fragmentShader = `
      precision mediump float; // Lower precision for performance
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
          float t = time * 0.1; // Multiplier to control wave frequency relative to time
          float lineWidth = 0.003;

          vec3 baseColor = vec3(0.94, 0.97, 0.96); // Light mint
          vec3 rippleColor = vec3(0.078, 0.392, 0.314); // Dark teal

          vec3 color = baseColor;
          
          // Reduced loop iterations significantly for performance (2x3 instead of 3x5)
          for(int j = 0; j < 2; j++){
              for(int i = 0; i < 3; i++){
                  float ripple = lineWidth * float(i * i) / abs(
                      fract(t - 0.01 * float(j) + float(i) * 0.02) * 4.0 - 
                      length(uv) + 
                      mod(uv.x + uv.y, 0.2)
                  );
                  
                  color = mix(color, rippleColor, ripple * (0.3 - float(i)*0.05));
              }
          }
          
          gl_FragColor = vec4(color, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialias for performance
      alpha: true,
      powerPreference: "high-performance"
    })
    
    // Cap pixel ratio at 1 to prevent lag on high-DPI screens
    renderer.setPixelRatio(1)

    container.appendChild(renderer.domElement)

    const onWindowResize = () => {
      if (!container) return;
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    let lastTime = 0;
    const animate = (time: number) => {
      const animationId = requestAnimationFrame(animate)
      
      // Slower animation speed
      uniforms.time.value += 0.015;
      
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className || ''}`}
      style={{ willChange: 'transform' }} // Optimization hint
    />
  )
}