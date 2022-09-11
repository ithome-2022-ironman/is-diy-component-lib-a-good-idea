import React, { memo, useState } from 'react';
import Button from '@Components/Common/Button';
import Drawer from '@Components/Common/Drawer';

function DrawerDemo(): React.ReactElement {
  /* States */
  const [open, setOpen] = useState<boolean>(false);

  /* Main */
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div>drawer content</div>
      </Drawer>
    </React.Fragment>
  );
}

export default memo(DrawerDemo);
