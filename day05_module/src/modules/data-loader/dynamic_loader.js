export class DynamicLoader {

    constructor(strategy = 'geojson') {
        this._strategy = this._initStrategy(strategy);
    }

    _initStrategy(strategy) {
        switch (strategy) {
            case 'geojson':
                return import('./geojson.js');
            case 'buffer':
                return import('../analysis/buffer.js');
            default:
                throw new Error(`Unknown strategy: ${strategy}`);
        }
    }

    async load(url) {
        const strategyModule = await this._strategy;
        if (strategyModule && typeof strategyModule.load === 'function') {
            return strategyModule.load(url);
        } else {
            throw new Error('Strategy module does not have a load function');
        }
    }
}