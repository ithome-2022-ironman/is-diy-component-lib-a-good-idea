import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { TypographyProps } from './types';

function Typography(props: TypographyProps): React.ReactElement {
  /* States */
  const { children, renderAs = 'p', className, ...rest } = props;
  const baseStyle = useMemo(
    () =>
      css({
        fontWeight: 300,
        lineHeight: 1.2,
        color: '#362420',
      }),
    []
  );
  const typographyStyle = useMemo(() => {
    if (renderAs === 'h1') {
      return css({
        marginBottom: '1rem',
        fontSize: '3rem',
      });
    }
    if (renderAs === 'h2') {
      return css({
        marginBottom: '.75rem',
        fontSize: '2.5rem',
      });
    }
    if (renderAs === 'h3') {
      return css({
        marginBottom: '.5rem',
        fontSize: '2rem',
      });
    }
    if (renderAs === 'p') {
      return css({
        paddingRight: '1rem',
      });
    }
    return '';
  }, [renderAs]);
  const FinalRender = useMemo(
    () =>
      React.createElement(
        renderAs,
        { className: cn(baseStyle, typographyStyle, className), ...rest },
        children
      ),
    [children, renderAs, baseStyle, typographyStyle, className, rest]
  );

  /* Main */
  return FinalRender;
}

export default memo(Typography);
