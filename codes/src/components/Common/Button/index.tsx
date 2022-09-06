import React, { memo, createRef, useCallback, useEffect } from 'react';
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
  minWidth: '40px',
  minHeight: '28px',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: '.5px',
  textTransform: 'uppercase',
  backgroundColor: '#4e342e',
  color: '#fff',
  transition: 'background-color .2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#362420',
  },
});
const disabledButtonStyle = css({
  backgroundColor: 'rgba(113, 92, 87, .4)',
  cursor: 'default',
  pointerEvents: 'none',
});
const rippleContainer = css({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  pointerEvents: 'none',
});
const rippleStyle = css({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, .3)',
  transform: 'scale(0)',
  animation: `${rippleAnimation} .7s ease`,
});

function Button(props: ButtonProps): React.ReactElement {
  /* States */
  const {
    children,
    disableRipple = false,
    className,
    disabled,
    type,
    ...rest
  } = props;
  const buttonRef = createRef<HTMLButtonElement>();
  const rippleContainerRef = createRef<HTMLSpanElement>();

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
    [disableRipple, rippleContainerRef]
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
  }, [rippleContainerRef]);

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

export default memo(Button);
