<script lang="ts">
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
    category: 'External' | 'Management' | 'Technical' | 'Commercial';
    impact: 'Low' | 'Medium' | 'High';
    color: 'Red' | 'Yellow' | 'Green' | 'Plain';
  } = $props();
</script>

<div class="size-full content-center">
  <RiskLogSvg {risk} {mitigate} {category} {impact} {color} />
</div>
