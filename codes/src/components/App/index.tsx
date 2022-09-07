import React, { memo } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import { css } from '@emotion/css';
import Link from '@Components/Common/Link';
import Stack from '@Components/Layout/Stack';
import Day02 from '@Components/Page/day02';
import Day03 from '@Components/Page/day03';
import Day09 from '@Components/Page/day09';
import Day10 from '@Components/Page/day10';

const appContainer = css({
  height: '100%',
  display: 'flex',
  backgroundColor: '#f9f4ef',
});
const side = css({ height: '100%', maxWidth: '240px', flex: '1 1 auto' });
const main = css({ height: '100%', flex: '1 1 auto' });

function Routes(): React.ReactElement {
  /* Main */
  return (
    <Router>
      <div className={cn(appContainer)}>
        <div className={cn(side)}>
          <Stack>
            <Link to="/">前言：為什麼不用人家寫好的東西</Link>
            <Link to="/day02">2: Container</Link>
            <Link to="/day03">3: Typography</Link>
            <Link to="/day09">9: ButtonBase</Link>
            <Link to="/day10">10: Button</Link>
          </Stack>
        </div>
        <div className={cn(main)}>
          <Switch>
            <Route exact path="/">
              <div>簡介</div>
            </Route>
            <Route path="/day02">
              <Day02 />
            </Route>
            <Route path="/day03">
              <Day03 />
            </Route>
            <Route path="/day09">
              <Day09 />
            </Route>
            <Route path="/day10">
              <Day10 />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default memo(Routes);
