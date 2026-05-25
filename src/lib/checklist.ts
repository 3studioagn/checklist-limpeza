export const CLEANING_AREAS = [
  { key: "mesa", code: "A", label: "Mesa", sublabel: "superfície" },
  { key: "monitor", code: "B", label: "Monitor", sublabel: "tela + base" },
  { key: "inputs", code: "C", label: "Inputs", sublabel: "teclado + mouse" },
  { key: "gabinete", code: "D", label: "Gabinete", sublabel: "painéis externos" },
  { key: "floor_area", code: "E", label: "Floor", sublabel: "piso + cabos" },
  { key: "gavetas", code: "F", label: "Gavetas", sublabel: "interno + puxadores" },
] as const;

export type CleaningAreaKey = (typeof CLEANING_AREAS)[number]["key"];

export type CleaningState = Record<CleaningAreaKey, boolean>;

export const INITIAL_CLEANING_STATE: CleaningState = {
  mesa: false,
  monitor: false,
  inputs: false,
  gabinete: false,
  floor_area: false,
  gavetas: false,
};

export const TOTAL_AREAS = CLEANING_AREAS.length;

export function countCompleted(state: CleaningState): number {
  return Object.values(state).filter(Boolean).length;
}
