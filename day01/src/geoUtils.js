/**
 * GIS数据处理工具库
 * @module geoUtils
 */


/**
 * 过滤人口超过指定值的城市
 * @param {cities} cities 输入GeoJSON数据
 * @param {threshold} threshold 人口阈值(万)
 * @returns {cities} 过滤后的GeoJSON
 */
export function filterByPopulation(cities, threshold = 1000) {
    if (!cities?.features) {
        throw new Error('Invalid cities data');
    }
    return {
        ...cities,
        features: cities.features.filter(
            city => city.properties?.populaton >= threshold * 1000)
    };
}

/**
 * 根据指定属性对城市进行排序
 * @param {cities} cities 输入GeoJSON数据
 * @param {propertyName} propertyName 排序属性名
 * @param {ascending} ascending 是否升序排序
 * @returns {cities} 排序后的GeoJSON
 */
export function sortByProperties(cities, propertyName, ascending = true) {
    const modifier = ascending ? 1 : -1;
    return {
        ...cities,
        features: cities.features.sort((a, b) => {
            const aValue = a.properties[propertyName];
            const bValue = b.properties[propertyName];
            return modifier * (aValue - bValue);
        })
    }
}

/**
 * 计算城市GDP的平均值
 * @param {cities} cities 输入GeoJSON数据
 * @returns {totalGDP} 城市GDP的平均值
 */
export function calculateAverageGDP(cities) {
    const totalGDP = cities.features.reduce((sum, city) => {
        return sum + (city.properties.GDP || 0);
    }, 0);
    if (!totalGDP) {
        throw new Error('No valid GDP data found');
    }
    console.log(`Average GDP: ${totalGDP}`);
    console.log(`Average GDP: ${totalGDP / cities.features.length}`);
    return totalGDP / cities.features.length;
}