import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { ProgressBarProps } from './types';

function ProgressBar(props: ProgressBarProps): React.ReactElement {
  /* States */
  const {
    percentage,
    height = 4,
    width = '100%',
    color = 'linear-gradient(to right, #78909c, #4e342e)',
    bgColor = 'transparent',
    classes = { bar: '', barBackground: '' },
    barRounded = false,
  } = props;
  const finalHeight = useMemo(() => (height ? Math.ceil(height) : 4), [height]);
  const baseStyle = useMemo(
    () =>
      css({
        height: `${finalHeight}px`,
        width,
      }),
    [width, finalHeight]
  );

  /* Main */
  return (
    <div
      className={cn(
        baseStyle,
        css({
          background: bgColor,
        }),
        classes.barBackground
      )}
    >
      <div
        className={cn(
          baseStyle,
          css({
            background: color,
            clipPath: barRounded
              ? `inset(0 ${100 - percentage}% 0 0 round ${finalHeight}px)`
              : `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`,
            transition: 'clip-path .2s ease',
          }),
          classes.bar
        )}
      />
    </div>
  );
}

export default memo(ProgressBar);
