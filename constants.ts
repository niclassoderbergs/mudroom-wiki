import { PartDefinition, ProjectParams, MaterialSheet } from './types';

// Parametrar från OpenSCAD
export const PROJECT_PARAMS: ProjectParams = {
  totalWidth: 2400,
  totalHeight: 2250,
  depthCarcass: 450,
  depthSeat: 550,
  places: 4,
  benchHeight: 460,
  materialThickness: 18,
  seatThickness: 21,
};

// Detaljerad stycklista (BOM) baserad på "parts_outside" modulen
export const PARTS_LIST: PartDefinition[] = [
  { id: 'sits', name: 'Sits', count: 1, width: 2400, length: 550, thickness: 21, material: 'Plywood', description: 'Huvudsaklig sittyta' },
  { id: 'sockel_bot', name: 'Sockel Botten', count: 1, width: 2400, length: 450, thickness: 18, material: 'Plywood', description: 'Bottenplatta för sockel' },
  { id: 'sockel_top', name: 'Sockel Topp', count: 1, width: 2400, length: 450, thickness: 18, material: 'Plywood', description: 'Topplatta för sockel (golv i fack)' },
  { id: 'yttersida', name: 'Yttersida', count: 2, width: 2250, length: 450, thickness: 18, material: 'Plywood', description: 'Höga sidostycken' },
  { id: 'mellan_nedre', name: 'Mellanvägg Nedre', count: 3, width: 439, length: 450, thickness: 18, material: 'Plywood', description: 'Under sitsen' },
  { id: 'mellan_ovre', name: 'Mellanvägg Övre', count: 3, width: 1790, length: 450, thickness: 18, material: 'Plywood', description: 'Ovanför sitsen' },
  { id: 'bak_nedre', name: 'Bakstycke Nedre', count: 2, width: 1200, length: 150, thickness: 18, material: 'Plywood', description: 'Delad bakvägg (nedre del)' },
  { id: 'bak_ovre', name: 'Bakstycke Övre', count: 2, width: 1200, length: 2009, thickness: 18, material: 'Plywood', description: 'Delad bakvägg (övre del)' },
  { id: 'boot_hylla', name: 'Boot-hylla', count: 4, width: 578, length: 420, thickness: 18, material: 'Plywood', description: 'Hylla i nedre fack' },
  { id: 'handskhylla', name: 'Handskhylla', count: 4, width: 578, length: 450, thickness: 18, material: 'Plywood', description: 'Övre hyllplan 1' },
  { id: 'hjalmhylla', name: 'Hjälmhylla', count: 4, width: 578, length: 450, thickness: 18, material: 'Plywood', description: 'Övre hyllplan 2' },
  { id: 'sockel_sarg_bak', name: 'Sockelsarg Bak', count: 1, width: 2400, length: 55, thickness: 18, material: 'Plywood', description: 'Bakre stöd för sockel' },
  { id: 'sockel_sarg_fram', name: 'Sockelsarg Fram', count: 1, width: 2400, length: 55, thickness: 18, material: 'Plywood', description: 'Främre stöd för sockel' },
  { id: 'sockel_sarg_sida', name: 'Sockelsarg Sida', count: 2, width: 414, length: 55, thickness: 18, material: 'Plywood', description: 'Sidostöd sockel' },
  { id: 'sockel_sarg_inre', name: 'Sockelsarg Inre', count: 3, width: 414, length: 55, thickness: 18, material: 'Plywood', description: 'Inre stöd sockel' },
  { id: 'boot_stop', name: 'Boot Skiljelist', count: 3, width: 420, length: 60, thickness: 18, material: 'Plywood', description: 'Liten avdelare på golv' },
  { id: 'skidbank', name: 'Skidbänk', count: 1, width: 2400, length: 320, thickness: 18, material: 'Plywood', description: 'Monteras på baksidan' },
  { id: 'boot_matta', name: 'Boot-matta', count: 4, width: 500, length: 380, thickness: 6, material: 'Gummi/Matta', description: 'Inlägg i bottenfack' },
];

const KERF = 4;

// Cutlist data översatt från "cutlist_scene" modulen
export const CUTLIST_SHEETS: MaterialSheet[] = [
  {
    id: 'sheet1',
    material: '21mm Plywood',
    width: 1200,
    height: 2500,
    label: 'Sheet 1: Sits',
    parts: [
      { name: 'SITS 2400x550', width: 550, length: 2400, x: 0, y: 0 }
    ]
  },
  {
    id: 'sheetA',
    material: '18mm Plywood',
    width: 900,
    height: 2500,
    label: 'Sheet A: Sockel',
    parts: [
      { name: 'SOCKEL BOT 2400x450', width: 450, length: 2400, x: 0, y: 0 },
      { name: 'SOCKEL TOPP 2400x450', width: 450, length: 2400, x: 450, y: 0 }
    ]
  },
  {
    id: 'sheetB',
    material: '18mm Plywood',
    width: 900,
    height: 2500,
    label: 'Sheet B: Yttersidor',
    parts: [
      { name: 'YTTERSIDA 1', width: 450, length: 2250, x: 0, y: 0 },
      { name: 'YTTERSIDA 2', width: 450, length: 2250, x: 450, y: 0 }
    ]
  },
  {
    id: 'sheetC',
    material: '18mm Plywood',
    width: 900,
    height: 2500,
    label: 'Sheet C: Mellanvägg 1-2',
    parts: [
      { name: 'ÖVRE 1', width: 450, length: 1790, x: 0, y: 0 },
      { name: 'NEDRE 1', width: 450, length: 439, x: 0, y: 1790 + KERF },
      { name: 'ÖVRE 2', width: 450, length: 1790, x: 450, y: 0 },
      { name: 'NEDRE 2', width: 450, length: 439, x: 450, y: 1790 + KERF }
    ]
  },
  {
    id: 'sheetD',
    material: '18mm Plywood',
    width: 900,
    height: 2500,
    label: 'Sheet D: Mellanvägg 3 + Boot',
    parts: [
      { name: 'ÖVRE 3', width: 450, length: 1790, x: 0, y: 0 },
      { name: 'NEDRE 3', width: 450, length: 439, x: 0, y: 1790 + KERF },
      { name: 'BOOT 1', width: 420, length: 578, x: 450, y: 0 },
      { name: 'BOOT 2', width: 420, length: 578, x: 450, y: 578 + KERF },
      { name: 'BOOT 3', width: 420, length: 578, x: 450, y: 2 * (578 + KERF) },
      { name: 'BOOT 4', width: 420, length: 578, x: 450, y: 3 * (578 + KERF) }
    ]
  },
  {
    id: 'sheetE',
    material: '18mm Plywood',
    width: 900,
    height: 2500,
    label: 'Sheet E: Hyllor',
    parts: [
      { name: 'HYLLA 1', width: 450, length: 578, x: 0, y: 0 },
      { name: 'HYLLA 2', width: 450, length: 578, x: 0, y: 578 + KERF },
      { name: 'HYLLA 3', width: 450, length: 578, x: 0, y: 2 * (578 + KERF) },
      { name: 'HYLLA 4', width: 450, length: 578, x: 0, y: 3 * (578 + KERF) },
      { name: 'HYLLA 5', width: 450, length: 578, x: 450, y: 0 },
      { name: 'HYLLA 6', width: 450, length: 578, x: 450, y: 578 + KERF },
      { name: 'HYLLA 7', width: 450, length: 578, x: 450, y: 2 * (578 + KERF) },
      { name: 'HYLLA 8', width: 450, length: 578, x: 450, y: 3 * (578 + KERF) },
    ]
  },
  {
    id: 'sheetF',
    material: '18mm Plywood',
    width: 1200,
    height: 2500,
    label: 'Sheet F: Bak Vänster',
    parts: [
      { name: 'BAK ÖVRE V', width: 1200, length: 2009, x: 0, y: 0 },
      { name: 'BAK NEDRE V', width: 1200, length: 150, x: 0, y: 2009 + KERF }
    ]
  },
  {
    id: 'sheetG',
    material: '18mm Plywood',
    width: 1200,
    height: 2500,
    label: 'Sheet G: Bak Höger',
    parts: [
      { name: 'BAK ÖVRE H', width: 1200, length: 2009, x: 0, y: 0 },
      { name: 'BAK NEDRE H', width: 1200, length: 150, x: 0, y: 2009 + KERF }
    ]
  }
];