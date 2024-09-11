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
    let costTotal = 0;
    let qualityTotal = 0;
    let scopeTotal = 0;
    let timeTotal = 0;

    if (this._engine.riskhand.handCards.length > 0) {
      for (const element of this._engine.riskhand.handCards) {
        costTotal += element.attributes.cost;
        qualityTotal += element.attributes.quality;
        scopeTotal += element.attributes.scope;
        timeTotal += element.attributes.time;

        element.timeout = this._engine.riskhand.RISKCARD_TIMEOUT_ROUNDS;
        this._engine.riskhand.usedCards.push(element);

        this._engine.notification.add(new Notification("Manager", `You decided to avoid the following risk: <b>${element.title}</b>`, "Happy"));

        this._engine.risklog.add(
          new RiskLog(element.title, element.category, "Avoided", {
            scope: element.attributes.scope,
            quality: element.attributes.quality,
            time: element.attributes.time,
            cost: element.attributes.cost
          })
        );
      }

      this._engine.objective.cost = costTotal
      this._engine.objective.quality = qualityTotal
      this._engine.objective.scope = scopeTotal
      this._engine.objective.time = timeTotal
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
