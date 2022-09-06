import React, { memo } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import DialogBase from '@Components/Base/DialogBase';
import type { DrawerProps } from './types';

const slideIn = keyframes`
from {
  transform: translateX(50vw);
}
to {
  transform: translateX(0);
}
`;
const opacityIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const defaultDrawerStyle = css({
  height: '100vh',
  position: 'absolute',
  top: '0',
  right: '0',
  margin: '0',
  padding: '24px',
  backgroundColor: '#fff',
  animation: `${slideIn} 0.25s`,
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
const DrawerUnmountedAnimation = css({
  transform: 'translateX(50vw)',
  transition: '0.25s ease',
});
const backdropUnmountedAnimation = css({
  opacity: '0',
  transition: '0.25s ease',
});

function Drawer(props: DrawerProps): React.ReactElement {
  /* Main */
  return (
    <DialogBase
      classes={{
        dialog: cn(defaultDrawerStyle, props.classes?.dialog),
        backdrop: cn(defaultBackdropStyle, props.classes?.backdrop),
        dialogUnmountedAnimation: cn(
          DrawerUnmountedAnimation,
          props.classes?.dialogUnmountedAnimation
        ),
        backdropUnmountedAnimation: cn(
          backdropUnmountedAnimation,
          props.classes?.backdropUnmountedAnimation
        ),
      }}
      {...props}
    >
      {props.children}
    </DialogBase>
  );
}

export default memo(Drawer);
