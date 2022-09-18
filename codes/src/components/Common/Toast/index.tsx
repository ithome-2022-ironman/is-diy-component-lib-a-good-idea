import React, { memo, useMemo, createRef, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import { CloseIcon } from '@Assets/icons';
import Portal from '@Components/Layer/Portal';
import ButtonBase from '@Components/Base/ButtonBase';
import type { ToastProps } from './types';

const countDownAnimation = keyframes`
from {
  transform: scaleX(0%);
}
to {
  transform: scaleX(100%);
}
`;

function Toast(props: ToastProps): React.ReactElement {
  /* States */
  const {
    show,
    children,
    countDown = 2000,
    disableAutoClose = false,
    pauseOnHover = false,
    classes = { toast: '', closeButton: '' },
    onClose,
    ...rest
  } = props;
  delete rest.className;
  const animationDuration = useMemo(() => countDown / 1000, [countDown]);
  const progressBarStyle = useMemo(
    () =>
      disableAutoClose
        ? undefined
        : css({
            '&::before': {
              content: '""',
              width: '100%',
              height: '2px',
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#4e342e',
              transformOrigin: 'top left',
              animation: `${countDownAnimation} ${animationDuration}s ease`,
            },
          }),
    [disableAutoClose, animationDuration]
  );
  const defaultToastStyle = useMemo(
    () =>
      css({
        minHeight: '60px',
        minWidth: '240px',
        display: 'inline-block',
        position: 'fixed',
        top: '24px',
        right: '24px',
        padding: '8px',
        backgroundColor: '#fff',
        '&:hover::before': {
          animationPlayState: pauseOnHover ? 'paused' : 'running',
        },
      }),
    [pauseOnHover]
  );
  const defaultCloseBtnStyle = useMemo(
    () =>
      css({
        width: '24px',
        height: '24px',
        position: 'absolute',
        top: '8px',
        right: '8px',
        borderRadius: '24px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }),
    []
  );
  const snackRef = createRef<HTMLDivElement>();

  /* Functions */
  const closeSnack = useCallback(() => {
    if (disableAutoClose) return;
    if (onClose) onClose();
  }, [disableAutoClose, onClose]);

  /* Hooks */
  useEffect(() => {
    const snack = snackRef.current;
    snack?.addEventListener('animationend', closeSnack);
    return () => {
      snack?.removeEventListener('animationend', closeSnack);
    };
  }, [snackRef, closeSnack]);

  /* Main */
  return show ? (
    <Portal>
      <div
        className={cn(defaultToastStyle, progressBarStyle, classes.toast)}
        ref={snackRef}
      >
        {children}
        <ButtonBase
          onClick={onClose}
          className={cn(defaultCloseBtnStyle, classes.closeButton)}
        >
          <CloseIcon width={16} height={16} />
        </ButtonBase>
      </div>
    </Portal>
  ) : (
    <React.Fragment />
  );
}

export default memo(Toast);
