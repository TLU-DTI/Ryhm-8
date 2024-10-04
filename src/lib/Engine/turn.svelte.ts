import { handleCardOnCard } from './Cards';
import type { Engine } from './engine.svelte';
import { Notification } from './notification.svelte';
import { RiskLog } from './risklog.svelte';

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
    if (this._engine.riskhand.handCards.length > 0) {
      for (const riskCard of this._engine.riskhand.handCards) {
        handleCardOnCard(this._engine, riskCard.id, undefined, true);
      }
    }

    this._engine.timeline.next();

    if (this._engine.timeline.stage === 5) return this._engine.gameWon();

    if (this.isGameOver()) return this._engine.gameLost();

    this._engine.riskhand.createHand(this._engine.timeline.stage);
    this._engine.mitihand.createHand(this._engine.riskhand.handCards);

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
