import React, { memo } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import { css } from '@emotion/css';
import Link from '@Components/Common/Link';
import Stack from '@Components/Layout/Stack';
import StackDemo from '@Components/Page/Stack';
import Image from '@Components/Page/Image';
import ButtonBase from '@Components/Page/ButtonBase';
import Buttons from '@Components/Page/Button';
import UploadButton from '@Components/Page/UploadButton';
import Dialog from '@Components/Page/Dialog';
import Drawer from '@Components/Page/Drawer';
import Portal from '@Components/Page/Portal';
import Toast from '@Components/Page/Toast';
import Toasts from '@Components/Page/Toasts';
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
            <Link to="/">簡介</Link>
            <Link to="/useElementIsScrollDown">useElementIsScrollDown</Link>
            <Link to="/useElementScrollPercentage">
              useElementScrollPercentage
            </Link>
            <Link to="/Stack">Stack</Link>
            <Link to="/Image">Image</Link>
            <Link to="/ButtonBase">ButtonBase</Link>
            <Link to="/Buttons">Buttons</Link>
            <Link to="/UploadButton">UploadButton</Link>
            <Link to="/Dialog">Dialog</Link>
            <Link to="/Drawer">Drawer</Link>
            <Link to="/Portal">Portal</Link>
            <Link to="/Toast">Toast</Link>
            <Link to="/Toasts">Toasts</Link>
            <Link to="/Tabs">Tabs</Link>
            <Link to="/Accordion">Accordion</Link>
            <Link to="/Accordions">Accordions</Link>
            <Link to="/Tooltip">Tooltip</Link>
            <Link to="/TransitionEffect">TransitionEffect</Link>
          </Stack>
        </div>
        <div className={cn(main)}>
          <Switch>
            <Route exact path="/">
              <div>
                2022 鐵人賽「我們可以不要 component library
                了嗎？」部分元件展示區
              </div>
            </Route>
            <Route path="/Stack">
              <StackDemo />
            </Route>
            <Route path="/Image">
              <Image />
            </Route>
            <Route path="/ButtonBase">
              <ButtonBase />
            </Route>
            <Route path="/Buttons">
              <Buttons />
            </Route>
            <Route path="/UploadButton">
              <UploadButton />
            </Route>
            <Route path="/Dialog">
              <Dialog />
            </Route>
            <Route path="/Drawer">
              <Drawer />
            </Route>
            <Route path="/Portal">
              <Portal />
            </Route>
            <Route path="/Toast">
              <Toast />
            </Route>
            <Route path="/Toasts">
              <Toasts />
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
