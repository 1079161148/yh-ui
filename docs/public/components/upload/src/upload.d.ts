import type { ExtractPropTypes, PropType } from 'vue';
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
export interface UploadFile {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size?: number;
    uid: number;
    url?: string;
    raw?: File;
    response?: unknown;
    error?: Error;
}
export type UploadRawFile = File & {
    uid: number;
};
export interface UploadProgressEvent extends ProgressEvent {
    percent: number;
}
export interface UploadRequestOptions {
    action: string;
    method: string;
    file: File;
    filename: string;
    name?: string;
    data: Record<string, unknown>;
    headers: Record<string, string>;
    withCredentials: boolean;
    onProgress: (evt: UploadProgressEvent) => void;
    onSuccess: (res: unknown) => void;
    onError: (err: Error) => void;
}
export declare const uploadProps: {
    /** 文件列表 */
    readonly fileList: {
        readonly type: PropType<UploadFile[]>;
        readonly default: () => never[];
    };
    /** 接受上传的文件类型 */
    readonly accept: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 上传的地址 */
    readonly action: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 设置上传的请求方法 */
    readonly method: {
        readonly type: StringConstructor;
        readonly default: "POST";
    };
    /** 设置上传的请求头部 */
    readonly headers: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /** 上传时附带的额外参数 */
    readonly data: {
        readonly type: PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    /** 上传文件的字段名 */
    readonly name: {
        readonly type: StringConstructor;
        readonly default: "file";
    };
    /** 是否支持多选文件 */
    readonly multiple: BooleanConstructor;
    /** 是否启用拖拽上传 */
    readonly drag: BooleanConstructor;
    /** 是否显示已上传文件列表 */
    readonly showFileList: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 限制上传数量 */
    readonly limit: NumberConstructor;
    /** 是否在选取文件后立即进行上传 */
    readonly autoUpload: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 文件列表类型 */
    readonly listType: {
        readonly type: PropType<"text" | "picture" | "picture-card">;
        readonly default: "text";
    };
    /** 是否支持发送 cookie 凭证信息 */
    readonly withCredentials: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 覆盖默认的上传行为，可以自定义上传的实现 */
    readonly httpRequest: {
        readonly type: PropType<(options: UploadRequestOptions) => Promise<unknown> | void>;
    };
    /** 上传文件之前的钩子，参数为上传的文件， 若返回 false 或者 Promise 则停止上传 */
    readonly beforeUpload: {
        readonly type: PropType<(file: UploadRawFile) => boolean | Promise<boolean | Blob>>;
    };
    /** 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者 Promise 则停止删除 */
    readonly beforeRemove: {
        readonly type: PropType<(file: UploadFile, fileList: UploadFile[]) => boolean | Promise<boolean>>;
    };
    /** 是否禁用 */
    readonly disabled: BooleanConstructor;
    /** 文件大小限制 (KB) */
    readonly maxSize: NumberConstructor;
    /** 自定义缩略图生成 */
    readonly thumbnailRequest: {
        readonly type: PropType<(file: UploadRawFile) => Promise<string> | string>;
    };
    /** 是否开启文件夹上传 */
    readonly directory: BooleanConstructor;
    /** 是否显示下载按钮 */
    readonly showDownload: BooleanConstructor;
    /** 上传触发器相对于文件列表的位置 */
    readonly triggerPosition: {
        readonly type: PropType<"top" | "bottom" | "left" | "right">;
        readonly default: "top";
    };
    /** 自定义文件图标或图标生成函数 */
    readonly fileIcon: PropType<string | ((file: UploadFile) => string)>;
    /** 原生属性 crossorigin */
    readonly crossorigin: {
        readonly type: PropType<"" | "anonymous" | "use-credentials">;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export declare const uploadEmits: {
    'update:fileList': (fileList: UploadFile[]) => boolean;
    change: (_file: UploadFile, _fileList: UploadFile[]) => boolean;
    success: (_response: unknown, _file: UploadFile, _fileList: UploadFile[]) => boolean;
    error: (_error: Error, _file: UploadFile, _fileList: UploadFile[]) => boolean;
    progress: (_evt: UploadProgressEvent, _file: UploadFile, _fileList: UploadFile[]) => boolean;
    remove: (_file: UploadFile, _fileList: UploadFile[]) => boolean;
    exceed: (_files: File[], _fileList: UploadFile[]) => boolean;
    preview: (_file: UploadFile) => boolean;
    download: (_file: UploadFile) => boolean;
};
export type UploadProps = ExtractPropTypes<typeof uploadProps>;
export type UploadEmits = typeof uploadEmits;
export interface UploadSlots {
    default?: () => unknown;
    trigger?: () => unknown;
    tip?: () => unknown;
    file?: (props: {
        file: UploadFile;
    }) => unknown;
    'file-icon'?: (props: {
        file: UploadFile;
    }) => unknown;
}
export interface UploadExpose {
    triggerInput: () => void;
    handleRemove: (file: UploadFile) => void | Promise<void>;
    handlePreview: (file: UploadFile) => void;
    handleDownload: (file: UploadFile) => void;
    handleFiles: (files: File[] | FileList) => Promise<void>;
    submit: () => void;
}
