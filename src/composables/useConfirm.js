import { ref } from 'vue';

const visible = ref(false);
const options = ref({
  title: 'Confirm',
  message: 'Are you sure?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
});

let resolveFn = null;

const confirm = () => {
  resolveFn(true);
  visible.value = false;
};

const cancel = () => {
  resolveFn(false);
  visible.value = false;
};

export const useConfirm = () => ({
  visible,
  options,
  confirm,
  cancel,
  show: (opts) => {
    options.value = { ...options.value, ...opts };
    visible.value = true;
    return new Promise((resolve) => {
      resolveFn = resolve;
    });
  },
});
