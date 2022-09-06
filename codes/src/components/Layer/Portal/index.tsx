import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import type { PortalProps } from './types';

function Portal(props: PortalProps): React.ReactElement {
  /* States */
  const { children, container = document.body } = props;

  /* Main */
  return ReactDOM.createPortal(children, container);
}

export default memo(Portal);
