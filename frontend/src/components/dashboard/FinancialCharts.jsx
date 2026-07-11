import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  PieChart, Pie
} from 'recharts';
import { LineChart as ChartIcon } from 'lucide-react';

export default function FinancialCharts({ revenueTrend, financialSnapshot, confidence }) {
  const hasTrendData = revenueTrend && revenueTrend.length > 0;
  
  // Helper to parse percentages safely (e.g. "36.20%" -> 36.2)
  const parsePercent = (val) => {
    if (!val || val === 'Data Not Available') return 0;
    const clean = val.replace('%', '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  // Compile datasets for the margin comparison Bar Chart
  const barData = [
    { name: 'Profit Margin', value: parsePercent(financialSnapshot?.profitMargin), color: '#00E5A0' },
    { name: 'Operating Margin', value: parsePercent(financialSnapshot?.operatingMargin), color: '#6D5EF5' },
    { name: 'ROE', value: parsePercent(financialSnapshot?.returnOnEquity), color: '#F44B9A' },
  ];

  // Compile datasets for the Confidence Score Donut Chart
  const donutValue = confidence || 0;
  const donutData = [
    { name: 'Confidence', value: donutValue, color: '#00E5A0' },
    { name: 'Remaining', value: 100 - donutValue, color: '#1F2937' },
  ];

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <ChartIcon className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">Performance Charts & Indicators</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Line/Area Chart representing price trend */}
        <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-dark pb-5 lg:pb-0 lg:pr-5">
          <div className="mb-4">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Historical Trend</span>
            <p className="text-xs font-semibold text-text-primary mt-1">Annual Stock Price Trend (Adjusted Close)</p>
          </div>
          
          {!hasTrendData ? (
            <div className="h-48 flex flex-col items-center justify-center bg-bg-dark/45 rounded-xl border border-dashed border-border-dark text-center">
              <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Trend Data Unavailable</span>
            </div>
          ) : (
            <div className="h-48 w-full pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartColor" cx="0" cy="0" r="1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#00E5A0" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600 }} domain={['auto', 'auto']} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' }}
                    itemStyle={{ color: '#F9FAFB', fontWeight: 'bold', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                    labelStyle={{ color: '#94A3B8', fontSize: '9px', fontWeight: 'bold' }}
                    formatter={(val) => [`$${val}`, 'Adjusted Price']}
                  />
                  <Area type="monotone" dataKey="price" stroke="#00E5A0" strokeWidth={1.5} fillOpacity={1} fill="url(#chartColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart 2: Bar Chart comparing operating margins and ROE */}
        <div className="flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-dark pb-5 lg:pb-0 lg:pr-5">
          <div className="mb-4">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Metrics Comparison</span>
            <p className="text-xs font-semibold text-text-primary mt-1">Key Profitability & Margin Multiples</p>
          </div>
          
          <div className="h-48 w-full pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 9, fontWeight: 600 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' }}
                  itemStyle={{ color: '#F9FAFB', fontWeight: 'bold', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                  labelStyle={{ color: '#94A3B8', fontSize: '9px', fontWeight: 'bold' }}
                  formatter={(val) => [`${val}%`, 'Value']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={24}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Donut Chart showing the Confidence Score */}
        <div className="flex flex-col justify-between">
          <div className="mb-4">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Confidence Level</span>
            <p className="text-xs font-semibold text-text-primary mt-1">AI Investment Confidence Gauge</p>
          </div>
          
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={64}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Centered Donut label overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-text-primary font-mono">
                {donutValue}%
              </span>
              <span className="text-[8px] text-text-secondary font-bold uppercase tracking-widest mt-0.5">
                Certainty
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

