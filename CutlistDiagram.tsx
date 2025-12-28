import React from 'react';
import { MaterialSheet } from './types';

interface CutlistDiagramProps {
  sheet: MaterialSheet;
}

const CutlistDiagram: React.FC<CutlistDiagramProps> = ({ sheet }) => {
  return (
    <div className="flex flex-col gap-2 mb-8 break-inside-avoid">
      <div className="flex justify-between items-baseline border-b border-slate-200 pb-2 mb-2">
        <h3 className="font-bold text-lg text-slate-800">{sheet.label}</h3>
        <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {sheet.material} ({sheet.width}x{sheet.height}mm)
        </span>
      </div>
      
      <div className="w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-300 shadow-inner">
        <svg 
          viewBox={`0 0 ${sheet.width} ${sheet.height}`} 
          className="w-full h-auto block bg-white"
          style={{ maxHeight: '600px' }}
        >
          {/* Sheet Background */}
          <rect x="0" y="0" width={sheet.width} height={sheet.height} fill="#f8fafc" />
          
          {/* Parts */}
          {sheet.parts.map((part, idx) => (
            <g key={idx}>
              <rect 
                x={part.x} 
                y={part.y} 
                width={part.width} 
                height={part.length} 
                fill="#bfdbfe" 
                stroke="#2563eb" 
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <text 
                x={part.x + part.width / 2} 
                y={part.y + part.length / 2} 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize={Math.min(part.width, part.length) / 5}
                fill="#1e3a8a"
                className="font-sans font-semibold select-none pointer-events-none"
                style={{ fontSize: '32px' }}
              >
                {part.name}
              </text>
              <text 
                x={part.x + part.width / 2} 
                y={part.y + part.length / 2 + 40} 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fill="#64748b"
                fontSize="24"
              >
                {part.width}x{part.length}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default CutlistDiagram;