import { Engine as engine } from './engine.svelte';

const Engine = new engine();

export { Engine };

export interface Attributes {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

export enum Category {
  Technical = 'Technical',
  Management = 'Management',
  Commercial = 'Commercial',
  External = 'External'
}
export type Impact = 'Low' | 'Medium' | 'High';
export type Color = 'Red' | 'Yellow' | 'Green' | 'Plain';
