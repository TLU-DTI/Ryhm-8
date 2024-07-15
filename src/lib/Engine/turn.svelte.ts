import type { Engine } from './engine.svelte';

export enum TurnStatus {
  ONGOING = 'ONGOING',
  WAITING = 'WAITING',
  ENDED = 'ENDED',
  GAMEOVER = 'GAMEOVER',
  GAMEWON = 'GAMEWON'
}

export class Turn {
  private _engine: Engine;
  private _status: TurnStatus = $state() as TurnStatus;

  constructor(engine: Engine) {
    this.status = TurnStatus.ONGOING;
    this._engine = engine;
  }

  get status(): TurnStatus {
    return this._status;
  }
  set status(value: TurnStatus) {
    this._status = value;
  }

  next() {
    this._engine.timeline.next();

    if (this._engine.timeline.stage === 5) {
      this._engine.gameWon();
      return;
    }

    if (this.isGameOver()) {
      this._engine.gameLost();
      return;
    }

    this._engine.riskHand.createHand(this._engine.timeline.stage);
    this._engine.mitihand.createHand(this._engine.riskHand.handCards);

    this._engine.savegame.save();

    this.status = TurnStatus.ONGOING;
  }

  isGameOver() {
    if (
      this._engine.objective.cost < 33 ||
      this._engine.objective.quality < 33 ||
      this._engine.objective.scope < 33 ||
      this._engine.objective.time < 33
    ) {
      return true;
    }

    return false;
  }
}

