<script lang="ts">
    interface LegendItem {
    text: string;
    fillStyle: string;
}
    import { onMount, afterUpdate } from 'svelte';
    import Chart from 'chart.js/auto';
    import { polarData } from './data';

    export let polarDataFiltered;
    let polarChart;
    let labels;
    let ratings;
    let selectedYear = '19'; // Default year

    const empireColors: Record<string, string> = {
        'Amnian Empire': 'rgba(255, 99, 132, 0.7)',
        'Bloodlands Empire': 'rgba(54, 162, 235, 0.7)',
        'Calim Empire': 'rgba(255, 206, 86, 0.7)',
        'Dwarven Empire': 'rgba(75, 192, 192, 0.7)',
        'Eastern Empire': 'rgba(153, 102, 255, 0.7)',
        'Halruaan Empire': 'rgba(255, 159, 64, 0.7)',
        'New Neverwinter Empire': 'rgba(255, 99, 132, 0.7)', // Example color, replace with desired color
        'None Empire': 'rgba(54, 162, 235, 0.7)', // Example color, replace with desired color
        'Old Empire': 'rgba(255, 206, 86, 0.7)', // Example color, replace with desired color
        'Purple Dragon Empire': 'rgba(75, 192, 192, 0.7)', // Example color, replace with desired color
        'Southern Empire': 'rgba(153, 102, 255, 0.7)', // Example color, replace with desired color
        'Thayan Empire': 'rgba(255, 159, 64, 0.7)', // Example color, replace with desired color
        'United Moonshae Empire': 'rgba(255, 99, 132, 0.7)', // Example color, replace with desired color
        'Waterdhavian Empire': 'rgba(54, 162, 235, 0.7)', // Example color, replace with desired color
        'Western Empire': 'rgba(255, 206, 86, 0.7)' // Example color, replace with desired color
};

    onMount(() => {
        updateChartData();

        const canvas = document.getElementById('polarChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        // defining chart
        polarChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [{
                    // defining
                    label: `Mean delivery time (days) - 20${selectedYear}`,
                    data: ratings,
                    backgroundColor: labels.map(label => empireColors[label.split(' - ')[1]]),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        ticks: {
                            stepSize: 1, // Adjust the stepSize
                        },
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            generateLabels: function(chart): LegendItem[] {
                                const uniqueEmpires = new Set(labels.map(label => label.split(' - ')[1]));
                                return Array.from(uniqueEmpires).map(empire => {
                                    return {
                                        text: empire as string, // Cast empire to string
                                        fillStyle: empireColors[empire] as string // Cast empireColors[empire] to string
                                    };
                                });
                            }
                        }
                    }
                }
            }
        });

        createYearSelector();
    });
    afterUpdate(() => {
    updateChartData();
    updateChart();
    });

    function updateChartData() {
        const filteredData = polarDataFiltered.filter(entry => entry.date.endsWith(selectedYear));
        labels = filteredData.map(entry => `${entry.date} - ${entry.empire}`);
        ratings = filteredData.map(entry => entry.rating);
        console.log('Filtered Data:', filteredData);
    }

    function createYearSelector() {
        const yearSelector = document.getElementById('yearSelector') as HTMLSelectElement;
        yearSelector.addEventListener('change', function() {
            selectedYear = this.value;
            updateChartData();
            updateChart();
        });
    }

    function updateChart() {
        polarChart.data.datasets[0].label = `Mean delivery time (days) - 20${selectedYear}`;
        polarChart.data.labels = labels;
        polarChart.data.datasets[0].data = ratings;
        polarChart.data.datasets[0].backgroundColor = labels.map(label => empireColors[label.split(' - ')[1]]); // Update backgroundColor
        polarChart.data.datasets[0].borderWidth = 1; // Reset borderWidth
        polarChart.update();
    }
</script>

<div>
    <select id="yearSelector">
        <option value="19">2019</option>
        <option value="20">2020</option>
        <option value="21">2021</option>
        <option value="22">2022</option>
        <option value="23">2023</option>
    </select>
</div>

<canvas id="polarChart" width="400" height="400"></canvas>
