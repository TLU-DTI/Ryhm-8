import type { Attributes, Category, Color, Impact } from '.';

export class RiskLog {
  title: string;
  category: Category;
  respond: string;
  attributes: Attributes;

  impact: Impact;
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

    // TODO calculate
    this.impact = 'Low';
    this.color = 'Plain';
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

  constructor() {}
}
