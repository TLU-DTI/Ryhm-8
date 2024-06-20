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

  import '../app.css';
</script>

{@render children()}