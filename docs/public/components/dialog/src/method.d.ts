import type { UseDialogOptions, DialogAction } from './use-dialog';
/**
 * Dialog 函数式调用方法集
 */
export interface DialogMethod {
    (options: UseDialogOptions): Promise<{
        action: DialogAction;
    }>;
    /** 显示弹窗 */
    show: (options: UseDialogOptions) => Promise<{
        action: DialogAction;
    }>;
    /** 成功提示弹窗 */
    success: (content: string | UseDialogOptions, title?: string) => Promise<{
        action: DialogAction;
    }>;
    /** 警告提示弹窗 */
    warning: (content: string | UseDialogOptions, title?: string) => Promise<{
        action: DialogAction;
    }>;
    /** 错误提示弹窗 */
    error: (content: string | UseDialogOptions, title?: string) => Promise<{
        action: DialogAction;
    }>;
    /** 信息提示弹窗 */
    info: (content: string | UseDialogOptions, title?: string) => Promise<{
        action: DialogAction;
    }>;
}
/**
 * 构造便捷方法
 */
declare const DialogMethod: DialogMethod;
export default DialogMethod;
