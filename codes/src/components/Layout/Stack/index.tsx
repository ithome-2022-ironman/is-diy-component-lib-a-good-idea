import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { StackProps } from './types';

function Stack(props: StackProps): React.ReactElement {
  /* States */
  const {
    children,
    gap = 16,
    direction = 'column',
    className,
    ...rest
  } = props;

  /* Main */
  return (
    <div
      className={cn(
        css({
          display: 'flex',
          gap: `${gap}px`,
          flexDirection: direction,
          flexWrap: 'wrap',
        }),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default memo(Stack);
