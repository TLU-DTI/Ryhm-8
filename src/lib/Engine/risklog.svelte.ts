import type { Attributes, Category, Color, Impact } from '.';

export class RiskLog {
  title: string;
  category: Category;
  respond: string;
  attributes: Attributes;

  impact!: Impact;
  private _color!: Color;
  get colorText(): string {
    return this._color;
  }

  private _colorHex!: string;
  get color(): string {
    return this._colorHex;
  }
  set color(value: Color) {
    if (value === 'Red') {
      this._colorHex = '#ea5a3d';
    } else if (value === 'Yellow') {
      this._colorHex = '#f9bd00';
    } else if (value === 'Green') {
      this._colorHex = '#3fa400';
    } else {
      // Plain
      this._colorHex = '#282844';
    }

    this._color = value;
  }

  constructor(title: string, category: Category, respond: string, attributes: Attributes) {
    this.title = title;
    this.category = category;
    this.respond = respond;
    this.attributes = attributes;

    const total = this.attributes.cost + this.attributes.quality + this.attributes.scope + this.attributes.time;

    const IHIGH = 9;
    const IMEDIUM = 4;

    const RED = -9;
    const GREEN = 9;

    const totalABS = Math.abs(total)

    if (totalABS >= IHIGH) {
      this.impact = 'High';
    } else if (totalABS >= IMEDIUM) {
      this.impact = 'Medium';
    } else {
      this.impact = 'Low';
    }

    if (total < RED) {
      this.color = 'Red';
    } else if (total > GREEN) {
      this.color = 'Green';
    } else {
      this.color = 'Yellow';
    }
  }
}

export class RiskLogs {
  private _riskLogs: RiskLog[] = $state([]);
  get riskLogs(): RiskLog[] {
    return this._riskLogs;
  }
  set riskLogs(value: RiskLog[]) {
    this._riskLogs = value;
  }

  add(riskLog: RiskLog) {
    this._riskLogs.unshift(riskLog);
  }

  constructor() { }
}
