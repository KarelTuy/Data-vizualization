<script>
  import { scaleBand, scaleLinear } from 'd3-scale';
  import { max } from 'd3-array';

  export let data = {};
  export let width = 600;
  export let height = 300;
  const margins = { left: 50, top: 30, right: 30, bottom: 50 };
  
  // Extract categories and counts from the data object
  const categories_years = [];
  const counts = [];

  for (let cat in data.products) {
    for (let year in data.products[cat]) {
      categories_years.push(`${cat}, ${year}`); // Construct category, year string
      counts.push(data.products[cat][year]); // Push sales count
    }
  }

  // Define scales for x (category) and y (count) axes
  const xScale = scaleBand()
    .domain(categories_years)
    .range([margins.left, width - margins.right])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([0, max(counts) || 0])
    .range([height - margins.bottom, margins.top]);
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
</style>

<svg
  width={width}
  height={height}
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Render bars -->
  {#each categories_years as category, i}
    <g>
      <!-- Calculate x position with dynamic spacing -->
      <rect
        x={xScale(category) + (Math.floor(i / 5) * xScale.bandwidth() * 1.2)}
        y={yScale(counts[i])}
        width={xScale.bandwidth()}
        height={height - margins.bottom - yScale(counts[i])}
      > <!-- Adjust spacing factor (1.2) as needed -->
        <title>{category}: {counts[i]} items sold</title>
      </rect>
    </g>
  {/each}

  <!-- Render x axis -->
<g transform={`translate(0, ${height - margins.bottom})`}>
  {#each categories_years as category, i}
   
      <text
      x={xScale(category) + (Math.floor(i / 5) * xScale.bandwidth() * 1.2)}
        y={20}
        class="x"
        transform={`rotate(-45 ${xScale(category) + (Math.floor(i / 5) * xScale.bandwidth() * 1.2)}, 20)`}
        text-anchor="end"
      >
        {category.split(', ')[1]} <!-- Display only the year -->
      </text>
  {/each}
</g>


  <!-- Render y axis -->
  <g transform={`translate(${margins.left}, 0)`}>
    {#each yScale.ticks() as tick}
      <line
        x1={margins.left - 5}
        y1={yScale(tick)}
        x2={width - margins.right}
        y2={yScale(tick)}
      />
      <text
        x={margins.left - 10}
        y={yScale(tick)}
        class="y"
      >
        {tick}
      </text>
    {/each}
  </g>
</svg>
