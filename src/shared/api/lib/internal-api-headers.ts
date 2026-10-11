export function getInternalApiHeaders(): Record<string, string> {
  const internalApiKey = process.env.INTERNAL_API_KEY

  if (!internalApiKey) {
    throw new Error('INTERNAL_API_KEY is not configured')
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Internal-Api-Key': internalApiKey
  }

  const serviceToken = process.env.ONBOARDING_SERVICE_TOKEN
  if (serviceToken) {
    headers.Authorization = `Bearer ${serviceToken}`
  }

  return headers
}
