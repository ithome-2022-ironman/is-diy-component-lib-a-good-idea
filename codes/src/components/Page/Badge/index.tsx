import React, { memo } from 'react';
import Badge from '@Components/Common/Badge';
import Button2 from '@Components/Common/Button2';
import Divider from '@Components/Common/Divider';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';

function BadgeDemo(): React.ReactElement {
  /* Main */
  return (
    <Stack divider={<Divider />}>
      <Stack direction="row">
        <SpaceWrapper padding={24}>
          <Badge badgeContent="3">
            <Button2>top right</Button2>
          </Badge>
        </SpaceWrapper>
        <SpaceWrapper padding={24}>
          <Badge badgeContent="3" vertical="bottom">
            <Button2>bottom right</Button2>
          </Badge>
        </SpaceWrapper>
        <SpaceWrapper padding={24}>
          <Badge badgeContent="3" horizontal="left">
            <Button2>top left</Button2>
          </Badge>
        </SpaceWrapper>
        <SpaceWrapper padding={24}>
          <Badge badgeContent="3" horizontal="left" vertical="bottom">
            <Button2>bottom left</Button2>
          </Badge>
        </SpaceWrapper>
      </Stack>
      <SpaceWrapper padding={24}>
        <Badge variant="dot">
          <Button2>dot badge</Button2>
        </Badge>
      </SpaceWrapper>
      <SpaceWrapper padding={24}>
        <Badge>
          <Button2>no badge content</Button2>
        </Badge>
      </SpaceWrapper>
      <SpaceWrapper padding={24}>
        <Badge badgeContent="999">
          <Button2>long badge content</Button2>
        </Badge>
      </SpaceWrapper>
    </Stack>
  );
}

export default memo(BadgeDemo);
