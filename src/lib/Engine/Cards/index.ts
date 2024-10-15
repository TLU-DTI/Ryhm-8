import { mount, unmount } from "svelte";
import type { Engine } from "../engine.svelte";
import RiskAnimation from "$lib/Components/RiskAnimation.svelte";
import { RiskLog } from "../risklog.svelte";
import { Notification } from '../notification.svelte';

export function handleCardOnCard(engine: Engine, riskID: string, mitiID?: string, ignored = false) {
  const objective = engine.objective;
  const notification = engine.notification;
  const risklog = engine.risklog;
  const mitihand = engine.mitihand;
  const riskhand = engine.riskhand;

  const riskCard = riskhand.riskCards.find(card => card.id === riskID)!;
  const mitiCard = mitihand.mitiCards.find(card => card.id === mitiID)!;

  let scope = 0;
  let quality = 0;
  let time = 0;
  let cost = 0;

  if (ignored) {
    notification.add(new Notification("Manager", `You decided to ignore the following risk: <b>${riskCard.title}</b>`, "Happy"));

    scope = riskCard.attributes.scope;
    quality = riskCard.attributes.quality;
    time = riskCard.attributes.time;
    cost = riskCard.attributes.cost;

    risklog.add(
      new RiskLog(riskCard.title, riskCard.category, "Ignored", {
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

    riskhand.handCards = riskhand.handCards.filter(card => card.id !== riskCard.id);

    riskCard.timeout = engine.riskhand.RISKCARD_TIMEOUT_ROUNDS;
    riskhand.usedCards.push(riskCard);

    const domCard = document.getElementById("RiskCard_" + riskCard.id)!.getBoundingClientRect()

    const a = mount(RiskAnimation, {
      target: document.getElementById("riskanimation")!,
      props: { riskCard, current: domCard }
    });

    // race condition go brr
    setTimeout(() => {
      unmount(a);
    }, 550);

    return;
  }


  // if miticard beats riskcard
  let correct = false;
  riskCard.mitigation?.forEach(id => {
    if (mitiCard?.id === id) {
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

  } else if (false) {
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
  } else {
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

  if (mitihand.usedCards.filter(card => card.id === mitiCard?.id).length == 0) {
    mitihand.addUsed(mitiCard);
  }

  riskhand.handCards = riskhand.handCards.filter(card => card.id !== riskCard.id);
  mitihand.handCards = mitihand.handCards.filter(card => card.id !== mitiCard.id);

  riskCard.timeout = engine.riskhand.RISKCARD_TIMEOUT_ROUNDS;
  riskhand.usedCards.push(riskCard);

  const a = mount(RiskAnimation, {
    target: document.getElementById("riskanimation")!,
    props: { riskCard, current: engine.drag.mousePos }
  });

  // race condition go brr
  setTimeout(() => {
    unmount(a);
  }, 550);
}