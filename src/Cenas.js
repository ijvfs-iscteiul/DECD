// const csv = require('csv-parser');
import csv from 'csv-parser';
import fs from 'fs';
import { convertCSVToArray } from 'convert-csv-to-array';

const pathToBaseFile = 'docs/Formandos_Terminados2018_8.csv'

const convertFile = async () => {
	console.log('Initing script');
	const data = [];
	try {
		await fs.createReadStream(pathToBaseFile, 'utf-8')
			.pipe(csv())
			.on('data', (row) => {
				data.push(row);
			})
			.on('end', () => {
				const cenas = data
				console.log('CSV file successfully processed');
				// try {
				// 	debugger;
				// 	const arrayofArrays = convertCSVToArray(data, {
				// 		type: 'array',
				// 		separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
				// 	});
				// } catch (error) {
				// 	debugger;
				// 	console.error(error)
				// }
			});
	} catch (error) {
		debugger;
		console.error(error);
	}
	const formandosFile = {};


};

convertFile();