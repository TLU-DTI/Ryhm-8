/* eslint-disable @typescript-eslint/no-explicit-any */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function shuffle<T>(a: T[]): T[] {
  const array = [...a];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function preventDefault(fn: any) {
  return function (event: any) {
    event.preventDefault();
    fn.call(this, event);
  };
}

export function stopPropagation(fn: any) {
  return function (event: any) {
    event.stopPropagation();
    fn.call(this, event);
  };
}