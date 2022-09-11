import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import { css } from '@emotion/css';
import Stack from '@Components/Layout/Stack';
import Image from '@Components/Common/Image';
import foxSrc from '@Assets/erik-mclean-OVWn1sbGIYQ-unsplash.jpg';

const linkStyle = css({
  padding: '0 4px',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: '#8c7851',
  textDecoration: 'none',
  transition: 'all .2s ease',
  '&:visited': {
    color: '#51658c',
  },
  '&:hover': {
    color: '#b29c59',
    textDecoration: 'underline',
  },
});

function ImageDemo(): React.ReactElement {
  /* States */
  const foxCaption = useMemo(
    () => (
      <React.Fragment>
        Photo by
        <a
          className={cn(linkStyle)}
          href="https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noreferrer"
        >
          Erik Mclean
        </a>
        on
        <a
          className={cn(linkStyle)}
          href="https://unsplash.com/s/photos/fox?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noreferrer"
        >
          Unsplash
        </a>
      </React.Fragment>
    ),
    []
  );

  /* Main */
  return (
    <Stack divider={<hr />}>
      <Image
        height="300px"
        caption={foxCaption}
        src={foxSrc}
        alt="fox on the road"
      />
      <Image src="..." />
    </Stack>
  );
}

export default memo(ImageDemo);
