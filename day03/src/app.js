import { log } from 'console';
import * as geoUtils from './geoUtils.js';
import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('data/city.json'));

const processFeature = (feature) => {
    const {
      geometry: {
        type: geomType,
        coordinates
      },
      properties: {
        name = '未命名',
        population
      }
    } = feature;

    return {
      geomType,
      centroid: coordinates,
      name,
      populationLevel: population > 1000000 ? 'large' : 'small'
    }
}

const features = rawData.features.map(processFeature);
console.table(features.slice(0, 3));


const dirtyData = {
  "features": [
    {
      "type":"Feature",
      "geometry": {/* ... */},
      "properties": {
        "NAME": "上海",
        "POP": 24150000,
        "AREA_KM2":  24150000,
        "extra": {"code":"1234"}
      }
    }
  ]
}

const cleanedData = {
  ...dirtyData,
  features: dirtyData.features.map(({ 
    geometry, 
    properties: { 
      NAME: name, 
      POP: population,
      AREA_KM2: area_km2,
      extra: { code }
    } 
  }) => ({
    geometry,
    properties: {
      name,
      population: population * 10000, // 单位转换
      code,
      density: population / area_km2
    }
  }))
};

log(cleanedData.features);


const feature = {
  properties: {
    government: {
      mayor: {
        name: 'Jane Doe',
        age: 52
      }
    }
  }
};
// 安全访问嵌套属性
const getPropertySafe = (feature, path, defaultValue = null) => {
  return path.split('.').reduce((obj, key) => {
    return obj?.[key] ?? defaultValue;
  }, feature.properties);
};

// 使用示例
const mayorName = getPropertySafe(feature, 'government.mayor.name');
log(mayorName);