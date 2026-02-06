import { RadarError } from './errors';
import type { RadarOptions } from './types';
declare class Config {
    static options: RadarOptions;
    static errorCallback: ((error: RadarError) => void) | null;
    static defaultOptions: {
        live: boolean;
        logLevel: string;
        host: string;
        version: string;
        debug: boolean;
    };
    static setup(options?: RadarOptions): void;
    static get(): RadarOptions;
    static clear(): void;
    static onError(callback: (error: RadarError) => void): void;
    static sendError(error: any): void;
}
export default Config;
