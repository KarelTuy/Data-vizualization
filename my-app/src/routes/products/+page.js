// import Papa from 'papaparse';

// export const load = async () => {
//     // Load CSV data
//     const response = await fetch('http://localhost:5173/all_products_ordered.csv');
//     const csvData = await response.text();

//     // Parse CSV data
//     const parsedData = Papa.parse(csvData, { header: true });

//     // Process data to aggregate sales by category
//     const salesByCategory = {};
//     parsedData.data.forEach((row) => {
//       const category = row['Category']; // Assuming 'Category' is the column name for category
//       const itemsSold = parseInt(row['Items Sold']); // 'Items Sold' column containing items sold

//       if (!salesByCategory[category]) {
//         salesByCategory[category] = itemsSold;
//       } else {
//         salesByCategory[category] += itemsSold;
//       }
//     });

//     return products: salesByCategory;
  
// };



// page.js

import Papa from 'papaparse';

export const load = async ({ fetch }) => {
    // Load CSV data
    const response = await fetch('http://localhost:5173/all_products_ordered.csv', {
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
        const category = row[parsedData.meta.fields[2]]; // Access category from the second column
        const itemsSold = parseInt(row[parsedData.meta.fields[parsedData.meta.fields.length - 2]]); // Access items sold from the second-to-last column

        if (!isNaN(itemsSold)) { // Check if itemsSold is a valid number
            if (!salesByCategory[category]) {
                salesByCategory[category] = itemsSold;
            } else {
                salesByCategory[category] += itemsSold;
            }
        }
    });

    return { products: salesByCategory }; // Return as an object with 'products' property
};


// import Papa from 'papaparse'

// export const load = async ({ fetch }) => {
//     const responseFlowers = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
//     const dataFlowers = await responseFlowers.json()
//     dataFlowers.forEach((d,i) => { d.id = i, d.species = "Iris " + d.species })


//     const responseFlights = await fetch('https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.csv', {
//       headers: {
//         'Content-Type': 'text/csv'
//     }})
//     let csvFlights = await responseFlights.text()
//     let parsedCsvFlights = Papa.parse(csvFlights, {header: true})

//     return {
//       flowers: dataFlowers,
//       flights: parsedCsvFlights.data
//     }
// }