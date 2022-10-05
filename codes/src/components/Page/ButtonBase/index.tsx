import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import ButtonBase from '@Components/Base/ButtonBase';
import { PhotoCameraIcon } from '@Assets/icons';

const baseStyle = css({
  minWidth: '60px',
  minHeight: '40px',
  padding: '8px 16px',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#4e342e',
});
const iconButton = css({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid #4e342e',
});

function ButtonBaseDemo(): React.ReactElement {
  return (
    <SpaceWrapper padding={24}>
      <Stack direction="row">
        <ButtonBase className={cn(baseStyle)}>base button</ButtonBase>
        <ButtonBase className={cn(iconButton)}>
          <PhotoCameraIcon width={16} fill="#4e342e" />
        </ButtonBase>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(ButtonBaseDemo);
