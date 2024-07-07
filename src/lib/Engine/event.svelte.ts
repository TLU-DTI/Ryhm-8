
interface EventMap {
  'my-event': CustomEvent<{ foo: string }>;
  'my-event2': CustomEvent<{ foo: number }>;
}


// example
// myEventBus.on('event-name', ({ detail }) => {
//   console.log(detail);
// });
// myEventBus.once('event-name', ({ detail }) => {
//   console.log(detail);
// });
// myEventBus.emit('event-name', 'Hello');
export class EventBus {
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
