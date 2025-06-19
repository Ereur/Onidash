const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://license-server-production-4673.up.railway.app/api'

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    throw new Error('Invalid credentials')
  }

  return response.json()
}

export async function getLicenses(token: string) {
  const response = await fetch(`${API_URL}/admin/licenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch licenses')
  }

  return response.json()
}

export async function generateLicense(token: string, expiresAt: string) {
  const response = await fetch(`${API_URL}/license/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ expiresAt }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate license')
  }

  return response.json()
}

export async function revokeLicense(token: string, key: string) {
  const response = await fetch(`${API_URL}/license/revoke`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ key }),
  })

  if (!response.ok) {
    throw new Error('Failed to revoke license')
  }

  return response.json()
} 