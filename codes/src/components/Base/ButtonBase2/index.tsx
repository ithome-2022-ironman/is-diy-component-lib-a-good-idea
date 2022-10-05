import React, { memo, useRef, useMemo, useCallback, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import mergeRef from '@Tools/mergeRef';
import type { ButtonBaseProps } from './types';

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
const rippleContainerStyle = css({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  pointerEvents: 'none',
});
const rippleAnimation = keyframes`
to {
  transform: scale(1.2);
  opacity: 0;
}
`;

const ButtonForward = React.forwardRef<
  HTMLButtonElement | HTMLLabelElement,
  ButtonBaseProps
>(function ButtonBase(props, ref): React.ReactElement {
  /* States */
  const {
    children,
    disableRipple = false,
    rippleColor = 'rgba(0, 0, 0, .2)',
    className,
    disabled,
    type = 'button',
    renderAs = 'button',
    ...rest
  } = props;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const rippleContainerRef = useRef<HTMLSpanElement | null>(null);
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
      const target = e.currentTarget as HTMLElement;
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const rippleContainer = rippleContainerRef.current;
      console.info(rippleContainer);
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
    const clickTarget = (labelRef.current || buttonRef.current) as HTMLElement;
    clickTarget?.addEventListener('click', playRipple);
    clickTarget?.addEventListener('animationend', removeRipple);
    return () => {
      clickTarget?.removeEventListener('click', playRipple);
      clickTarget?.removeEventListener('animationend', removeRipple);
    };
  }, [labelRef, buttonRef, playRipple, removeRipple]);

  /* Main */
  return React.createElement(
    renderAs === 'button' ? 'button' : 'label',
    {
      className: cn(
        defaultButtonStyle,
        disabled && disabledButtonStyle,
        className
      ),
      disabled,
      type: renderAs === 'button' ? type : undefined,
      ref:
        renderAs === 'button'
          ? mergeRef([buttonRef, ref])
          : mergeRef([labelRef, ref]),
      ...rest,
    },
    <React.Fragment>
      {children ? children : 'button'}
      <span
        className={cn(rippleContainerStyle)}
        role="presentation"
        ref={rippleContainerRef}
      />
    </React.Fragment>
  );
});

export default memo(ButtonForward);
