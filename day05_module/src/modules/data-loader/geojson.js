import * as turf from '@turf/turf';

export class GeoJSONProcessor {
    constructor(options = {coordTransform: true}) {
        this._options = options;
    }

    normalize(geojson){
        if (this._options.coordTransform) {
            // Transform coordinates if needed
            return this._transformCRS(geojson);
        }
        return geojson;
    }

    _transformCRS(geojson) {
        return turf.toWgs84(geojson);
    }

}

// 新增 load 方法并导出
export async function load(url) {
    const response = await fetch(url);
    const geojson = await response.json();
    // 可选：进行坐标转换或其他处理
    const processor = new GeoJSONProcessor();
    return processor.normalize(geojson);
}