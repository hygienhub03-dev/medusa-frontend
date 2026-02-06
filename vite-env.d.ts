/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MEDUSA_BACKEND_URL: string;
    readonly VITE_MEDUSA_PUBLISHABLE_KEY: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_DEFAULT_REGION: string;
    readonly VITE_RADAR_PUBLISHABLE_KEY: string;
    readonly VITE_SENTRY_DSN: string;
    readonly VITE_GA_MEASUREMENT_ID: string;
    readonly VITE_ENABLE_ANALYTICS: string;
    readonly DEV: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
