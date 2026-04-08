type HighlightResult = {
    value: string;
};
type HighlightOptions = {
    language?: string;
    ignoreIllegals?: boolean;
};
declare const hljs: {
    getLanguage(language?: string): string | undefined;
    highlight(code: string, _options?: HighlightOptions): HighlightResult;
    highlightAuto(code: string): HighlightResult;
};
export default hljs;
