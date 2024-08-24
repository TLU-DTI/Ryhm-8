<script lang="ts">
  import { Category } from '$lib/Engine';
  import type { MitiCard } from '$lib/Engine/Cards/MitiCard.svelte';

  let { card }: { card: MitiCard } = $props();

  let color: string = $state('#43466e');

  if (card.category[0] === Category.Technical) {
    color = '#3e97ff';
  } else if (card.category[0] === Category.Management) {
    color = '#38963b';
  } else if (card.category[0] === Category.Commercial) {
    color = '#f07d3a';
  } else if (card.category[0] === Category.External) {
    color = '#a152ad';
  }
</script>

<svg
  id="ActionCard_{card.id}"
  class="select-none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 119.02 172.82"
  style="width: inherit; height: inherit;"
>
  <defs>
    <linearGradient
      id="ActionCard_linear-gradient"
      x1="92.44"
      y1="254.69"
      x2="38.75"
      y2="-19.72"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#43466e" />
      <stop offset="1" stop-color="#585e81" />
    </linearGradient>
    <linearGradient
      id="ActionCard_linear-gradient-2"
      x1="-.61"
      y1="-75.39"
      x2="74.56"
      y2="-75.39"
      gradientTransform="translate(22.55 142.13)"
      xlink:href="#ActionCard_linear-gradient"
    />
    <clipPath id="ActionCard_clippath">
      <circle cx="59.52" cy="66.74" r="36.48" fill="none" stroke-width="0" />
    </clipPath>
    <clipPath id="ActionCard_clippath-1">
      <rect x="21.93" y="29.14" width="75.2" height="75.2" fill="none" stroke-width="0" />
    </clipPath>
  </defs>
  <rect
    x="100.46"
    y="37.63"
    width="18.56"
    height="107.34"
    rx="3.09"
    ry="3.09"
    fill={color}
    stroke-width="0"
  />
  <rect y="37.63" width="18.56" height="107.34" rx="3.09" ry="3.09" fill={color} stroke-width="0" />
  <rect
    x="3.65"
    y=".89"
    width="111.73"
    height="171.03"
    rx="12.41"
    ry="12.41"
    fill="url(#ActionCard_linear-gradient)"
    stroke="#6e78b3"
    stroke-miterlimit="10"
    stroke-width="1.78"
  />
  <foreignObject x="15" y="0" width="85" height="26">
    <div
      class="font-['Change One'] z-50 size-full content-center text-center text-[8px] font-bold text-white"
    >
      {card.title}
    </div>
  </foreignObject>
  <foreignObject x="10" y="110" width="100" height="60">
    <div class="size-full text-center font-['Lato'] text-[7px] text-white">
      {card.description}
    </div>
  </foreignObject>
  <g id="Frame">
    <path
      d="M74.92,32.38c-3.04-1.3-8.41-3.15-15.33-3.16-6.99-.01-12.42,1.85-15.47,3.16-3.63,1.88-16.06,8.78-20.51,23.16-1.09,3.52-1.68,7.25-1.68,11.13,0,20.76,16.83,37.59,37.59,37.59,20.76,0,37.59-16.83,37.59-37.59,0-15.27-9.11-28.4-22.19-34.29Z"
      fill="url(#ActionCard_linear-gradient-2)"
      stroke="#6e78b3"
      stroke-miterlimit="10"
      stroke-width="2.4"
    />
  </g>
  <g>
    <g clip-path="url(#ActionCard_clippath)">
      <g clip-path="url(#ActionCard_clippath-1)">
        <image
          width="1024"
          height="1024"
          transform="translate(21.93 29.14) scale(.07)"
          xlink:href="/assets/Webp/MitigationCards/{card.id}.webp"
        />
      </g>
    </g>
  </g>
</svg>
