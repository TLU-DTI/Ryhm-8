
export class Drag {
  dragging: boolean = false;


  constructor() {
  }

  onMouseMove(e: MouseEvent) {
  }

  onMouseUp(e: MouseEvent) {
    // some reason the dragging is undefined for the first mouseup event
    if (this.dragging === undefined ||
      this.dragging === false
    ) return;

    this.dragging = false;
    console.log("Drag Stop");
  }

  dragStart(e: MouseEvent) {
    this.dragging = true;
    console.log("Drag Start");

  }
}