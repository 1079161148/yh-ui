import { type UploadFile, type UploadRawFile, type UploadRequestOptions, type UploadProgressEvent } from './upload';
import 'viewerjs/dist/viewer.css';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_9: {}, __VLS_15: {}, __VLS_17: {}, __VLS_19: {}, __VLS_25: {
    file: UploadFile;
}, __VLS_43: {
    file: UploadFile;
};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
} & {
    trigger?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
} & {
    tip?: (props: typeof __VLS_17) => any;
} & {
    default?: (props: typeof __VLS_19) => any;
} & {
    file?: (props: typeof __VLS_25) => any;
} & {
    'file-icon'?: (props: typeof __VLS_43) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly fileList: {
        readonly type: import("vue").PropType<UploadFile[]>;
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
        readonly type: import("vue").PropType<(options: UploadRequestOptions) => Promise<unknown> | void>;
    };
    readonly beforeUpload: {
        readonly type: import("vue").PropType<(file: UploadRawFile) => boolean | Promise<boolean | Blob>>;
    };
    readonly beforeRemove: {
        readonly type: import("vue").PropType<(file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>>;
    };
    readonly disabled: BooleanConstructor;
    readonly maxSize: NumberConstructor;
    readonly thumbnailRequest: {
        readonly type: import("vue").PropType<(file: UploadRawFile) => Promise<string> | string>;
    };
    readonly directory: BooleanConstructor;
    readonly showDownload: BooleanConstructor;
    readonly triggerPosition: {
        readonly type: import("vue").PropType<"top" | "bottom" | "left" | "right">;
        readonly default: "top";
    };
    readonly fileIcon: import("vue").PropType<string | ((file: UploadFile) => string)>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    triggerInput: () => void;
    handleRemove: (file: UploadFile) => Promise<void>;
    handlePreview: (file: UploadFile) => void;
    handleDownload: (file: UploadFile) => Promise<void>;
    handleFiles: (files: File[]) => Promise<void>;
    submit: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    progress: (_evt: UploadProgressEvent, _file: UploadFile, _fileList: UploadFile[]) => void;
    preview: (_file: UploadFile) => void;
    error: (_error: Error, _file: UploadFile, _fileList: UploadFile[]) => void;
    success: (_response: unknown, _file: UploadFile, _fileList: UploadFile[]) => void;
    remove: (_file: UploadFile, _fileList: UploadFile[]) => void;
    download: (_file: UploadFile) => void;
    change: (_file: UploadFile, _fileList: UploadFile[]) => void;
    exceed: (_files: File[], _fileList: UploadFile[]) => void;
    "update:fileList": (fileList: UploadFile[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly fileList: {
        readonly type: import("vue").PropType<UploadFile[]>;
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
        readonly type: import("vue").PropType<(options: UploadRequestOptions) => Promise<unknown> | void>;
    };
    readonly beforeUpload: {
        readonly type: import("vue").PropType<(file: UploadRawFile) => boolean | Promise<boolean | Blob>>;
    };
    readonly beforeRemove: {
        readonly type: import("vue").PropType<(file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>>;
    };
    readonly disabled: BooleanConstructor;
    readonly maxSize: NumberConstructor;
    readonly thumbnailRequest: {
        readonly type: import("vue").PropType<(file: UploadRawFile) => Promise<string> | string>;
    };
    readonly directory: BooleanConstructor;
    readonly showDownload: BooleanConstructor;
    readonly triggerPosition: {
        readonly type: import("vue").PropType<"top" | "bottom" | "left" | "right">;
        readonly default: "top";
    };
    readonly fileIcon: import("vue").PropType<string | ((file: UploadFile) => string)>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onProgress?: ((_evt: UploadProgressEvent, _file: UploadFile, _fileList: UploadFile[]) => any) | undefined;
    onPreview?: ((_file: UploadFile) => any) | undefined;
    onError?: ((_error: Error, _file: UploadFile, _fileList: UploadFile[]) => any) | undefined;
    onSuccess?: ((_response: unknown, _file: UploadFile, _fileList: UploadFile[]) => any) | undefined;
    onRemove?: ((_file: UploadFile, _fileList: UploadFile[]) => any) | undefined;
    onDownload?: ((_file: UploadFile) => any) | undefined;
    onChange?: ((_file: UploadFile, _fileList: UploadFile[]) => any) | undefined;
    onExceed?: ((_files: File[], _fileList: UploadFile[]) => any) | undefined;
    "onUpdate:fileList"?: ((fileList: UploadFile[]) => any) | undefined;
}>, {
    readonly data: Record<string, unknown>;
    readonly name: string;
    readonly method: string;
    readonly disabled: boolean;
    readonly drag: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly multiple: boolean;
    readonly action: string;
    readonly fileList: UploadFile[];
    readonly accept: string;
    readonly headers: Record<string, string>;
    readonly showFileList: boolean;
    readonly autoUpload: boolean;
    readonly listType: "picture" | "text" | "picture-card";
    readonly withCredentials: boolean;
    readonly directory: boolean;
    readonly showDownload: boolean;
    readonly triggerPosition: "top" | "left" | "right" | "bottom";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
