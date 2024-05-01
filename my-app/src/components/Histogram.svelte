<!-- Histogram.svelte -->

<script>
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { max } from 'd3-array';
	import Flower from './Flower.svelte';
  
    export let data = {};
    export let width = 600;
    export let height = 300;
    let margins = {"left": 30, "top": 30, "bottom": 30, "right": 30}
  
    // Extract categories and counts from the data object
    const categories = Object.keys(data.products);
    const counts = Object.values(data.products);
  
    // Define scales for x (category) and y (count) axes
    const xScale = scaleBand()
      .domain(categories)
      .range([0, width])
      .padding(0.1);
  
    const yScale = scaleLinear()
      .domain([0, max(counts) || 0])
      .range([height, 0]);
    // $: xScale = scaleLinear().domain(extent(data.map((d) => { return d[x]}))).range([0,400])
    // $: yScale = scaleLinear().domain(extent(data.map((d) => { return d[y]}))).range([0,400])
  
    // Variables to track selected rectangle and tooltip
    // export let selectedRect = undefined;
    // let mouse_x;
    // let mouse_y;

    // const setMousePosition = function(event) {
    //   mouse_x = event.clientX;
    //   mouse_y = event.clientY;
    // }

    // $: xTicks = [4.5,5,5.5,6,6.5,7,7.5]
    // $: yTicks = [2,2.5,3,3.5,4]
  
  </script>
  
  <style>
    svg {
        background-color: whitesmoke;
        margin: 5px;
        padding: 20px;
    }
    rect {
      fill: steelblue;
      cursor: pointer;
    }
    /* rect.selected {
        fill: red;
        fill-opacity: 1;
    } */
    rect:hover {
      fill: red; 
    } 
    line {
      stroke: black;
    }
    text {
      font-size: 10px;
    }
    text.x {
        text-anchor: middle;
    }
    text.y {
        text-anchor: end;
    }
    #tooltip { 
    position: fixed;
    background-color: white;
    padding: 3px;
    border: solid 1px;
    }

    svg.tooltip { 
    margin: 0px;
    padding: 0px;
    }
  </style>
  
  <svg
    width={width}
    height={height+30}
    xmlns="http://www.w3.org/2000/svg"
  >
    {#each categories as category, i}
        <rect
          x={xScale(category)}
          y={yScale(counts[i])}
          width={xScale.bandwidth()}
          height={height - yScale(counts[i])}
        >
        <title>{category}: {counts[i]} items sold</title> <!-- instead of creating custom tooltip...-->
        </rect>
    {/each}
    <!-- x axis -->
    <line x1=0 y1={height} x2={width} y2={height} />
    {#each categories as category, i}
        <text
          x={i*width/8}
          y={height+10}
          class="x"
        >
          {category}
        </text>
    {/each}
    <!-- y axis -->
    <line x1=0 y1={0} x2=0 y2={height} />
    {#each yScale.ticks() as tick}
        <line
          x1=-5
          y1={yScale(tick)}
          x2=5
          y2={yScale(tick)}
        />
        <text
          x={margins.left + 10}
          y={yScale(tick)}
          class="y"
        >
          {tick}
        </text>
    {/each}
  
    <!-- {#if selectedRect != undefined}
        <div id="tooltip" style="left: {mouse_x + 10}px; top: {mouse_y - 10}px">
        <svg class="tooltip" width=20 height=20>
            <g transform="translate(10,10)">
                {selectedRect.category}: {selectedRect.count} items sold
            </g>
        </svg>
        {selectedRect.category}: {selectedRect.count} items sold
        </div>
    {/if} -->
  </svg>
  