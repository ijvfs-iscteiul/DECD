const convertFile = () => {

    const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

    const { convertCSVToArray } = require('convert-csv-to-array');
   
   const formandosFile = {}

    const arrayofArrays = convertCSVToArray(data, {
         type: 'array',
        separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
    });

}