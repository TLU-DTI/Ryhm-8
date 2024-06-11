import { type Path, type Rect, SVG, Runner } from '@svgdotjs/svg.js';

export interface BarMovement {
  movePositive: (input: number) => Runner;
  moveNegative: (input: number) => Runner;
  trackStartPos: number;
  trackEndPos: number;
  barID: string;
  trackID: string;
  barPos: number;
}

export function barMovement(barID: string, trackID: string): BarMovement {
  const track = SVG(trackID) as Path;
  const bar = SVG(barID) as Rect;

  let barPos = 0;

  const trackStartPos = 0;
  const trackEndPos = track.length() / 2;

  const SPEED = 500;

  function movePositive(input: number): Runner {
    if (input - barPos >= trackEndPos) {
      input = trackEndPos;
    }
    const runner = bar
      .animate(SPEED)
      .ease('<>')
      .during(function (eased: number) {
        const p = track.pointAt(eased * input + barPos);
        bar.center(p.x, p.y);
      })
      .after(() => {
        if (barPos + input <= trackEndPos) {
          barPos += input;
        } else {
          barPos = trackEndPos;
        }
      });

    return runner;
  }

  function moveNegative(input: number) {
    const runner = bar
      .animate(SPEED)
      .ease('<>')
      .during(function (eased: number) {
        const p = track.pointAt(eased * -input + barPos);
        bar.center(p.x, p.y);
      })
      .after(() => {
        if (barPos - input >= trackStartPos) {
          barPos -= input;
        } else {
          barPos = trackStartPos;
        }
      });

    return runner;
  }

  return {
    trackStartPos,
    trackEndPos,
    barID,
    trackID,
    get barPos() {
      return barPos;
    },
    movePositive,
    moveNegative
  };
}
