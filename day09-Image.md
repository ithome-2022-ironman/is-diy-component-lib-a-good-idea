# day09: Image

`display: block`

`object-fit: cover`

還有 `<figcaption />`

這些就是被選來製造好看 `img` 的必要（？）成分

但是懶惰的工程師希望這個元件能在 `src` 連結失效時，不要顯示醜醜的破圖畫面，所以加入了偽元素 `::after`

因此 `Image` 元件就這麼誕生了 (ﾟ ∀ ﾟ)

## 成品

![https://ithelp.ithome.com.tw/upload/images/20220920/20142759tF8yqIVTao.png](https://ithelp.ithome.com.tw/upload/images/20220920/20142759tF8yqIVTao.png)

[展示](https://tzynwang.github.io/ithome-2022-demo/#/Image)
[原始碼](https://gist.github.com/tzynwang/1f561a290868e79cad29b6c2ea46ac62)

## 開發思路

### 外觀部分

把 `width` 與 `height` 等常用的 CSS 樣式移動到 `props` 方便設定。

也加入 `props.imageOnly` 允許使用者透過 `props` 來指定移除 `figure` 與 `figcaption` 元件。

### 處理 src 失效情境

使用 `handleImgLoadError` 來偵測 `img` 本身是否遭遇錯誤，若有，則套用 `props.class.onError` 樣式。
原始碼相關段落如下：

```tsx
// codes/src/components/Base/ImageBase/index.tsx

const [hasError, setHasError] = useState<boolean>(false);

const handleImgLoadError = useCallback((): void => {
  setHasError(true);
}, []);

<img
  className={cn(imgStyle, hasError && classes.onError, classes.img)}
  onError={handleImgLoadError}
/>;
```

而為了遮蓋破圖畫面，使用 `::after` 搭配滿版背景色來進行覆蓋。
相關樣式設定如下：

```tsx
// codes/src/components/Common/Image/index.tsx

const onErrorStyle = css({
  display: 'block',
  width: '200px',
  height: '40px',
  '&::after': {
    content: '"image unavailable"',
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'inherit',
    fontSize: '12px',
  },
});
```

### 切分為 ImageBase 與 Image 的理由

主要是考慮到 avatar 或 icon 此類小圖片的尺寸通常與一般圖片不同，將 `onError` 樣式移動到 `Image` 來設定可以保留較多彈性。通通寫死在 `ImageBase` 裡面會讓大小尺寸相差很多的圖片元件共享同一套 `onError` 樣式，我認為這樣反而比較不理想，故截稿前還是決定採用 `ImageBase` 與 `Image` 分拆的設計方式。

## 修改指南

### 想在 onError 時顯示替代圖片而不是文字

破圖時的 fallback 如果需要顯示圖片的話，可以採用 background-image 的形式來放圖：

```tsx
import backgroundSrc from '@Assets/image.jpg';

const onErrorStyle = css({
  display: 'block',
  width: '200px',
  height: '200px',
  '&::after': {
    content: '""', // 移除文字
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    backgroundImage: `url(${backgroundSrc})`, // 將圖片設定為背景
    backgroundRepeat: 'no-repeat', // 設定圖片不重複
    backgroundPosition: 'center center', // 置中圖片
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'inherit',
    fontSize: '12px',
  },
});
```

### 有辦法把 onError 樣式設定為透明背景嗎

沒辦法，背景透明的話蓋不掉預設的破圖畫面，但可以把 onError 樣式的 background-color 設定成當下畫面背景色。

## 自評

一天又平安的過去了，感謝 `Image` 元件解決連結失效時的破圖問題。
