import Taro, { useLoad } from "@tarojs/taro";
import { CoverView, Text, View } from "@tarojs/components";
import { useState } from "react";
import "./index.less";

export const PageTabBarEnum = {
  Home: 1, // 首页,
  List: 2, // 追剧
  Hot: 3, // 热播
  Mine: 4, // 我的
};

const TabList = [
  {
    pagePath: "/pages/index/index", // 路由
    text: "首页",
    tabbar: PageTabBarEnum.Home,
  },
  {
    pagePath: "/pages/list/index",
    text: "追剧",
    tabbar: PageTabBarEnum.List,
  },
  {
    pagePath: "/pages/hot/index",
    text: "热播",
    tabbar: PageTabBarEnum.Hot,
  },
  {
    pagePath: "/pages/mine/index",
    text: "我的",
    tabbar: PageTabBarEnum.Mine,
  },
];

export default function customTabBar(props) {
  const [option] = useState({
    selected: 0, // 当前激活的tab下标
    color: "#b2b5bc", // 字体颜色
    selectedColor: "#fbffff", // 激活的字体颜色
    backgroundColor: "#1e212a", // 背景色
    borderStyle: "#282b32", // 边框颜色
  });

  const switchTab = (tabData) => {
    const { pagePath, navigateTo, tabbar } = tabData;
    if (navigateTo) {
      Taro.navigateTo({
        url: pagePath,
      });
    } else {
      Taro.switchTab({
        url: pagePath,
        success: () => {
          props.tabbar = tabbar; // 记录当前切换的底部tab
        },
      });
    }
  };

  return (
    <CoverView className="custom-tab">
      {TabList.map((item, index) => {
        return (
          <CoverView
            className="custom-tab-item"
            onClick={() => switchTab(item)}
            data-path={item.pagePath}
            key={index}
          >
            <CoverView
              className="custom-tab-item-text"
              style={{
                color:
                  props.tabbar === item.tabbar
                    ? option.selectedColor
                    : option.color,
              }}
            >
              {item.text}
            </CoverView>
          </CoverView>
        );
      })}
    </CoverView>
  );
}
