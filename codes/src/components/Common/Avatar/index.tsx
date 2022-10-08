import React, { memo, useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import { PersonIcon } from '@Assets/icons';
import ImageBase from '@Components/Base/ImageBase';
import type { AvatarProps } from './types';

const figureStyle = css({
  border: '4px solid #f9f4ef',
  backgroundColor: '#f9f4ef',
});
const imgStyle = css({
  height: '48px',
  width: '48px',
  boxSizing: 'content-box',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
});
const onErrorStyle = css({
  width: '48px',
  height: '48px',
  display: 'inline-block',
  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
const withChildrenStyle = css({
  backgroundColor: '#4e342e',
  color: '#fff',
  fontSize: '24px',
});
const withChildrenBorderStyle = css({
  border: '4px solid #f9f4ef',
});

function Avatar(props: AvatarProps): React.ReactElement {
  /* States */
  const { src, children = null, withBorder = false } = props;
  const [onError, setOnError] = useState<boolean>(false);

  /* Functions */
  const fallBackToText = useCallback(() => {
    setOnError(true);
  }, []);

  /* Views */
  const finalRender = useMemo(() => {
    if (onError) {
      return (
        <div
          className={cn(imgStyle, withBorder && figureStyle, withChildrenStyle)}
        >
          <PersonIcon fill="#fff" />
        </div>
      );
    }
    if (children) {
      return (
        <div
          className={cn(
            imgStyle,
            withBorder && figureStyle,
            withChildrenStyle,
            withBorder && withChildrenBorderStyle
          )}
        >
          {children}
        </div>
      );
    }
    if (src) {
      return (
        <ImageBase
          src={src}
          classes={{
            figure: cn(withBorder && figureStyle, imgStyle),
            img: imgStyle,
            onError: onErrorStyle,
          }}
          onError={fallBackToText}
        />
      );
    }
    return (
      <div
        className={cn(imgStyle, withBorder && figureStyle, withChildrenStyle)}
      >
        <PersonIcon fill="#fff" />
      </div>
    );
  }, [children, src, onError, withBorder, fallBackToText]);

  /* Main */
  return finalRender;
}

export default memo(Avatar);
