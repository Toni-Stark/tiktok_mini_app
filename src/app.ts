import { PropsWithChildren } from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import "./app.less";
import "taro-ui/dist/style/index.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/badge.scss";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    Taro.setStorageSync("role", 1);
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
