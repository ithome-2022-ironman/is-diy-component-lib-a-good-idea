import React, { memo, useState } from 'react';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import Button from '@Components/Common/Button';
import Drawer from '@Components/Common/Drawer';

function DrawerDemo(): React.ReactElement {
  /* States */
  const [openLeft, setOpenLeft] = useState<boolean>(false);
  const [openRight, setOpenRight] = useState<boolean>(false);
  const [openTop, setOpenTop] = useState<boolean>(false);
  const [openBottom, setOpenBottom] = useState<boolean>(false);

  /* Main */
  return (
    <SpaceWrapper padding={24}>
      <Stack direction="row">
        <Button onClick={() => setOpenLeft(true)}>left drawer</Button>
        <Drawer
          open={openLeft}
          onClose={() => setOpenLeft(false)}
          direction="left"
        >
          <div>left drawer</div>
        </Drawer>
        <Button onClick={() => setOpenRight(true)}>right drawer</Button>
        <Drawer
          open={openRight}
          onClose={() => setOpenRight(false)}
          direction="right"
        >
          <div>right drawer</div>
        </Drawer>
        <Button onClick={() => setOpenTop(true)}>top drawer</Button>
        <Drawer
          open={openTop}
          onClose={() => setOpenTop(false)}
          direction="top"
        >
          <div>top drawer</div>
        </Drawer>
        <Button onClick={() => setOpenBottom(true)}>bottom drawer</Button>
        <Drawer
          open={openBottom}
          onClose={() => setOpenBottom(false)}
          direction="bottom"
        >
          <div>bottom drawer</div>
        </Drawer>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(DrawerDemo);
