import { cva, type VariantProps } from 'class-variance-authority'

const baseButtonClasses =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-normal text-base outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-60 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>span]:z-10 [&>span]:inline-flex [&>span]:w-full [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"

export const buttonVariants = cva(`${baseButtonClasses} px-4 py-2`, {
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
      secondary:
        'border border-[color-mix(in_srgb,var(--accent-interaction)_45%,var(--border))] bg-white text-primary shadow-sm hover:border-[var(--accent-interaction)] hover:bg-[var(--zaffiro-water-100)]',
      tertiary:
        'border-2 border-success bg-light-background text-success hover:bg-success hover:text-light-foreground',
      destructive:
        'bg-destructive text-light-foreground hover:bg-[color-mix(in_srgb,var(--destructive)_85%,black)]',
      whatsapp:
        'border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-light-foreground',
      outline:
        'border border-[var(--accent-interaction)] bg-white text-[var(--accent-interaction)] hover:bg-[var(--zaffiro-water-100)]',
      cta: 'bg-[var(--accent-cta)] font-medium text-[var(--zaffiro-ink)] hover:bg-[var(--zaffiro-gold-300)]',
      white:
        'bg-light-background text-foreground hover:bg-[color-mix(in_srgb,var(--accent-interaction)_12%,var(--light-background))] active:bg-[color-mix(in_srgb,var(--accent-interaction)_22%,var(--light-background))]',
      icon: 'h-8 w-8 hover:bg-[var(--zaffiro-water-100)]'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type ButtonVariants = VariantProps<typeof buttonVariants>

export const actionButtonVariants = cva(
  `${baseButtonClasses} px-2 py-1 text-light-foreground hover:no-underline`,
  {
    variants: {
      variant: {
        view: 'bg-success hover:bg-success/80',
        edit: 'bg-[var(--accent-interaction)] hover:bg-[var(--accent-interaction)]/80',
        delete: 'bg-destructive hover:bg-destructive/80',
        download: 'bg-[var(--zaffiro-ink)] hover:bg-[var(--zaffiro-ink)]/80'
      }
    },
    defaultVariants: {
      variant: 'view'
    }
  }
)

export type ActionButtonVariants = VariantProps<typeof actionButtonVariants>
