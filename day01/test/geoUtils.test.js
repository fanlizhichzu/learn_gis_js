import { 
    filterByPopulation, 
    sortByProperty, 
    calculateAverageGDP 
  } from '../src/geoUtils.js';
  
  const testData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "CityA", population: 800000, GDP: 100 },
        geometry: { type: "Point", coordinates: [0, 0] }
      },
      {
        type: "Feature",
        properties: { name: "CityB", population: 1500000, GDP: 200 },
        geometry: { type: "Point", coordinates: [1, 1] }
      }
    ]
  };
  
  // 测试过滤器
  test('filterByPopulation: 应返回人口超过阈值的城市', () => {
    const result = filterByPopulation(testData, 100);
    expect(result.features.length).toBe(1);
    expect(result.features[0].properties.name).toBe("CityB");
  });
  
  // 测试排序
  test('sortByProperty: 应按GDP降序排序', () => {
    const result = sortByProperty(testData, 'GDP', false);
    expect(result.features[0].properties.name).toBe("CityB");
  });
  
  // 测试计算
  test('calculateAverageGDP: 应正确计算平均值', () => {
    const result = calculateAverageGDP(testData);
    expect(result).toBe(150);
  });