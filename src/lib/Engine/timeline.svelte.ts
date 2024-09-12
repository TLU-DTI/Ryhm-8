import { clamp } from '$lib';
import type { Engine } from './engine.svelte';
import { TurnStatus } from './turn.svelte';

const stages = <const>{
  1: [5.3, 9.8, 9.5],
  2: [12.4, 9.7, 9.5],
  3: [12.4, 9.5, 9.5],
  4: [99]
};

export const turns = 10;

export class Timeline {
  private _engine: Engine;

  stage: number = $state(1);
  round: number = $state(0);

  private _barPos: number = $state(0);

  private _start: number = 0;
  private _length: number = 0;
  private _end: number = 0;

  readonly SPEED = 800;
  private STARTPREFIX = -3.3;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  next() {
    if (this.stage > Object.keys(stages).length) {
      this._engine.turn.status = TurnStatus.ENDED;
    } else if (this.round === stages[this.stage as keyof typeof stages].length) {
      this.round = 0;
      this.stage += 1;
      this.next();
    } else if (this.round < stages[this.stage as keyof typeof stages].length) {
      this.round += 1;
      this.move(stages[this.stage as keyof typeof stages][this.round - 1]);
    }
  }

  move(input: number) {
    this.barPos = input;
  }

  set start(value: number) {
    this._start = value + this.STARTPREFIX;
    this._end = this._start + this._length;
    this._barPos = this._start;
  }

  set length(value: number) {
    this._length = value;
  }

  get barPos(): number {
    return this._barPos;
  }
  set barPos(value: number) {
    this._barPos = clamp(this._barPos + (value / 100) * this._length, this._start, this._end);
  }
  set barPosTo(value: number) {
    this._barPos = value;
  }
}
