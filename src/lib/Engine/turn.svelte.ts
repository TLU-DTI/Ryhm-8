import type { Engine } from "./engine.svelte";

export enum TurnStatus {
  ONGOING,
  WAITING,
  ENDED,
  GAMEOVER,
  GAMEWON
}

export class Turn {
  private _engine: Engine
  private _status: TurnStatus = $state() as TurnStatus;

  constructor(engine: Engine) {
    this.status = TurnStatus.ONGOING;
    this._engine = engine;
  }

  get status(): TurnStatus { return this._status; }
  set status(value: TurnStatus) { this._status = value; }

  next() {
    this._engine.timeline.next();
    this.status = TurnStatus.ONGOING;

    if (this._engine.timeline.stage === 5) {
      this._engine.gameEnd();
    }
  }
}