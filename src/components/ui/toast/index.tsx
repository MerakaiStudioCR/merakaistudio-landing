import { Toaster, toast as sonnerToast } from 'sonner'

interface ToastProviderProps {
  children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    {children}
    <Toaster position='bottom-center' closeButton />
  </>
)

const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  warning: (message: string) => sonnerToast.warning(message),
  info: (message: string) => sonnerToast.info(message)
}

export { ToastProvider }
export default toast
