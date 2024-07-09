<script lang="ts">
  import ExternalSVG from './ExternalSVG.svelte';
  import ManagementSVG from './ManagementSVG.svelte';
  import TechnicalSVG from './TechnicalSVG.svelte';
  import CommercialSVG from './CommercialSVG.svelte';
  import type { Category } from '$lib/Engine/risklog.svelte';

  let {
    category
  }: {
    category: Category;
  } = $props();
</script>

{#if category === 'External'}
  <div class="ml-2 size-10/12">
    <ExternalSVG />
  </div>
{:else if category === 'Management'}
  <ManagementSVG />
{:else if category === 'Technical'}
  <div class="ml-2 size-10/12">
    <TechnicalSVG />
  </div>
{:else if category === 'Commercial'}
  <CommercialSVG />
{/if}
