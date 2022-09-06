import React, {
  memo,
  createRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import cn from 'classnames';
import Portal from '@Components/Layer/Portal';
import type { DialogBackdropBaseProps, DialogBaseProps } from './types';

enum KEY {
  ESCAPE = 'Escape',
}

function DialogGroundBase(props: DialogBackdropBaseProps): React.ReactElement {
  /* States */
  const {
    children,
    onClose,
    disableCloseByBackdropClick,
    disableCloseByKeyPress,
    overwriteEscapeKey,
    ...rest
  } = props;
  const dialogGroundBaseRef = createRef<HTMLDivElement>();
  const classNamesFromProps = rest.className;
  delete rest.className;

  /* Functions */
  const closeDialogByClick = useCallback(
    (e: MouseEvent): void => {
      if (disableCloseByBackdropClick) return;
      if (e.target === e.currentTarget && onClose) {
        onClose();
      }
    },
    [disableCloseByBackdropClick, onClose]
  );
  const closeDialogByKeydown = useCallback(
    (e: KeyboardEvent): void => {
      if (disableCloseByKeyPress) return;
      if (e.key === overwriteEscapeKey && onClose) {
        onClose();
      }
    },
    [disableCloseByKeyPress, overwriteEscapeKey, onClose]
  );

  /* Hooks */
  useEffect(() => {
    const backdrop = dialogGroundBaseRef.current;
    document.addEventListener('keydown', closeDialogByKeydown);
    backdrop?.addEventListener('click', closeDialogByClick);
    return () => {
      document.removeEventListener('keydown', closeDialogByKeydown);
      backdrop?.removeEventListener('click', closeDialogByClick);
    };
  }, [dialogGroundBaseRef, closeDialogByClick, closeDialogByKeydown]);

  /* Main */
  return (
    <div
      className={cn(classNamesFromProps)}
      ref={dialogGroundBaseRef}
      {...rest}
    >
      {children}
    </div>
  );
}

function DialogBase(props: DialogBaseProps): React.ReactElement {
  /* States */
  const {
    open,
    children,
    disableCloseByBackdropClick = false,
    disableCloseByKeyPress = false,
    overwriteEscapeKey = KEY.ESCAPE,
    classes = { dialog: '', backdrop: '', dialogUnmountedAnimation: '' },
    role,
    onClose,
    ...rest
  } = props;
  const dialogBaseRef = createRef<HTMLDivElement>();
  const [mounted, setMounted] = useState<boolean>(false);

  /* Functions */
  const unmountDialog = useCallback((): void => {
    setMounted(false);
  }, []);

  /* Hooks */
  useEffect(() => {
    const dialogBase = dialogBaseRef.current;
    dialogBase?.addEventListener('transitionend', unmountDialog);
    return () => {
      dialogBase?.removeEventListener('transitionend', unmountDialog);
    };
  }, [dialogBaseRef, unmountDialog]);
  useEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);

  /* Main */
  return mounted ? (
    <Portal>
      <DialogGroundBase
        onClose={onClose}
        className={cn(
          classes.backdrop,
          !open && classes.backdropUnmountedAnimation
        )}
        disableCloseByBackdropClick={disableCloseByBackdropClick}
        disableCloseByKeyPress={disableCloseByKeyPress}
        overwriteEscapeKey={overwriteEscapeKey}
        role="presentation"
      >
        <div
          className={cn(
            classes.dialog,
            !open && classes.dialogUnmountedAnimation
          )}
          role={role || 'dialog'}
          ref={dialogBaseRef}
          {...rest}
        >
          {children}
        </div>
      </DialogGroundBase>
    </Portal>
  ) : (
    <React.Fragment />
  );
}

export default memo(DialogBase);
