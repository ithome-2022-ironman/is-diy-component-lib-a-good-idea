import React, { memo, useCallback } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { SpaceWrapperProps, GetSpaceArgs, GetSpaceResult } from './types';

function SpaceWrapper(props: SpaceWrapperProps): React.ReactElement {
  /* States */
  const { children, margin, padding, className, ...rest } = props;

  /* Functions */
  const getSpace = useCallback((args: GetSpaceArgs) => {
    let result: GetSpaceResult = {};
    if (typeof args.space === 'number') {
      result[args.type] = `${args.space}px`;
    } else if (Array.isArray(args.space)) {
      result[args.type] = args.space
        .slice(0, 4)
        .map((m) => `${m}px`)
        .join(' ');
    } else {
      result[args.type] = '0px';
    }
    return result;
  }, []);

  /* Main */
  return (
    <div
      className={cn(
        css({
          margin: getSpace({ type: 'margin', space: margin }).margin,
          padding: getSpace({ type: 'padding', space: padding }).padding,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default memo(SpaceWrapper);
