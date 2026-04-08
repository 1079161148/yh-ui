import Upload from './src/upload.vue';
export declare const YhUpload: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly fileList: {
            readonly type: import("vue").PropType<import("./index.js").UploadFile[]>;
            readonly default: () => never[];
        };
        readonly accept: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly action: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly method: {
            readonly type: StringConstructor;
            readonly default: "POST";
        };
        readonly headers: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly data: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly name: {
            readonly type: StringConstructor;
            readonly default: "file";
        };
        readonly multiple: BooleanConstructor;
        readonly drag: BooleanConstructor;
        readonly showFileList: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly limit: NumberConstructor;
        readonly autoUpload: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly listType: {
            readonly type: import("vue").PropType<"text" | "picture" | "picture-card">;
            readonly default: "text";
        };
        readonly withCredentials: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly httpRequest: {
            readonly type: import("vue").PropType<(options: import("./index.js").UploadRequestOptions) => Promise<unknown> | void>;
        };
        readonly beforeUpload: {
            readonly type: import("vue").PropType<(file: import("./index.js").UploadRawFile) => boolean | Promise<boolean | Blob>>;
        };
        readonly beforeRemove: {
            readonly type: import("vue").PropType<(file: import("./index.js").UploadFile, fileList: import("./index.js").UploadFile[]) => boolean | Promise<boolean>>;
        };
        readonly disabled: BooleanConstructor;
        readonly maxSize: NumberConstructor;
        readonly thumbnailRequest: {
            readonly type: import("vue").PropType<(file: import("./index.js").UploadRawFile) => Promise<string> | string>;
        };
        readonly directory: BooleanConstructor;
        readonly showDownload: BooleanConstructor;
        readonly triggerPosition: {
            readonly type: import("vue").PropType<"top" | "bottom" | "left" | "right">;
            readonly default: "top";
        };
        readonly fileIcon: import("vue").PropType<string | ((file: import("./index.js").UploadFile) => string)>;
        readonly crossorigin: {
            readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onProgress?: ((_evt: import("./index.js").UploadProgressEvent, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onPreview?: ((_file: import("./index.js").UploadFile) => any) | undefined;
        onError?: ((_error: Error, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onSuccess?: ((_response: unknown, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onRemove?: ((_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onDownload?: ((_file: import("./index.js").UploadFile) => any) | undefined;
        onChange?: ((_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onExceed?: ((_files: File[], _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        "onUpdate:fileList"?: ((fileList: import("./index.js").UploadFile[]) => any) | undefined;
    }>, {
        triggerInput: () => void;
        handleRemove: (file: import("./index.js").UploadFile) => Promise<void>;
        handlePreview: (file: import("./index.js").UploadFile) => void;
        handleDownload: (file: import("./index.js").UploadFile) => Promise<void>;
        handleFiles: (files: File[]) => Promise<void>;
        submit: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        progress: (_evt: import("./index.js").UploadProgressEvent, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
        preview: (_file: import("./index.js").UploadFile) => void;
        error: (_error: Error, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
        success: (_response: unknown, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
        remove: (_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
        download: (_file: import("./index.js").UploadFile) => void;
        change: (_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
        exceed: (_files: File[], _fileList: import("./index.js").UploadFile[]) => void;
        "update:fileList": (fileList: import("./index.js").UploadFile[]) => void;
    }, import("vue").PublicProps, {
        readonly data: Record<string, unknown>;
        readonly name: string;
        readonly method: string;
        readonly disabled: boolean;
        readonly drag: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly multiple: boolean;
        readonly action: string;
        readonly fileList: import("./index.js").UploadFile[];
        readonly accept: string;
        readonly headers: Record<string, string>;
        readonly showFileList: boolean;
        readonly autoUpload: boolean;
        readonly listType: "picture" | "text" | "picture-card";
        readonly withCredentials: boolean;
        readonly directory: boolean;
        readonly showDownload: boolean;
        readonly triggerPosition: "top" | "left" | "right" | "bottom";
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly fileList: {
            readonly type: import("vue").PropType<import("./index.js").UploadFile[]>;
            readonly default: () => never[];
        };
        readonly accept: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly action: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly method: {
            readonly type: StringConstructor;
            readonly default: "POST";
        };
        readonly headers: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly data: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly name: {
            readonly type: StringConstructor;
            readonly default: "file";
        };
        readonly multiple: BooleanConstructor;
        readonly drag: BooleanConstructor;
        readonly showFileList: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly limit: NumberConstructor;
        readonly autoUpload: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly listType: {
            readonly type: import("vue").PropType<"text" | "picture" | "picture-card">;
            readonly default: "text";
        };
        readonly withCredentials: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly httpRequest: {
            readonly type: import("vue").PropType<(options: import("./index.js").UploadRequestOptions) => Promise<unknown> | void>;
        };
        readonly beforeUpload: {
            readonly type: import("vue").PropType<(file: import("./index.js").UploadRawFile) => boolean | Promise<boolean | Blob>>;
        };
        readonly beforeRemove: {
            readonly type: import("vue").PropType<(file: import("./index.js").UploadFile, fileList: import("./index.js").UploadFile[]) => boolean | Promise<boolean>>;
        };
        readonly disabled: BooleanConstructor;
        readonly maxSize: NumberConstructor;
        readonly thumbnailRequest: {
            readonly type: import("vue").PropType<(file: import("./index.js").UploadRawFile) => Promise<string> | string>;
        };
        readonly directory: BooleanConstructor;
        readonly showDownload: BooleanConstructor;
        readonly triggerPosition: {
            readonly type: import("vue").PropType<"top" | "bottom" | "left" | "right">;
            readonly default: "top";
        };
        readonly fileIcon: import("vue").PropType<string | ((file: import("./index.js").UploadFile) => string)>;
        readonly crossorigin: {
            readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onProgress?: ((_evt: import("./index.js").UploadProgressEvent, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onPreview?: ((_file: import("./index.js").UploadFile) => any) | undefined;
        onError?: ((_error: Error, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onSuccess?: ((_response: unknown, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onRemove?: ((_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onDownload?: ((_file: import("./index.js").UploadFile) => any) | undefined;
        onChange?: ((_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        onExceed?: ((_files: File[], _fileList: import("./index.js").UploadFile[]) => any) | undefined;
        "onUpdate:fileList"?: ((fileList: import("./index.js").UploadFile[]) => any) | undefined;
    }>, {
        triggerInput: () => void;
        handleRemove: (file: import("./index.js").UploadFile) => Promise<void>;
        handlePreview: (file: import("./index.js").UploadFile) => void;
        handleDownload: (file: import("./index.js").UploadFile) => Promise<void>;
        handleFiles: (files: File[]) => Promise<void>;
        submit: () => void;
    }, {}, {}, {}, {
        readonly data: Record<string, unknown>;
        readonly name: string;
        readonly method: string;
        readonly disabled: boolean;
        readonly drag: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly multiple: boolean;
        readonly action: string;
        readonly fileList: import("./index.js").UploadFile[];
        readonly accept: string;
        readonly headers: Record<string, string>;
        readonly showFileList: boolean;
        readonly autoUpload: boolean;
        readonly listType: "picture" | "text" | "picture-card";
        readonly withCredentials: boolean;
        readonly directory: boolean;
        readonly showDownload: boolean;
        readonly triggerPosition: "top" | "left" | "right" | "bottom";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly fileList: {
        readonly type: import("vue").PropType<import("./index.js").UploadFile[]>;
        readonly default: () => never[];
    };
    readonly accept: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly action: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly method: {
        readonly type: StringConstructor;
        readonly default: "POST";
    };
    readonly headers: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly data: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    readonly name: {
        readonly type: StringConstructor;
        readonly default: "file";
    };
    readonly multiple: BooleanConstructor;
    readonly drag: BooleanConstructor;
    readonly showFileList: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly limit: NumberConstructor;
    readonly autoUpload: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly listType: {
        readonly type: import("vue").PropType<"text" | "picture" | "picture-card">;
        readonly default: "text";
    };
    readonly withCredentials: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly httpRequest: {
        readonly type: import("vue").PropType<(options: import("./index.js").UploadRequestOptions) => Promise<unknown> | void>;
    };
    readonly beforeUpload: {
        readonly type: import("vue").PropType<(file: import("./index.js").UploadRawFile) => boolean | Promise<boolean | Blob>>;
    };
    readonly beforeRemove: {
        readonly type: import("vue").PropType<(file: import("./index.js").UploadFile, fileList: import("./index.js").UploadFile[]) => boolean | Promise<boolean>>;
    };
    readonly disabled: BooleanConstructor;
    readonly maxSize: NumberConstructor;
    readonly thumbnailRequest: {
        readonly type: import("vue").PropType<(file: import("./index.js").UploadRawFile) => Promise<string> | string>;
    };
    readonly directory: BooleanConstructor;
    readonly showDownload: BooleanConstructor;
    readonly triggerPosition: {
        readonly type: import("vue").PropType<"top" | "bottom" | "left" | "right">;
        readonly default: "top";
    };
    readonly fileIcon: import("vue").PropType<string | ((file: import("./index.js").UploadFile) => string)>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onProgress?: ((_evt: import("./index.js").UploadProgressEvent, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
    onPreview?: ((_file: import("./index.js").UploadFile) => any) | undefined;
    onError?: ((_error: Error, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
    onSuccess?: ((_response: unknown, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
    onRemove?: ((_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
    onDownload?: ((_file: import("./index.js").UploadFile) => any) | undefined;
    onChange?: ((_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => any) | undefined;
    onExceed?: ((_files: File[], _fileList: import("./index.js").UploadFile[]) => any) | undefined;
    "onUpdate:fileList"?: ((fileList: import("./index.js").UploadFile[]) => any) | undefined;
}>, {
    triggerInput: () => void;
    handleRemove: (file: import("./index.js").UploadFile) => Promise<void>;
    handlePreview: (file: import("./index.js").UploadFile) => void;
    handleDownload: (file: import("./index.js").UploadFile) => Promise<void>;
    handleFiles: (files: File[]) => Promise<void>;
    submit: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    progress: (_evt: import("./index.js").UploadProgressEvent, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
    preview: (_file: import("./index.js").UploadFile) => void;
    error: (_error: Error, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
    success: (_response: unknown, _file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
    remove: (_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
    download: (_file: import("./index.js").UploadFile) => void;
    change: (_file: import("./index.js").UploadFile, _fileList: import("./index.js").UploadFile[]) => void;
    exceed: (_files: File[], _fileList: import("./index.js").UploadFile[]) => void;
    "update:fileList": (fileList: import("./index.js").UploadFile[]) => void;
}, string, {
    readonly data: Record<string, unknown>;
    readonly name: string;
    readonly method: string;
    readonly disabled: boolean;
    readonly drag: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly multiple: boolean;
    readonly action: string;
    readonly fileList: import("./index.js").UploadFile[];
    readonly accept: string;
    readonly headers: Record<string, string>;
    readonly showFileList: boolean;
    readonly autoUpload: boolean;
    readonly listType: "picture" | "text" | "picture-card";
    readonly withCredentials: boolean;
    readonly directory: boolean;
    readonly showDownload: boolean;
    readonly triggerPosition: "top" | "left" | "right" | "bottom";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        trigger?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        trigger?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        tip?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        file?: (props: {
            file: import("./index.js").UploadFile;
        }) => any;
    } & {
        'file-icon'?: (props: {
            file: import("./index.js").UploadFile;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhUpload;
export * from './src/upload';
export type UploadInstance = InstanceType<typeof Upload>;
