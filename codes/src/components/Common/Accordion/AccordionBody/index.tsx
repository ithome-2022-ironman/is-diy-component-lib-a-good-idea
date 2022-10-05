import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { AccordionBodyProps } from './types';

function AccordionBody(props: AccordionBodyProps): React.ReactElement {
  /* States */
  const { open, children, accordionBodyClass = '', ...rest } = props;
  delete rest.className;
  const bodyStyle = useMemo(
    () =>
      css({
        height: open ? 'auto' : '0px',
        visibility: open ? 'unset' : 'hidden',
        overflow: open ? 'visible' : 'hidden',
        transform: `scaleY(${open ? '100%' : '0%'})`,
        transformOrigin: 'top left',
        transitionDuration: '.2s',
        transitionProperty: 'transform, height'
      }),
    [open]
  );

  /* Main */
  return (
    <div className={cn(bodyStyle, accordionBodyClass)} {...rest}>
      {children}
    </div>
  );
}

AccordionBody.displayName = 'AccordionBody';

export default memo(AccordionBody);
