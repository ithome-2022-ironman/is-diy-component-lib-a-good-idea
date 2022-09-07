import React, { memo, useState, useCallback } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Button from '@Components/Common/Button';
import Stack from '@Components/Layout/Stack';
import Typography from '@Components/Common/Typography';
import { PhotoCameraIcon } from '@Assets/icons';
import type { UploadButtonProps } from './types';

function UploadButton(props: UploadButtonProps): React.ReactElement {
  /* States */
  const {
    icon = <PhotoCameraIcon width={16} height={16} fill="#4e342e" />,
    iconPosition = 'right',
    children,
    variant = 'outlined',
    className,
    ...rest
  } = props;
  delete rest.onClick;
  const [fileNames, setFileNames] = useState<string[]>([]);

  /* Functions */
  const handleFileUpload = useCallback(function fileUpload(
    this: GlobalEventHandlers,
    e: Event
  ) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setFileNames(Array.from(target.files).map((file) => file.name));
    }
  },
  []);
  const openUploadDialog = useCallback((): void => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.style.height = inputFile.style.width = '0';
    inputFile.style.position = 'fixed';
    inputFile.style.top = inputFile.style.left = '0';
    inputFile.multiple = true;
    inputFile.onchange = handleFileUpload;
    document.documentElement.appendChild(inputFile);
    inputFile.click();
  }, [handleFileUpload]);

  /* Main */
  return (
    <Stack direction="row">
      <Button
        onClick={openUploadDialog}
        variant={variant}
        className={cn(
          css({
            flexDirection: iconPosition === 'right' ? 'row' : 'row-reverse',
          }),
          className
        )}
        {...rest}
      >
        {children}
        {icon}
      </Button>
      <Stack>
        {fileNames.map((name, index) => (
          <Typography key={index}>{name}</Typography>
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(UploadButton);
