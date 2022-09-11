import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Stack from '@Components/Layout/Stack';

const BigBoxStyle = css({
  height: '200px',
  width: '300px',
  margin: 'auto',
  backgroundColor: '#78909c',
  color: '#fff',
});
const SmallBoxStyle = css({
  height: '48px',
  width: '48px',
  backgroundColor: '#4e342e',
  color: '#fff',
});
const justifyContentCenter = css({ justifyContent: 'center' });
const dividerStyle = css({
  height: '48px',
  width: '13px',
  position: 'relative',
  '&::after': {
    content: '""',
    height: '100%',
    width: '1px',
    position: 'absolute',
    top: 0,
    left: '6px',
    background:
      'linear-gradient(to bottom, #eee 0%, #201609 25%, #201609 75%, #eee 100%)',
  },
});

function StackDemo(): React.ReactElement {
  /* Main */
  return (
    <Stack divider={<hr />}>
      <div className={cn(BigBoxStyle)} />
      <Stack gap="24px" direction="row" className={cn(justifyContentCenter)}>
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
      </Stack>
      <div className={cn(BigBoxStyle)} />
      <Stack
        direction="row"
        className={cn(justifyContentCenter)}
        divider={<span className={css(dividerStyle)} />}
      >
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
        <div className={cn(SmallBoxStyle)} />
      </Stack>
    </Stack>
  );
}

export default memo(StackDemo);
