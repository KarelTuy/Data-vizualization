<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SkillsMap from "./vizualisation.svelte";
  import { polarData } from "./data";
  let polarDataFiltered = polarData;
  let visibility = {};

  // Initialize visibility for each empire
  polarData.forEach(entry => {
    visibility[entry.empire] = true;
  });

  // Function to toggle visibility for a specific empire
  function toggleVisibility(empire) {
    visibility[empire] = !visibility[empire];
    polarDataFiltered = polarData.filter(entry => visibility[entry.empire]);
    dispatch('visibilityChange', visibility);
  }

  const dispatch = createEventDispatcher();

  // Dispatch event to notify about visibility change
  function handleVisibilityChange() {
    dispatch('visibilityChange', visibility);
  }
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

<div class="checkbox-container">
  {#each Object.keys(visibility) as empire}
    <div class="checkbox-item">
      <input type="checkbox" checked={visibility[empire]} on:change={() => toggleVisibility(empire)} />
      <label>{empire}</label>
    </div>
  {/each}
</div>
