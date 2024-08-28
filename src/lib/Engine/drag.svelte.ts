import type { Engine } from "./engine.svelte";
import { RiskLog } from "./risklog.svelte";
import { mount, unmount } from "svelte";
import RiskAnimation from "$lib/Components/RiskAnimation.svelte";

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

  handleDrag() {
    const objective = this._engine.objective;
    const notification = this._engine.notification;
    const risklog = this._engine.risklog;
    const mitihand = this._engine.mitihand;
    const riskhand = this._engine.riskhand;

    const riskCard = riskhand.riskCards.find(card => card.id === this.riskCard?.id)!;
    const mitiCard = mitihand.mitiCards.find(card => card.id === this.mitiCard?.id)!;

    let scope = 0;
    let quality = 0;
    let time = 0;
    let cost = 0;

    // if miticard beats riskcard
    let correct = false;
    riskCard.mitigation?.forEach(id => {
      if (mitiCard.id === id) {
        correct = true;
      }
    })

    if (correct) {
      notification.add({
        name: 'Manager',
        message: `Your choice to use the card <b>${mitiCard.title}</b> on the <b>${riskCard.title}</b> was perfect!`,
        mood: "Happy"
      });

      scope = mitiCard.attributes.scope;
      quality = mitiCard.attributes.quality;
      time = mitiCard.attributes.time;
      cost = mitiCard.attributes.cost;

    } else if (mitiCard.category.includes(riskCard.category)) {
      const rng = Math.random() < 0.5;

      notification.add({
        name: 'Manager',
        message: `Your choice of <b>${mitiCard.title}</b> to risk <b>${riskCard.title}</b> was ${rng
          ? 'okay and you got lucky - the risk did not materialize.'
          : 'okay, but sadly the risk materialized.'
          }`,
        mood: rng ? "Happy" : "UnHappy"
      });

      if (!rng) {
        scope = mitiCard.attributes.scope + riskCard.attributes.scope;
        quality = mitiCard.attributes.quality + riskCard.attributes.quality;
        time = mitiCard.attributes.time + riskCard.attributes.time;
        cost = mitiCard.attributes.cost + riskCard.attributes.cost;
      } else {
        scope = mitiCard.attributes.scope;
        quality = mitiCard.attributes.quality;
        time = mitiCard.attributes.time;
        cost = mitiCard.attributes.cost;
      }

    }
    else {
      notification.add({
        name: 'Manager',
        message: `Your choice of <b>${mitiCard.title}</b> to risk <b>${riskCard.title}</b> was terrible! What have you done!`,
        mood: "UnHappy"
      });

      scope = mitiCard.attributes.scope + riskCard.attributes.scope;
      quality = mitiCard.attributes.quality + riskCard.attributes.quality;
      time = mitiCard.attributes.time + riskCard.attributes.time;
      cost = mitiCard.attributes.cost + riskCard.attributes.cost;
    }

    risklog.add(
      new RiskLog(riskCard.title, riskCard.category, mitiCard.title, {
        scope: scope,
        quality: quality,
        time: time,
        cost: cost
      })
    );

    objective.scope = scope;
    objective.quality = quality;
    objective.time = time;
    objective.cost = cost;

    if (mitihand.usedCards.filter(card => card.id === mitiCard.id).length == 0) {
      mitihand.addUsed(mitiCard);
    }

    riskhand.handCards = riskhand.handCards.filter(card => card.id !== riskCard.id);
    mitihand.handCards = mitihand.handCards.filter(card => card.id !== mitiCard.id);

    const props = $state({ riskCard: riskCard, self: this });
    const a = mount(RiskAnimation, {
      target: document.getElementById("riskanimation")!,
      props: { riskCard, current: this.mousePos }
    });

    // race condition go brr
    setTimeout(() => {
      unmount(a);
    }, 550);

    this.reset();
  }
}

class Node {
  id!: string;
  node!: HTMLElement
}
