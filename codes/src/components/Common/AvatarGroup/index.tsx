import React, { memo, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Avatar from '@Components/Common/Avatar';
import type { AvatarGroupProps } from './types';

function AvatarGroup(props: AvatarGroupProps): React.ReactElement {
  /* States */
  const { children, max, className, ...rest } = props;
  const [childrenArr, setChildrenArr] = useState<JSX.Element[]>([]);

  /* Hooks */
  useEffect(() => {
    let result: JSX.Element[] = [];
    React.Children.forEach(children, (child) => {
      const c = child as JSX.Element;
      result.push(React.cloneElement(c, { withBorder: true }));
    });
    if (typeof max === 'number' && max > 0) {
      result = result.slice(0, max);
      result.push(
        <Avatar withBorder>+{React.Children.count(children) - max}</Avatar>
      );
    }
    setChildrenArr(result.reverse());
  }, [children, max]);

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
        }),
        className
      )}
      {...rest}
    >
      {childrenArr.map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </div>
  );
}

export default memo(AvatarGroup);
