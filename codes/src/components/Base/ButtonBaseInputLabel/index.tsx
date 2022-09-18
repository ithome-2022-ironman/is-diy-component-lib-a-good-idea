import React, {
  memo,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  createElement,
} from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
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

function ButtonBase(props: ButtonBaseProps): React.ReactElement {
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
  useEffect(() => {
    const label = labelRef.current;
    label?.addEventListener('click', playRipple);
    label?.addEventListener('animationend', removeRipple);
    return () => {
      label?.removeEventListener('click', playRipple);
      label?.removeEventListener('animationend', removeRipple);
    };
  }, [labelRef, playRipple, removeRipple]);

  /* Views */
  // TODO: 用 createElement() 根據 renderAs 做出 finalView
  const finalView = useMemo(() => {
    switch (renderAs) {
      case 'button':
        return createElement(
          'button',
          {
            className: cn(
              defaultButtonStyle,
              disabled && disabledButtonStyle,
              className
            ),
            disabled,
            type,
            ref: buttonRef,
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
      case 'label':
        return createElement(
          'label',
          {
            className: cn(
              defaultButtonStyle,
              disabled && disabledButtonStyle,
              className
            ),
            disabled,
            type,
            ref: labelRef,
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
      default:
        return <React.Fragment />;
    }
  }, [
    renderAs,
    disabled,
    type,
    className,
    buttonRef,
    labelRef,
    rest,
    children,
    rippleContainerRef,
  ]);

  /* Main */
  return finalView;
}

export default memo(ButtonBase);
