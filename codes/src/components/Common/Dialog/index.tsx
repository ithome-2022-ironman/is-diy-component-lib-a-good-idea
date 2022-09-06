import React, { memo } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import DialogBase from '@Components/Base/DialogBase';
import type { DialogProps } from './types';

const opacityIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const defaultDialogStyle = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: '0',
  padding: '24px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#fff',
  animation: `${opacityIn} 0.25s`,
});
const defaultBackdropStyle = css({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: '0',
  left: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  animation: `${opacityIn} 0.25s`,
});
const unmountedAnimation = css({
  opacity: '0',
  transition: 'opacity 0.25s',
});

function Dialog(props: DialogProps): React.ReactElement {
  /* Main */
  return (
    <DialogBase
      classes={{
        dialog: cn(defaultDialogStyle, props.classes?.dialog),
        backdrop: cn(defaultBackdropStyle, props.classes?.backdrop),
        dialogUnmountedAnimation: cn(
          unmountedAnimation,
          props.classes?.dialogUnmountedAnimation
        ),
        backdropUnmountedAnimation: cn(
          unmountedAnimation,
          props.classes?.backdropUnmountedAnimation
        ),
      }}
      {...props}
    >
      {props.children}
    </DialogBase>
  );
}

export default memo(Dialog);
