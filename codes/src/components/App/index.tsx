import React, { memo } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import { css } from '@emotion/css';
import Link from '@Components/Common/Link';
import Stack from '@Components/Layout/Stack';
import Container from '@Components/Page/Container';
import Typography from '@Components/Page/Typography';
import ButtonBase from '@Components/Page/ButtonBase';
import Button from '@Components/Page/Button';
import UploadButton from '@Components/Page/UploadButton';
import Tabs from '@Components/Page/Tabs';
import Accordion from '@Components/Page/Accordion';
import Accordions from '@Components/Page/Accordions';
import Tooltip from '@Components/Page/Tooltip';

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
            <Link to="/Container">Container</Link>
            <Link to="/Typography">Typography</Link>
            <Link to="/ButtonBase">ButtonBase</Link>
            <Link to="/Button">Button</Link>
            <Link to="/UploadButton">UploadButton</Link>
            <Link to="/Tabs">Tabs</Link>
            <Link to="/Accordion">Accordion</Link>
            <Link to="/Accordions">Accordions</Link>
            <Link to="/Tooltip">Tooltip</Link>
          </Stack>
        </div>
        <div className={cn(main)}>
          <Switch>
            <Route exact path="/">
              <div>簡介</div>
            </Route>
            <Route path="/Container">
              <Container />
            </Route>
            <Route path="/Typography">
              <Typography />
            </Route>
            <Route path="/ButtonBase">
              <ButtonBase />
            </Route>
            <Route path="/Button">
              <Button />
            </Route>
            <Route path="/UploadButton">
              <UploadButton />
            </Route>
            <Route path="/Tabs">
              <Tabs />
            </Route>
            <Route path="/Accordion">
              <Accordion />
            </Route>
            <Route path="/Accordions">
              <Accordions />
            </Route>
            <Route path="/Tooltip">
              <Tooltip />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default memo(Routes);
