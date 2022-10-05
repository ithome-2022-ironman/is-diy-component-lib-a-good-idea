import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import ImageBase from '@Components/Base/ImageBase';
import type { ImageProps } from './types';

const onErrorStyle = css({
  display: 'block',
  width: '200px',
  height: '200px',
  '&::after': {
    content: '"image unavailable"',
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'inherit',
    fontSize: '12px',
  },
});
const captionStyle = css({
  textAlign: 'center',
  fontSize: '12px',
  color: '#78909c',
});

function Image(props: ImageProps): React.ReactElement {
  /* States */
  const { classes, ...rest } = props;

  /* Main */
  return (
    <ImageBase
      classes={{
        figure: cn(classes?.figure),
        img: cn(classes?.img),
        caption: cn(captionStyle, classes?.caption),
        onError: cn(onErrorStyle, classes?.onError),
      }}
      {...rest}
    />
  );
}

export default memo(Image);
