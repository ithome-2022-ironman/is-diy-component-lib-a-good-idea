import React, { memo } from 'react';
import cn from 'classnames';
import scopedStyle from './index.module.css';

function App(): React.ReactElement {
  /* Main */
  return (
    <div className={cn(scopedStyle.main)}>
      <div>Hello world, this site is created by</div>
      <code className={cn(scopedStyle.mainCode)}>
        npx create-react-app &lt;your-app-name&gt; template --choffee
      </code>
    </div>
  );
}

export default memo(App);
