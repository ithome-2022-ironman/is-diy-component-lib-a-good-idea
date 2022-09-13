import React, { memo } from 'react';
import Avatar from '@Components/Common/Avatar';
import AvatarGroup from '@Components/Common/AvatarGroup';
import Stack from '@Components/Layout/Stack';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import foxSrc from '@Assets/alexander-andrews-mEdKuPYJe1I-unsplash.jpg';
import { PhotoCameraIcon } from '@Assets/icons';

function AvatarDemo(): React.ReactElement {
  /* Main */
  return (
    <Stack>
      <SpaceWrapper padding={8}>
        <Avatar src={foxSrc} />
      </SpaceWrapper>
      <SpaceWrapper padding={8}>
        <Avatar>C</Avatar>
      </SpaceWrapper>
      <SpaceWrapper padding={8}>
        <Avatar>
          <PhotoCameraIcon fill="#fff" />
        </Avatar>
      </SpaceWrapper>
      <AvatarGroup>
        <Avatar src={foxSrc} />
        <Avatar>C</Avatar>
        <Avatar src="..." />
        <Avatar>
          <PhotoCameraIcon fill="#fff" />
        </Avatar>
        <Avatar>F</Avatar>
      </AvatarGroup>
      <AvatarGroup max={4}>
        <Avatar src={foxSrc} />
        <Avatar>C</Avatar>
        <Avatar src="..." />
        <Avatar>
          <PhotoCameraIcon fill="#fff" />
        </Avatar>
        <Avatar>F</Avatar>
      </AvatarGroup>
    </Stack>
  );
}

export default memo(AvatarDemo);
