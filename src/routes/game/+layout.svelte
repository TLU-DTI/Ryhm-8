<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import RiskCards from '$lib/Cards/RiskCards.svelte';
  import MitigateCards from '$lib/Cards/MitigationCards.svelte';
  import RiskLogs from '$lib/States/RiskLogState.svelte';
  import EndTurn from '$lib/States/EndTurnState.svelte';
  import Objective from '$lib/States/ObjectiveState.svelte';
  import Timeline from '$lib/States/TimelineState.svelte';
  import '../../app.css';
  import Notification from '$lib/States/NotificationState.svelte';
  let { children }: { children: Snippet } = $props();

  $effect.pre(() => {
    RiskLogs.RiskLogsState = RiskLogs.RiskLogs();
    setContext('RiskLogs', RiskLogs.RiskLogsState);

    RiskCards.RiskCardState = RiskCards.RiskCards();
    setContext('RiskCards', RiskCards.RiskCardState);

    MitigateCards.MitigatCardState = MitigateCards.Cards();
    setContext('MitigateCards', MitigateCards.MitigatCardState);

    Notification.NotificationState = Notification.Notification();
    setContext('Notification', Notification.NotificationState);

    Objective.ObjectiveState.Cost = Objective.Objective(
      '#Objectives_Cost-progress-bar',
      '#Objectives_Cost-progress-track'
    );

    Objective.ObjectiveState.Quality = Objective.Objective(
      '#Objectives_Quality-progress-bar',
      '#Objectives_Quality-progress-track'
    );

    Objective.ObjectiveState.Scope = Objective.Objective(
      '#Objectives_Scope-progress-bar',
      '#Objectives_Scope-progress-track'
    );

    Objective.ObjectiveState.Time = Objective.Objective(
      '#Objectives_Time-progress-bar',
      '#Objectives_Time-progress-track'
    );
    setContext('Objectives', Objective.ObjectiveState);

    Timeline.TimelineState = Timeline.Timeline(
      '#Timeline_progress-bar',
      '#Timeline_progress-bar-track'
    );
    setContext('Timeline', Timeline.TimelineState);

    EndTurn.EndTurnState = EndTurn.EndTurn({
      strip: '#EndTurn_strip',
      background: '#EndTurn_background',
      border: '#EndTurn_border',
      shadow: '#EndTurn_shadow',
      button: 'EndTurn_button'
    });
    setContext('EndTurn', EndTurn.EndTurnState);
  });
</script>

{@render children()}
