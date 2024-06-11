import { Runner } from '@svgdotjs/svg.js';

export interface BarMovement {
  movePositive: (input: number) => Runner;
  moveNegative: (input: number) => Runner;
  trackStartPos: number;
  trackEndPos: number;
  barID: string;
  trackID: string;
  barPos: number;
}

