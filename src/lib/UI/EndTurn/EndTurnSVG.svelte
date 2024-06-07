<script lang="ts">
  import { type Rect, SVG } from '@svgdotjs/svg.js';

  $effect(() => {
    const objSvg = SVG('#EndTurn');

    let background = objSvg.findOne('#EndTurn_background') as Rect;
    let bgColor = background.fill() as string;

    setInterval(() => {
      background.fill('#b0b0b0');
      setTimeout(() => {
        background.fill(bgColor);
      }, 1e3);
    }, 2e3);

    let shadow = objSvg.findOne('#EndTurn_shadow') as Rect;
    let sdColor = shadow.fill() as string;

    setInterval(() => {
      shadow.fill('#8e8e8e');
      setTimeout(() => {
        shadow.fill(sdColor);
      }, 1e3);
    }, 2e3);

    let strip = objSvg.findOne('#EndTurn_strip') as Rect;
    let spColor = strip.fill() as string;

    setInterval(() => {
      strip.fill('#858584');
      setTimeout(() => {
        strip.fill(spColor);
      }, 1e3);
    }, 2e3);

    let border = objSvg.findOne('#EndTurn_border') as Rect;
    let brColor = border.fill() as string;

    setInterval(() => {
      border.fill('#ededed');
      setTimeout(() => {
        border.fill(brColor);
      }, 1e3);
    }, 2e3);
  });
</script>

<svg
  id="EndTurn"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 125.04 32.83"
  style="height: inherit; width: inherit;"
>
  <rect
    id="EndTurn_shadow"
    x="47.41"
    y="-44.79"
    width="30.21"
    height="125.04"
    rx="14.42"
    ry="14.42"
    transform="translate(80.24 -44.79) rotate(90)"
    fill="#00a33b"
    stroke-width="0"
  />
  <rect
    id="EndTurn_border"
    x="47.41"
    y="-47.41"
    width="30.21"
    height="125.04"
    rx="14.42"
    ry="14.42"
    transform="translate(77.62 -47.41) rotate(90)"
    fill="#bdf9c9"
    stroke-width="0"
  />
  <rect
    id="EndTurn_background"
    x="1.9"
    y="1.9"
    width="121.23"
    height="26.41"
    rx="11.39"
    ry="11.39"
    fill="#3ef46f"
    stroke-width="0"
  />
  <rect
    id="EndTurn_strip"
    x="18.84"
    y="30.21"
    width="87.83"
    height="2.62"
    fill="#058854"
    stroke-width="0"
  /><text
    transform="translate(11.5 20.49)"
    fill="#f7ffec"
    font-family="ChangaOne, &apos;Changa One&apos;"
    font-size="15.88"
    stroke="#282844"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width=".51"
  >
    <tspan x="0" y="0">Finish the turn</tspan>
  </text>
</svg>
