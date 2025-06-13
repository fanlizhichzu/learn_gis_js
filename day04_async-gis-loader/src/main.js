import * as vectorLoader from './services/vectorLoader.js'
import * as wmsLoader from './services/wmsLoader.js'
import fs from 'fs';

// 链式调用
vectorLoader.loadGeoJSON(fs.readFileSync('data/city.json'))
  .then(data => {
    console.log(`成功加载 ${data.features.length} 个要素`);
    return processData(data); // 继续处理
  })
  .catch(err => {
    console.error('加载失败:', err);
    showErrorOnMap(err.message);
  });