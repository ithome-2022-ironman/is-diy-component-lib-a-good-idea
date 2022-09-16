import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { StackProps } from './types';

function Stack(props: StackProps): React.ReactElement {
  /* States */
  const {
    children,
    gap = '16px',
    direction = 'column',
    justifyContent = 'center',
    alignItems = 'center',
    divider = null,
    className,
    ...rest
  } = props;

  /* Views */
  const finalRender = useMemo(() => {
    if (divider) {
      const withDivider: JSX.Element[] = [];
      React.Children.forEach(children, (child, index) => {
        withDivider.push(
          <React.Fragment key={`${index}-child`}>{child}</React.Fragment>,
          <React.Fragment key={`${index}-divider`}>{divider}</React.Fragment>
        );
      });
      withDivider.pop();
      return withDivider;
    }
    return children;
  }, [children, divider]);

  /* Main */
  return (
    <div
      className={cn(
        css({
          display: 'flex',
          gap,
          flexDirection: direction,
          flexWrap: 'wrap',
          justifyContent,
          alignItems,
        }),
        className
      )}
      {...rest}
    >
      {finalRender}
    </div>
  );
}

export default memo(Stack);
