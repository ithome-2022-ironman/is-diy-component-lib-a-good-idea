# day22: TransitionEffect, useDelayUnmount

把元件延遲卸載的行為打包到 custom hook `useDelayUnmount` 中，而 `TransitionEffect` 元件本身專注在處理掛載、卸載動畫效果。~~再見了 `ontransitionend`~~

## 成品

[原始碼](https://gist.github.com/tzynwang/b1362b13181e7d18c50b44ecf684d6ce)
[展示](https://tzynwang.github.io/ithome-2022-demo/#/TransitionEffect)

## 開發思路

### useDelayUnmount

透過從參數傳進來的 `isMounted` 與本身的 useState 變數 `mount` 來控制元件是否真的該執行卸載。當元件應該被卸載時，透過 `setTimeout` 設定 `mount` 要延遲多少時間才進入 `false` 狀態。

使用方式：根據此 custom hook 回傳的 `mount` 變數內容決定元件是否該掛載（到畫面上）或（從畫面上）卸載。

```ts
function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
  // 回傳一個元件是否真的該執行卸載的 boolean 變數 mount
  const [mount, setMount] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !mount) {
      // 當元件應該被掛載而 mount 還未進入 true 狀態時，更新 mount 變數為 true
      // 外部元件因為 mount 為 true 而掛載到畫面上
      setMount(true);
    }
    if (!isMounted && mount) {
      // 當元件準備從畫面上卸載時，延遲 mount 變數 delayTime 毫秒後再進入 false 狀態
      // 外部元件會在 delayTime 後才真正地從畫面上被移除
      timeoutId = setTimeout(() => setMount(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, mount]);

  return mount;
}
```

### 動畫樣式

先將所有的掛載、卸載動畫效果包進變數 `animations` 中：

```ts
const animations = useMemo(
  () => ({ fadeIn, fadeOut, scaleIn, scaleOut, collapseIn, collapseOut }),
  []
);
```

再透過 CSS 選取器 `:first-child` 將動畫樣式套用到 `children` 上：

```ts
const finalChildren = useMemo(
  () => (
    <span
      className={cn(
        css({
          '& :first-child': {
            animation: `${
              mount ? animations[`${effect}In`] : animations[`${effect}Out`]
            } .3s ease`,
          },
        })
      )}
    >
      {children}
    </span>
  ),
  [mount, animations, effect, children]
);
```

## 修改指南

注意 `useDelayUnmount` 的第二個參數（動畫時間長度）要與 `finalChildren` 中的 `& :first-child` 動畫時間相同（範例中設定的時長為 0.3 秒，與 `useDelayUnmount` 參數一致。

## 自評

基本上就是把樣式設定外包到另外一個元件上，將「動畫結束」與「元件卸載」的依賴性拆開。明天的 `Tooltip` 元件可以看到這個元件的應用方式，敬請期待 (ゝ ∀･)
