"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Blue-violet accent (#5B6EF5), matching --primary/--accent in globals.css
const PARTICLE_COLOR = "125, 142, 255"
const LINE_COLOR = "140, 154, 255"
const HOVER_LINE_COLOR = "244, 246, 249"
const MAX_PARTICLES = 160
const MOUSE_RADIUS = 170

class Particle {
  x: number
  y: number
  directionX: number
  directionY: number
  size: number

  constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${PARTICLE_COLOR}, 0.85)`
    ctx.fill()
  }

  update(ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number | null; y: number | null }) {
    if (this.x > width || this.x < 0) this.directionX = -this.directionX
    if (this.y > height || this.y < 0) this.directionY = -this.directionY

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < MOUSE_RADIUS + this.size) {
        const forceX = dx / distance
        const forceY = dy / distance
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
        this.x -= forceX * force * 5
        this.y -= forceY * force * 5
      }
    }

    this.x += this.directionX
    this.y += this.directionY
    this.draw(ctx)
  }
}

/**
 * The connecting-dots network — restored to its pre-enterprise-pivot look
 * (denser, brighter, blue-violet) per explicit request. Opacity is
 * controlled by the wrapping element.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let raf = 0
    let running = true
    const mouse: { x: number | null; y: number | null } = { x: null, y: null }

    function init() {
      particles = []
      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 9000))
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1
        const x = Math.random() * (width - size * 4) + size * 2
        const y = Math.random() * (height - size * 4) + size * 2
        const directionX = Math.random() * 0.4 - 0.2
        const directionY = Math.random() * 0.4 - 0.2
        particles.push(new Particle(x, y, directionX, directionY, size))
      }
    }

    function resize() {
      if (!canvas || !container) return
      const rect = container.getBoundingClientRect()
      width = canvas.width = rect.width
      height = canvas.height = rect.height
      init()
    }

    function connect() {
      if (!ctx) return
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = dx * dx + dy * dy
          const maxDistance = (width / 7) * (height / 7)

          if (distance < maxDistance) {
            const opacity = 1 - distance / (maxDistance || 1)
            const dxMouseA = particles[a].x - (mouse.x ?? -9999)
            const dyMouseA = particles[a].y - (mouse.y ?? -9999)
            const distanceMouseA = Math.sqrt(dxMouseA * dxMouseA + dyMouseA * dyMouseA)

            ctx.strokeStyle =
              mouse.x !== null && distanceMouseA < MOUSE_RADIUS
                ? `rgba(${HOVER_LINE_COLOR}, ${opacity})`
                : `rgba(${LINE_COLOR}, ${opacity * 0.75})`

            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!running || !ctx) return
      raf = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, width, height)
      for (const particle of particles) particle.update(ctx, width, height, mouse)
      connect()
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouse.x = null
      mouse.y = null
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

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  )
}
