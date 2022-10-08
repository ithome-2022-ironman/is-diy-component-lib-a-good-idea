import React, { memo, useId, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { InputSwitchProps } from './types';

const labelStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
  '& input': {
    appearance: 'none',
  },
});

function InputSwitch(props: InputSwitchProps): React.ReactElement {
  /* States */
  const {
    children,
    labelPosition = 'left',
    classes = { label: '', inputButton: '', track: '' },
    checked,
    ...rest
  } = props;
  delete rest.className;
  const inputId = useId();
  const labelPositionStyle = useMemo(() => {
    switch (labelPosition) {
      case 'top':
        return css({
          flexDirection: 'column',
          justifyContent: 'center',
        });
      case 'right':
        return css({
          flexDirection: 'row-reverse',
        });
      case 'bottom':
        return css({
          flexDirection: 'column-reverse',
          justifyContent: 'center',
        });
      case 'left':
      default:
        return '';
    }
  }, [labelPosition]);
  const trackStyle = useMemo(
    () =>
      css({
        width: '48px',
        height: '24px',
        position: 'relative',
        '&::before': {
          content: '""',
          width: '48px',
          height: '18px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundColor: 'transparent',
          border: `1px solid ${checked ? '#5c7f67' : '#333'}`,
          borderRadius: '16px',
          transform: 'translate(-50%, -50%)',
        },
        '&&::after': {
          content: '""',
          boxSizing: 'border-box',
          width: '16px',
          height: '16px',
          position: 'absolute',
          top: '50%',
          left: '9px',
          backgroundColor: checked ? '#5c7f67' : 'transparent',
          border: `1px solid ${checked ? '#5c7f67' : '#333'}`,
          borderRadius: '16px',
          transform: checked
            ? 'translate(135%, -50%)'
            : 'translate(-50%, -50%)',
          transition: 'all .2s ease',
        },
      }),
    [checked]
  );

  /* Main */
  return (
    <label
      htmlFor={inputId}
      className={cn(labelStyle, labelPositionStyle, classes.label)}
    >
      {children}
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        className={cn(classes.inputButton)}
        {...rest}
      />
      <span className={cn(trackStyle, classes.track)} />
    </label>
  );
}

export default memo(InputSwitch);
