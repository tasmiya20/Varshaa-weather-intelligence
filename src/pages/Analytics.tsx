import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { PageHeader } from '@/components/layout/PageHeader'
import { ChartCard } from '@/components/charts/ChartCard'
import { incidentsByState, severityDistribution, rainfallTrend, hourlySignalDensity, verificationRateTrend, sourceDistribution } from '@/data/analytics'

export default function Analytics() {
  return (
    <div className="p-6">
      <PageHeader title="Weather Analytics" description="Every chart here answers one operational question." />
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Incidents by state" question="Which regions have the highest verified incident density?">
          <ResponsiveContainer><BarChart data={incidentsByState} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E3E8F0" />
            <XAxis type="number" tick={{ fontSize: 11 }} /><YAxis type="category" dataKey="state" width={90} tick={{ fontSize: 11 }} />
            <Tooltip /><Bar dataKey="incidents" fill="#0B3D91" radius={[0, 4, 4, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Severity distribution" question="How severe are today's active incidents overall?">
          <ResponsiveContainer><PieChart>
            <Pie data={severityDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
              {severityDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie><Tooltip />
          </PieChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Rainfall trend (7 days)" question="Is rainfall intensifying this week?">
          <ResponsiveContainer><LineChart data={rainfallTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8F0" /><XAxis dataKey="day" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
            <Tooltip /><Line type="monotone" dataKey="mm" stroke="#0891B2" strokeWidth={2.5} dot={false} />
          </LineChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Hourly signal density" question="When during the day do signals peak?">
          <ResponsiveContainer><BarChart data={hourlySignalDensity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8F0" /><XAxis dataKey="hour" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} />
            <Tooltip /><Bar dataKey="signals" fill="#0891B2" radius={[4, 4, 0, 0]} />
          </BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="AI verification rate" question="Is the verification pipeline keeping pace with signal volume?">
          <ResponsiveContainer><LineChart data={verificationRateTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E8F0" /><XAxis dataKey="day" tick={{ fontSize: 11 }} /><YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
            <Tooltip /><Line type="monotone" dataKey="rate" stroke="#16A34A" strokeWidth={2.5} dot={false} />
          </LineChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Source distribution" question="Which channels contribute the most raw signal volume?">
          <ResponsiveContainer><PieChart>
            <Pie data={sourceDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
              {sourceDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie><Tooltip />
          </PieChart></ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
