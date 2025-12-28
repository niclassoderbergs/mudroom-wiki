import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECT_PARAMS } from './constants';

// --- Helper Components ---

interface PanelProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  opacity?: number;
  name?: string;
}

// Converts OpenSCAD coordinates (Bottom-Left Corner based) to Three.js (Center based)
// OpenSCAD: X=Width, Y=Depth, Z=Height
// Three.js: X=Width, Y=Height, Z=Depth
const Panel: React.FC<PanelProps> = ({ 
  position, 
  size, 
  color = "#e2c7a0", 
  opacity = 1,
  name 
}) => {
  const [w, d, h] = size; // OpenSCAD Dimensions: Width, Depth, Height
  const [x, y, z] = position; // OpenSCAD Position: X, Y, Z

  // Calculate center for Three.js
  // Three.js Y is Up. Three.js Z is Depth.
  const cx = x + w / 2;
  const cy = z + h / 2; 
  const cz = y + d / 2;

  return (
    <mesh position={[cx, cy, cz]} castShadow receiveShadow name={name}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial 
        color={color} 
        transparent={opacity < 1} 
        opacity={opacity}
        roughness={0.7}
      />
      {/* Wireframe overlay for technical look */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
        <lineBasicMaterial color="#a16207" linewidth={1} opacity={0.3} transparent />
      </lineSegments>
    </mesh>
  );
};

// --- Constants from OpenSCAD ---
// We use the same variable names for easy comparison

const {
  totalWidth,
  totalHeight,
  depthCarcass,
  depthSeat,
  places,
  benchHeight,
  materialThickness: ply,
  seatThickness: seat_th,
} = PROJECT_PARAMS;

const place_w = totalWidth / places;
const clearance = 2;
const shelf_w = place_w - ply - 2 * clearance;

// Plinth
const plinth_bottom_th = 18;
const plinth_void_h = 55;
const plinth_top_th = 18;
const plinth_total_h = plinth_bottom_th + plinth_void_h + plinth_top_th;
const plinth_rail_th = ply;

// Heights
const glove_h = 1700;
const helmet_h = 1950;
const seat_bottom_z = benchHeight - seat_th;
const divider_lower_h = seat_bottom_z;
const divider_upper_z = benchHeight;
const divider_upper_h = totalHeight - divider_upper_z;

// Boot Zone
const boot_depth = 420;
const boot_stop_th = ply;
const boot_stop_h = 60;
const boot_mat_w = 500;
const boot_mat_d = 380;
const boot_mat_th = 6;

// Back
const back_lower_h = 150;
const back_panel_w = 1200;
const back_upper_h = totalHeight - (plinth_total_h + back_lower_h);

// Ski Bench
const ski_bench_h = 920;
const ski_bench_depth = 320;
const ski_top_th = ply;


// --- The Model Assembly ---

const MudroomAssembly = () => {
  const parts: React.ReactNode[] = [];

  // --- Sockel ---
  // Botten
  parts.push(<Panel key="p_bot" position={[0, 0, 0]} size={[totalWidth, depthCarcass, plinth_bottom_th]} />);
  // Topp (Golv i fack)
  parts.push(<Panel key="p_top" position={[0, 0, plinth_bottom_th + plinth_void_h]} size={[totalWidth, depthCarcass, plinth_top_th]} />);
  
  // Sargar (Rails)
  // Bak
  parts.push(<Panel key="pr_back" position={[0, 0, plinth_bottom_th]} size={[totalWidth, plinth_rail_th, plinth_void_h]} />);
  // Fram
  parts.push(<Panel key="pr_front" position={[0, depthCarcass - plinth_rail_th, plinth_bottom_th]} size={[totalWidth, plinth_rail_th, plinth_void_h]} />);
  // Sidor
  parts.push(<Panel key="pr_s1" position={[0, plinth_rail_th, plinth_bottom_th]} size={[plinth_rail_th, depthCarcass - 2*plinth_rail_th, plinth_void_h]} />);
  parts.push(<Panel key="pr_s2" position={[totalWidth - plinth_rail_th, plinth_rail_th, plinth_bottom_th]} size={[plinth_rail_th, depthCarcass - 2*plinth_rail_th, plinth_void_h]} />);
  
  // Inre sockelsargar
  for (let i = 1; i < places; i++) {
    parts.push(<Panel key={`pr_in_${i}`} position={[i * place_w - plinth_rail_th/2, plinth_rail_th, plinth_bottom_th]} size={[plinth_rail_th, depthCarcass - 2*plinth_rail_th, plinth_void_h]} />);
  }

  // --- Yttersidor ---
  parts.push(<Panel key="outer_l" position={[0, 0, 0]} size={[ply, depthCarcass, totalHeight]} />);
  parts.push(<Panel key="outer_r" position={[totalWidth - ply, 0, 0]} size={[ply, depthCarcass, totalHeight]} />);

  // --- Mellanväggar (Delade) ---
  for (let i = 1; i < places; i++) {
    const xPos = i * place_w - ply/2;
    // Nedre
    parts.push(<Panel key={`div_l_${i}`} position={[xPos, 0, 0]} size={[ply, depthCarcass, divider_lower_h]} />);
    // Övre
    parts.push(<Panel key={`div_u_${i}`} position={[xPos, 0, divider_upper_z]} size={[ply, depthCarcass, divider_upper_h]} />);
  }

  // --- Bakvägg (Delad) ---
  // Nedre
  parts.push(<Panel key="back_low_l" position={[0, 0, plinth_total_h]} size={[back_panel_w, ply, back_lower_h]} />);
  parts.push(<Panel key="back_low_r" position={[back_panel_w, 0, plinth_total_h]} size={[back_panel_w, ply, back_lower_h]} />);
  // Övre
  parts.push(<Panel key="back_hi_l" position={[0, 0, plinth_total_h + back_lower_h]} size={[back_panel_w, ply, back_upper_h]} />);
  parts.push(<Panel key="back_hi_r" position={[back_panel_w, 0, plinth_total_h + back_lower_h]} size={[back_panel_w, ply, back_upper_h]} />);

  // --- Sits ---
  parts.push(<Panel key="seat" position={[0, 0, seat_bottom_z]} size={[totalWidth, depthSeat, seat_th]} color="#ea580c" />);

  // --- Skidbänk ---
  parts.push(<Panel key="ski" position={[0, -ski_bench_depth, ski_bench_h]} size={[totalWidth, ski_bench_depth, ski_top_th]} color="#64748b" />);


  // --- Inredning per fack ---
  for (let i = 0; i < places; i++) {
    const xBase = i * place_w;
    
    // Boot Hylla
    parts.push(<Panel key={`boot_${i}`} position={[xBase + ply + clearance, 0, plinth_total_h]} size={[shelf_w, boot_depth, ply]} />);
    
    // Boot Matta
    parts.push(<Panel key={`mat_${i}`} position={[xBase + ply + (place_w - ply - boot_mat_w)/2, (boot_depth - boot_mat_d)/2, plinth_total_h + ply]} size={[boot_mat_w, boot_mat_d, boot_mat_th]} color="#333333" />);
    
    // Handskhylla
    parts.push(<Panel key={`glove_${i}`} position={[xBase + ply + clearance, 0, glove_h]} size={[shelf_w, depthCarcass, ply]} />);
    
    // Hjälmhylla
    parts.push(<Panel key={`helmet_${i}`} position={[xBase + ply + clearance, 0, helmet_h]} size={[shelf_w, depthCarcass, ply]} />);
    
    // Boot Skiljelist (Skippa första)
    if (i > 0) {
        parts.push(<Panel key={`stop_${i}`} position={[xBase - boot_stop_th/2, 0, plinth_total_h]} size={[boot_stop_th, boot_depth, boot_stop_h]} />);
    }
  }

  return <group>{parts}</group>;
};

const MudroomModel = () => {
  return (
    <div className="w-full h-[600px] bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200 relative">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded backdrop-blur-sm text-xs text-slate-600">
         <p>Vänsterklick: Rotera</p>
         <p>Högerklick: Panorera</p>
         <p>Scroll: Zooma</p>
      </div>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[4000, 2500, 4000]} fov={45} />
        <OrbitControls target={[totalWidth/2, totalHeight/2, depthCarcass/2]} maxPolarAngle={Math.PI / 1.8} />
        
        <Stage environment="city" intensity={0.6} adjustCamera={false}>
            <MudroomAssembly />
        </Stage>
      </Canvas>
    </div>
  );
};

export default MudroomModel;