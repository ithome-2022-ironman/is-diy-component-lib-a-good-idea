import React, { memo } from 'react';
import Stack from '@Components/Layout/Stack';
import Accordion from '@Components/Common/Accordion';
import AccordionTitle from '@Components/Common/Accordion/AccordionTitle';
import AccordionBody from '@Components/Common/Accordion/AccordionBody';

function AccordionDemo(): React.ReactElement {
  /* Main */
  return (
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
  );
}

export default memo(AccordionDemo);
