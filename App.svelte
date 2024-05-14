<script>
  import { arc, max, scaleBand, scaleOrdinal, scaleRadial, stack, } from "d3";
  import data1 from './data.js'; // Import your data file
	let data = data1.slice(0,12);
	
  const keys = Object.keys(data[0]);
  const groupId = 'Time'; // Assuming 'Time' is the key for each data point
  const colorRange = ['#a76710','#977b54','#98abc5','#8a89a6','#7b6888','#6b486b','#a05d56','#d0743c','#ff8c00','#33ffe3', '#33ff42','#f0ff33','#6c0966','#6c2309'];



  // Set up reactive data and scales
  let reactiveData = data;
  const innerRadius = 250;
  const outerRadius = 600;
  const varFontSize = 8;

 const yScale = scaleRadial()
    .domain([0, max(data, d => {
        return keys.slice(1).reduce((acc, key) => acc + d[key], 0);
    })])
    .range([innerRadius, outerRadius]);



  const zScale = scaleOrdinal().domain(keys.slice(1)).range(colorRange);

  const reactiveXScale = scaleBand()
    .domain(reactiveData.map(d => d[groupId]))
    .range([0, 2 * Math.PI])
    .align(0);

  const d3arc = arc()
    .innerRadius((d) => yScale(d[0]))
    .outerRadius((d) => yScale(d[1]))
    .startAngle((d) => reactiveXScale(d.data[groupId]))
    .endAngle((d) => reactiveXScale(d.data[groupId]) + reactiveXScale.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);

  let hoveredBarData = null;

  // Function to handle mouseover event
  function handleMouseOver(d) {
    hoveredBarData = d.data;
  }

  // Function to handle mouseout event
  function handleMouseOut() {
    hoveredBarData = null;
  }
	
</script>

<svg
  class="radial-chart"
  viewBox="{-outerRadius} {-outerRadius} {2.5 * outerRadius} {2.5 * outerRadius}"
  font-size="{varFontSize}px"
>


  

	
  <g class="chart-render">
    {#each stack().keys(keys.slice(1))(reactiveData) as cData}
      <g fill={zScale(cData.key)}>
        {#each cData as d, i}
              <path 
                d={d3arc(d)} 
								role="button"
				        tabindex={i} 
				        on:mouseover={() => handleMouseOver(d)} 
				        on:mouseout={handleMouseOut}
				        on:focus={() => handleMouseOver(d)} 
				        on:blur={handleMouseOut}
              />
        {/each}
      </g>
    {/each}
  </g>
	

  <!-- Other SVG elements for axis, legends, etc. -->
	<g class="legend">
    {#each keys.slice(1).reverse() as lData, i}
      <g transform="translate(-40,{(i - (keys.length - 1) / 2) * 20})">
        <circle r={8}  fill={zScale(lData)} />
        <text x="20" y="10" dx="10" dy="0.1em" font-size="20">{lData}</text>
      </g>
    {/each}
  </g>
</svg>

