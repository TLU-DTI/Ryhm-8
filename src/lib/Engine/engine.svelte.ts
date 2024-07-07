import { EventBus } from "./event.svelte";
import { Objective } from "./objective.svelte";
import { Timeline } from "./timeline.svelte";

export class Engine {
  readonly objective = new Objective();
  readonly timeline = new Timeline();

  readonly event = new EventBus();
  constructor() { }

}