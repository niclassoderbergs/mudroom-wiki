export interface MaterialSheet {
  id: string;
  material: string;
  width: number;
  height: number;
  label: string;
  parts: CutPart[];
}

export interface CutPart {
  name: string;
  width: number; // x dimension in SCAD
  length: number; // y dimension in SCAD
  x: number;
  y: number;
  rotated?: boolean;
}

export interface PartDefinition {
  id: string;
  name: string;
  count: number;
  width: number;
  length: number;
  thickness: number;
  material: string;
  description?: string;
}

export interface ProjectParams {
  totalWidth: number;
  totalHeight: number;
  depthCarcass: number;
  depthSeat: number;
  places: number;
  benchHeight: number;
  materialThickness: number;
  seatThickness: number;
}
