import React, { memo } from 'react';
import useSystemColorScheme from '@Hooks/useSystemColorScheme';

function UseSystemColorSchemeDemo(): React.ReactElement {
  /* States */
  const scheme = useSystemColorScheme();

  /* Main */
  return <div>current system color scheme: {scheme}</div>;
}

export default memo(UseSystemColorSchemeDemo);
