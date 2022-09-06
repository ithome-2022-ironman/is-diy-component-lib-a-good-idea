import React, { memo, useState, useMemo, useEffect } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { ImageProps } from './types';

function Image(props: ImageProps): React.ReactElement {
  /* States */
  const {
    height,
    width,
    objectFit = 'cover',
    caption = '',
    loading = 'lazy',
    alt = 'image',
    classes = { figure: '', img: '', caption: '' },
    ...rest
  } = props;
  delete rest.className;
  const [hasError, setHasError] = useState<boolean>(false);
  const figureStyle = useMemo(
    () =>
      css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }),
    []
  );
  const imgStyle = useMemo(
    () =>
      css({
        width: hasError ? '200px' : width ? width : undefined,
        height: hasError ? '40px' : height ? height : undefined,
        objectFit,
        position: 'relative',
        '&::after': {
          content: '"image is unavailable"',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0e0e0',
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'inherit',
          fontSize: '12px',
        },
      }),
    [height, width, objectFit, hasError]
  );
  const captionStyle = useMemo(() => css({ color: '#78909c' }), []);
  const loadCaption = useMemo(() => !hasError && caption, [hasError, caption]);

  /* Functions */
  const handleImgLoadError = (): void => {
    setHasError(true);
  };

  /* Hooks */
  useEffect(() => () => setHasError(false), []);

  /* Main */
  return (
    <figure className={cn(figureStyle, classes.figure)}>
      <img
        alt={alt}
        className={cn(imgStyle, classes.img)}
        loading={loading}
        onError={handleImgLoadError}
        {...rest}
      />
      {loadCaption && (
        <figcaption className={cn(captionStyle, classes.caption)}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default memo(Image);
