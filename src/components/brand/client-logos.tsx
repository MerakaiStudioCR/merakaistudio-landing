import { cn } from '~/shared/lib/cn'

interface ClientMark {
  name: string
  src: string
  pad?: boolean
}

const clients: readonly ClientMark[] = [
  { name: 'Mundo Futsal', src: '/brand/Mundo%20Futsal.svg' },
  { name: 'Klinue', src: '/brand/Klinue.svg' },
  { name: 'TEP', src: '/brand/tep.png', pad: true },
  { name: 'Ritter-Sport', src: '/brand/ritter-sport.png', pad: true },
  { name: 'Saeta', src: '/brand/Saeta.svg' },
  { name: 'San Jose CCDR', src: '/brand/san-jose-ccdr.png', pad: true },
  { name: 'Katana', src: '/brand/Katana.png', pad: true }
]

export function ClientLogos({ className }: { className?: string }) {
  return (
    <ul className={cn('client-logos', className)}>
      {clients.map((client) => (
        <li key={client.name} className='client-logos__item'>
          <img
            src={client.src}
            alt={client.name}
            className={cn(
              'client-logos__mark',
              client.pad ? 'client-logos__mark--pad' : 'client-logos__mark--ink'
            )}
          />
        </li>
      ))}
    </ul>
  )
}
