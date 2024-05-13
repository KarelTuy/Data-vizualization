<script>
    // import { load } from "./+page.js";
    import Histogram_years  from "../../components/Histogram_years.svelte";
    // import { onMount } from "svelte";

    export let data = {}; // initialize

    // Define the key (property name) for categories in the data
    const categoryKey = 'category';

    // Specify the desired width and height of the histogram SVG
    const histogramWidth = 600;
    const histogramHeight = 300;
    // console.log(data);

    // Extract categories and counts from the data object
  const categories_years = [];
  const counts = [];

  for (let cat in data.products) {
    for (let year in data.products[cat]) {
      categories_years.push(`${cat}, ${year}`); // Construct category, year string
      counts.push(data.products[cat][year]); // Push sales count
    }
  }

    console.log(categories_years.length);
    console.log(counts.length);
</script>
<p>Back <a href="/">home</a></p>
<div>
    <h1>Total Sales by Category</h1>
    <ul>
        <!-- {#each categories_years as category,i}
            <li>{category}: {counts[i]}</li>
        {/each} -->
        {#each Object.keys(data.products) as category,i}
            <li>{category}: {counts[i*5 + 0] + counts[i*5 + 1] + counts[i*5 + 2] + counts[i*5 + 3] + counts[i*5 + 4]}</li>
        {/each}
    </ul>
  </div> 

  <!-- make histogram -->

  <div>
    <h1>Product Distribution per year</h1>
    <Histogram_years
      data={data}
      width={histogramWidth}
      height={histogramHeight}
    /> 
  </div>
