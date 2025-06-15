import * as turf from '@turf/turf';

export const createBuffer = (feature, distance, option = {}) => {
    const { units = 'meters', dissolve=false } = option;
    return turf.buffer(
        feature,
        distance,
        {
            units: units,
            dissolve: dissolve
        }
    );
};

export const bufferAnalysis = {
    point: (pt, dist) => createBuffer(pt, dist, { units: 'meters' }),
    polygon: (poly, dist) => createBuffer(poly, dist, { units: 'meters', dissolve: true }),
    line: (line, dist) => createBuffer(line, dist, { units: 'meters' })
}