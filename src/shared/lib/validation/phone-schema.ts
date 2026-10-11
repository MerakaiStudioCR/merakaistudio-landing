import { z } from 'zod'
import {
  isValidOptionalPhoneDigits,
  isValidPhoneDigits,
  stripPhoneDigits
} from '~/shared/lib/formatters/phone-input'

export const requiredPhoneSchema = z
  .string({ error: 'Formato inválido' })
  .min(1, { message: 'Campo requerido' })
  .transform(stripPhoneDigits)
  .refine(isValidPhoneDigits, {
    message: 'El teléfono debe tener 8 dígitos'
  })

export const optionalPhoneSchema = z
  .string()
  .optional()
  .transform((value) => stripPhoneDigits(value ?? ''))
  .refine(isValidOptionalPhoneDigits, {
    message: 'El teléfono debe tener 8 dígitos'
  })
  .transform((digits) => (digits.length > 0 ? digits : undefined))
