import React, { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import type { ImageBaseProps } from './types';

function ImageBase(props: ImageBaseProps): React.ReactElement {
  /* States */
  const {
    height,
    width,
    objectFit = 'cover',
    caption = '',
    loading = 'lazy',
    alt = 'image',
    classes = { figure: '', img: '', caption: '', onError: '' },
    imageOnly = false,
    ...rest
  } = props;
  delete rest.className;
  const [hasError, setHasError] = useState<boolean>(false);
  const imgStyle = useMemo(
    () =>
      css({
        width: width ? width : undefined,
        height: height ? height : undefined,
        objectFit,
        position: 'relative',
      }),
    [height, width, objectFit]
  );
  const loadCaption = useMemo(() => !hasError && caption, [hasError, caption]);

  /* Functions */
  const handleImgLoadError = useCallback((): void => {
    setHasError(true);
  }, []);

  /* Hooks */
  useEffect(() => () => setHasError(false), []);

  /* Main */
  return imageOnly ? (
    <img
      alt={alt}
      className={cn(imgStyle, hasError && classes.onError, classes.img)}
      loading={loading}
      onError={handleImgLoadError}
      {...rest}
    />
  ) : (
    <figure className={cn(classes.figure)}>
      <img
        alt={alt}
        className={cn(imgStyle, hasError && classes.onError, classes.img)}
        loading={loading}
        onError={handleImgLoadError}
        {...rest}
      />
      {loadCaption && (
        <figcaption className={cn(classes.caption)}>{caption}</figcaption>
      )}
    </figure>
  );
}

export default memo(ImageBase);
