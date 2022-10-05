# day13: UploadButton

看了看 MUI 的 [Upload button](https://mui.com/material-ui/react-button/#upload-button) 是使用 `props.component` 來提示元件應渲染成 HTMLLabelElement，今天就來實踐他 (́=◞౪◟=‵)

## 成品

[展示](https://tzynwang.github.io/ithome-2022-demo/#/UploadButton)
[原始碼](https://gist.github.com/tzynwang/2edfae8c4b60a6daef0a3db32b5f87c2)

## 開發思路

來更新一下第 10 天做好的 `ButtonBase` 元件。

追加 `props.renderAs` 讓使用者可以指定元件最終要渲染成 `HTMLButtonElement` 還是 `HTMLLabelElement`。而將 `props.renderAs` 的內容傳入 `React.createElement` 即可決定 `ButtonBase` 最終要回傳的內容了：

```tsx
return createElement(
  renderAs === 'label' ? 'label' : 'button',
  {
    className: cn(
      defaultButtonStyle,
      disabled && disabledButtonStyle,
      className
    ),
    disabled,
    // 需注意只有 HTMLButtonElement 需要指定 type 資訊
    type: renderAs === 'button' ? type : undefined,
    ref: renderAs === 'label' ? labelRef : buttonRef,
    ...rest,
  },
  <React.Fragment>
    {children ? children : 'button'}
    <span
      className={cn(rippleContainerStyle)}
      role="presentation"
      ref={rippleContainerRef}
    />
  </React.Fragment>
);
```

記得追加一組 `const labelRef = useRef<HTMLLabelElement | null>(null);` 來對應使用者可能選渲染 `HTMLLabelElement` 的需求：

```ts
useEffect(() => {
  const clickTarget = (labelRef.current || buttonRef.current) as HTMLElement;
  clickTarget?.addEventListener('click', playRipple);
  clickTarget?.addEventListener('animationend', removeRipple);
  return () => {
    clickTarget?.removeEventListener('click', playRipple);
    clickTarget?.removeEventListener('animationend', removeRipple);
  };
}, [labelRef, buttonRef, playRipple, removeRipple]);
```

而因為第 11 天製作的 `Button` 元件是 `ButtonBase` 的延伸，在更新完 `ButtonBase` 內容後，現在使用者可以直接對 `Button` 設定 `props.renderAs` 來控制 `Button` 元件最終要渲染成 `HTMLButtonElement` 或是 `HTMLLabelElement` 型態了。

使用方式可參考：

```tsx
const [selectFiles, setSelectFiles] = useState<File[]>([]);

const handleFileChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files) {
      const selects: File[] = [];
      for (let i = 0; i < files.length; i++) {
        selects.push(files[i]);
      }
      setSelectFiles(selects);
    }
  },
  []
);

useEffect(() => {
  selectFiles.forEach((file) => {
    const formData = new FormData();
    formData.append('file', file);
    // 下略，現在你有一組 formData 可以提供給後端 API 了
  });
}, [selectFiles]);

<Button
  variant="outlined"
  renderAs="label"
  endIcon={<PhotoCameraIcon fill="#4e342e" height={16} width={16} />}
>
  input file label
  <input hidden multiple type="file" onChange={handleFileChange} />
</Button>;
```

## 修改指南

假設不對 `ButtonBase` 追加 `props.renderAs` 的話，另一種實作檔案上傳按鈕的方式如下：

```tsx
const inputFileContainerRef = useRef<HTMLSpanElement | null>(null);

const removeInput = useCallback(() => {
  if (inputFileContainerRef.current) {
    inputFileContainerRef.current.childNodes.forEach((node) => node.remove());
  }
}, [inputFileContainerRef]);
const handleFileUpload = useCallback(
  (e: Event): void => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const selects: File[] = [];
      for (let i = 0; i < target.files.length; i++) {
        selects.push(target.files[i]);
      }
      setSelectFiles(selects);
    }
    removeInput();
  },
  [removeInput]
);
const openFileSelectDialog = useCallback((): void => {
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.style.height = inputFile.style.width = '0';
  inputFile.style.position = 'fixed';
  inputFile.style.top = inputFile.style.left = '0';
  inputFile.multiple = true;
  inputFile.onchange = handleFileUpload;
  if (inputFileContainerRef.current) {
    inputFileContainerRef.current.appendChild(inputFile);
    inputFile.click();
  }
}, [handleFileUpload, inputFileContainerRef]);

<Button
  startIcon={<PhotoCameraIcon fill="#fff" height={16} width={16} />}
  onClick={openFileSelectDialog}
>
  upload file
</Button>
<Portal>
  <span
    ref={inputFileContainerRef}
    className={cn(
      css({ width: 0, height: 0, position: 'fixed', top: 0, left: 0 })
    )}
  />
</Portal>
```

原理：在使用者點擊按鈕時，直接在畫面上掛載一個長寬皆為 `0px` 的 `input:file` 元件，並點擊該 `input:file` 元件來觸發檔案上傳流程。

與 `ButtonBase` 的漣漪效果類似，「選擇檔案」的流程結束後需要手動移除方才掛載到畫面上的 `input:file` 元件，否則隨著每一次點擊上傳按鈕，看不見的 `input:file` 會越來越多。

## 自評

按鈕系列終於暫時告一段落了，如果要算 CP 值的話，按鈕（含動畫效果）應該是讓元件庫代勞最划算的元件了 (＊゜ー゜)b

劇透：之後做到 `ToolTip` 時我們會再回頭更新一次 `ButtonBase` 的內容，理由與 `ref` 相關，敬請期待。
