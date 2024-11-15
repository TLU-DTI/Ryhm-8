import { clamp } from '$lib';

export class Objective {
  private _scope: Component = new Component();
  private _quality: Component = new Component();
  private _time: Component = new Component();
  private _cost: Component = new Component();

  readonly SPEED = 800;

  get scope(): number {
    return this._scope.value;
  }
  get scopeBarPos(): number {
    return this._scope._barPos;
  }
  set scope(value: number) {
    this._scope.value = value;
  }
  set scopeTo(value: number) {
    this._scope.valueTo = value;
  }
  set scopeLen(value: number) {
    this._scope._length = value;
  }
  set scopeStart(value: number) {
    this._scope.start = value;
  }

  get quality(): number {
    return this._quality.value;
  }
  get qualityBarPos(): number {
    return this._quality._barPos;
  }
  set quality(value: number) {
    this._quality.value = value;
  }
  set qualityTo(value: number) {
    this._quality.valueTo = value;
  }
  set qualityLen(value: number) {
    this._quality._length = value;
  }
  set qualityStart(value: number) {
    this._quality.start = value;
  }

  get time(): number {
    return this._time.value;
  }
  get timeBarPos(): number {
    return this._time._barPos;
  }
  set time(value: number) {
    this._time.value = value;
  }
  set timeTo(value: number) {
    this._time.valueTo = value;
  }
  set timeLen(value: number) {
    this._time._length = value;
  }
  set timeStart(value: number) {
    this._time.start = value;
  }

  get cost(): number {
    return this._cost.value;
  }
  get costBarPos(): number {
    return this._cost._barPos;
  }
  set cost(value: number) {
    this._cost.value = value;
  }
  set costTo(value: number) {
    this._cost.valueTo = value;
  }
  set costLen(value: number) {
    this._cost._length = value;
  }
  set costStart(value: number) {
    this._cost.start = value;
  }
}

class Component {
  _value: number = $state(0);
  _barPos: number = $state(0);

  _start: number = 0;
  _end: number = 0;
  _length: number = 0;

  private LENGHTPREFIX = -3.5;
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    // keeps value between start and end
    // value is a percentage
    this._barPos = clamp(this._barPos + (value / 100) * this._length, this._start, this._end);
    this._value = clamp(this._value + value, 0, 100);
  }
  set valueTo(value: number) {
    this._value = value;
    this._barPos = clamp(this._start + (value / 100) * this._length, this._start, this._end);
  }

  get start(): number {
    return this._start;
  }
  set start(value: number) {
    this._start = value;
    this._barPos = value;
    this._length = this._length + this.LENGHTPREFIX;
    this._end = value + this._length;
  }
}
