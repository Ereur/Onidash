export interface License {
  key: string
  createdAt: string
  expiresAt: string
  isRevoked: boolean
  isValid: boolean
  machineId?: string
  lastCheckedAt?: string
}