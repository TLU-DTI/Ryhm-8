import { MitiHand } from './Cards/MitiCard.svelte';
import { RiskHand } from './Cards/RiskCard.svelte';
import { Event } from './event.svelte';
import { Notifications } from './notification.svelte';
import { Objective } from './objective.svelte';
import { RiskLogs } from './risklog.svelte';
import { SaveGame } from './save.svelte';
import { Timeline } from './timeline.svelte';
import { Turn, TurnStatus } from './turn.svelte';
import { Drag } from './drag.svelte';
import { Tutorial } from './tutorial.svelte';
import * as Settings from './setting.svelte'

export interface GameStatusEvent {
  status: GameStatus;
}
export type GameStatus = 'Loading' | 'Ready' | 'Running' | 'Ended';

export interface ComponentStatusEvent {
  status: ComponentStatus;
  name: ComponentName;
}
export type ComponentStatus = 'Loading' | 'Ready';
export type ComponentName = 'Objective' | 'Timeline' | 'RiskLog' | 'Notification' | 'EndTurn';
export const ComponentCount = 5;

export class Engine {
  readonly objective = new Objective();
  readonly timeline = new Timeline(this);
  readonly risklog = new RiskLogs();
  readonly notification = new Notifications();
  readonly turn = new Turn(this);
  readonly drag = new Drag(this);

  readonly mitihand = new MitiHand();
  readonly riskhand = new RiskHand();

  readonly event = new Event();
  readonly savegame = new SaveGame(this);

  readonly tutorial = new Tutorial();

  readonly settings = Settings;

  _componentStatus: ComponentStatusEvent[] = [];

  private _status: GameStatus = $state() as GameStatus;
  get status(): GameStatus {
    return this._status;
  }
  set status(value: GameStatus) {
    if (this._status === value) return;

    this._status = value;
    this.event.emit('status', { status: value });
  }

  get score() {
    return (
      (this.objective.cost + this.objective.quality + this.objective.scope + this.objective.time) /
      4
    );
  }

  constructor() {
    this._status = 'Loading';

    this.componentStatusEventHandler();
    this.event.on('status', (e) => {
      if (e.status === 'Ready') {
        this.start();
      }
    });
  }

  componentStatusEventHandler() {
    this.event.on('component-status', (e) => {
      if (e.status === 'Ready') {
        if (this._componentStatus.includes(e)) return;

        this._componentStatus.push(e);
        if (this._componentStatus.length === ComponentCount) {
          this.status = 'Ready';
        }
      }
    });
  }

  start() {
    if (this.savegame.status) {
      this.savegame.load();
      this.status = 'Running';
      return;
    }

    this.notification.add({
      name: 'Manager',
      message:
        "Welcome to Mitigate Inc. I'm your boss and i will let you know how you will do managing the issues that will come your way.",
      mood: 'Happy'
    });

    this.riskhand.createHand(1);
    this.mitihand.createHand(this.riskhand.handCards);

    this.objective.scopeTo = 66;
    this.objective.qualityTo = 66;
    this.objective.timeTo = 66;
    this.objective.costTo = 66;

    this.timeline.next();

    this.turn.status = TurnStatus.ONGOING;
    this.status = 'Running';
  }

  gameWon() {
    this.status = 'Ended';
    this.savegame.clear();
    this.turn.status = TurnStatus.GAMEWON;
  }

  gameLost() {
    this.status = 'Ended';
    this.savegame.clear();
    this.turn.status = TurnStatus.GAMEOVER;
  }

  restart() {
    this.savegame.clear();
    window.location.reload();
  }
}
