import React, { memo } from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';
import Container from '@Components/Layout/Container';

const NAV_HEIGHT = 60;

const navWrapper = css({
  height: `${NAV_HEIGHT}px`,
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: '#283593',
  filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))',
});

const navStyle = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const sectionOneWrapper = css({
  height: '800px',
  backgroundColor: '#6d4c41',
});
const sectionOneComponent = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: '48px',
  '& div': {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const sectionTwoWrapper = css({
  height: '400px',
  backgroundColor: '#9c786c',
});
const sectionThreeWrapper = css({
  height: `calc(100vh - ${NAV_HEIGHT}px)`,
  minHeight: '600px',
  backgroundColor: '#40241a',
});
const footerWrapper = css({
  height: '80px',
  backgroundColor: '#6d4c41',
});
const footerComponent = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const whiteText = css({
  color: '#fff',
});

function ContainerDemo(): React.ReactElement {
  /* Main */
  return (
    <div
      className={cn(
        css({ height: '100%', overflowY: 'auto', perspective: '9999px' })
      )}
    >
      <Container classes={{ wrapper: cn(navWrapper) }} renderAs="nav">
        <div className={cn(navStyle, whiteText)}>
          <div>I am a top nav</div>
        </div>
      </Container>
      <Container classes={{ wrapper: sectionOneWrapper }} disablePadding>
        <div className={cn(whiteText, sectionOneComponent)}>
          <div>section one left</div>
          <div>section one right</div>
        </div>
      </Container>
      <Container classes={{ wrapper: sectionTwoWrapper }}>
        <div>section two</div>
      </Container>
      <Container classes={{ wrapper: sectionThreeWrapper }}>
        <div className={cn(whiteText)}>section three</div>
      </Container>
      <Container classes={{ wrapper: footerWrapper }} renderAs="footer">
        <div className={cn(whiteText, footerComponent)}>
          here comes the footer
        </div>
      </Container>
    </div>
  );
}

export default memo(ContainerDemo);
