// 矢量数据加载器
/**
 * 
 * @param {string|File} source 
 * @returns {Promise<GeoJSON>}
 */
export function loadGeoJSON(source) {
    return Promise.resolve()
    .then(()=>{
        if (typeof source === 'string') {
            return fetch(source).then(res=>{
                if (!res.ok) throw new Error('HTTP error! status: ${res.status}');
                return res.json();
            })
        } else if (source instanceof File) {
            return new Promise((resolve, reject)=>{
                const reader = new FileReader();
                reader.onload = e => resolve(JSON.parse(e.target.result));
                reader.onerror = reject;
                reader.readAsText(source);
            })
        }
        throw new Error('Invalid source');
    })
    .then(validateGeoJSON);
}

function validateGeoJSON(data) {
    if(!data.type || !data.features) {
        throw new Error('Invalid GeoJSON');
    }
    return data;
}