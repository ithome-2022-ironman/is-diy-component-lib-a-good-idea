import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { BadgeProps } from './types';

const badgeWrapperStyle = css({
  display: 'inline-flex',
  flexShrink: 0,
  position: 'relative',
  verticalAlign: 'middle',
});
const baseStyle = css({
  position: 'absolute',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  fontSize: '11px',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
});
const standardStyle = css({
  minWidth: '20px',
  height: '20px',
  padding: '6px',
});
const dotStyle = css({
  width: '8px',
  height: '8px',
});

function Badge(props: BadgeProps): React.ReactElement {
  /* States */
  const {
    children,
    badgeContent,
    variant = 'standard',
    vertical = 'top',
    horizontal = 'right',
    badgeColor = '#000',
    badgeBgColor = 'rgb(102, 187, 106)',
  } = props;
  const colorStyle = useMemo(
    () =>
      css({
        color: badgeColor,
        background: badgeBgColor,
      }),
    [badgeColor, badgeBgColor]
  );
  const positionStyle = useMemo(
    () =>
      css({
        top: vertical === 'top' ? 0 : undefined,
        bottom: vertical === 'bottom' ? 0 : undefined,
        right: horizontal === 'right' ? 0 : undefined,
        left: horizontal === 'left' ? 0 : undefined,
        transform: `translateX(${
          horizontal === 'right' ? '50%' : '-50%'
        }) translateY(${vertical === 'top' ? '-50%' : '50%'})`,
      }),
    [vertical, horizontal]
  );
  const renderBadge = useMemo(() => {
    if (variant === 'dot') {
      return (
        <span className={cn(baseStyle, dotStyle, colorStyle, positionStyle)} />
      );
    }
    if (badgeContent) {
      return (
        <span
          className={cn(baseStyle, standardStyle, colorStyle, positionStyle)}
        >
          {badgeContent}
        </span>
      );
    }
    return <React.Fragment />;
  }, [variant, badgeContent, colorStyle, positionStyle]);

  /* Main */
  return (
    <span className={cn(badgeWrapperStyle)}>
      {children}
      {renderBadge}
    </span>
  );
}

export default memo(Badge);
