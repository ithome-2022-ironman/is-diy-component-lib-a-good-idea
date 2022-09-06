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
    divider = null,
    className,
    ...rest
  } = props;

  /* Views */
  const finalRender = useMemo(() => {
    if (divider) {
      const withDivider: JSX.Element[] = [];
      React.Children.forEach(children, (child, index) => {
        const c = child as JSX.Element;
        withDivider.push(
          <React.Fragment key={`${index}-child`}>{c}</React.Fragment>
        );
        withDivider.push(
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
