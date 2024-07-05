import { clamp } from "$lib"

export class Objective {
  private _scope: Component = new Component()
  private _quality: Component = new Component()
  private _time: Component = new Component()
  private _cost: Component = new Component()

  readonly SPEED = 800

  public get scope(): number { return this._scope.value }
  public set scope(value: number) { this._scope.value = value }
  public set scopeLen(value: number) { this._scope._length = value }
  public set scopeStart(value: number) { this._scope.start = value }

  public get quality(): number { return this._quality.value }
  public set quality(value: number) { this._quality.value = value }
  public set qualityLen(value: number) { this._quality._length = value }
  public set qualityStart(value: number) { this._quality.start = value }

  public get time(): number { return this._time.value }
  public set time(value: number) { this._time.value = value }
  public set timeLen(value: number) { this._time._length = value }
  public set timeStart(value: number) { this._time.start = value }

  public get cost(): number { return this._cost.value }
  public set cost(value: number) { this._cost.value = value }
  public set costLen(value: number) { this._cost._length = value }
  public set costStart(value: number) { this._cost.start = value }
}

class Component {
  _value: number = $state(0)
  _start: number = 0
  _end: number = 0
  _length: number = 0

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
    this._length -= 3.5
    this._end = value + this._length
  }
}