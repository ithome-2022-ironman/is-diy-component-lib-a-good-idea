import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import starIconSrc from '@Assets/icons/star_black_24dp.svg';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import Typography from '@Components/Common/Typography';
import Divider from '@Components/Common/Divider';

const fullWidth = css({ width: '100%' });
const monoFont = css({ fontFamily: 'monospace' });
const labelStyleHorizontalHr = css({
  '&::after': {
    content: '"Label"',
    position: 'relative',
    top: '10px',
    padding: '0px 4px',
    backgroundColor: '#f9f4ef',
  },
});
const labelStyleVerticalHr = css({
  '&::after': {
    content: '"Vertical Label"',
    width: 'max-content',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '4px 0px',
    backgroundColor: '#f9f4ef',
  },
});
const labelStar = css({
  '&::after': {
    content: `url(${starIconSrc})`,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px 4px',
    marginLeft: '10%',
    backgroundColor: '#f9f4ef',
  },
});

function DividerDemo(): React.ReactElement {
  return (
    <SpaceWrapper padding={[24, 0]}>
      <Stack gap="48px">
        <Stack className={cn(fullWidth)}>
          <Typography className={cn(monoFont)}>{'<Divider />'}</Typography>
          <Divider />
        </Stack>
        <Stack className={cn(fullWidth)}>
          <Typography className={cn(monoFont)}>
            {'<Divider thick={2} color="lime" />'}
          </Typography>
          <Divider thick={2} color="lime" />
        </Stack>
        <Stack className={cn(fullWidth)}>
          <Typography className={cn(monoFont)}>{`<Divider
          thick={2}
          color="linear-gradient(to right, #3f17a6, #e66465, #f69d3c)"
          gradientColor
        />`}</Typography>
          <Divider
            thick={2}
            color="linear-gradient(to right, #3f17a6, #e66465, #f69d3c)"
            gradientColor
          />
        </Stack>
        <Stack className={cn(fullWidth)}>
          <Typography className={cn(monoFont)}>{`<Divider
          thick={3}
          labelAlign="center"
          labelStyle={labelStyleHorizontalHr}
        />`}</Typography>
          <Divider
            thick={3}
            labelAlign="center"
            labelStyle={labelStyleHorizontalHr}
          />
        </Stack>
        <Stack>
          <Typography className={cn(monoFont)}>{`<Divider
              thick={3}
              orientation="vertical"
              labelStyle={labelStyleVerticalHr}
            />`}</Typography>
          <div className={cn(css({ height: '200px' }))}>
            <Divider
              thick={3}
              orientation="vertical"
              labelStyle={labelStyleVerticalHr}
            />
          </div>
        </Stack>
        <Stack className={cn(fullWidth)}>
          <Typography className={cn(monoFont)}>{`<Divider
          thick={2}
          dividerStyle="dashed"
          color="#333"
          labelAlign="left"
          labelStyle={labelStar}
        />`}</Typography>
          <Divider
            thick={2}
            dividerStyle="dashed"
            color="#333"
            labelAlign="left"
            labelStyle={labelStar}
          />
        </Stack>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(DividerDemo);
