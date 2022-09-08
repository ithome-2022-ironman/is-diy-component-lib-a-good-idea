import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { AccordionBodyProps } from './types';

const bodyStyle = css({
  height: '0px',
  opacity: 0,
  transition: 'all .2s ease',
});
const bodyOpenStyle = css({
  height: '100%',
  opacity: 1,
});

function AccordionBody(props: AccordionBodyProps): React.ReactElement {
  /* States */
  const { open, children, accordionBodyClass = '', ...rest } = props;
  delete rest.className;

  /* Main */
  return (
    <div
      className={cn(bodyStyle, open && bodyOpenStyle, accordionBodyClass)}
      {...rest}
    >
      {children}
    </div>
  );
}

AccordionBody.displayName = 'AccordionBody';

export default memo(AccordionBody);
