# day14: DialogBase

來條列一下對話框元件的需求吧：

- 行為邏輯：使用者通常會透過點擊一個按鈕來開啟對話框；另外，使用者點擊對話框背景、或是按下鍵盤上的 `esc` 鍵時，要能關閉對話框。
- 視覺呈現：除了對話框本身，還會有對話框背景；當然，希望對話框出現與消失時會有動畫效果。

## 成品

[原始碼](https://gist.github.com/tzynwang/bc895ec7d75291dc8ccef332fd47f878)

## 開發思路

### 對話框背景 props

```ts
const {
  children,
  onClose,
  disableCloseByBackdropClick,
  disableCloseByKeyPress,
  overwriteEscapeKey,
  className,
  ...rest
} = props;
```

對話框本身會透過 `props.children` 傳入 `DialogBackdropBase` 元件，而整個對話框元件要被關閉時，執行透過 `props.onClose()` 傳入的 callback function

### 點擊背景關閉對話框

```ts
const closeDialogByClick = useCallback(
  (e: MouseEvent): void => {
    if (disableCloseByBackdropClick) return;
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  },
  [disableCloseByBackdropClick, onClose]
);
```

只有在使用者點擊對話框背景時，才執行 `onClose()`。
而對話框「本體」是對話框「背景」的子元件，點擊事件可能會是從本體冒泡到背景元件，所以這裡透過比對「實際發生點擊事件的目標（`e.target`）」與「負責捕捉事件的目標（`e.currentTarget`）」是否一致（都是對話框背景）來判斷是否要關閉對話框元件。

可參考 MDN 的說明：

> [Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target): The read-only target property of the Event interface is a reference to the object onto **which the event was dispatched**.
> [Event.currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget): It always refers to the element to which **the event handler has been attached**, as opposed to Event.target, which identifies the element on which the event occurred and which may be its descendant.

### 對話框內部狀態

```ts
enum KEY {
  ESCAPE = 'Escape',
}

// in DialogBase
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
```

透過 `props.open` 來從外部控制對話框是否開啟，而對話框本身的內容則透過 `props.children` 提供。
使用 `enum` 來管理 `key` 名稱的理由是讓按鍵名稱貼近平常閱讀的習慣。

```ts
const [mounted, setMounted] = useState<boolean>(false);
```

為了要在關閉對話框前先執行一段 `fadeOut` 動畫效果，使用內部 useState 變數 `mounted` 作為「對話框真正從畫面上移除」的條件。

### 開關流程

```tsx
const unmountDialog = useCallback((): void => {
  setMounted(false);
}, []);

useEffect(() => {
  if (open) {
    setMounted(true);
  }
}, [open]);
useEffect(() => {
  const dialogBase = dialogBaseRef.current;
  dialogBase?.addEventListener('transitionend', unmountDialog);
  return () => {
    dialogBase?.removeEventListener('transitionend', unmountDialog);
  };
}, [dialogBaseRef, unmountDialog]);

return mounted ? (
  <Portal>
    <DialogBackdropBase
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
    </DialogBackdropBase>
  </Portal>
) : (
  <React.Fragment />
);
```

總結：當 `props.open` 為 `true` 時，對話框元件會掛載到畫面上；而當 `props.open` 為 `false` 時，先執行 `classes.dialogUnmountedAnimation` 動畫效果。動畫執行完畢後，觸發 `transitionend`，此時才因為 `mounted` 進入 `false` 狀態而真正將整個元件從畫面上移除。

## 自評

基本邏輯已經完成，明天來加上一些樣式與動畫效果就能讓元件美美地上班了。
~~從零開始寫的辛苦程度有比 ButtonBase 少一點點。~~
