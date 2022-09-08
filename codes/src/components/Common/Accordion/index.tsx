import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import type { AccordionProps } from './types';

function Accordion(props: AccordionProps): React.ReactElement {
  /* States */
  const {
    children,
    classes = { wrapper: '', title: '', body: '' },
    open,
    ...rest
  } = props;
  delete rest.className;
  const [localOpen, setLocalOpen] = useState<boolean>(false);
  const [titleElement, setTitleElement] = useState<JSX.Element>(
    <React.Fragment />
  );
  const [bodyElement, setBodyElement] = useState<JSX.Element>(
    <React.Fragment />
  );
  const hasOpenFromProps = useMemo(
    () => Object.keys(props).includes('open'),
    [props]
  );
  const openToUse = useMemo(
    () => (hasOpenFromProps ? open : localOpen),
    [hasOpenFromProps, open, localOpen]
  );

  /* Functions */
  const toggleAccordion = useCallback((): void => {
    setLocalOpen((prev) => !prev);
  }, []);

  /* Hooks */
  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const c = child as JSX.Element;
      if (index === 0) {
        setTitleElement(
          React.cloneElement(c, {
            open: openToUse,
            onClick: hasOpenFromProps ? undefined : toggleAccordion,
            accordionTitleClass: classes.title,
          })
        );
      }
      if (index === 1) {
        setBodyElement(
          React.cloneElement(c, {
            open: openToUse,
            accordionBodyClass: classes.body,
          })
        );
      }
    });
  }, [
    children,
    openToUse,
    hasOpenFromProps,
    classes.title,
    classes.body,
    toggleAccordion,
  ]);

  /* Main */
  return (
    <div className={cn(classes.wrapper)} {...rest}>
      {titleElement}
      {bodyElement}
    </div>
  );
}

export default memo(Accordion);
