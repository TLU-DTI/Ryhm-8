import type { ComponentStatusEvent, GameStatusEvent } from "./engine.svelte";

interface EventMap {
  'status': CustomEvent<GameStatusEvent>;
  'component-status': CustomEvent<ComponentStatusEvent>;
}

export class Event {
  private _eventBus = new EventBus();
  private _eventHandler = new EventHandler();

  on<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this._eventBus.on(type, listener);
  }
  once<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this._eventBus.once(type, listener);
  }
  off<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this._eventBus.off(type, listener);
  }
  emit<T extends keyof EventMap>(type: T, detail?: EventMap[T]['detail']) {
    this._eventBus.emit(type, detail);
  }
  constructor() { }
}


// example
// myEventBus.on('event-name', ({ detail }) => {
//   console.log(detail);
// });
// myEventBus.once('event-name', ({ detail }) => {
//   console.log(detail);
// });
// myEventBus.emit('event-name', 'Hello');
class EventBus {
  private eventTarget: EventTarget;

  constructor(description = '') {
    this.eventTarget = document.appendChild(document.createComment(description));
  }
  on<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener);
  }
  once<T extends keyof EventMap>(type: T, listener: (even: EventMap[T]) => void) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
  }
  off<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }
  emit<T extends keyof EventMap>(type: T, detail?: EventMap[T]['detail']) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}

class EventHandler {
  constructor() { }
}
