export type ServiceStatus = 'healthy' | 'degraded' | 'down'

export interface ServiceHealth {
  name: string
  status: ServiceStatus
  latencyMs: number
  throughput: string
  errorRate: number
}

export type UserRole =
  | 'Super Admin' | 'IMD Official' | 'State Official'
  | 'District Official' | 'Analyst' | 'Reviewer'

export interface AdminUser {
  id: string
  name: string
  role: UserRole
  region: string
  status: 'active' | 'idle'
}
