import { type Path, type Rect, SVG, Runner } from '@svgdotjs/svg.js';

export const TimelineState = undefined as unknown as ITimeline;

export default {
  Timeline,
  TimelineState
};

export interface ITimeline {
  move: (input: number) => Runner;
  next: () => Runner;
  trackStartPos: number;
  trackEndPos: number;
  barID: string;
  trackID: string;
  barPos: number;
  current: IStage;
}

interface IStage {
  stage: number;
  rounds?: IRound[];
  position: number;
}

interface IRound {
  // add to stage position and previous round
  position: number;
}

const TimelineData: IStage[] = [
  {
    stage: 0,
    position: 0
  },
  {
    stage: 1,
    position: 17,
    rounds: [
      {
        position: 27
      },
      {
        position: 29
      },
      {
        position: 29
      },
      {
        position: 29
      }
    ]
  },
  {
    stage: 2,
    position: 35.5,
    rounds: [
      {
        position: 26.5
      },
      {
        position: 29
      }
    ]
  },
  {
    stage: 3,
    position: 36,
    rounds: [
      {
        position: 26
      },
      {
        position: 29
      }
    ]
  },
  {
    stage: 4,
    position: 36
  }
];

export function Timeline(barID: string, trackID: string): ITimeline {
  const track = SVG(trackID) as Path;
  const bar = SVG(barID) as Rect;

  let barPos = 0;

  const current = {
    stage: 0,
    round: 0,
    position: barPos
  };

  const trackStartPos = 0;
  const trackEndPos = track.length() / 2;

  const SPEED = 500;

  function move(input: number): Runner {
    if (input + barPos >= trackEndPos) {
      input = trackEndPos - barPos;
    }
    const runner = bar
      .animate(SPEED)
      .ease('<>')
      .during(function (eased: number) {
        const p = track.pointAt(eased * input + barPos);
        bar.width(p.x - 5.8);
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

  function moveTo(input: number): Runner {
    if (input >= trackEndPos) {
      input = trackEndPos;
    }
    const runner = bar
      .animate(SPEED)
      .ease('>')
      .during(function (eased: number) {
        const p = track.pointAt(eased + input);
        bar.width(p.x - 5.8);
      })
      .after(() => {
        if (input <= trackEndPos) {
          barPos = input;
        } else {
          barPos = trackEndPos;
        }
      });
    return runner;
  }

  function next(): Runner {
    
    if (current.stage === 0) {
      current.stage += 1;
      // barPos = TimelineData[current.stage].position;
      return move(TimelineData[current.stage].position);
    }else if (current.stage >= TimelineData.length || !TimelineData[current.stage].rounds) {
      current.stage = 0;
      // barPos = TimelineData[current.stage].position;
      return moveTo(0);
    } else if (current.round >= TimelineData[current.stage].rounds?.length) {
      current.round = 0;
      current.stage += 1;
      // barPos = TimelineData[current.stage].position;
      return move(TimelineData[current.stage].position);
    }  else if (current.round < TimelineData[current.stage].rounds.length) {
      current.round += 1;
      // barPos += TimelineData[current.stage].rounds[current.round].position;
      return move(TimelineData[current.stage].rounds[current.round - 1].position);
    }
    return move(0);
  }

  return {
    trackStartPos,
    trackEndPos,
    barID,
    trackID,
    current,
    get barPos() {
      return barPos;
    },
    move,
    next
  };
}
