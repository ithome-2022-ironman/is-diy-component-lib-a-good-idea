import React, { memo } from 'react';
import UploadButton from '@Components/Common/Button/UploadButton';

function Day11(): React.ReactElement {
  /* Main */
  return <UploadButton iconPosition="left">上傳檔案</UploadButton>;
}

export default memo(Day11);
