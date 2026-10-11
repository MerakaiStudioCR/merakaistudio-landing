import { cookies } from 'next/headers'

export const AUTH_COOKIE_NAME = 'auth-token'

export const getAuthCookie = async () => {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE_NAME)?.value
}

export async function requireAuthenticatedUser() {
  const token = await getAuthCookie()

  if (!token) {
    throw new Error('unauthorized')
  }

  return { token }
}
