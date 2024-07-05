
export class Timeline {
  readonly stage: number = $state(0)
  readonly round: number = $state(0)

  private _barPos: number = $state(0)
  private _start: number = 0
  private _length: number = 0
  private _end: number = 0

  readonly SPEED = 800

  constructor() {
    this.stage = 1
    this.round = 1
  }

  public set start(value: number) {
    this._start = value
    this._end = value + this._length
  }
  public set length(value: number) { this._length = value }

  public get barPos(): number { return this._barPos }
}