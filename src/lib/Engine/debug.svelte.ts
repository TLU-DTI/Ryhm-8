
// not sure if i care right now
export class Debug {
  debug: boolean = true;

  constructor() { }

  log(message: string, type: 'error' | 'warn' | 'info' = 'info') {
    if (this.debug == false) return;

  }
}