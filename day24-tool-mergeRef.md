# day24: mergeRef

今天是最後一次了把 `ButtonBase` 拖出來鞭屍了。

更新 `ButtonBase` 的理由是讓這個元件可以透過 `props` 傳入 `ref` 資料，而需要這樣做的理由是讓昨天的 `Tooltip` 元件可以不需要多一層 `span` 來包覆 `props.children` 內容，而是直接把用來計算 `props.children` 的 `ref` 貼到 child node 上。

原本的作法是多包一層 `span` 在 `props.children` 外面，就不需要擔心 `props.children` 是否支援 `props.ref`：

```tsx
return (
  <React.Fragment>
    <span
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      ref={childRef}
    >
      {children}
    </span>
    {shouldShow && (
      <Portal>
        <span className={cn(baseStyle, animationStyle, finalStyle)}>
          {arrow && <span className={cn(baseArrowStyle, positionArrowStyle)} />}
          {tip}
        </span>
      </Portal>
    )}
  </React.Fragment>
);
```

但是既然有找到辦法處理多重 refs 的需求，這個非必要的 `span` 當然就是要跟他說再見啦 (ﾟ ∀ ﾟ)

## 成品

[原始碼](https://gist.github.com/tzynwang/9a87e15fc033bc6bc157de165f92164f)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/MergeRef)

## 開發思路

### forward refs

套用 `React.forwardRef` 來處理即可，記得 `ButtonBase` 與 `Button` 元件都需要修改。可直接複製貼上今天的原始碼。

### ref merge

參考 React 官方文件可得知元件的 `props.ref` 除了可以傳入 `createRef()` 與 `useRef()` 建立的 `MutableRefObject` 以外，也能接受傳入 callback function：

> Callback Refs: Instead of passing a ref attribute created by createRef(), you pass a function. The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.

把 callback function 傳入元件的 `props.ref` 時，該 function 接受元件實例（instance）或 HTML DOM 物件作為參數。

附上 stackOverFlow 上的說明：

> Ref callbacks are another option, which are needed for some advanced cases. You pass a function into the element, and the function will be called back when the instance is created or destroyed. These have the type (instance: T) => void.

總結一下在 `mergeRef` 處理的事情：

```ts
return (node) => {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      // 當 ref 為的型別為 function 時，把元件實例或 HTML DOM 作為參數傳入
      ref(node);
    } else if (ref !== null) {
      // 若 ref 不為 null 則把該元件的實例或 HTML DOM 物件指派給 MutableRefObject.current
      (ref as React.MutableRefObject<T | null>).current = node;
    }
  });
};
```

執行完畢後，透過 `forwardRef` 傳入的 ref 與元件本身的 local ref 都會指向同一個元件實例或 HTMLElement。

## 自評

在實作完今天的元件之前，沒有想過原來元件的 `props.ref` 支援傳入 callback，甚至還可以合併...(ﾟ ∀ ﾟ) 長知識了。

## 參考文件

- [React Official: Callback Refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)
- [react-merge-refs](https://www.npmjs.com/package/react-merge-refs)
