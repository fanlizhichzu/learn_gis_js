import proj4 from 'proj4';


// 定义坐标系统
proj4.defs(
    ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs'],
    ['EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs']
)

export function convertToWebMercator(cities) {
    return {
        ...cities,
        features: cities.features.map(feature => ({
            ...feature,
            geometry: {
                ...feature.geometry,
                corrdinates: convertCoords(feature.geometry.corrdinates)
            }
        }))
    };
}

function convertCoords(coords) {
    if (Array.isArray(coords[0])) {
        return coords.map(coord => convertCoords(coord));
    }
    return proj4('EPSG:4326', 'EPSG:3857', coords);
}

export function extractProperties(cities, propertyName) {
    return cities.features.map(feature => {
        propertyName.reduce((obj, prop) => {
            obj[prop] = feature.properties[prop];
            return obj;
        }, {})
    });

}

export function getCenter(coords) {
    return coords;
}