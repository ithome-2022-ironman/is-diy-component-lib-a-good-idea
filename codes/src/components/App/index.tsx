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
import Dialog from '@Components/Page/Dialog';
import Portal from '@Components/Page/Portal';
import Tabs from '@Components/Page/Tabs';
import Accordion from '@Components/Page/Accordion';
import Accordions from '@Components/Page/Accordions';
import Tooltip from '@Components/Page/Tooltip';
import UseElementIsScrollDown from '@Components/Page/useElementIsScrollDown';
import UseElementScrollPercentage from '@Components/Page/useElementScrollPercentage';
import TransitionEffect from '@Components/Page/TransitionEffect';

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
            <Link to="/Dialog">Dialog</Link>
            <Link to="/Portal">Portal</Link>
            <Link to="/Tabs">Tabs</Link>
            <Link to="/Accordion">Accordion</Link>
            <Link to="/Accordions">Accordions</Link>
            <Link to="/Tooltip">Tooltip</Link>
            <Link to="/useElementIsScrollDown">useElementIsScrollDown</Link>
            <Link to="/useElementScrollPercentage">
              useElementScrollPercentage
            </Link>
            <Link to="/TransitionEffect">TransitionEffect</Link>
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
            <Route path="/Dialog">
              <Dialog />
            </Route>
            <Route path="/Portal">
              <Portal />
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
            <Route path="/useElementIsScrollDown">
              <UseElementIsScrollDown />
            </Route>
            <Route path="/useElementScrollPercentage">
              <UseElementScrollPercentage />
            </Route>
            <Route path="/TransitionEffect">
              <TransitionEffect />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default memo(Routes);
