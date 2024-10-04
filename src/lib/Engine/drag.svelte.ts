import type { Engine } from "./engine.svelte";
import { handleCardOnCard } from "./Cards";

export class Drag {
  private _engine: Engine;

  dragging: boolean = $state(false);

  mitiCard: Node | undefined = $state();
  riskCard: Node | undefined = $state();

  mousePos = $state({ x: 0, y: 0 });


  constructor(engine: Engine) {
    this._engine = engine;
  }

  onMouseMove(e: MouseEvent) {
    if (this.dragging === false) {
      return;
    };

    this.mousePos = { x: e.clientX, y: e.clientY };
  }

  onMouseUp(e: MouseEvent) {
    if (this.dragging === false) {
      return;
    };

    const sibling = (e.target as HTMLElement).nextElementSibling

    const cardID = sibling?.children?.[0]?.id.split("_")[1];

    if (!cardID) {
      this.reset();
      return;
    }

    this.riskCard = {
      id: cardID,
      node: sibling?.children?.[0] as HTMLElement
    }

    this.dragging = false;
    this.handleDrag();
  }

  dragStart(e: MouseEvent) {
    this.mitiCard = {
      id: (e.target as HTMLElement)?.getElementsByTagName('svg')[0].getAttribute('id')?.split('_')[1] as string,
      node: e.target as HTMLElement
    }

    this.mousePos = { x: e.clientX, y: e.clientY };

    this.dragging = true;
  }

  reset() {
    this.dragging = false;
    this.mitiCard = undefined;
    this.riskCard = undefined;
  }

  // this function handles everything do to with card dragging
  // it's big, ugly and inefficient
  // currently not sure about all the requirements need for calculating objective values
  // also notifications need rework
  handleDrag() {
    handleCardOnCard(this._engine, this.riskCard!.id, this.mitiCard!.id);

    this.reset();
  }
}

class Node {
  id!: string;
  node!: HTMLElement
}
