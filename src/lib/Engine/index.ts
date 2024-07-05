import { Engine as engine } from "./engine.svelte";

const Engine = new engine();

export { Engine };

export interface Point {
  x: number;
  y: number;
}