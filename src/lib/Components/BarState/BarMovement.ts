import { type Path, type Rect, SVG } from '@svgdotjs/svg.js';

export interface BarMovement {
  movePositive: (input: number) => void;
  moveNegative: (input: number) => void;
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

  function movePositive(input: number) {
    console.log(barPos);
    if (input - barPos >= trackEndPos) {
      input = trackEndPos;
    }
    bar
      .animate(SPEED)
      .ease('<>')
      .during(function (eased: number) {
        const p = track.pointAt(eased * input + barPos);
        bar.center(p.x, p.y);
      });

    if (barPos + input <= trackEndPos) {
      barPos += input;
    } else {
      barPos = trackEndPos;
    }
    console.log(barPos);
  }

  function moveNegative(input: number) {
    console.log(barPos);
    bar
      .animate(SPEED)
      .ease('<>')
      .during(function (eased: number) {
        const p = track.pointAt(eased * -input + barPos);
        bar.center(p.x, p.y);
      });

    if (barPos - input >= trackStartPos) {
      barPos -= input;
    } else {
      barPos = trackStartPos;
    }
    console.log(barPos);
  }

  return {
    trackStartPos,
    trackEndPos,
    barID,
    trackID,
    barPos,
    movePositive,
    moveNegative
  };
}
