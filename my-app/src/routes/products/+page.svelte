<script>
    // import { load } from "./+page.js";
    import Histogram  from "../../components/Histogram.svelte";
    // import { onMount } from "svelte";

    export let data = {}; // initialize

    // Define the key (property name) for categories in the data
    const categoryKey = 'category';

    // Specify the desired width and height of the histogram SVG
    const histogramWidth = 600;
    const histogramHeight = 300;
    console.log(data);
</script>
<p>Back <a href="/">home</a></p>
<div>
    <h1>Sales by Category</h1>
    <ul>
        {#each Object.entries(data.products) as [category, itemsSold]}
            <li>{category}: {itemsSold} items sold</li>
        {/each}
    </ul>
  </div> 

  <!-- make histogram -->

  <div>
    <h1>Product Distribution</h1>
    <Histogram
      data={data}
      width={histogramWidth}
      height={histogramHeight}
    />
  </div>
