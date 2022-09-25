import React, { memo, useMemo } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import DialogBase from '@Components/Base/DialogBase';
import type { DrawerProps } from './types';

const slideInRight = keyframes`
from {
  transform: translateX(50vw);
}
to {
  transform: translateX(0);
}
`;
const slideInLeft = keyframes`
from {
  transform: translateX(-50vw);
}
to {
  transform: translateX(0);
}
`;
const slideInTop = keyframes`
from {
  transform: translateY(-50vh);
}
to {
  transform: translateY(0);
}
`;
const slideInBottom = keyframes`
from {
  transform: translateY(50vh);
}
to {
  transform: translateY(0);
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
const baseStyle = css({
  position: 'absolute',
  margin: '0',
  padding: '24px',
  backgroundColor: '#fff',
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
const backdropUnmountedAnimation = css({
  opacity: '0',
  transition: '0.25s ease',
});

function Drawer(props: DrawerProps): React.ReactElement {
  /* States */
  const { direction = 'right' } = props;
  const defaultDrawerStyle = useMemo(() => {
    if (direction === 'left') {
      return css({
        height: '100vh',
        top: '0',
        left: '0',
        animation: `${slideInLeft} 0.25s`,
      });
    }
    if (direction === 'top') {
      return css({
        width: '100vw',
        top: '0',
        left: '0',
        animation: `${slideInTop} 0.25s`,
      });
    }
    if (direction === 'bottom') {
      return css({
        width: '100vw',
        bottom: '0',
        left: '0',
        animation: `${slideInBottom} 0.25s`,
      });
    }
    // default 'right'
    return css({
      height: '100vh',
      top: '0',
      right: '0',
      animation: `${slideInRight} 0.25s`,
    });
  }, [direction]);
  const drawerUnmountedAnimation = useMemo(() => {
    if (direction === 'left') {
      return css({
        transform: 'translateX(-50vw)',
        transition: '0.25s ease',
      });
    }
    if (direction === 'top') {
      return css({
        transform: 'translateY(-50vh)',
        transition: '0.25s ease',
      });
    }
    if (direction === 'bottom') {
      return css({
        transform: 'translateY(50vh)',
        transition: '0.25s ease',
      });
    }
    // default 'right'
    return css({
      transform: 'translateX(50vw)',
      transition: '0.25s ease',
    });
  }, [direction]);

  /* Main */
  return (
    <DialogBase
      classes={{
        dialog: cn(baseStyle, defaultDrawerStyle, props.classes?.dialog),
        backdrop: cn(defaultBackdropStyle, props.classes?.backdrop),
        dialogUnmountedAnimation: cn(
          drawerUnmountedAnimation,
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
