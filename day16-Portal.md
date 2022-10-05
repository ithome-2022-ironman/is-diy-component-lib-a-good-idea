# day16: Portal

用途：將元件掛載到指定節點。除了昨天的 `Dialog` 家族外，接下來的 `Toast` 與 `ToolTip` 也都有使用到這個元件。

理由：在無法保證親代元件是否會有 `overflow: hidden` 或是 `z-index` 等樣式限制的情況下，將元件掛載到額外的指定位置可以確保元件能正確地顯示在畫面上。

> React official: A typical use case for portals is when a parent component has an `overflow: hidden` or `z-index` style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips.

## 成品

[原始碼](https://gist.github.com/tzynwang/dca59e28bef85c1eb7e5de1496851093)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/Portal)

## 事件冒泡與捕捉

`ReactDOM.createPortal` 讓指定元件可以突破平時的 DOM tree 結構限制，掛載到指定節點。但被掛載到指定節點的元件還是歸附在 React tree 結構下，故事件的冒泡與捕捉不會被該元件在 DOM tree 中的位置所影響。

> React official: Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal **still exists in the React tree regardless of position in the DOM tree**.

## 開發思路

設計上預設會掛載到 `document.body` 下，但也可以透過 `props.container` 來指定元件的掛載位置。

在需要指定掛載對象時，可參考以下範例：

```tsx
function PortalDemo(): React.ReactElement {
  /* States */
  const divRef = useRef<HTMLDivElement | null>(null);
  const [mount, setMount] = useState<boolean>(false);

  /* Main */
  return (
    <Stack>
      <SpaceWrapper margin={24}>
        <Button onClick={() => setMount((prev) => !prev)}>
          {mount ? 'unmount' : 'mount'} through Portal
        </Button>
      </SpaceWrapper>
      <div className={cn(boxStyle)} ref={divRef} />
      {mount && divRef.current && (
        <Portal container={divRef.current}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            dignissimos modi, hic odio similique quod odit blanditiis dolor iure
            laboriosam maiores ut pariatur rerum impedit vel omnis perferendis
            veritatis alias!
          </Typography>
        </Portal>
      )}
    </Stack>
  );
}
```

透過 `divRef` 來儲存掛載對象，並將 `divRef.current` 傳入 `Portal` 的 `props.container` 即可。以上範例即是把 `Typography` 元件在 `useState` 變數 `mount` 為 `true` 時掛載到 `<div className={cn(boxStyle)} ref={divRef} />` 中。

## 自評

只是將 `ReactDom` 提供的 `createPortal(child, container)` 包成方便使用的型態，簡單，你應該不需要特地安裝套件來獲得這個功能 ヽ(✿ ﾟ ▽ ﾟ)ノ

## 參考資料

- [React official: Portals](https://reactjs.org/docs/portals.html)
- [Understanding React Portals and Its Use-Cases](https://blog.bitsrc.io/understanding-react-portals-ab79827732c7)
