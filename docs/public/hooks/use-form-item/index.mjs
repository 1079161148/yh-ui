import { inject } from "vue";
export const FormContextKey = Symbol("FormContextKey");
export const FormItemContextKey = Symbol("FormItemContextKey");
export const useFormItem = () => {
  const form = inject(FormContextKey, void 0);
  const formItem = inject(FormItemContextKey, void 0);
  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger) => {
      if (formItem) {
        return formItem.validate(trigger).catch(() => {
          return false;
        });
      }
      return Promise.resolve(true);
    }
  };
};
