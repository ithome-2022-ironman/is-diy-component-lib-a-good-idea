import React, { memo, useState } from 'react';
import Stack from '@Components/Layout/Stack';
import Accordion from '@Components/Common/Accordion';
import AccordionTitle from '@Components/Common/Accordion/AccordionTitle';
import AccordionBody from '@Components/Common/Accordion/AccordionBody';

function AccordionsDemo(): React.ReactElement {
  /* States */
  const [currentOpen, setCurrentOpen] = useState<number>(0);

  /* Functions */
  const openAccordion = (panelNumber: number) => () => {
    if (panelNumber === currentOpen) {
      setCurrentOpen(0);
    } else {
      setCurrentOpen(panelNumber);
    }
  };

  /* Main */
  return (
    <Stack>
      <Accordion onClick={openAccordion(1)} open={currentOpen === 1}>
        <AccordionTitle>title 1</AccordionTitle>
        <AccordionBody>body 1</AccordionBody>
      </Accordion>
      <Accordion onClick={openAccordion(2)} open={currentOpen === 2}>
        <AccordionTitle>title 2</AccordionTitle>
        <AccordionBody>body 2</AccordionBody>
      </Accordion>
      <Accordion onClick={openAccordion(3)} open={currentOpen === 3}>
        <AccordionTitle>title 3</AccordionTitle>
        <AccordionBody>body 3</AccordionBody>
      </Accordion>
    </Stack>
  );
}

export default memo(AccordionsDemo);
