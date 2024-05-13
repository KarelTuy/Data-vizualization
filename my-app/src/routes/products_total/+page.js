
// page.js

import Papa from 'papaparse';

// export const load = async ({ fetch }) => {
//     // Load CSV data
//     const response = await fetch('http://localhost:5173/all_products_ordered.csv', {
//         headers: {
//             'Content-Type': 'text/csv'
//         }
//     });
//     const data = await response.text();

//     // Parse CSV data
//     const parsedData = Papa.parse(data, { header: true });

//     // Process data to calculate sales by category
//     let salesByCategory = {};
//     parsedData.data.forEach((row) => {
//         const category = row[parsedData.meta.fields[2]]; // Access category from the second column
//         const itemsSold = parseInt(row[parsedData.meta.fields[parsedData.meta.fields.length - 2]]); // Access items sold from the second-to-last column

//         if (!isNaN(itemsSold)) { // Check if itemsSold is a valid number
//             if (!salesByCategory[category]) {
//                 salesByCategory[category] = itemsSold;
//             } else {
//                 salesByCategory[category] += itemsSold;
//             }
//         }
//     });

//     return { products: salesByCategory }; // Return as an object with 'products' property
// };


export const load = async ({ fetch }) => {
    // Load CSV data
    const response = await fetch('http://localhost:5173/summary.csv', {
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


// export const load = async ({ fetch }) => {
//     // Load CSV data
//     const response = await fetch('http://localhost:5173/summary.csv', {
//         headers: {
//             'Content-Type': 'text/csv'
//         }
//     });
//     const data = await response.text(); 

//     // Parse CSV data
//     const parsedData = Papa.parse(data, { header: true });

//     // Process data to calculate sales by category
//     let salesByCategory = {};
//     parsedData.data.forEach((row) => {
//         const category = row[parsedData.meta.fields[0]]; // Access category from the first column
//         const year = parseInt(row[parsedData.meta.fields[1]]); // Access year from the second column
//         // console.log("year:");
//         // console.log(year);
//         const itemsSold = parseInt(row[parsedData.meta.fields[2]]); // Access items sold from the second-to-last column

//         // data = {catogory: {year: itemsSold}}

//         if (!isNaN(itemsSold) && !isNaN(year)) { // Check if itemsSold or year is a valid number
//             if (!salesByCategory[category]){
//                 salesByCategory[category] = {};
//             }
//             if (!salesByCategory[category][year]) {
//                 salesByCategory[category][year] = itemsSold;
//             } 
//             else {
//                 salesByCategory[category][year] += itemsSold;
//             }
//         }
//     });

//     return { products: salesByCategory }; // Return as an object with 'products' property
// };