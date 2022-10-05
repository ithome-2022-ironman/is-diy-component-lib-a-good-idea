import React, { memo, useRef, useState, useCallback, useEffect } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Button from '@Components/Common/Button';
import Portal from '@Components/Layer/Portal';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import Typography from '@Components/Common/Typography';
import { PhotoCameraIcon } from '@Assets/icons';

function UploadButton(): React.ReactElement {
  /* States */
  const inputFileContainerRef = useRef<HTMLSpanElement | null>(null);
  const [selectFiles, setSelectFiles] = useState<File[]>([]);

  /* Functions */
  const removeInput = useCallback(() => {
    if (inputFileContainerRef.current) {
      inputFileContainerRef.current.childNodes.forEach((node) => node.remove());
    }
  }, [inputFileContainerRef]);
  const handleFileUpload = useCallback(
    (e: Event): void => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const selects: File[] = [];
        for (let i = 0; i < target.files.length; i++) {
          selects.push(target.files[i]);
        }
        setSelectFiles(selects);
      }
      removeInput();
    },
    [removeInput]
  );
  const openFileSelectDialog = useCallback((): void => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.style.height = inputFile.style.width = '0';
    inputFile.style.position = 'fixed';
    inputFile.style.top = inputFile.style.left = '0';
    inputFile.multiple = true;
    inputFile.onchange = handleFileUpload;
    if (inputFileContainerRef.current) {
      inputFileContainerRef.current.appendChild(inputFile);
      inputFile.click();
    }
  }, [handleFileUpload, inputFileContainerRef]);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { files } = e.target;
      if (files) {
        const selects: File[] = [];
        for (let i = 0; i < files.length; i++) {
          selects.push(files[i]);
        }
        setSelectFiles(selects);
      }
    },
    []
  );

  /* Hooks */
  useEffect(() => {
    selectFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      // by fetch API or axios to upload files to backend...
    });
  }, [selectFiles]);

  /* Main */
  return (
    <Stack direction="column">
      <SpaceWrapper padding={24}>
        <Button
          startIcon={<PhotoCameraIcon fill="#fff" height={16} width={16} />}
          onClick={openFileSelectDialog}
        >
          upload file
        </Button>
        <Portal>
          <span
            ref={inputFileContainerRef}
            className={cn(
              css({ width: 0, height: 0, position: 'fixed', top: 0, left: 0 })
            )}
          />
        </Portal>
      </SpaceWrapper>
      <SpaceWrapper>
        <Button
          variant="outlined"
          renderAs="label"
          endIcon={<PhotoCameraIcon fill="#4e342e" height={16} width={16} />}
        >
          input file label
          <input hidden multiple type="file" onChange={handleFileChange} />
        </Button>
      </SpaceWrapper>
      <Stack>
        {selectFiles.map((file, index) => (
          <Typography key={index}>{file.name}</Typography>
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(UploadButton);
