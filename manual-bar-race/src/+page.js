
// page.js

import Papa from 'papaparse';

export const load = async ({ fetch }) => {
    try {
        // Load CSV data
        const response = await fetch('http://localhost:8080/summary.csv', {
            headers: {
                'Content-Type': 'text/csv'
            }
        });
        const data = await response.text();

        // Parse CSV data
        const parsedData = Papa.parse(data, { header: true });

        // Process data to calculate sales by category
        let salesByCategory = {};
        parsedData.data.forEach((row) => {
            const category = row[parsedData.meta.fields[0]]; // Access category from the first column
            const year = parseInt(row[parsedData.meta.fields[1]]); // Access year from the second column
            const totalQuantities = parseInt(row[parsedData.meta.fields[2]]); // Access TotalQuantities from the third column
            const overallTotalQuantities = parseInt(row[parsedData.meta.fields[3]]); // Access OverallTotalQuantities from the fourth column

            if (!isNaN(totalQuantities) && !isNaN(year) && !isNaN(overallTotalQuantities)) {
                // Calculate percentage of total quantities sold in this category for the given year
                const percentage = (totalQuantities / overallTotalQuantities) * 100;

                // Initialize category object if not already exists
                if (!salesByCategory[category]) {
                    salesByCategory[category] = {
                        title: category,
                        color: getRandomColor(),
                        values: []
                    };
                }

                // Add year and percentage to values array
                salesByCategory[category].values.push({ year, value: percentage });
            }
        });

        // Convert salesByCategory object into an array of values
        const transformedData = Object.values(salesByCategory);

        return { products: transformedData }; // Return as an object with 'products' property
    } catch (error) {
        console.error('Failed to load and process CSV data:', error);
        return { products: [] }; // Return empty array in case of error
    }
};

// Function to generate random color (for demonstration purposes)
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
