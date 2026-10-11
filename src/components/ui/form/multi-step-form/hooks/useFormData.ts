import { useContext } from 'react'
import FormDataContext, {
  type FormDataContextValue
} from '../context/form-data-context'

const useFormData = <T>(): FormDataContextValue<T> => {
  const context = useContext(FormDataContext)

  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider')
  }

  return context as unknown as FormDataContextValue<T>
}

export default useFormData
