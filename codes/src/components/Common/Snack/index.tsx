import React, { memo, useMemo, createRef, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import Portal from '@Components/Layer/Portal';
import type { SnackProps } from './types';

const countDownAnimation = keyframes`
from {
  transform: scaleX(0%);
}
to {
  transform: scaleX(100%);
}
`;

function Snack(props: SnackProps): React.ReactElement {
  /* States */
  const {
    show,
    children,
    countDown = 2000,
    disableAutoClose = false,
    pauseOnHover = false,
    classes = { snack: '', closeButton: '' },
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
              transform: 'scaleX(0%)',
              transformOrigin: 'top left',
              animation: `${countDownAnimation} ${animationDuration}s ease`,
            },
          }),
    [disableAutoClose, animationDuration]
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
        className={cn(
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
          progressBarStyle,
          classes.snack
        )}
        ref={snackRef}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            css({
              width: '24px',
              height: '24px',
              position: 'absolute',
              top: '8px',
              right: '8px',
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
            }),
            classes.closeButton
          )}
        >
          X
        </button>
      </div>
    </Portal>
  ) : (
    <React.Fragment />
  );
}

export default memo(Snack);
