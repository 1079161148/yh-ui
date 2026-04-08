/**
 * Design Tokens - 设计令牌
 */
export declare const colorTokens: {
    readonly primary: {
        readonly DEFAULT: "#409eff";
        readonly light: {
            readonly 1: "#53a8ff";
            readonly 2: "#66b1ff";
            readonly 3: "#79bbff";
            readonly 4: "#8cc5ff";
            readonly 5: "#a0cfff";
            readonly 6: "#b3d8ff";
            readonly 7: "#c6e2ff";
            readonly 8: "#d9ecff";
            readonly 9: "#ecf5ff";
        };
        readonly dark: {
            readonly 2: "#337ecc";
        };
    };
    readonly success: {
        readonly DEFAULT: "#67c23a";
        readonly light: {
            readonly 3: "#95d475";
            readonly 5: "#b3e19d";
            readonly 7: "#d1edc4";
            readonly 9: "#f0f9eb";
        };
        readonly dark: {
            readonly 2: "#529b2e";
        };
    };
    readonly warning: {
        readonly DEFAULT: "#e6a23c";
        readonly light: {
            readonly 3: "#eebe77";
            readonly 5: "#f3d19e";
            readonly 7: "#f8e3c5";
            readonly 9: "#fdf6ec";
        };
        readonly dark: {
            readonly 2: "#b88230";
        };
    };
    readonly danger: {
        readonly DEFAULT: "#f56c6c";
        readonly light: {
            readonly 3: "#f89898";
            readonly 5: "#fab6b6";
            readonly 7: "#fcd3d3";
            readonly 9: "#fef0f0";
        };
        readonly dark: {
            readonly 2: "#c45656";
        };
    };
    readonly info: {
        readonly DEFAULT: "#909399";
        readonly light: {
            readonly 3: "#b1b3b8";
            readonly 5: "#c8c9cc";
            readonly 7: "#dedfe0";
            readonly 9: "#f4f4f5";
        };
        readonly dark: {
            readonly 2: "#73767a";
        };
    };
};
export declare const textColorTokens: {
    readonly primary: "#303133";
    readonly regular: "#606266";
    readonly secondary: "#909399";
    readonly placeholder: "#a8abb2";
    readonly disabled: "#c0c4cc";
};
export declare const borderColorTokens: {
    readonly DEFAULT: "#dcdfe6";
    readonly light: "#e4e7ed";
    readonly lighter: "#ebeef5";
    readonly extraLight: "#f2f6fc";
    readonly dark: "#d4d7de";
    readonly darker: "#cdd0d6";
};
export declare const fillColorTokens: {
    readonly DEFAULT: "#f0f2f5";
    readonly light: "#f5f7fa";
    readonly lighter: "#fafafa";
    readonly extraLight: "#fafcff";
    readonly dark: "#ebedf0";
    readonly darker: "#e6e8eb";
    readonly blank: "#ffffff";
};
export declare const bgColorTokens: {
    readonly DEFAULT: "#ffffff";
    readonly page: "#f2f3f5";
    readonly overlay: "#ffffff";
};
export declare const spacingTokens: {
    readonly none: "0";
    readonly xs: "4px";
    readonly sm: "8px";
    readonly md: "16px";
    readonly lg: "24px";
    readonly xl: "32px";
    readonly xxl: "48px";
};
export declare const radiusTokens: {
    readonly none: "0";
    readonly sm: "2px";
    readonly base: "4px";
    readonly md: "8px";
    readonly lg: "12px";
    readonly xl: "16px";
    readonly round: "20px";
    readonly circle: "50%";
};
export declare const fontSizeTokens: {
    readonly xs: "12px";
    readonly sm: "13px";
    readonly base: "14px";
    readonly md: "16px";
    readonly lg: "18px";
    readonly xl: "20px";
    readonly xxl: "24px";
};
export declare const lineHeightTokens: {
    readonly none: "1";
    readonly tight: "1.25";
    readonly snug: "1.375";
    readonly normal: "1.5";
    readonly relaxed: "1.625";
    readonly loose: "2";
};
export declare const fontWeightTokens: {
    readonly light: "300";
    readonly normal: "400";
    readonly medium: "500";
    readonly semibold: "600";
    readonly bold: "700";
};
export declare const shadowTokens: {
    readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
    readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";
    readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
    readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
};
export declare const durationTokens: {
    readonly fast: "150ms";
    readonly base: "200ms";
    readonly slow: "300ms";
};
export declare const timingTokens: {
    readonly ease: "ease";
    readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
    readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
    readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly linear: "linear";
};
export declare const zIndexTokens: {
    readonly normal: "1";
    readonly top: "1000";
    readonly popper: "2000";
    readonly overlay: "2001";
    readonly modal: "2002";
    readonly popover: "2003";
    readonly tooltip: "2004";
    readonly loading: "2005";
};
export declare const breakpointTokens: {
    readonly xs: "0";
    readonly sm: "576px";
    readonly md: "768px";
    readonly lg: "992px";
    readonly xl: "1200px";
    readonly xxl: "1400px";
};
export declare const fontFamilyTokens: {
    readonly base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif";
    readonly monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";
    readonly serif: "Georgia, Cambria, 'Times New Roman', Times, serif";
};
export declare const accessibilityTokens: {
    readonly focusRingColor: "#409eff";
    readonly focusRingWidth: "2px";
    readonly focusRingOffset: "2px";
    readonly focusRingOpacity: "0.2";
};
export declare const maskTokens: {
    readonly DEFAULT: "rgba(0, 0, 0, 0.5)";
    readonly light: "rgba(0, 0, 0, 0.3)";
    readonly extraLight: "rgba(0, 0, 0, 0.1)";
};
export declare const scrollbarTokens: {
    readonly width: "6px";
    readonly thumbColor: "#c0c4cc";
    readonly thumbHoverColor: "#909399";
    readonly trackColor: "transparent";
    readonly thumbRadius: "3px";
};
export declare const componentSizeTokens: {
    readonly large: {
        readonly height: "40px";
        readonly fontSize: "14px";
        readonly paddingX: "20px";
    };
    readonly default: {
        readonly height: "32px";
        readonly fontSize: "14px";
        readonly paddingX: "16px";
    };
    readonly small: {
        readonly height: "24px";
        readonly fontSize: "12px";
        readonly paddingX: "12px";
    };
};
export declare const designTokens: {
    readonly colors: {
        readonly primary: {
            readonly DEFAULT: "#409eff";
            readonly light: {
                readonly 1: "#53a8ff";
                readonly 2: "#66b1ff";
                readonly 3: "#79bbff";
                readonly 4: "#8cc5ff";
                readonly 5: "#a0cfff";
                readonly 6: "#b3d8ff";
                readonly 7: "#c6e2ff";
                readonly 8: "#d9ecff";
                readonly 9: "#ecf5ff";
            };
            readonly dark: {
                readonly 2: "#337ecc";
            };
        };
        readonly success: {
            readonly DEFAULT: "#67c23a";
            readonly light: {
                readonly 3: "#95d475";
                readonly 5: "#b3e19d";
                readonly 7: "#d1edc4";
                readonly 9: "#f0f9eb";
            };
            readonly dark: {
                readonly 2: "#529b2e";
            };
        };
        readonly warning: {
            readonly DEFAULT: "#e6a23c";
            readonly light: {
                readonly 3: "#eebe77";
                readonly 5: "#f3d19e";
                readonly 7: "#f8e3c5";
                readonly 9: "#fdf6ec";
            };
            readonly dark: {
                readonly 2: "#b88230";
            };
        };
        readonly danger: {
            readonly DEFAULT: "#f56c6c";
            readonly light: {
                readonly 3: "#f89898";
                readonly 5: "#fab6b6";
                readonly 7: "#fcd3d3";
                readonly 9: "#fef0f0";
            };
            readonly dark: {
                readonly 2: "#c45656";
            };
        };
        readonly info: {
            readonly DEFAULT: "#909399";
            readonly light: {
                readonly 3: "#b1b3b8";
                readonly 5: "#c8c9cc";
                readonly 7: "#dedfe0";
                readonly 9: "#f4f4f5";
            };
            readonly dark: {
                readonly 2: "#73767a";
            };
        };
    };
    readonly textColors: {
        readonly primary: "#303133";
        readonly regular: "#606266";
        readonly secondary: "#909399";
        readonly placeholder: "#a8abb2";
        readonly disabled: "#c0c4cc";
    };
    readonly borderColors: {
        readonly DEFAULT: "#dcdfe6";
        readonly light: "#e4e7ed";
        readonly lighter: "#ebeef5";
        readonly extraLight: "#f2f6fc";
        readonly dark: "#d4d7de";
        readonly darker: "#cdd0d6";
    };
    readonly fillColors: {
        readonly DEFAULT: "#f0f2f5";
        readonly light: "#f5f7fa";
        readonly lighter: "#fafafa";
        readonly extraLight: "#fafcff";
        readonly dark: "#ebedf0";
        readonly darker: "#e6e8eb";
        readonly blank: "#ffffff";
    };
    readonly bgColors: {
        readonly DEFAULT: "#ffffff";
        readonly page: "#f2f3f5";
        readonly overlay: "#ffffff";
    };
    readonly spacing: {
        readonly none: "0";
        readonly xs: "4px";
        readonly sm: "8px";
        readonly md: "16px";
        readonly lg: "24px";
        readonly xl: "32px";
        readonly xxl: "48px";
    };
    readonly radius: {
        readonly none: "0";
        readonly sm: "2px";
        readonly base: "4px";
        readonly md: "8px";
        readonly lg: "12px";
        readonly xl: "16px";
        readonly round: "20px";
        readonly circle: "50%";
    };
    readonly fontSize: {
        readonly xs: "12px";
        readonly sm: "13px";
        readonly base: "14px";
        readonly md: "16px";
        readonly lg: "18px";
        readonly xl: "20px";
        readonly xxl: "24px";
    };
    readonly lineHeight: {
        readonly none: "1";
        readonly tight: "1.25";
        readonly snug: "1.375";
        readonly normal: "1.5";
        readonly relaxed: "1.625";
        readonly loose: "2";
    };
    readonly fontWeight: {
        readonly light: "300";
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
    };
    readonly fontFamily: {
        readonly base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif";
        readonly monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";
        readonly serif: "Georgia, Cambria, 'Times New Roman', Times, serif";
    };
    readonly shadow: {
        readonly sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        readonly base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)";
        readonly md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";
        readonly lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
        readonly xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
    };
    readonly duration: {
        readonly fast: "150ms";
        readonly base: "200ms";
        readonly slow: "300ms";
    };
    readonly timing: {
        readonly ease: "ease";
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly linear: "linear";
    };
    readonly zIndex: {
        readonly normal: "1";
        readonly top: "1000";
        readonly popper: "2000";
        readonly overlay: "2001";
        readonly modal: "2002";
        readonly popover: "2003";
        readonly tooltip: "2004";
        readonly loading: "2005";
    };
    readonly componentSize: {
        readonly large: {
            readonly height: "40px";
            readonly fontSize: "14px";
            readonly paddingX: "20px";
        };
        readonly default: {
            readonly height: "32px";
            readonly fontSize: "14px";
            readonly paddingX: "16px";
        };
        readonly small: {
            readonly height: "24px";
            readonly fontSize: "12px";
            readonly paddingX: "12px";
        };
    };
    readonly breakpoints: {
        readonly xs: "0";
        readonly sm: "576px";
        readonly md: "768px";
        readonly lg: "992px";
        readonly xl: "1200px";
        readonly xxl: "1400px";
    };
    readonly accessibility: {
        readonly focusRingColor: "#409eff";
        readonly focusRingWidth: "2px";
        readonly focusRingOffset: "2px";
        readonly focusRingOpacity: "0.2";
    };
    readonly mask: {
        readonly DEFAULT: "rgba(0, 0, 0, 0.5)";
        readonly light: "rgba(0, 0, 0, 0.3)";
        readonly extraLight: "rgba(0, 0, 0, 0.1)";
    };
    readonly scrollbar: {
        readonly width: "6px";
        readonly thumbColor: "#c0c4cc";
        readonly thumbHoverColor: "#909399";
        readonly trackColor: "transparent";
        readonly thumbRadius: "3px";
    };
};
export type DesignTokens = typeof designTokens;
export type ColorTokens = typeof colorTokens;
export type TextColorTokens = typeof textColorTokens;
export type BorderColorTokens = typeof borderColorTokens;
export type FillColorTokens = typeof fillColorTokens;
export type BgColorTokens = typeof bgColorTokens;
export type SpacingTokens = typeof spacingTokens;
export type RadiusTokens = typeof radiusTokens;
export type FontSizeTokens = typeof fontSizeTokens;
export type LineHeightTokens = typeof lineHeightTokens;
export type FontWeightTokens = typeof fontWeightTokens;
export type FontFamilyTokens = typeof fontFamilyTokens;
export type ShadowTokens = typeof shadowTokens;
export type DurationTokens = typeof durationTokens;
export type TimingTokens = typeof timingTokens;
export type ZIndexTokens = typeof zIndexTokens;
export type ComponentSizeTokens = typeof componentSizeTokens;
export type BreakpointTokens = typeof breakpointTokens;
export type AccessibilityTokens = typeof accessibilityTokens;
export type MaskTokens = typeof maskTokens;
export type ScrollbarTokens = typeof scrollbarTokens;
