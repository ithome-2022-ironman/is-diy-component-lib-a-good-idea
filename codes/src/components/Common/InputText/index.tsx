import React, { memo, useId } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { InputTextProps } from './types';

const InputTextLabel = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});
const InputTextLabelText = css({
  marginBottom: '4px',
});
const InputTextStyle = css({
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  border: 'none',
  outline: '1px solid #3d1f00',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  backgroundColor: 'transparent',
  color: '#3d1f00',
  transition: 'outline .2s ease',
  '&::placeholder': {
    color: '#3d1f00',
  },
  '&::selection': {
    backgroundColor: '#211720',
    color: '#dc944c',
  },
});
const InputTextError = css({
  '& input': {
    position: 'relative',
    outline: '1px solid #c11616',
    boxShadow: '0 0 2px #c11616',
  },
  '& .InputTextHelperText': {
    color: '#c11616',
  },
});

function InputText(props: InputTextProps): React.ReactElement {
  /* States */
  const {
    labelText = '',
    error = false,
    helperText = '',
    classes = { label: '', input: '', helperText: '' },
    ...rest
  } = props;
  delete props.className;
  const inputId = useId();

  /* Main */
  return (
    <label
      htmlFor={inputId}
      className={cn(InputTextLabel, classes.label, error && InputTextError)}
    >
      {labelText && <span className={cn(InputTextLabelText)}>{labelText}</span>}
      <input
        id={inputId}
        className={cn(InputTextStyle, classes.input)}
        type="text"
        {...rest}
      />
      {helperText && (
        <span className={cn('InputTextHelperText', classes.helperText)}>
          {helperText}
        </span>
      )}
    </label>
  );
}

export default memo(InputText);
