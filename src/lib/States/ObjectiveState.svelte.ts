import { type Path, type Rect, SVG, Runner } from '@svgdotjs/svg.js';

export const ObjectiveCost = $state() as IObjective;
export const ObjectiveQuality = $state() as IObjective;
export const ObjectiveScope = $state() as IObjective;
export const ObjectiveTime = $state() as IObjective;

export default {
  ObjectiveCost,
  ObjectiveQuality,
  ObjectiveScope,
  ObjectiveTime,
  Objective
};

interface IObjective {
  move: (input: number) => Runner;
  trackStartPos: number;
  trackEndPos: number;
  barID: string;
  trackID: string;
  barPos: number;
}

export function Objective(barID: string, trackID: string): IObjective {
  const track = SVG(trackID) as Path;
  const bar = SVG(barID) as Rect;

  let barPos = 0;

  const trackStartPos = 0;
  const trackEndPos = track.length() / 2;

  const SPEED = 500;

  function move(input: number): Runner {
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

        if (barPos < trackStartPos) {
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
    move
  };
}
