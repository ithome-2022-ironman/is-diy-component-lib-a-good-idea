import React, { memo } from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { LinkProps } from './types';

const linkStyle = css({
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: '#8c7851',
  textDecoration: 'none',
  transition: 'all .2s ease',
  '&:visited': {
    color: '#51658c',
  },
  '&:hover': {
    color: '#b29c59',
    textDecoration: 'underline',
  },
});

function Link(props: LinkProps): React.ReactElement {
  /* States */
  const { className, ...rest } = props;

  /* Main */
  return <ReactRouterDomLink className={cn(linkStyle, className)} {...rest} />;
}

export default memo(Link);
