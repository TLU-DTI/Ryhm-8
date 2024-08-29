import { clamp } from "$lib";

export class Tutorial {
  tutorial: boolean = $state(false);

  STAGEMAX = 100;
  _stage: number = $state(0);
  get stage(): number {
    return this._stage;
  }
  set stage(value: number) {
    this._stage = clamp(this._stage + value, 0, this.STAGEMAX);
  }
}