'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const pipelineData = [
  { name: 'Leads', value: 45 },
  { name: 'Contacted', value: 30 },
  { name: 'Site Visit', value: 15 },
  { name: 'Negotiation', value: 8 },
  { name: 'LOI', value: 3 },
  { name: 'Signed', value: 1 },
];

const vacancyData = [
  { name: 'Leased', value: 65, color: '#E1252D' },
  { name: 'Available', value: 25, color: '#10b981' },
  { name: 'Discussion', value: 10, color: '#f59e0b' },
];

export default function DashboardCharts() {
  return (
    <>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'default' }}>
           <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '24px' }}>Active Leasing Pipeline Funnel</h3>
           <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={pipelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                       <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--secondary)', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--secondary)', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
           <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '24px' }}>Overall Portfolio Vacancy</h3>
           <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={vacancyData} cx="50%" cy="45%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                       {vacancyData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
    </>
  );
}
