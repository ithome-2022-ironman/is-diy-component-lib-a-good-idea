import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { ContainerProps, BreakPoints, MediaQuery } from './types';

const BREAK_POINTS: BreakPoints = [
  { scale: 'md', width: 720 },
  { scale: 'lg', width: 960 },
  { scale: 'xl', width: 1200 },
];
const MEDIA_QUERY = BREAK_POINTS.reduce(
  (prev, current) => ({
    ...prev,
    [current.scale]: `@media (min-width: ${current.width}px)`,
  }),
  {}
) as MediaQuery;

function Container(props: ContainerProps): React.ReactElement {
  /* States */
  const {
    children,
    classes = { wrapper: '', child: '' },
    renderAs = 'div',
    disablePadding = false,
    ...rest
  } = props;
  delete rest.className;
  const wrapperStyle = useMemo(() => css({ width: '100%' }), []);
  const childStyle = useMemo(
    () =>
      css({
        height: '100%',
        margin: 'auto',
        display: 'flex',
        padding: disablePadding ? undefined : '16px',
        [MEDIA_QUERY.md]: {
          maxWidth: '720px',
        },
        [MEDIA_QUERY.lg]: {
          maxWidth: '960px',
        },
        [MEDIA_QUERY.xl]: {
          maxWidth: '1200px',
          padding: disablePadding ? undefined : '24px',
        },
      }),
    [disablePadding]
  );

  /* Views */
  const child = useMemo(
    () => (
      <div className={cn('ContainerChild', childStyle, classes.child)}>
        {children}
      </div>
    ),
    [childStyle, classes.child, children]
  );
  const FinalRender = useMemo(
    () =>
      React.createElement(
        renderAs,
        {
          className: cn('ContainerWrapper', wrapperStyle, classes.wrapper),
          ...rest,
        },
        child
      ),
    [renderAs, wrapperStyle, classes.wrapper, rest, child]
  );

  /* Main */
  return FinalRender;
}

export default memo(Container);
