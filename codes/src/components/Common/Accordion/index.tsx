import React, { memo, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import { ExpendLessIcon } from '@Assets/icons';
import type { AccordionProps } from './types';

const title = css({
  minHeight: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
});
const iconStyle = css({
  transform: 'rotate(0deg)',
});
const transformIcon = css({
  transform: 'rotate(180deg)',
  transition: 'transform .2s ease',
});

function Accordion(props: AccordionProps): React.ReactElement {
  /* States */
  const { classes = { wrapper: '', title: '', body: '' }, ...rest } = props;
  delete rest.className;
  const [open, setOpen] = useState<boolean>(false);

  /* Functions */
  const toggleAccordion = useCallback((): void => {
    setOpen((prev) => !prev);
  }, []);

  /* Main */
  return (
    <div className={cn(classes.wrapper)}>
      <div className={cn(title, classes.title)} onClick={toggleAccordion}>
        summary
        <ExpendLessIcon className={cn(iconStyle, open && transformIcon)} />
      </div>
      <div className={cn(classes.body)}>body</div>
    </div>
  );
}

export default memo(Accordion);
