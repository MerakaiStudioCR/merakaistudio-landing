import { z } from 'zod'

export const ASSET_NAME_MIN_LENGTH = 2
export const ASSET_NAME_MAX_LENGTH = 100

/** Letters, numbers, spaces and punctuation common in infrastructure labels. */
export const ASSET_NAME_ALLOWED_CHARS_PATTERN = /^[\p{L}\p{N}\s\-_.,#'()/]+$/u

export const assetNameSchema = z
  .string({ error: 'Formato inválido' })
  .trim()
  .min(1, { message: 'Campo requerido' })
  .min(ASSET_NAME_MIN_LENGTH, {
    message: `Mínimo ${ASSET_NAME_MIN_LENGTH} caracteres`
  })
  .max(ASSET_NAME_MAX_LENGTH, {
    message: `Máximo ${ASSET_NAME_MAX_LENGTH} caracteres`
  })
  .refine((value) => ASSET_NAME_ALLOWED_CHARS_PATTERN.test(value), {
    message: 'El nombre contiene caracteres no permitidos'
  })
  .refine((value) => /[\p{L}\p{N}]/u.test(value), {
    message: 'El nombre debe incluir al menos una letra o número'
  })

export const parseAssetName = (value: unknown) => assetNameSchema.parse(value)

export const safeParseAssetName = (value: unknown) =>
  assetNameSchema.safeParse(value)
