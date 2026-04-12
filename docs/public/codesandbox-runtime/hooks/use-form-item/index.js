import { inject } from "vue";
const FormContextKey = Symbol("FormContextKey");
const FormItemContextKey = Symbol("FormItemContextKey");
const useFormItem = () => {
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
export {
  FormContextKey,
  FormItemContextKey,
  useFormItem
};
