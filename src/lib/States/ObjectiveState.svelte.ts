import { type Path, type Rect, SVG, Runner } from '@svgdotjs/svg.js';

export const ObjectiveState = {
  Cost: undefined,
  Time: undefined,
  Scope: undefined,
  Quality: undefined
} as unknown as IObjectiveState;

export default {
  ObjectiveState,
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

export interface IObjectiveState {
  Cost: IObjective;
  Time: IObjective;
  Scope: IObjective;
  Quality: IObjective;
}

export function Objective(barID: string, trackID: string): IObjective {
  const track = SVG(trackID) as Path;
  const bar = SVG(barID) as Rect;

  let barPos = 70;

  const trackStartPos = 0;
  const trackEndPos = track.length() / 2;

  const SPEED = 500;

  function move(input: number): Runner {
    if (input + barPos >= trackEndPos) {
      input = trackEndPos - barPos;
    }
    if (Number.isNaN(input)) {
      input = 1;
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
