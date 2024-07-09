<script lang="ts">
  import type { Category, Color, Impact } from '$lib/Engine/risklog.svelte';
  import RiskLogSvg from './RiskLogSVG.svelte';

  let {
    risk,
    mitigate,
    category,
    impact,
    color
  }: {
    risk: string;
    mitigate: string;
    category: Category;
    impact: Impact;
    color: string;
  } = $props();
</script>

<div class="size-full content-center">
  <RiskLogSvg {risk} {mitigate} {category} {impact} {color} />
</div>
