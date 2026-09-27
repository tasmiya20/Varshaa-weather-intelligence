import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { JudgeDemo } from '@/components/command-center/JudgeDemo'

export function AppShell() {
  const [demoOpen, setDemoOpen] = useState(false)
  return (
    <div className="flex h-screen flex-col">
      <TopBar onJudgeDemo={() => setDemoOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <JudgeDemo open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  )
}
