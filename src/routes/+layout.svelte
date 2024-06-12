<script>
  import EndTurnState from '$lib/States/EndTurnState.svelte';
  import ObjectiveState from '$lib/States/ObjectiveState.svelte';
  import TimelineState from '$lib/States/TimelineState.svelte';
  import '../app.css';
  let { children } = $props();

  $effect.pre(() => {
    ObjectiveState.ObjectiveCost = ObjectiveState.Objective(
      '#Objectives_Cost-progress-bar',
      '#Objectives_Cost-progress-track'
    );

    ObjectiveState.ObjectiveQuality = ObjectiveState.Objective(
      '#Objectives_Quality-progress-bar',
      '#Objectives_Quality-progress-track'
    );

    ObjectiveState.ObjectiveScope = ObjectiveState.Objective(
      '#Objectives_Scope-progress-bar',
      '#Objectives_Scope-progress-track'
    );

    ObjectiveState.ObjectiveTime = ObjectiveState.Objective(
      '#Objectives_Time-progress-bar',
      '#Objectives_Time-progress-track'
    );

    TimelineState.TimelineState = TimelineState.Timeline(
      '#Timeline_progress-bar',
      '#Timeline_progress-bar-track'
    );

    EndTurnState.EndTurnState = EndTurnState.EndTurn({
      strip: '#EndTurn_strip',
      background: '#EndTurn_background',
      border: '#EndTurn_border',
      shadow: '#EndTurn_shadow'
    });
  });
</script>

{@render children()}
