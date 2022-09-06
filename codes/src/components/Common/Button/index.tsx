import React, { memo, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import ButtonBase from '@Components/Base/ButtonBase';
import type { ButtonProps } from './types';

function ButtonContained(props: ButtonProps): React.ReactElement {
  /* States */
  const {
    children,
    variant = 'contained',
    className,
    disabled,
    ...rest
  } = props;
  const baseStyle = useMemo(
    () =>
      css({
        minWidth: '40px',
        minHeight: '28px',
        gap: '4px',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: '.5px',
        textTransform: 'uppercase',
      }),
    []
  );
  const variantStyle = useMemo(() => {
    if (variant === 'outlined') {
      return css({
        border: disabled
          ? '1px solid rgba(113, 92, 87, .4)'
          : '1px solid #4e342e',
        color: disabled ? 'rgba(113, 92, 87, .4)' : '#4e342e',
        transition: 'border .2s ease',
        '&:hover': {
          border: '1px solid #362420',
        },
      });
    }
    if (variant === 'text') {
      return css({
        border: 'none',
        color: disabled ? 'rgba(113, 92, 87, .4)' : '#4e342e',
        transition: 'color .2s ease',
        '&:hover': {
          color: '#362420',
        },
      });
    }
    return css({
      border: 'none',
      backgroundColor: disabled ? 'rgba(113, 92, 87, .4)' : '#4e342e',
      color: '#fff',
      transition: 'background-color .2s ease',
      '&:hover': {
        backgroundColor: '#362420',
      },
    });
  }, [variant, disabled]);

  /* Main */
  return (
    <ButtonBase
      className={cn(baseStyle, variantStyle, className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
}

export default memo(ButtonContained);
