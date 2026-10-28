'use client'

import { useEffect, useRef } from 'react'

export function PillarScene({ label }: { label: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const objectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const object = objectRef.current
    if (!stage || !object) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer:fine)')
    if (reduced.matches || !fine.matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        object.style.setProperty('--ry', `${10 + x * 16}deg`)
        object.style.setProperty('--rx', `${-8 - y * 12}deg`)
      })
    }
    const onLeave = () => {
      object.style.setProperty('--ry', '10deg')
      object.style.setProperty('--rx', '-8deg')
    }

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className='pillar-stage' ref={stageRef} role='img' aria-label={label}>
      <div className='pillar-float' ref={objectRef}>
        <span className='pillar-plate pillar-plate--back' />
        <span className='pillar-plate' />
        <span className='pillar-glass'>
          <i />
        </span>
        <span className='pillar-organic' />
      </div>
    </div>
  )
}
