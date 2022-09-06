import React, { memo, createRef, useMemo, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import type { ButtonProps } from './types';

const rippleAnimation = keyframes`
to {
  transform: scale(1.2);
  opacity: 0;
}
`;
const defaultButtonStyle = css({
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});
const disabledButtonStyle = css({
  cursor: 'default',
  pointerEvents: 'none',
});
const rippleContainer = css({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  pointerEvents: 'none',
});

function ButtonBase(props: ButtonProps): React.ReactElement {
  /* States */
  const {
    children,
    disableRipple = false,
    rippleColor = 'rgba(0, 0, 0, .2)',
    className,
    disabled,
    type,
    ...rest
  } = props;
  const buttonRef = createRef<HTMLButtonElement>();
  const rippleContainerRef = createRef<HTMLSpanElement>();
  const rippleStyle = useMemo(
    () =>
      css({
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: rippleColor,
        transform: 'scale(0)',
        animation: `${rippleAnimation} .7s ease`,
      }),
    [rippleColor]
  );

  /* Function */
  const playRipple = useCallback(
    (e: MouseEvent): void => {
      if (disableRipple) return;
      const target = e.currentTarget as HTMLButtonElement;
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const rippleContainer = rippleContainerRef.current;
      if (rippleContainer) {
        const rippleEffect = document.createElement('span');
        rippleEffect.style.width = rippleEffect.style.height = `${diameter}px`;
        rippleEffect.style.left = `${
          e.clientX - (target.offsetLeft + radius)
        }px`;
        rippleEffect.style.top = `${e.clientY - (target.offsetTop + radius)}px`;
        rippleEffect.classList.add(rippleStyle);
        rippleContainer.appendChild(rippleEffect);
      }
    },
    [disableRipple, rippleContainerRef, rippleStyle]
  );
  const removeRipple = useCallback((): void => {
    const rippleContainer = rippleContainerRef.current;
    if (rippleContainer) {
      rippleContainer.childNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const elementNode = node as HTMLElement;
          if (elementNode.classList.contains(rippleStyle)) {
            elementNode.remove();
          }
        }
      });
    }
  }, [rippleContainerRef, rippleStyle]);

  /* Hooks */
  useEffect(() => {
    const button = buttonRef.current;
    button?.addEventListener('click', playRipple);
    button?.addEventListener('animationend', removeRipple);
    return () => {
      button?.removeEventListener('click', playRipple);
      button?.removeEventListener('animationend', removeRipple);
    };
  }, [buttonRef, playRipple, removeRipple]);

  /* Main */
  return (
    <button
      className={cn(
        defaultButtonStyle,
        disabled && disabledButtonStyle,
        className
      )}
      disabled={disabled}
      type={type ? type : 'button'}
      {...rest}
      ref={buttonRef}
    >
      {children ? children : 'button'}
      <span
        className={cn(rippleContainer)}
        role="presentation"
        ref={rippleContainerRef}
      />
    </button>
  );
}

export default memo(ButtonBase);
