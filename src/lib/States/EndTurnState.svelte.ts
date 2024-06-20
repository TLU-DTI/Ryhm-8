import { type Rect, SVG } from "@svgdotjs/svg.js";

export const EndTurnState = undefined as unknown as IEndTurn;

export default {
  EndTurnState,
  EndTurn
};

interface IEndTurnID {
  background: string;
  shadow: string;
  strip: string;
  border: string;
  button?: string;
}

export interface IEndTurn {
  toggle: () => void;
  get active(): boolean;
  activeColor: IEndTurnID
  inactiveColor: IEndTurnID
}

export function EndTurn(ID: IEndTurnID): IEndTurn {
  const background = SVG(ID.background) as Rect;
  const shadow = SVG(ID.shadow) as Rect;
  const strip = SVG(ID.strip) as Rect;
  const border = SVG(ID.border) as Rect;
  const button = document.getElementById(ID.button as string) as HTMLButtonElement;

  let active = true;

  const activeColor = {
    background: background.fill() as string,
    shadow: shadow.fill() as string,
    strip: strip.fill() as string,
    border: border.fill() as string
  };

  const inactiveColor = {
    background: '#b0b0b0',
    shadow: '#8e8e8e',
    strip: '#858584',
    border: '#ededed'
  };

  function toggle() {
    if (active) {
      background.fill(inactiveColor.background);
      shadow.fill(inactiveColor.shadow);
      strip.fill(inactiveColor.strip);
      border.fill(inactiveColor.border);
    } else {
      background.fill(activeColor.background);
      shadow.fill(activeColor.shadow);
      strip.fill(activeColor.strip);
      border.fill(activeColor.border);
    }
    active = !active;
    button.disabled = !active;
  }

  return {
    get active() {
      return active;
    },
    toggle,
    activeColor,
    inactiveColor
  };
}