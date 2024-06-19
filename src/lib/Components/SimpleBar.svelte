<script lang="ts">
  import type { SimpleBarOptions } from 'simplebar-core';
  import SimpleBar from 'simplebar';
  import { type Snippet } from 'svelte';

  let {
    children,

    options = { autoHide: false },
    contentClass = '',
    element = $bindable(undefined),

    styleProp = undefined,
    classProp = undefined
  }: {
    children: Snippet;

    options?: SimpleBarOptions;
    contentClass?: string;
    element?: HTMLDivElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    styleProp?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classProp?: any;
  } = $props();

  let simplebar: SimpleBar;

  $effect(() => {
    simplebar = new SimpleBar(element as HTMLDivElement, options);

    return () => simplebar?.unMount();
  });
  const style = styleProp ?? (classProp ? undefined : 'height:100%');
</script>

<div class={classProp} bind:this={element} {style}>
  <div class="simplebar-wrapper">
    <div class="simplebar-height-auto-observer-wrapper">
      <div class="simplebar-height-auto-observer"></div>
    </div>
    <div class="simplebar-mask">
      <div class="simplebar-offset">
        <div class="simplebar-content-wrapper">
          <div class="simplebar-content {contentClass}" style="margin-right: 11px;">
            {@render children()}
          </div>
        </div>
      </div>
    </div>
    <div class="simplebar-placeholder"></div>
  </div>
  <div class="simplebar-track simplebar-horizontal">
    <div class="simplebar-scrollbar"></div>
  </div>
  <div class="simplebar-track simplebar-vertical">
    <div class="simplebar-scrollbar"></div>
  </div>
</div>

<style>
  @import 'simplebar/dist/simplebar.css';

  .simplebar-scrollbar::before {
    background-color: var(--scrollbar-color);
  }

  .simplebar-track {
    background-color: var(--scrollbar-track);
    border-radius: 10px;
  }
</style>
