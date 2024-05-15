<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SkillsMap from "./vizualisation.svelte";
  import { polarData } from "./data";
  let polarDataFiltered = polarData;
  let visibility = {};

  const dispatch = createEventDispatcher();

  // Initialize visibility for each empire to
  polarData.forEach(entry => {
    visibility[entry.empire] = true;
  });

  

  // Function to toggle visibility for a specific empire
  function toggleVisibility(empire) {
    // changes visibility to opposite boolean
    visibility[empire] = !visibility[empire];
    // filters polarData to remove entries with invisibled empire
    polarDataFiltered = polarData.filter(entry => visibility[entry.empire]);
    dispatch('visibilityChange', visibility);
    console.log('Visibility Changed:', empire);
    console.log('polarDataFiltered:', polarDataFiltered);
  }

  

  // Dispatch event to notify about visibility change (unecessary?)
  // function handleVisibilityChange() {
  //   dispatch('visibilityChange', visibility);
  // }
</script>

<div id="skillmaps-container">
  <h2>Mean Delivery Times per regions</h2>
  <h4>by Polar Area Chart</h4>
  <div>
    <SkillsMap {polarDataFiltered} title={'empire'} />
  </div>
</div>

<style>
  #skillmaps-container {
    width: 70vw;
  }

  .checkbox-container {
    margin-top: 20px;
  }

  .checkbox-item {
    margin-bottom: 5px;
  }
</style>

<!-- creating a checkbox for each region - on click changes visibility (by default all are visible)-->
<div class="checkbox-container">
  {#each Object.keys(visibility) as empire}
    <div class="checkbox-item">
      <input 
        type="checkbox" 
        checked={visibility[empire]} 
        on:change={() => {
          toggleVisibility(empire);
          console.log('Checkbox clicked:', empire); // Add this line for debugging
        }}
      />
      <label>{empire}</label>
    </div>
  {/each}
</div>

