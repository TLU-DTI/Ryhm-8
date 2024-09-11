<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let {
    checked = $bindable(false),
    disabled = $bindable(false),
    defaultChecked = $bindable(false),
    onChange,
    onFocus,
    onBlur,
    name = $bindable('svelte-toggler-name'),
    value = $bindable('svelte-toggler-value'),
    id = $bindable('svelte-toggler-id'),
    ariaLabelledBy = $bindable(''),
    ariaLabel = $bindable(''),
    toggleThreshold = $bindable(0.5)
  }: {
    checked: boolean;
    disabled: boolean;
    defaultChecked: boolean;
    onChange: (event: MouseEvent | TouchEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    name: string;
    value: string;
    id: string;
    ariaLabelledBy: string;
    ariaLabel: string;
    toggleThreshold: number;
  } = $props();

  let startX: number;
  let isActive: boolean;
  let isChecked = $state(!!(checked || defaultChecked));
  let isMoved: boolean;
  let hasFocus: boolean = $state(false);
  let checkbox: HTMLDivElement;
  let checkboxLeft: number;
  let checkboxRight: number;
  let checkboxWidth: number;

  const handleFocus = (event: FocusEvent) => {
    if (onFocus) {
      onFocus(event);
    }
    hasFocus = true;
  };
  const handleBlur = (event: FocusEvent) => {
    if (onBlur) {
      onBlur(event);
    }
    hasFocus = false;
  };

  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      return;
    }
    if (event.target !== checkbox || isMoved) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      onChange(event);
      if (isChecked === false) {
        isChecked = true;
        checked = true;
      } else {
        isChecked = false;
        checked = false;
      }
      dispatch('toggle', isChecked);
    }
  };

  const getXCords = (event: MouseEvent | TouchEvent) => {
    if (event) {
      // @ts-ignore
      const changedTouches = event?.changedTouches;
      if (changedTouches && changedTouches.length > 0) {
        const touch = changedTouches[0];
        return touch.clientX;
      }
      // @ts-ignore
      const pageX = event.pageX;
      if (pageX !== undefined) {
        // @ts-ignore
        return pageX;
      }
    }
    return 0;
  };

  onMount(() => {
    const checkboxCords = checkbox.getBoundingClientRect();
    const { left, width, right } = checkboxCords;
    checkboxLeft = left;
    checkboxRight = right;
    checkboxWidth = width;
  });

  const handleTouchStart = (event: TouchEvent) => {
    isMoved = true;
    startX = getXCords(event);
  };
  const handleTouchMove = (event: TouchEvent) => {
    const currentX = getXCords(event);
    let threshold = checkboxLeft + checkboxWidth * toggleThreshold;
    let thresholdRight = checkboxRight - checkboxWidth * toggleThreshold;
    if (currentX > threshold && !isChecked && currentX > startX) {
      isChecked = true;
      checked = true;
      startX = currentX;
    } else if (currentX < thresholdRight && isChecked && currentX < startX) {
      isChecked = false;
      checked = false;
      startX = currentX;
    }
    dispatch('toggle', isChecked);
  };
  const handleTouchEnd = (event: TouchEvent) => {
    isMoved = false;
    checkbox.click();
    checkbox.focus();
    onChange(event);
    startX = getXCords(event);
  };
</script>

<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  on:click={handleClick}
  bind:this={checkbox}
  role="button"
  class="svelte-toggle"
  class:svelte-toggle--checked={isChecked}
  class:svelte-toggle--focus={hasFocus}
  class:svelte-toggle--disabled={disabled}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
>
  <div class="svelte-toggle--track">
    <div class="svelte-toggle--track-checked"></div>
    <div class="svelte-toggle--track-unchecked"></div>
  </div>
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <div class="svelte-toggle--thumb" />
  <input
    type="checkbox"
    {name}
    {value}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    checked={isChecked}
    {disabled}
    {id}
    on:focus={handleFocus}
    on:blur={handleBlur}
    class="svelte-toggle--screen-reader"
  />
</div>

<style>
  :global(.svelte-toggle) {
    touch-action: pan-x;
    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  .svelte-toggle--track {
    width: 50px;
    height: 24px;
    padding: 0;
    border-radius: 30px;
    background-color: #4d4d4d;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .svelte-toggle--screen-reader {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .svelte-toggle:hover:not(.svelte-toggle--disabled) .svelte-toggle--track {
    background-color: #000000;
  }

  .svelte-toggle--checked .svelte-toggle--track {
    background-color: #19ab27;
  }

  .svelte-toggle--checked:hover:not(.svelte-toggle--disabled) .svelte-toggle--track {
    background-color: #128d15;
  }

  .svelte-toggle--track-checked {
    position: absolute;
    width: 14px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    left: 8px;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .svelte-toggle--checked .svelte-toggle--track-checked {
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .svelte-toggle--track-unchecked {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    right: 10px;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .svelte-toggle--checked .svelte-toggle--track-unchecked {
    opacity: 0;
  }

  .svelte-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    -webkit-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  .svelte-toggle--thumb {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border: 1px solid #4d4d4d;
    border-radius: 50%;
    background-color: #fafafa;
  }

  .svelte-toggle--checked .svelte-toggle--thumb {
    left: 28px;
    border-color: #19ab27;
  }

  .svelte-toggle--focus .svelte-toggle--thumb {
    -webkit-box-shadow: 0px 0px 3px 2px #0099e0;
    -moz-box-shadow: 0px 0px 3px 2px #0099e0;
    box-shadow: 0px 0px 2px 3px #0099e0;
  }

  .svelte-toggle:active:not(.svelte-toggle--disabled) .svelte-toggle--thumb {
    -webkit-box-shadow: 0px 0px 5px 5px #0099e0;
    -moz-box-shadow: 0px 0px 5px 5px #0099e0;
    box-shadow: 0px 0px 5px 5px #0099e0;
  }
</style>
