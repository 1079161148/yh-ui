import type { App } from 'vue';
export declare const YhLoading: {
    directive: import("vue").Directive;
    install(app: App): void;
    service: (options?: import(".").LoadingOptions, appContext?: import("vue").AppContext) => import(".").LoadingInstance;
};
export declare const vYhLoading: import("vue").Directive;
export default YhLoading;
export * from './src/service';
export * from './src/directive';
import './src/loading.css';
export type YhLoadingOptions = import('./src/service').LoadingOptions;
export type YhLoadingInstance = import('./src/service').LoadingInstance;
