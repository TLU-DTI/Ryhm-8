import { Runner } from '@svgdotjs/svg.js';

export interface BarMovement {
  move: (input: number) => Runner;
  trackStartPos: number;
  trackEndPos: number;
  barID: string;
  trackID: string;
  barPos: number;
}
