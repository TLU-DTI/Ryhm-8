import { MitiHand } from './Cards/MitiCard.svelte';
import { RiskHand } from './Cards/RiskCard.svelte';
import { Event } from './event.svelte';
import { Notifications } from './notification.svelte';
import { Objective } from './objective.svelte';
import { RiskLogs } from './risklog.svelte';
import { Timeline } from './timeline.svelte';
import { Turn } from './turn.svelte';

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

  readonly mitihand = new MitiHand();
  readonly riskHand = new RiskHand();

  readonly event = new Event();

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

  constructor() {
    this._status = 'Loading';

    this.componentStatusEventHandler();
    this.event.on('status', (e) => {
      if (e.status === 'Ready') {
        this.status = 'Running';
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

  gameEnd() {
    this.status = 'Ended';
  }

  restart() {}
}
