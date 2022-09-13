import React, { memo, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { AvatarGroupProps } from './types';

function AvatarGroup(props: AvatarGroupProps): React.ReactElement {
  /* States */
  const { children } = props;
  const [childrenArr, setChildrenArr] = useState<JSX.Element[]>([]);

  /* Hooks */
  useEffect(() => {
    const result: JSX.Element[] = [];
    React.Children.forEach(children, (child) => {
      const c = child as JSX.Element;
      result.push(React.cloneElement(c, { withBorder: true }));
    });
    setChildrenArr(result.reverse());
  }, [children]);

  /* Main */
  return (
    <div
      className={cn(
        css({
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
          paddingLeft: 'calc(12px - 2px - 2px)',
          '& > div': {
            marginLeft: '-12px',
          },
        })
      )}
    >
      {childrenArr.map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </div>
  );
}

export default memo(AvatarGroup);
