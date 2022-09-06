import React, { memo } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import { css } from '@emotion/css';
import Link from '@Components/Common/Link';
import Stack from '@Components/Layout/Stack';

const appContainer = css({
  height: '100%',
  display: 'flex',
  backgroundColor: '#f9f4ef',
});
const side = css({ height: '100%', flex: '1 1 30%' });
const main = css({ height: '100%', flex: '1 1 70%' });

function Routes(): React.ReactElement {
  /* Main */
  return (
    <Router>
      <div className={cn(appContainer)}>
        <div className={cn(side)}>
          <Stack>
            <Link to="/">intro</Link>
            <Link to="/01">day 1</Link>
            <Link to="/02">day 2</Link>
          </Stack>
        </div>
        <div className={cn(main)}>
          <Switch>
            <Route exact path="/">
              <div>hello world</div>
            </Route>
            <Route path="/01">
              <div>day 01</div>
            </Route>
            <Route path="/02">
              <div>day 02</div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default memo(Routes);
