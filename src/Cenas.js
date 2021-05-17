// const csv = require('csv-parser');
import csv from 'csv-parser';
import fs from 'fs';
import { convertCSVToArray } from 'convert-csv-to-array';

const convertFile = async () => {
	console.log('Initing script');
	debugger;
	await fs.createReadStream('data.csv')
		.pipe(streamedData => {
			try {
				debugger;
				const pow = csv(streamedData);
				debugger;
				return pow;
			} catch (error) {
				debugger;
				console.error(error);
			}
		})
		.on('data', (row) => {
			debugger;
			console.log(row);
		})
		.on('end', () => {
			debugger;
			console.log('CSV file successfully processed');
		});
	debugger;
	const formandosFile = {};

	/* const arrayofArrays = convertCSVToArray(data, {
		type: 'array',
		separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
	}); */

};

convertFile();