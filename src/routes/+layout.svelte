<script lang="ts">
  import type { Snippet } from 'svelte';
  import RiskCards from '$lib/Cards/RiskCards.svelte';
  import MitigateCards from '$lib/Cards/MitigationCards.svelte';
  import RiskLogs from '$lib/States/RiskLogState.svelte';
  import EndTurn from '$lib/States/EndTurnState.svelte';
  import Objective from '$lib/States/ObjectiveState.svelte';
  import Timeline from '$lib/States/TimelineState.svelte';
  import '../app.css';
  let { children }: { children: Snippet } = $props();

  $effect.pre(() => {
    RiskLogs.RiskLogsState = RiskLogs.RiskLogs();
    RiskCards.RiskCardState = RiskCards.Cards();
    MitigateCards.MitigatCardState = MitigateCards.Cards();
    Objective.ObjectiveCost = Objective.Objective(
      '#Objectives_Cost-progress-bar',
      '#Objectives_Cost-progress-track'
    );

    Objective.ObjectiveQuality = Objective.Objective(
      '#Objectives_Quality-progress-bar',
      '#Objectives_Quality-progress-track'
    );

    Objective.ObjectiveScope = Objective.Objective(
      '#Objectives_Scope-progress-bar',
      '#Objectives_Scope-progress-track'
    );

    Objective.ObjectiveTime = Objective.Objective(
      '#Objectives_Time-progress-bar',
      '#Objectives_Time-progress-track'
    );

    Timeline.TimelineState = Timeline.Timeline(
      '#Timeline_progress-bar',
      '#Timeline_progress-bar-track'
    );

    EndTurn.EndTurnState = EndTurn.EndTurn({
      strip: '#EndTurn_strip',
      background: '#EndTurn_background',
      border: '#EndTurn_border',
      shadow: '#EndTurn_shadow',
      button: 'EndTurn_button'
    });
  });
</script>

{@render children()}
