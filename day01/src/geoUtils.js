export function filterByPopulation(cities, threshold = 1000) {
    if (!cities.features) {
        throw new Error("Invalid cities data format");
    }
    return {
        ...cities,
        features: cities.features.filter(city => {
            city.properties?.population >= threshold * 1000;
        })
    };
}