import type { ToastProps } from '@Components/Common/Toast/types';

export interface ToastsProps {
  toasts: ToastArray;
  onClose?: (id: unknown) => void;
}

export type ToastArray = Array<ToastBase>;

type ToastBase = Pick<
  ToastProps,
  | 'children'
  | 'show'
  | 'countDown'
  | 'disableAutoClose'
  | 'pauseOnHover'
  | 'classes'
> & {
  id: string;
};
