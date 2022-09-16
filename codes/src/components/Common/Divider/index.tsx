import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { DividerProps } from './types';

function Divider(props: DividerProps): React.ReactElement {
  /* States */
  const {
    orientation = 'horizontal',
    color,
    gradientColor = false,
    thick = 1,
    style = 'solid',
    labelStyle,
    labelAlign = 'center',
    className,
    ...rest
  } = props;
  const defaultStyle = useMemo(
    () =>
      css({
        position: 'relative',
        border: 'none',
        textAlign: labelAlign ? labelAlign : undefined,
        overflow: 'visible',
      }),
    [labelAlign]
  );
  const styleByOrientation = useMemo(() => {
    if (orientation === 'horizontal') {
      return css({
        width: '100%',
        borderBottomWidth: `${thick}px`,
        borderBottomStyle: style,
        borderBottomColor: color && !gradientColor ? color : undefined,
        borderImage:
          color && gradientColor
            ? color
            : color && !gradientColor
            ? undefined
            : 'linear-gradient(to right, #eee 0%, #78909c 25%, #78909c 75%, #eee 100%)',
        borderImageSlice: '1',
      });
    }
    if (orientation === 'vertical') {
      return css({
        height: '100%',
        borderLeftWidth: `${thick}px`,
        borderLeftStyle: style,
        borderLeftColor: color && !gradientColor ? color : undefined,
        borderImage:
          color && gradientColor
            ? color
            : color && !gradientColor
            ? undefined
            : 'linear-gradient(to bottom, #eee 0%, #78909c 25%, #78909c 75%, #eee 100%)',
        borderImageSlice: '1',
      });
    }
    return '';
  }, [orientation, thick, style, color, gradientColor]);

  /* Main */
  return (
    <hr
      className={cn(defaultStyle, styleByOrientation, labelStyle, className)}
      {...rest}
    />
  );
}

export default memo(Divider);
