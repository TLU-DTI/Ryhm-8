import mitt from 'mitt';

import type { ComponentStatusEvent, GameStatusEvent } from "./engine.svelte";

type EventMap = {
  'status': GameStatusEvent;
  'component-status': ComponentStatusEvent;
}

// example
// listen to an event
// emitter.on('foo', e => console.log('foo', e) )

// listen to all events
// emitter.on('*', (type, e) => console.log(type, e) )

// fire an event
// emitter.emit('foo', { a: 'b' })

// clearing all events
// emitter.all.clear()
export class Event {
  private _eventBus = mitt<EventMap>();
  private _eventHandler = new EventHandler();

  on<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this._eventBus.on(type, listener);
  }
  off<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void) {
    this._eventBus.off(type, listener);
  }
  emit<T extends keyof EventMap>(type: T, detail: EventMap[T]) {
    this._eventBus.emit(type, detail);
  }
  constructor() { }
}

class EventHandler {
  constructor() { }
}
