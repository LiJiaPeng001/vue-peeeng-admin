export interface AngleRecord {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  angle?: number;
  fillet_angle?: number;
}

export type AngleKey = keyof AngleRecord;
