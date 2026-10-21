"use client"

import { ParticleField } from "@/components/ui/particle-field"
import { WebGLShader } from "@/components/ui/web-gl-shader"

/**
 * The wave shader + particle network, pinned behind the whole page (not just
 * the hero) so it's visible throughout the scroll — one fixed canvas pair,
 * not a per-section remount, so there's still only one WebGL context alive.
 */
export function LiveBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-30">
        <WebGLShader className="absolute inset-0 h-full w-full" />
      </div>
      <ParticleField className="absolute inset-0 opacity-50" />
    </div>
  )
}
