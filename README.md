# Merakai Studio

Sitio corporativo de Merakai Studio. Next.js 16, TypeScript, Tailwind CSS 4 y next-intl.

## Instalación

Requiere Node.js 22 y pnpm.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

El sitio queda en `http://localhost:3000`. El español no lleva prefijo. El inglés vive bajo `/en`.

## Variables

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica, sitemap, robots y JSON-LD |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo del pie. Vacío: no se muestra |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | Perfil opcional |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Perfil opcional |
| `NEXT_PUBLIC_SOCIAL_X` | Perfil opcional |
| `CONTACT_EMAIL_PROVIDER` | Hoy solo `resend` |
| `CONTACT_TO` | Destino del formulario |
| `CONTACT_FROM` | Remitente del formulario |
| `RESEND_API_KEY` | Clave del proveedor |
| `API_BASE_URL` | API externa. El sitio público no la necesita |
| `INTERNAL_API_KEY` | Obligatoria en producción solo si `API_BASE_URL` está definida |

Si falta el proveedor de correo, el formulario responde `not-configured` y no confirma un envío.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

`pnpm lint` ejecuta Biome.

## Carpetas

```
src/app/[locale]/          páginas del sitio
src/components/layout/     navbar, footer y shell
src/components/sections/   inicio y nosotros
src/components/products/   catálogo y fichas
src/features/contact/      formulario, validación y correo
src/content/               datos estructurales de productos
src/i18n/messages/site/    textos en español e inglés
public/brand/              isotipo oficial
```

El kit de interfaz heredado sigue en `src/components/ui` y `src/shared`. El sitio público no lo monta.

## Agregar un producto

1. Añade el slug y el estado en `src/content/products.ts`.
2. Añade el mismo bloque de textos en `src/i18n/messages/site/es.json` y `en.json`.
3. Si el estado es `concept` y el contenido no está confirmado, marca `pending: true` y deja vacíos problema, valor, enfoque, beneficios y audiencia.
4. `SoftwareApplication` en JSON-LD solo se publica cuando el estado es `beta` o `available`.

## Cambiar textos

Los textos visibles están en `src/i18n/messages/site/es.json` y `en.json`. Las claves deben coincidir. No hay traducción automática.

## Marca

El isotipo oficial está en `public/brand/mark.svg`: navy `#082B40` y naranja `#F57F20`. Los titulares usan Manrope y el cuerpo Inter, ambas con `next/font`. Geoform no está embebida porque no hay archivo de licencia en el proyecto.

## Despliegue

Define `NEXT_PUBLIC_SITE_URL` con la URL de producción. El correo y las redes solo aparecen si sus variables existen. Privacidad y términos se publican como borrador pendiente de revisión jurídica.

## Pendiente

- Licencia de Geoform para el wordmark oficial.
- Revisión jurídica de privacidad y términos.
- Proveedor de correo, si se quiere activar el formulario.
- Copy confirmado de Kizvna.
