import React, { memo } from 'react';
import Typography from '@Components/Common/Typography';
import Stack from '@Components/Layout/Stack';

function TypographyDemo(): React.ReactElement {
  return (
    <Stack gap={0}>
      <Typography renderAs="h1">H1</Typography>
      <Typography renderAs="h2">H2</Typography>
      <Typography renderAs="h3">H3</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rerum rem
        sit laudantium, sapiente provident beatae modi magni veritatis eius
        optio porro, est blanditiis exercitationem sint facere aspernatur, vel
        maiores.
      </Typography>
    </Stack>
  );
}

export default memo(TypographyDemo);
