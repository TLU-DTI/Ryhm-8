
export class Drag {
  dragging: boolean = $state(false);

  mitiCard: Node | undefined = $state();
  riskCard: Node | undefined = $state();

  mousePos = $state({ x: 0, y: 0 });


  constructor() {
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
}

class Node {
  id!: string;
  node!: HTMLElement
}
