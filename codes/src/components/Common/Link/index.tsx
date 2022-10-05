import React, { memo } from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { LinkProps } from './types';

function Link(props: LinkProps): React.ReactElement {
  /* States */
  const { className, ...rest } = props;

  /* Main */
  return (
    <ReactRouterDomLink className={cn('linkThemeStyle', className)} {...rest} />
  );
}

export default memo(Link);
