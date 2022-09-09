import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import { css, keyframes } from '@emotion/css';
import Portal from '@Components/Layer/Portal';
import useDelayUnmount from '@Hooks/useDelayUnmount';
import type { TransitionEffectProps } from './types';

const fadeIn = keyframes`
from {
  opacity: 0
}
to {
  opacity: 1
}
`;
const fadeOut = keyframes`
from {
  opacity: 1
}
to {
  opacity: 0
}
`;
const scaleIn = keyframes`
from {
  transform: scale(0);
}
to {
  transform: scale(1);
}
`;
const scaleOut = keyframes`
from {
  transform: scale(1);
}
to {
  transform: scale(0);
}
`;

function TransitionEffect(props: TransitionEffectProps): React.ReactElement {
  /* States */
  const { mount, children, effect = 'scale', portal = null } = props;
  const shouldMount = useDelayUnmount(mount, 300);
  const animations = useMemo(
    () => ({ fadeIn, fadeOut, scaleIn, scaleOut }),
    []
  );

  /* Views */
  const finalChildren = useMemo(
    () => (
      <span
        className={cn(
          css({
            '& :first-child': {
              animation: `${
                mount ? animations[`${effect}In`] : animations[`${effect}Out`]
              } .3s ease`,
            },
          })
        )}
      >
        {children}
      </span>
    ),
    [mount, animations, effect, children]
  );
  const finalRender = useMemo(
    () =>
      portal ? (
        <Portal container={portal}>{finalChildren}</Portal>
      ) : (
        finalChildren
      ),
    [portal, finalChildren]
  );

  /* Main */
  return shouldMount ? finalRender : <React.Fragment />;
}

export default memo(TransitionEffect);
