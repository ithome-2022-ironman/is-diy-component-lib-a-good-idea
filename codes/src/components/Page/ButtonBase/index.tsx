import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Stack from '@Components/Layout/Stack';
import ButtonBase from '@Components/Base/ButtonBase';
import { PhotoCameraIcon } from '@Assets/icons';

const baseStyle = css({
  border: '1px solid #4e342e',
  backgroundColor: 'transparent',
});
const iconButton = css({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
});

function ButtonBaseDemo(): React.ReactElement {
  return (
    <Stack direction="row">
      <ButtonBase className={cn(baseStyle)}>base button</ButtonBase>
      <ButtonBase className={cn(baseStyle, iconButton)}>
        <PhotoCameraIcon width={16} fill="#4e342e" />
      </ButtonBase>
    </Stack>
  );
}

export default memo(ButtonBaseDemo);
