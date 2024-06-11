<script>
  import { barMovement } from '$lib/Components/BarState/BarMovement';
  import ObjectiveState from '$lib/State/Bars/ObjectiveState.svelte';
  import TimelineState from '$lib/State/Bars/TimelineState.svelte';
  import '../app.css';
  let { children } = $props();

  $effect.pre(() => {
    ObjectiveState.ObjectiveCost = barMovement(
      '#Objectives_Cost-progress-bar',
      '#Objectives_Cost-progress-track'
    );

    ObjectiveState.ObjectiveQuality = barMovement(
      '#Objectives_Quality-progress-bar',
      '#Objectives_Quality-progress-track'
    );

    ObjectiveState.ObjectiveScope = barMovement(
      '#Objectives_Scope-progress-bar',
      '#Objectives_Scope-progress-track'
    );

    ObjectiveState.ObjectiveTime = barMovement(
      '#Objectives_Time-progress-bar',
      '#Objectives_Time-progress-track'
    );

    TimelineState.Timeline = barMovement('#Timeline_progress-bar', '#Timeline_progress-bar-track');
  });
</script>

{@render children()}
