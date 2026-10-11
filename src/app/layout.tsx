import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { Inter, Manrope } from 'next/font/google'
import GlobalErrorHandler from '~/components/global-error-handler'
import { getSiteUrl } from '~/content/site'
import { cn } from '~/shared/lib/cn'
import '~/shared/lib/debug'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: '%s | Merakai Studio',
    default: 'Merakai Studio'
  },
  description: 'Merakai Studio'
}

interface Props {
  children: React.ReactNode
}

const RootLayout = async ({ children }: Props) => {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          manrope.variable,
          inter.variable,
          'merakai-site flex min-h-screen flex-col font-body'
        )}
      >
        <GlobalErrorHandler>{children}</GlobalErrorHandler>
      </body>
    </html>
  )
}

export default RootLayout
