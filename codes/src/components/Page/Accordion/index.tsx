import React, { memo } from 'react';
import SpaceWrapper from '@Components/Layout/SpaceWrapper';
import Stack from '@Components/Layout/Stack';
import Accordion from '@Components/Common/Accordion';
import AccordionTitle from '@Components/Common/Accordion/AccordionTitle';
import AccordionBody from '@Components/Common/Accordion/AccordionBody';

function AccordionDemo(): React.ReactElement {
  /* Main */
  return (
    <SpaceWrapper padding={24}>
      <Stack>
        <Accordion>
          <AccordionTitle>title 1</AccordionTitle>
          <AccordionBody>body 1</AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionTitle>title 2</AccordionTitle>
          <AccordionBody>body 2</AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionTitle>title 3</AccordionTitle>
          <AccordionBody>body 3</AccordionBody>
        </Accordion>
      </Stack>
    </SpaceWrapper>
  );
}

export default memo(AccordionDemo);
