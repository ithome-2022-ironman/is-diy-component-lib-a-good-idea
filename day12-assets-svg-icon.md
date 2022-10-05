# day12: hosting SVG icon

為了讓開發更加方便，在本次鐵人賽中會使用套件 `@svgr/webpack` 來搭配 `create-react-app` 操作 `.svg` 檔案。

優點是同一個 `.svg` 檔案可以選擇以「元件」或「檔案路徑」的格式來使用。且在使用「元件」形式引用 `.svg` 檔案時，可以透過 `props` 來傳入常用樣式設定（`fill`、`width` 與 `height` 等）。

## 使用方式

### 專案設定

使用 `create-react-app` 建立專案後，在專案根目錄執行 `npm run eject` 注入 `create-react-app` 封裝起來的設定。接著開啟 `<projectRoot>/config/webpack.config.js` 檔案，在處理 `.svg` 類型的規範中新增以下內容：

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('url-loader'),
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
    ],
  },
};
```

如果專案中的 `react-app-env.d.ts` 檔案中沒有 `.svg` 相關的型別設定，請追加：

```ts
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
```

解說：對 `.svg` 檔案執行 `default export` 時，取得的是路徑資訊，形式為字串；而如果使用名稱 `ReactComponent` 來匯入檔案，得到的會是 `React.FunctionComponent` 且 `props` 會包含 HTML 原生的 SVGElement attributes 與 `title: string;`

檔案的引用方式可參考以下內容。注意在這邊使用 named import 進行匯入時，名稱（`ReactComponent`）要與 `react-app-env.d.ts` 檔案設定的一致。

```tsx
import React, { memo } from 'react';
import lightBulbSrc, {
  ReactComponent as LightBulb,
} from './lightbulb_black_24dp.svg';

function App(): React.ReactElement {
  return (
    <div>
      <LightBulb title="LightBulb" />

      {/* 可透過 props 設定檔案樣式 */}
      <LightBulb title="LightBulb" width={32} height={32} fill="gold" />

      {/* 也可選擇透過 default export 來使用檔案路徑 */}
      <img src={lightBulbSrc} alt="LightBulb" />
    </div>
  );
}

export default memo(App);
```

最終渲染出來的結果如下：

```html
<!-- <LightBulb title="LightBulb" /> -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 0 24 24"
  width="24px"
  fill="#000000"
  class="components_LightBulbClassName__rvEPn"
>
  <title>LightBulb</title>
  <path d="M0 0h24v24H0z" fill="none"></path>
  <path
    d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"
  ></path>
</svg>

<!-- <LightBulb title="LightBulb" width={32} height={32} fill="gold" /> -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="32"
  viewBox="0 0 24 24"
  width="32"
  fill="gold"
>
  <title>LightBulb</title>
  <path d="M0 0h24v24H0z" fill="none"></path>
  <path
    d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"
  ></path>
</svg>

<!-- <img src={lightBulbSrc} alt="LightBulb" /> -->
<img
  src="/static/media/lightbulb_black_24dp.71448549759b1887d24c6b95c3555fe7.svg"
  alt="LightBulb"
/>
```

鐵人賽一系列元件中若有出現 `.svg` 檔案，基本上都是透過以上方式來處理的。

### 取得圖示

可在 [Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons) 下載 SVG 圖示。

而以下是本次鐵人賽的專案結構，為了讓引用圖示更方便，進一步在 `src/assets/icon` 資料夾中新增 `index.ts` 檔案來整理可使用的圖示檔案：

```ts
export { ReactComponent as CloseIcon } from './close_black_24dp.svg';
export { ReactComponent as ExpendLessIcon } from './expand_less_black_24dp.svg';
export { ReactComponent as ExpendMoreIcon } from './expand_more_black_24dp.svg';
export { ReactComponent as InsertPhotoIcon } from './insert_photo_black_24dp.svg';
export { ReactComponent as NavigateIcon } from './navigate_next_black_24dp.svg';
export { ReactComponent as PersonIcon } from './person_black_24dp.svg';
export { ReactComponent as PhotoCameraIcon } from './photo_camera_black_24dp.svg';
export { ReactComponent as StarIcon } from './star_black_24dp.svg';
```

在元件中即可透過以下方式引用：

```tsx
import { PhotoCameraIcon } from '@Assets/icons';

<Button
  startIcon={<PhotoCameraIcon fill="#fff" height={16} width={16} />}
  onClick={openFileSelectDialog}
>
  upload file
</Button>;
```

## 自評

方便實惠，且在以元件形式引用時也可直接透過 `props` 傳入基本外型參數來控制 `.svg` 外觀。
基本上搭配 [Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons) 即可處理掉大部分的圖示需求，不一定需要安裝 [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) 了

## 參考文件

- [SVGR: Webpack](https://react-svgr.com/docs/webpack/)
- [MDN: `<title>` — the SVG accessible name element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title)
