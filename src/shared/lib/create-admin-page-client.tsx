import dynamic from 'next/dynamic'
import BrandMarkLoader from '~/components/brand/brand-mark-loader'

export function createAdminPageClient(
  loader: () => Promise<{ default: React.ComponentType<object> }>
) {
  return dynamic(loader, { loading: () => <BrandMarkLoader /> })
}
