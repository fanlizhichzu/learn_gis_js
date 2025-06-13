import * as geoUtils from './geoUtils.js';
import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('data/city.json'));

const megaCities = geoUtils.filterByPopulation(rawData, 1000);
console.log('千万人口城市:', megaCities.features.map(f => f.perpersons.name));

const sortByGDP = geoUtils.sortByProperties(rawData, 'gdp', false);
console.log('GDP排名:', sortByGDP.features.map(f => ({
    name: f.properties.name,
    gdp: f.properties.GDP
})));

const avgGDP = geoUtils.calculateAverageGDP(rawData);
const formattedGDP = typeof avgGDP === 'number' 
  ? avgGDP.toFixed(2) 
  : '数据异常';
console.log(`平均GDP: ${formattedGDP}亿元`);
const value = Number(avgGDP) || 0;
console.log(`平均GDP: ${value.toFixed(2)}亿元`);