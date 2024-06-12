import type { BarMovement } from '.';
import { type Path, type Rect, SVG, Runner } from '@svgdotjs/svg.js';

export const ObjectiveCost = $state() as BarMovement;
export const ObjectiveQuality = $state() as BarMovement;
export const ObjectiveScope = $state() as BarMovement;
export const ObjectiveTime = $state() as BarMovement;

export default {
  ObjectiveCost,
  ObjectiveQuality,
  ObjectiveScope,
  ObjectiveTime,
  barMovement
};

export function barMovement(barID: string, trackID: string): BarMovement {
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
