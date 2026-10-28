'use client'

import { useEffect, useRef } from 'react'

interface MerakaiSceneProps {
  lab: string
  labLine: string
  pill: string
  label: string
}

export function MerakaiScene({ lab, labLine, pill, label }: MerakaiSceneProps) {
  const visualRef = useRef<HTMLDivElement>(null)
  const objectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const visual = visualRef.current
    const object = objectRef.current
    if (!visual || !object) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer:fine)')
    if (reduced.matches || !fine.matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      const bounds = visual.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        object.style.setProperty('--ry', `${-21 + x * 20}deg`)
        object.style.setProperty('--rx', `${-9 - y * 18}deg`)
      })
    }
    const onLeave = () => {
      object.style.setProperty('--ry', '-21deg')
      object.style.setProperty('--rx', '-9deg')
    }

    visual.addEventListener('pointermove', onMove)
    visual.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      visual.removeEventListener('pointermove', onMove)
      visual.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className='visual' ref={visualRef} role='img' aria-label={label}>
      <div className='scene-3d' aria-hidden>
        <div className='scene-ambient' />
        <div className='spatial-grid' />
        <div className='orbital' />
        <div className='orbital two' />
        <div className='dimensional-object' ref={objectRef}>
          <div className='cube-face cube-back' />
          <div className='cube-face cube-left' />
          <div className='cube-face cube-right' />
          <div className='cube-face cube-top' />
          <div className='cube-face cube-bottom' />
          <div className='cube-face cube-front'>
            <img
              className='cube-mark official-mark-3d'
              src='/brand/merakai-logo-oficial.png'
              alt=''
              width={1889}
              height={829}
            />
          </div>
        </div>
        <div className='spatial-sphere' />
        <div className='spatial-glass'>
          <small>{lab}</small>
          <strong>∞</strong>
          <span>{labLine}</span>
        </div>
        <div className='spatial-pill'>✳ {pill}</div>
      </div>
    </div>
  )
}
