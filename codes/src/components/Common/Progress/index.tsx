import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import useScrollPercentage from '@Hooks/useScrollPercentage';
import type { ProgressProps } from './types';

function Progress(props: ProgressProps): React.ReactElement {
  /* States */
  const { height = 4, bg = 'linear-gradient(to right, #78909c, #4e342e)' } =
    props;
  const percentage = useScrollPercentage();

  const finalHeight = useMemo(() => (height ? Math.ceil(height) : 4), [height]);

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

export default memo(Progress);
