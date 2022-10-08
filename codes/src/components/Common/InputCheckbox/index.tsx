import React, { memo, useId, useMemo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import { CheckboxIcon, CheckboxOutlineIcon } from '@Assets/icons';
import type { InputCheckboxProps } from './types';

const inputStyle = css({
  all: 'unset',
  border: 'none',
});

function InputCheckbox(props: InputCheckboxProps): React.ReactElement {
  /* States */
  const {
    children,
    labelPosition = 'left',
    icon = <CheckboxOutlineIcon />,
    checkedIcon = <CheckboxIcon />,
    iconSvgFill = {
      icon: '#333',
      checkedIcon: '#A0522D',
    },
    checked,
    ...rest
  } = props;
  const checkboxId = useId();
  const finalFlexDirection = useMemo(() => {
    switch (labelPosition) {
      case 'bottom':
        return 'column-reverse';
      case 'top':
        return 'column';
      case 'left':
        return 'row-reverse';
      case 'right':
      default:
        return 'row';
    }
  }, [labelPosition]);
  const baseStyle = useMemo(
    () =>
      css({
        width: children ? 'auto' : '24px',
        height: children ? 'auto' : '24px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }),
    [children]
  );
  const labelStyle = useMemo(
    () =>
      css({
        height: children ? undefined : '100%',
        width: children ? undefined : '100%',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: finalFlexDirection,
        position: children ? 'relative' : 'absolute',
        gap: '4px',
        inset: '0',
        cursor: 'pointer',
      }),
    [children, finalFlexDirection]
  );
  const alignStyle = useMemo(() => (children ? css() : ''), [children]);

  /* Views */
  const finalIcon = useMemo(
    () => React.cloneElement(icon as JSX.Element, { fill: iconSvgFill.icon }),
    [icon, iconSvgFill.icon]
  );
  const finalCheckedIcon = useMemo(
    () =>
      React.cloneElement(checkedIcon as JSX.Element, {
        fill: iconSvgFill.checkedIcon,
      }),
    [checkedIcon, iconSvgFill.checkedIcon]
  );

  /* Main */
  return (
    <span className={cn(baseStyle, alignStyle)}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        className={cn(inputStyle)}
        hidden={!!children}
        {...rest}
      />
      <label htmlFor={checkboxId} className={cn(labelStyle)}>
        {children}
        {checked ? finalCheckedIcon : finalIcon}
      </label>
    </span>
  );
}

export default memo(InputCheckbox);
