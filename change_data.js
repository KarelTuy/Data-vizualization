const fs = require('fs');
const csv = require('csv-parser');

const inputData = []; // Array to store the parsed CSV data

// Read the CSV file
fs.createReadStream('\mean_delivery_times.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Process each row of the CSV file
    const region = row.Region;
    const monthAbbreviation = row.month.slice(0, 3); // Get first 3 letters of the month
    const yearLastTwoDigits = row.year.slice(-2); // Get last 2 digits of the year
    const time = `${monthAbbreviation} ${yearLastTwoDigits}`;
    const meanDeliveryTime = parseFloat(parseFloat(row.mean_delivery_time).toFixed(3));
    

    // Check if the time already exists in the inputData array
    const existingDataIndex = inputData.findIndex(item => item.Time === time);

    if (existingDataIndex !== -1) {
      // If the time exists, add mean delivery time for the region
      inputData[existingDataIndex][region] = meanDeliveryTime;
    } else {
      // If the time doesn't exist, create a new entry
      const newData = { Time: time };
      newData[region] = meanDeliveryTime;
      inputData.push(newData);
    }
  })
  // .on('end', () => {
  //   // Write the transformed data into a JavaScript file
  //   const jsCode = `const data = ${JSON.stringify(inputData, null, 2)};\n\nmodule.exports = data;`;
  //   fs.writeFile('output_data.js', jsCode, (err) => {
  //     if (err) throw err;
  //     console.log('The JavaScript file has been saved!');
  //   });
  // });
  .on('end', () => {
    // Write the transformed data into a JavaScript file
    const jsCode = generateJavaScriptCode(inputData);
    fs.writeFile('output_data.js', jsCode, (err) => {
      if (err) throw err;
      console.log('The JavaScript file has been saved!');
    });
  });

  function generateJavaScriptCode(data) {
    let jsCode = 'const data = [\n';
    data.forEach(entry => {
      jsCode += `  { Time: '${entry.Time}',\n`;
      for (const key in entry) {
        if (key !== 'Time') {
          jsCode += `    '${key}': ${entry[key]},\n`;
        }
      }
      jsCode += '  },\n';
    });
    jsCode += '];\n\nmodule.exports = data;';
    return jsCode;
  }

