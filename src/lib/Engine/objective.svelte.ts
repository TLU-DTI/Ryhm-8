import { clamp } from "$lib"

export class Objective {
  private _scope: Component = new Component()
  private _quality: Component = new Component()
  private _time: Component = new Component()
  private _cost: Component = new Component()

  readonly SPEED = 800

  get scope(): number { return this._scope.value }
  set scope(value: number) { this._scope.value = value }
  set scopeLen(value: number) { this._scope._length = value }
  set scopeStart(value: number) { this._scope.start = value }

  get quality(): number { return this._quality.value }
  set quality(value: number) { this._quality.value = value }
  set qualityLen(value: number) { this._quality._length = value }
  set qualityStart(value: number) { this._quality.start = value }

  get time(): number { return this._time.value }
  set time(value: number) { this._time.value = value }
  set timeLen(value: number) { this._time._length = value }
  set timeStart(value: number) { this._time.start = value }

  get cost(): number { return this._cost.value }
  set cost(value: number) { this._cost.value = value }
  set costLen(value: number) { this._cost._length = value }
  set costStart(value: number) { this._cost.start = value }
}

class Component {
  _value: number = $state(0)
  _start: number = 0
  _end: number = 0
  _length: number = 0

  private LENGHTPREFIX = -3.5
  get value(): number { return this._value }
  set value(value: number) {
    // keeps value between start and end
    // value is a percentage
    this._value = clamp(this._value + (value / 100 * this._length), this._start, this._end)
  }

  get start(): number { return this._start }
  set start(value: number) {
    this._start = value
    this._value = value
    this._length = this._length + this.LENGHTPREFIX
    this._end = value + this._length
  }
}