import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import useScrollPercentage from '@Hooks/useScrollPercentage';
import type { ProgressBarProps } from './types';

function ProgressBar(props: ProgressBarProps): React.ReactElement {
  /* States */
  const { height = 4, bg = 'linear-gradient(to right, #78909c, #4e342e)' } =
    props;
  const finalHeight = useMemo(() => (height ? Math.ceil(height) : 4), [height]);
  const percentage = useScrollPercentage();

  /* Main */
  return (
    <div
      className={cn(
        css({
          height: `${finalHeight}px`,
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          background: bg,
          clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`,
        })
      )}
    />
  );
}

export default memo(ProgressBar);
