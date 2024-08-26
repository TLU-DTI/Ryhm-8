
export class Drag {
  dragging: boolean = $state(false);


  constructor() {
  }

  onMouseMove(e: MouseEvent) {
  }

  onMouseUp(e: MouseEvent) {
    if (this.dragging === false) {
      return;
    };

    this.dragging = false;
  }

  dragStart(e: MouseEvent) {
    this.dragging = true;
  }
}