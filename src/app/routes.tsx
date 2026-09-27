import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import LandingPage from '@/pages/LandingPage'
import CommandCenter from '@/pages/CommandCenter'
import LiveMap from '@/pages/LiveMap'
import Incidents from '@/pages/Incidents'
import AIVerification from '@/pages/AIVerification'
import CitizenReports from '@/pages/CitizenReports'
import Analytics from '@/pages/Analytics'
import Alerts from '@/pages/Alerts'
import RegionalIntelligence from '@/pages/RegionalIntelligence'
import DataSources from '@/pages/DataSources'
import Architecture from '@/pages/Architecture'
import AdminPanel from '@/pages/AdminPanel'
import SystemHealth from '@/pages/SystemHealth'
import DisasterReplay from '@/pages/DisasterReplay'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AppShell />}>
        <Route path="/command-center" element={<CommandCenter />} />
        <Route path="/live-map" element={<LiveMap />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/verification" element={<AIVerification />} />
        <Route path="/citizen-report" element={<CitizenReports />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/regional" element={<RegionalIntelligence />} />
        <Route path="/data-sources" element={<DataSources />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/replay" element={<DisasterReplay />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/system-health" element={<SystemHealth />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
