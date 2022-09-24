import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { css, keyframes } from '@emotion/css';
import cn from 'classnames';
import { debounce } from 'lodash';
import Portal from '@Components/Layer/Portal';
import useDelayUnmount from '@Hooks/useDelayUnmount';
import type { ToolTipProps } from './types';

const opacityIn = keyframes`
from {
  opacity: 0
}
to {
  opacity: 1
}
`;
const opacityOut = keyframes`
from {
  opacity: 1
}
to {
  opacity: 0
}
`;
const baseStyle = css({
  position: 'fixed',
  padding: '4px 8px',
  borderRadius: '4px',
  whiteSpace: 'nowrap',
  backgroundColor: 'rgba(113, 92, 87, .7)',
  color: '#fff',
  fontSize: '14px',
});
const baseArrowStyle = css({
  width: '8px',
  height: '8px',
  position: 'absolute',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(113, 92, 87, .7)',
    transform: 'rotate(45deg)',
  },
});

function Tooltip(props: ToolTipProps): React.ReactElement {
  /* States */
  const { children, tip, gap = 8, position = 'bottom', arrow = true } = props;
  const childRef = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [childPosition, setChildPosition] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const shouldShow = useDelayUnmount(show, 200);

  /* Functions */
  const getChildPosition = useCallback((): void => {
    if (childRef.current) {
      const { top, right, bottom, left } =
        childRef.current.children[0].getBoundingClientRect();
      setChildPosition({ top, right, bottom, left });
    }
  }, [childRef]);
  const debouncedGetChildPosition = debounce(getChildPosition, 300);

  /* Hooks */
  useEffect(() => {
    getChildPosition();
  }, [getChildPosition]);
  useEffect(() => {
    window.addEventListener('resize', debouncedGetChildPosition);
    return () => {
      window.removeEventListener('resize', debouncedGetChildPosition);
    };
  }, [debouncedGetChildPosition]);

  /* Views */
  const animationStyle = useMemo(
    () => css({ animation: `${show ? opacityIn : opacityOut} .2s ease` }),
    [show]
  );
  const finalStyle = useMemo(() => {
    switch (position) {
      case 'top-left':
        return css({
          top: `${childPosition.top}px`,
          left: `${childPosition.left}px`,
          transform: `translateY(calc(-100% - ${gap}px))`,
        });
      case 'top':
        return css({
          top: `${childPosition.top}px`,
          left: `${(childPosition.left + childPosition.right) / 2}px`,
          transform: `translateX(-50%) translateY(calc(-100% - ${gap}px))`,
        });
      case 'top-right':
        return css({
          top: `${childPosition.top}px`,
          left: `${childPosition.right}px`,
          transform: `translateX(-100%) translateY(calc(-100% - ${gap}px))`,
        });
      case 'right-top':
        return css({
          top: `${childPosition.top}px`,
          left: `${childPosition.right + gap}px`,
        });
      case 'right':
        return css({
          top: `${(childPosition.top + childPosition.bottom) / 2}px`,
          left: `${childPosition.right + gap}px`,
          transform: 'translateY(-50%)',
        });
      case 'right-bottom':
        return css({
          top: `${childPosition.bottom}px`,
          left: `${childPosition.right + gap}px`,
          transform: 'translateY(-100%)',
        });
      case 'bottom-left':
        return css({
          top: `${childPosition.bottom + gap}px`,
          left: `${childPosition.left}px`,
        });
      case 'bottom':
        return css({
          top: `${childPosition.bottom + gap}px`,
          left: `${(childPosition.left + childPosition.right) / 2}px`,
          transform: 'translateX(-50%)',
        });
      case 'bottom-right':
        return css({
          top: `${childPosition.bottom + gap}px`,
          left: `${childPosition.right}px`,
          transform: 'translateX(-100%)',
        });
      case 'left-top':
        return css({
          top: `${childPosition.top}px`,
          left: `${childPosition.left}px`,
          transform: `translateX(calc(-100% - ${gap}px))`,
        });
      case 'left':
        return css({
          top: `${(childPosition.top + childPosition.bottom) / 2}px`,
          left: `${childPosition.left}px`,
          transform: `translateX(calc(-100% - ${gap}px)) translateY(calc(-50%))`,
        });
      case 'left-bottom':
        return css({
          top: `${childPosition.bottom}px`,
          left: `${childPosition.left}px`,
          transform: `translateX(calc(-100% - ${gap}px)) translateY(-100%)`,
        });
      default:
        return css({
          top: `${childPosition.bottom + gap}px`,
          left: `${(childPosition.left + childPosition.right) / 2}px`,
          transform: 'translateX(-50%)',
        });
    }
  }, [position, childPosition, gap]);
  const positionArrowStyle = useMemo(() => {
    switch (position) {
      case 'bottom-left':
      case 'bottom-right':
      case 'bottom':
        return css({
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          '&::after': {
            top: '6px',
          },
        });
      case 'right-top':
      case 'right-bottom':
      case 'right':
        return css({
          top: '50%',
          left: '-8px',
          transform: 'translateY(-50%)',
          '&::after': {
            left: '6px',
          },
        });
      case 'top-left':
      case 'top-right':
      case 'top':
        return css({
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          '&::after': {
            top: '-6px',
          },
        });
      case 'left-top':
      case 'left-bottom':
      case 'left':
        return css({
          top: '50%',
          right: '-8px',
          transform: 'translateY(-50%)',
          '&::after': {
            right: '6px',
          },
        });
      default:
        return '';
    }
  }, [position]);

  /* Main */
  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onMouseOver: () => setShow(true),
        onMouseOut: () => setShow(false),
        ref: childRef,
      })}
      {shouldShow && (
        <Portal>
          <span className={cn(baseStyle, animationStyle, finalStyle)}>
            {arrow && (
              <span className={cn(baseArrowStyle, positionArrowStyle)} />
            )}
            {tip}
          </span>
        </Portal>
      )}
    </React.Fragment>
  );
}

export default memo(Tooltip);
