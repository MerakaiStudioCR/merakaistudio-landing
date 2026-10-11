'use client'

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import FormUnsavedChangesProvider from '~/components/ui/form/form-unsaved-changes-provider'
import {
  queryClient,
  queryPersistOptions
} from '~/shared/lib/react-query/query-client'
import '~/shared/lib/debug'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={queryPersistOptions}
    >
      <FormUnsavedChangesProvider>{children}</FormUnsavedChangesProvider>
    </PersistQueryClientProvider>
  )
}

export default Providers
