"use client"

import * as React from "react"
import * as THREE from "three"

interface Uniforms {
  [key: string]: THREE.IUniform
  resolution: { value: [number, number] }
  time: { value: number }
  xScale: { value: number }
  yScale: { value: number }
  distortion: { value: number }
  zoom: { value: number }
  thickness: { value: number }
  tint: { value: [number, number, number] }
}

// Primary (blue-violet) — matches --primary in globals.css
const TINT: [number, number, number] = [91 / 255, 110 / 255, 245 / 255]

export function WebGLShader({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Create a fresh canvas per mount (rather than rendering one in JSX) so
    // React StrictMode's dev-only double mount/unmount never hands a second
    // WebGLRenderer a canvas that already has a live GL context on it.
    const canvas = document.createElement("canvas")
    canvas.className = "block h-full w-full"
    canvas.setAttribute("aria-hidden", "true")
    container.appendChild(canvas)

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Three separate glowing sine strands (vertically offset, not just
    // phase-shifted) so they read as three distinct lines instead of
    // blurring into one band — single-hue tint instead of the classic
    // chromatic RGB-offset look, to stay inside the site's palette.
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform float zoom;
      uniform float thickness;
      uniform vec3 tint;

      void main() {
        vec2 p = ((gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y)) * zoom;

        float a = thickness / abs(p.y - distortion + sin((p.x + time) * xScale) * yScale);
        float b = thickness / abs(p.y + sin((p.x + time * 1.07) * xScale) * yScale);
        float c = thickness / abs(p.y + distortion + sin((p.x + time * 0.93) * xScale) * yScale);

        float intensity = clamp(a + b + c, 0.0, 1.0);
        gl_FragColor = vec4(intensity * tint, 1.0);
      }
    `

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(new THREE.Color(0x000000), 0)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    const uniforms: Uniforms = {
      resolution: { value: [container.clientWidth, container.clientHeight] },
      time: { value: 0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.42 },
      distortion: { value: 0.16 },
      zoom: { value: 0.6 },
      thickness: { value: 0.018 },
      tint: { value: TINT },
    }

    const position = [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
    ]

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(position), 3))

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    function resize() {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height, false)
      uniforms.resolution.value = [width, height]
    }

    let raf = 0
    let running = true

    function animate() {
      if (!running) return
      uniforms.time.value += 0.0035
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    function handleVisibility() {
      running = document.visibilityState === "visible"
      if (running) animate()
      else cancelAnimationFrame(raf)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()
    animate()

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(canvas)
    }
  }, [])

  return <div ref={containerRef} className={className ?? "block h-full w-full"} />
}
