import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CloudLightning, ShieldCheck, Layers, Languages, PlayCircle, Network, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { incidents } from '@/data/incidents'

const STATS = [
  { label: 'Live Signals', value: 12842 },
  { label: 'Verified Incidents', value: 1284 },
  { label: 'Under Review', value: 327 },
  { label: 'Critical Zones', value: 18 },
]

function useCounter(target: number) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = Math.max(1, Math.round(target / 40))
    const t = setInterval(() => {
      cur += step
      if (cur >= target) { cur = target; clearInterval(t) }
      setVal(cur)
    }, 25)
    return () => clearInterval(t)
  }, [target])
  return val
}

function Stat({ label, value }: { label: string; value: number }) {
  const v = useCounter(value)
  return (
    <div className="border-r border-border pr-5 last:border-0">
      <div className="text-2xl font-bold tabular-nums text-primary">{v.toLocaleString()}</div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">{label}</div>
    </div>
  )
}

const SECTIONS = [
  { icon: Layers, title: 'Multi-source intelligence', body: 'Social posts, citizen reports, public datasets and official feeds are normalized into one structured signal stream.' },
  { icon: ShieldCheck, title: 'AI Verification Lab', body: 'Text, image, metadata, location and weather-correlation checks combine into a transparent evidence score — never a "truth score."' },
  { icon: Network, title: 'Smart deduplication', body: 'Fifty raw, overlapping reports collapse into one consolidated, traceable incident cluster.' },
  { icon: Languages, title: 'Multilingual intelligence', body: 'Reports in Hindi, Marathi, Tamil, Bengali and more are translated and classified via a planned BHASHINI integration.' },
  { icon: PlayCircle, title: 'Disaster Replay', body: 'Reconstruct how any verified event unfolded, minute by minute, across the map.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-bold text-primary">
          <CloudLightning className="h-5 w-5" /> VARSHAA
        </div>
        <Link to="/command-center" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          Enter Command Center
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-10 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full border border-warning/30 bg-warning-light px-3 py-1 text-[11px] font-semibold text-warning">
            ● DEMO STREAM — seeded synthetic data
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            India, seen through <span className="text-primary">every weather signal.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink-muted">
            VARSHAA turns fragmented public, citizen and meteorological signals into one verified,
            ground-truth intelligence layer for IMD, MoES and disaster response teams.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/command-center" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
              Enter Command Center <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/citizen-report" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-ink hover:border-primary hover:text-primary">
              Report Weather Incident
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-5 border-t border-border pt-6">
            {STATS.map((s) => <Stat key={s.label} {...s} />)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }} className="relative rounded-xl2 border border-border bg-surface p-6 shadow-panel">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Raw signal → AI analysis → verified incident → intelligence</div>
          <svg viewBox="0 0 320 300" className="h-72 w-full">
            <rect x="0" y="0" width="320" height="300" fill="#F5F7FA" rx="12" />
            {incidents.map((inc, i) => {
              const x = 40 + (i * 37) % 260
              const y = 30 + ((i * 53) % 240)
              return <circle key={inc.id} cx={x} cy={y} r={6} fill="#0B3D91" opacity={0.7}>
                <animate attributeName="r" values="4;10;4" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            })}
          </svg>
        </motion.div>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-2 text-[12.5px] font-semibold uppercase tracking-wide text-accent">How VARSHAA works</div>
          <h2 className="mb-10 text-2xl font-bold text-ink">From millions of noisy signals to one verified layer.</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s) => (
              <div key={s.title} className="rounded-xl2 border border-border bg-canvas/60 p-5">
                <s.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="mb-1.5 font-semibold text-ink">{s.title}</h3>
                <p className="text-[13px] leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-8 text-[12px] text-ink-faint">
        <span>VARSHAA — Smart India Hackathon · Problem 26069 · Ministry of Earth Sciences / IMD</span>
        <span>Decision-support platform · not an official forecasting authority</span>
      </footer>
    </div>
  )
}
