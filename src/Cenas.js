// const csv = require('csv-parser');
import csv from 'csv-parser';
import fs from 'fs';
import { convertCSVToArray } from 'convert-csv-to-array';
import { path, pick, prop } from 'ramda';

const pathToBaseFileFormandos = 'docs/Formandos_Terminados2018_8.csv';
const pathToBaseFileAntes = 'docs/apura_iscte_lpedidos_ant_8.csv';
const pathToBaseFileApos = 'docs/apura_iscte_lpedidos_apos_8.csv';

const columnsFormandos = ['UTE_ID'];
const columnsAntes = ['UTE_ID'];
const columnsApos = ['UTE_ID'];

const csvObj2JsObj = (keysArg, valuesArg) => {
	const keys = keysArg.split(';');
	const values = valuesArg.split(';');
	const dataProcessed = keys.reduce((acc, key, indexKey)=>{
		const valueAtKeyIndex = values[indexKey];
		return { ...acc, [key]: valueAtKeyIndex};
	}, {});
	return dataProcessed;
};

const processCsvFile = async (pathToBaseFile, resolve, reject) => {
	const data = [];
	let fileDataProcessed = null;
	fs.createReadStream(pathToBaseFile, 'utf-8')
		.pipe(csv())
		.on('data', (row) => {
			data.push(row);
		})
		.on('end', () => {
			try {
				fileDataProcessed = data.map(dataObj=>{
					const keyDataObj = path(['0'], Object.keys(dataObj));
					const keyDataObj2 = path(['1'], Object.keys(dataObj));
					const valueDataObj1 = prop(keyDataObj, dataObj);
					const valueDataObj2 = prop(keyDataObj2, dataObj);
					const valueDataObj = valueDataObj2 ? valueDataObj1 + valueDataObj2 : valueDataObj1;
					const rowResult = csvObj2JsObj(keyDataObj, valueDataObj);
					return rowResult;
				});
				console.log('CSV file: "' + pathToBaseFile + '" successfully processed');
				resolve(fileDataProcessed);
			} catch (error) {
				reject(error);
			}
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
};

const UTE_ID_KEY ='UTE_ID';

const convertFile = async () => {
	console.log('Initing script');
	const data = [];
	try {
		const formandos = await new Promise((resolve, reject)=>processCsvFile(pathToBaseFileFormandos, resolve, reject));
		const antes = await new Promise((resolve, reject)=>processCsvFile(pathToBaseFileAntes, resolve, reject));
		const apos = await new Promise((resolve, reject)=>processCsvFile(pathToBaseFileApos, resolve, reject));
		const formandosProcessed = formandos.reduce((acc,cur)=>{
			Object.keys(cur).indexOf(key=>key.includes(UTE_ID_KEY) || UTE_ID_KEY.includes(key));
			const curUTE_ID = cur[Object.keys(cur)[0]];
			const curMatchAntes = antes.find(antesEntry=> {
				return Object.values(antesEntry).find(val => val === curUTE_ID);
			});
			const curMatchApos = apos.find(aposEntry=> {
				return Object.values(aposEntry).find(val => val === curUTE_ID);
			});
			if (cur && curMatchAntes && curMatchApos) {
				acc.push({ ...cur, ...curMatchAntes, ...curMatchApos });
			}
			return acc;
		}, []);
		console.log('Done processing Csv files');
		// await fs.createReadStream(pathToBaseFileFormandos, 'utf-8')
		// 	.pipe(csv())
		// 	.on('data', (row) => {
		// 		data.push(row);
		// 	})
		// 	.on('end', () => {
		// 		const cenas = data.map(dataObj=>{
		// 			const keyDataObj = path(['0'], Object.keys(dataObj));
		// 			const keyDataObj2 = path(['1'], Object.keys(dataObj));
		// 			const valueDataObj1 = prop(keyDataObj, dataObj);
		// 			const valueDataObj2 = prop(keyDataObj2, dataObj);
		// 			const valueDataObj = valueDataObj2 ? valueDataObj1 + valueDataObj2 : valueDataObj1;
		// 			const rowResult = csvObj2JsObj(keyDataObj, valueDataObj);
		// 			return rowResult;
		// 			console.log('Hello');
		// 		});
		// 		console.log('CSV file successfully processed');
		// 		// try {
		// 		// 	debugger;
		// 		// 	const arrayofArrays = convertCSVToArray(data, {
		// 		// 		type: 'array',
		// 		// 		separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
		// 		// 	});
		// 		// } catch (error) {
		// 		// 	debugger;
		// 		// 	console.error(error)
		// 		// }
		// 	});
	} catch (error) {
		debugger;
		console.error(error);
	}
	const formandosFile = {};


};

convertFile();