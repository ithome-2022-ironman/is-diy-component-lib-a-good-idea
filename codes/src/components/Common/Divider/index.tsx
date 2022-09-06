import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { DividerProps, Property } from './types';

function Divider(props: DividerProps): React.ReactElement {
  /* States */
  const {
    orientation = 'horizontal',
    color,
    thick = '1px',
    className,
    ...rest
  } = props;
  const defaultStyle = useMemo(
    () =>
      css({
        height:
          orientation === 'horizontal' ? (thick as Property.Height) : 'auto',
        width: orientation === 'vertical' ? (thick as Property.Width) : '100%',
        alignSelf: 'stretch',
        border: 'none',
        background: color
          ? color
          : `linear-gradient(to ${
              orientation === 'horizontal' ? 'right' : 'bottom'
            }, #eee 0%, #78909c 25%, #78909c 75%, #eee 100%)`,
      }),
    [orientation, color, thick]
  );

  /* Main */
  return <hr className={cn(defaultStyle, className)} {...rest} />;
}

export default memo(Divider);
