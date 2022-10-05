import React, { memo, useCallback } from 'react';
import { css } from '@emotion/css';
import Portal from '@Components/Layer/Portal';
import Toast from '@Components/Common/Toast';
import type { ToastsProps, ToastArray } from './types';

function Toasts(props: ToastsProps): React.ReactElement {
  /* States */
  const { toasts, onClose } = props;

  /* Functions */
  const calcHeight = useCallback((array: ToastArray, index: number): string => {
    const top = array.slice(0, index).filter((s) => s.show).length;
    return css({
      transform: `translateY(calc(${top * (60 + 24)}px))`,
      transition: 'transform .3s ease-in',
    });
  }, []);
  const closeSingleSnack = useCallback(
    (toastId: string): void => {
      if (onClose) onClose(toastId);
    },
    [onClose]
  );

  /* Main */
  return (
    <Portal>
      <React.Fragment>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            show={toast.show}
            onClose={() => closeSingleSnack(toast.id)}
            classes={{ toast: calcHeight(toasts, index) }}
            countDown={toast.countDown}
            disableAutoClose={toast.disableAutoClose}
            pauseOnHover={toast.pauseOnHover}
          >
            {toast.children}
          </Toast>
        ))}
      </React.Fragment>
    </Portal>
  );
}

export default memo(Toasts);
