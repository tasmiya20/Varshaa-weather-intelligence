import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/Button'
import { incidents } from '@/data/incidents'
import type { AdminUser } from '@/types/system'

const USERS: AdminUser[] = [
  { id: 'u1', name: 'A. Sharma', role: 'IMD Official', region: 'National', status: 'active' },
  { id: 'u2', name: 'R. Iyer', role: 'State Official', region: 'Tamil Nadu', status: 'active' },
  { id: 'u3', name: 'P. Das', role: 'Analyst', region: 'West Bengal', status: 'active' },
  { id: 'u4', name: 'K. Verma', role: 'Reviewer', region: 'National', status: 'active' },
  { id: 'u5', name: 'S. Nair', role: 'District Official', region: 'Kerala', status: 'idle' },
]

const userColumns: Column<AdminUser>[] = [
  { header: 'User', cell: (u) => u.name },
  { header: 'Role', cell: (u) => u.role },
  { header: 'Region', cell: (u) => u.region },
  { header: 'Status', cell: (u) => <span className={u.status === 'active' ? 'text-success' : 'text-ink-faint'}>{u.status}</span> },
]

export default function AdminPanel() {
  const [queue, setQueue] = useState(incidents.slice(0, 5).map((i) => ({ ...i, cleared: false })))

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Admin Panel" description="Users, roles and verification queue oversight." />
      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink">Users &amp; Roles</h3>
        <DataTable columns={userColumns} rows={USERS} rowKey={(u) => u.id} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink">Verification Queue — {queue.filter((q) => !q.cleared).length} pending</h3>
        <div className="space-y-2">
          {queue.map((inc) => (
            <div key={inc.id} className={`flex items-center justify-between rounded-xl2 border border-border bg-surface px-4 py-3 ${inc.cleared ? 'opacity-40' : ''}`}>
              <div className="text-[13px]">
                <span className="font-semibold text-ink">{inc.city}</span> · {inc.event} · AI {inc.evidenceScore}%
              </div>
              <div className="flex gap-2">
                <Button size="sm" disabled={inc.cleared} onClick={() => setQueue((q) => q.map((x) => x.id === inc.id ? { ...x, cleared: true } : x))}>Verify</Button>
                <Button size="sm" variant="outline" disabled={inc.cleared} onClick={() => setQueue((q) => q.map((x) => x.id === inc.id ? { ...x, cleared: true } : x))}>Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
