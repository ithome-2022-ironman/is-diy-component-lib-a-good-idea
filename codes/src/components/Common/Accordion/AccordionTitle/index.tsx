import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import { ExpendLessIcon } from '@Assets/icons';
import ButtonBase from '@Components/Base/ButtonBase';
import type { AccordionTitleProps } from './types';

const title = css({
  width: '100%',
  minHeight: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: 'none',
  backgroundColor: 'transparent',
  fontSize: 'inherit',
});
const iconStyle = css({
  transition: 'transform .2s ease',
});
const transformIcon = css({
  transform: 'rotate(180deg)',
});

function AccordionTitle(props: AccordionTitleProps): React.ReactElement {
  /* States */
  const { children, accordionTitleClass = '', open, onClick, ...rest } = props;
  delete rest.className;

  /* Main */
  return (
    <ButtonBase className={cn(title, accordionTitleClass)} onClick={onClick}>
      {children}
      <ExpendLessIcon className={cn(iconStyle, open && transformIcon)} />
    </ButtonBase>
  );
}

AccordionTitle.displayName = 'AccordionTitle';

export default memo(AccordionTitle);
