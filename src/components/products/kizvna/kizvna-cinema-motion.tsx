'use client'

import { useEffect } from 'react'

export function KizvnaCinemaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.kizvna-cinema')
    if (!root) return

    const chapters = [...root.querySelectorAll<HTMLElement>('[data-chapter]')]
    const horizontals = [
      ...root.querySelectorAll<HTMLElement>('.editorial-swipe')
    ]
    const serviceSequence = root.querySelector<HTMLElement>('.service-sequence')
    const serviceItems = serviceSequence
      ? [...serviceSequence.querySelectorAll<HTMLElement>('.service-item')]
      : []
    const opening = root.querySelector<HTMLElement>('.opening')
    const intercut = root.querySelector<HTMLElement>('.intercut')
    const connection = root.querySelector<HTMLElement>('.manifesto-visual')
    const breathers = [
      ...root.querySelectorAll<HTMLElement>(
        '.breather, .intercut, .service-interlude'
      )
    ]
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    let ticking = false
    let frame = 0
    let observer: IntersectionObserver | undefined

    if ('IntersectionObserver' in window && !reduced) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('in-view')
            observer?.unobserve(entry.target)
          }
        },
        { threshold: 0.2 }
      )
      for (const node of breathers) observer.observe(node)
    } else {
      for (const node of breathers) node.classList.add('in-view')
    }

    const render = () => {
      const height = window.innerHeight
      if (opening && !reduced) {
        const rect = opening.getBoundingClientRect()
        const travel = Math.max(1, rect.height - height)
        const progress = Math.min(1, Math.max(0, -rect.top / travel))
        const zoom = Math.min(1, progress / 0.82) ** 1.45
        const fade = 1 - Math.min(1, Math.max(0, (progress - 0.75) / 0.13))
        const portal = Math.min(1, Math.max(0, (progress - 0.79) / 0.16))
        const copy = 1 - Math.min(1, Math.max(0, (progress - 0.07) / 0.17))
        opening.style.setProperty('--hero-scale', (1 + zoom * 13).toFixed(3))
        opening.style.setProperty(
          '--hero-x',
          `${(progress * 2.5).toFixed(2)}vw`
        )
        opening.style.setProperty('--hero-y', `${(progress * 17).toFixed(2)}vh`)
        opening.style.setProperty('--hero-fade', fade.toFixed(3))
        opening.style.setProperty('--hero-copy', copy.toFixed(3))
        opening.style.setProperty('--portal-fade', portal.toFixed(3))
        opening.style.setProperty(
          '--opening-dark',
          Math.min(1, progress * 1.3).toFixed(3)
        )
      }
      if (intercut && !reduced && window.innerWidth > 760) {
        const rect = intercut.getBoundingClientRect()
        if (rect.top < height && rect.bottom > 0) {
          const progress = Math.min(
            1,
            Math.max(0, (height - rect.top) / (rect.height + height))
          )
          intercut.style.setProperty(
            '--reel-x',
            `${((progress - 0.5) * -32).toFixed(2)}px`
          )
        }
      }
      if (connection) {
        const rect = connection.getBoundingClientRect()
        if (rect.top < height * 1.5 && rect.bottom > -height) {
          const travel = Math.max(1, rect.height - height)
          const progress = reduced
            ? 1
            : Math.min(1, Math.max(0, -rect.top / travel))
          const draw = Math.min(1, progress / 0.36)
          const reveal = Math.min(1, Math.max(0, (progress - 0.33) / 0.42))
          const network = 1 - Math.min(1, Math.max(0, (progress - 0.53) / 0.22))
          connection.style.setProperty(
            '--connection-progress',
            progress.toFixed(4)
          )
          connection.style.setProperty('--link-draw', draw.toFixed(4))
          connection.style.setProperty('--photo-open', reveal.toFixed(4))
          connection.style.setProperty('--network-fade', network.toFixed(4))
          connection.dataset.act =
            progress < 0.36 ? '0' : progress < 0.7 ? '1' : '2'
        }
      }
      if (!reduced) {
        for (const section of horizontals) {
          const rect = section.getBoundingClientRect()
          if (rect.bottom < -height || rect.top > height * 1.3) continue
          const travel = Math.max(1, rect.height - height)
          const progress = Math.min(1, Math.max(0, -rect.top / travel))
          const track = section.querySelector<HTMLElement>('.editorial-track')
          const distance = Math.max(
            0,
            (track?.scrollWidth ?? 0) - section.clientWidth
          )
          section.style.setProperty(
            '--editorial-x',
            `${(-distance * progress).toFixed(1)}px`
          )
          section.style.setProperty(
            '--horizontal-progress',
            progress.toFixed(4)
          )
        }
      }
      if (serviceSequence) {
        const rect = serviceSequence.getBoundingClientRect()
        const travel = Math.max(1, rect.height - height)
        const progress = reduced
          ? 0
          : Math.min(1, Math.max(0, -rect.top / travel))
        const phase = Math.min(
          serviceItems.length - 1,
          Math.floor(progress * serviceItems.length)
        )
        const within = progress * serviceItems.length - phase
        serviceSequence.style.setProperty(
          '--sequence-progress',
          progress.toFixed(4)
        )
        serviceItems.forEach((item, index) => {
          item.classList.toggle('is-current', index === phase)
          const bullets = [...item.querySelectorAll<HTMLElement>('li')]
          bullets.forEach((bullet, bulletIndex) => {
            bullet.classList.toggle(
              'is-shown',
              reduced || (index === phase && within >= bulletIndex * 0.25)
            )
          })
        })
      }
      for (const chapter of chapters) {
        const rect = chapter.getBoundingClientRect()
        if (rect.bottom < -height || rect.top > height * 1.3) continue
        const available = Math.max(1, rect.height - height)
        const progress = Math.min(1, Math.max(0, -rect.top / available))
        chapter.style.setProperty(
          '--progress',
          reduced ? '1' : progress.toFixed(4)
        )
        if (!reduced) {
          const fadeIn = Math.max(0, 1 - progress * 12)
          const fadeOut = Math.max(0, (progress - 0.87) / 0.13)
          chapter.style.setProperty(
            '--scene-blur',
            `${Math.max(fadeIn * 0.55, fadeOut * 3).toFixed(2)}px`
          )
          chapter.style.setProperty(
            '--scene-light',
            (0.86 + Math.sin(progress * Math.PI) * 0.19).toFixed(3)
          )
          chapter.style.setProperty(
            '--flash',
            (fadeOut * fadeOut * 0.17).toFixed(3)
          )
        }
        chapter.classList.toggle('is-revealed', reduced || progress > 0.34)
      }
      ticking = false
    }

    const schedule = () => {
      if (ticking) return
      ticking = true
      frame = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
