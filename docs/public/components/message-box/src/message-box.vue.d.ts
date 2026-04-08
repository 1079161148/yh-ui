import type { MessageBoxOptions, MessageBoxAction } from './message-box';
declare const _default: import("vue").DefineComponent<MessageBoxOptions, {
    open: (options: MessageBoxOptions) => void;
    close: () => void;
    setCallback: (cb: (res: {
        action: MessageBoxAction;
        value
        /**
         * YhMessageBox - 极尽完善的消息弹框
         * @description 集成拖拽、亚克力、校验、滚动锁定等市面最全功能
         */
        ?: string;
    }) => void) => void;
    confirmLoading: boolean;
    cancelLoading: boolean;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<MessageBoxOptions> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
