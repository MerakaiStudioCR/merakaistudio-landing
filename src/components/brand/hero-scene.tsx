'use client'

import { useEffect, useRef } from 'react'
import { cn } from '~/shared/lib/cn'
import MerakaiMark from './merakai-mark'

interface HeroSceneProps {
  className?: string
  lab: string
  labLine: string
  pill: string
}

export function HeroScene({ className, lab, labLine, pill }: HeroSceneProps) {
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
    <div className={cn('visual', className)} ref={visualRef}>
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

export function EssenceMark() {
  return (
    <div className='essence' aria-hidden>
      <span className='essence__badge'>
        <span className='essence__ring essence__ring--a' />
        <span className='essence__ring essence__ring--b' />
        <span className='essence__ring essence__ring--c' />
        <MerakaiMark className='essence__mark' />
      </span>
      <span className='essence__letter'>M.</span>
    </div>
  )
}
