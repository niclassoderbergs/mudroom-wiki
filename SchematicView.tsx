import React, { useState } from 'react';
import { Eye, Sidebar, Box } from 'lucide-react';

const FrontView: React.FC = () => (
  <svg viewBox="0 0 2400 2250" className="w-full h-full drop-shadow-md">
    <rect x="0" y="0" width="2400" height="2250" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
    <rect x="0" y="0" width="18" height="2250" fill="#cbd5e1" />
    <rect x="2382" y="0" width="18" height="2250" fill="#cbd5e1" />
    <rect x="0" y="2160" width="2400" height="90" fill="#94a3b8" opacity="0.5" />
    <text x="1200" y="2220" textAnchor="middle" fontSize="60" fill="#475569">Sockel (91mm)</text>
    <rect x="0" y="1790" width="2400" height="21" fill="#ea580c" />
    <text x="1200" y="1780" textAnchor="middle" fontSize="50" fill="#ea580c" fontWeight="bold">Sits (460mm höjd)</text>
    {[600, 1200, 1800].map((x, i) => (
      <g key={i}>
        <rect x={x - 9} y="1811" width="18" height="349" fill="#cbd5e1" />
        <rect x={x - 9} y="0" width="18" height="1790" fill="#cbd5e1" />
      </g>
    ))}
    <line x1="18" y1="550" x2="2382" y2="550" stroke="#64748b" strokeWidth="4" strokeDasharray="20,10" />
    <text x="1200" y="530" textAnchor="middle" fontSize="40" fill="#64748b">Handskhyllor (1700mm)</text>
    <line x1="18" y1="300" x2="2382" y2="300" stroke="#64748b" strokeWidth="4" strokeDasharray="20,10" />
    <text x="1200" y="280" textAnchor="middle" fontSize="40" fill="#64748b">Hjälmhyllor (1950mm)</text>
    <line x1="0" y1="2300" x2="2400" y2="2300" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="1200" y="2350" textAnchor="middle" fontSize="60">2400mm Bredd</text>
    <line x1="-50" y1="0" x2="-50" y2="2250" stroke="black" strokeWidth="2" />
    <text x="-100" y="1125" textAnchor="middle" fontSize="60" transform="rotate(-90, -100, 1125)">2250mm Höjd</text>
  </svg>
);

const SideView: React.FC = () => (
  <svg viewBox="-400 0 1400 2250" className="w-full h-full drop-shadow-md p-4">
    <line x1="-350" y1="2250" x2="1000" y2="2250" stroke="#94a3b8" strokeWidth="4" />
    <rect x="0" y="0" width="450" height="2250" fill="#f1f5f9" stroke="#64748b" strokeWidth="4" />
    <text x="225" y="1100" textAnchor="middle" fontSize="40" fill="#94a3b8" transform="rotate(-90, 225, 1100)">Stomme (450mm)</text>
    <rect x="0" y="1790" width="550" height="21" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
    <text x="500" y="1770" textAnchor="end" fontSize="40" fill="#ea580c" fontWeight="bold">Sits (550mm djup)</text>
    <rect x="18" y="2190" width="420" height="60" fill="#cbd5e1" opacity="0.6" />
    <rect x="35" y="2244" width="380" height="6" fill="#333" />
    <g>
        <rect x="-320" y="1330" width="320" height="18" fill="#64748b" />
        <path d="M0 1330 L0 1348 L-320 1348 L-320 1330 Z" fill="#475569" />
        <path d="M0 1348 L-200 1548 L0 1548 Z" fill="#cbd5e1" opacity="0.5" />
        <text x="-160" y="1310" textAnchor="middle" fontSize="40" fill="#475569" fontWeight="bold">Skidbänk</text>
        <text x="-160" y="1360" textAnchor="middle" fontSize="30" fill="#64748b">320mm utstick</text>
    </g>
    <line x1="0" y1="550" x2="450" y2="550" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10,5" />
    <line x1="0" y1="300" x2="450" y2="300" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10,5" />
    <line x1="450" y1="2300" x2="550" y2="2300" stroke="black" strokeWidth="2" />
    <text x="500" y="2340" textAnchor="middle" fontSize="30">100mm Överhäng</text>
    <line x1="560" y1="1790" x2="560" y2="2250" stroke="black" strokeWidth="2" />
    <text x="570" y="2020" fontSize="40" transform="rotate(90, 570, 2020)">460mm Sitthöjd</text>
  </svg>
);

const PerspectiveView: React.FC = () => (
  <svg viewBox="0 0 1000 800" className="w-full h-full drop-shadow-md p-4">
    <defs>
      <linearGradient id="gradSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#cbd5e1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#94a3b8', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="gradFront" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <g transform="translate(200, 100) scale(0.8)">
      <path d="M50 50 L650 50 L650 650 L50 650 Z" fill="#e2e8f0" />
      <path d="M0 0 L50 50 L50 700 L0 650 Z" fill="url(#gradSide)" stroke="#64748b" />
      <path d="M0 0 L600 0 L650 50 L50 50 Z" fill="#cbd5e1" stroke="#64748b" />
      <path d="M600 0 L650 50 L650 650 L600 650 Z" fill="#94a3b8" />
      <rect x="0" y="0" width="10" height="650" fill="#cbd5e1" />
      <rect x="150" y="0" width="10" height="650" fill="#cbd5e1" />
      <rect x="300" y="0" width="10" height="650" fill="#cbd5e1" />
      <rect x="450" y="0" width="10" height="650" fill="#cbd5e1" />
      <rect x="600" y="0" width="10" height="650" fill="#cbd5e1" />
      <g transform="translate(-10, 480)">
         <path d="M0 0 L630 0 L660 30 L10 30 Z" fill="#ea580c" stroke="#c2410c" />
         <rect x="10" y="30" width="650" height="10" fill="#c2410c" />
         <path d="M660 30 L660 40 L630 10 Z" fill="#9a3412" />
      </g>
      <path d="M50 150 L600 150 L610 160 L60 160 Z" fill="#cbd5e1" opacity="0.5" />
      <path d="M50 100 L600 100 L610 110 L60 110 Z" fill="#cbd5e1" opacity="0.5" />
      <text x="680" y="490" fontSize="24" fill="#ea580c" fontWeight="bold">Sits</text>
      <text x="680" y="520" fontSize="18" fill="#64748b">Överhäng</text>
      <text x="300" y="730" textAnchor="middle" fontSize="24" fill="#64748b">4 st Sektioner</text>
    </g>
  </svg>
);

const SchematicView: React.FC = () => {
  const [view, setView] = useState<'front' | 'side' | 'perspective'>('front');

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="flex border-b border-slate-100 bg-slate-50">
        <button
          onClick={() => setView('front')}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            view === 'front' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Eye size={18} /> Framifrån
        </button>
        <button
          onClick={() => setView('side')}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            view === 'side' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sidebar size={18} /> Från sidan (Profil)
        </button>
        <button
          onClick={() => setView('perspective')}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            view === 'perspective' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Box size={18} /> Snett framifrån
        </button>
      </div>
      <div className="w-full aspect-[4/3] max-h-[600px] relative bg-slate-50/50 flex items-center justify-center p-4">
        {view === 'front' && <FrontView />}
        {view === 'side' && <SideView />}
        {view === 'perspective' && <PerspectiveView />}
        <div className="absolute bottom-2 right-2 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded">
          Ej skalenlig ritning (Schematisk)
        </div>
      </div>
    </div>
  );
};

export default SchematicView;