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
    (snackId: unknown): void => {
      if (onClose) {
        onClose(snackId);
      }
    },
    [onClose]
  );

  /* Main */
  return (
    <Portal>
      <React.Fragment>
        {toasts.map((snack, index) => (
          <Toast
            key={snack.id}
            show={snack.show}
            onClose={() => closeSingleSnack(snack.id)}
            classes={{ snack: calcHeight(toasts, index) }}
            countDown={snack.countDown}
            disableAutoClose={snack.disableAutoClose}
            pauseOnHover={snack.pauseOnHover}
          >
            {snack.children}
          </Toast>
        ))}
      </React.Fragment>
    </Portal>
  );
}

export default memo(Toasts);
