<script>
  import { BarChartRace, Slider, Chart } from "svelte-bar-chart-race";
  import { quadOut } from "svelte/easing";
  import { data } from "./data";
  // export let data = {};
  // console.log(data)
</script>

<h1>D.E.A.D dataset</h1>
<p>Share by category of products per year</p>

<BarChartRace
  {data}
  interval={1_500}
  options={{ key: "year" }}
  let:currentValue={value}
  let:setMax
  let:setMin
  let:play
  let:pause
  let:isPlaying
>
<!-- above also contained let:setValue for extra button -->
  <Slider labelText="Year: {value}" />
  <Chart
    --bar-height="40px"
    --bar-margin-bottom="12px"
    animate={{
      easing: quadOut,
      duration: 400,
      delay: 50,
    }}
    let:datum
  >
    <strong>{datum.title}</strong>
    {datum.value.toFixed(1)}%
  </Chart>
  <button on:click={isPlaying ? pause : play}>
    {isPlaying ? "Pause" : "Play"}
  </button>
  <button on:click={setMax}>Set max</button>
  <button on:click={setMin}>Set min</button>
  <!-- <button on:click={() => setValue(2019)}> Set value to 2019 </button> -->
</BarChartRace>
