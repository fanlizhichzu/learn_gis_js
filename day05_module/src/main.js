import * as DynamicLoad from './modules/data-loader/dynamic_loader.js';

const loader = new DynamicLoad.DynamicLoader('geojson');
loader.load('https://geojson.cn/api/china/1.6.2/china.json')
    .then(data => {
        console.log('Loaded GeoJSON data:', data);
    })
    .catch(error => {
        console.error('Error loading GeoJSON data:', error);
    });