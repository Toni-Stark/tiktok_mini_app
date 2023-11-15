import Taro, { useLoad, getCurrentInstance } from "@tarojs/taro";
import { CoverView, Text, View } from "@tarojs/components";
import { useEffect, useMemo, useState } from "react";
import "./index.less";
// import { getCurrentInstance } from "@tarojs/runtime";

export const PageTabBarEnum = {
  Home: 1, // 首页,
  List: 2, // 追剧
  Hot: 3, // 热播
  Mine: 4, // 我的
};

export default function customTabBar(props) {
  const [option] = useState({
    color: "#b2b5bc", // 字体颜色
    selectedColor: "#ffffff", // 激活的字体颜色
    backgroundColor: "#1e212a", // 背景色
    borderStyle: "#282b32", // 边框颜色
  });
  const [tabList, setTabList] = useState([
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
  ]);

  useEffect(() => {
    const router = getCurrentInstance().router;
    let index = tabList.findIndex((item) => {
      return item.pagePath.indexOf(router.path) >= 0;
    });
    if (index >= 0) {
      Taro.setStorageSync("role", tabList[index].tabbar);
      setTabList([...tabList]);
    }
  }, []);

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
          Taro.setStorageSync("role", tabbar);
        },
      });
    }
  };
  const renderTabs = useMemo(() => {
    let tabbar = Taro.getStorageSync("role");
    return (
      <>
        {tabList.map((item, index) => {
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
                    tabbar == item.tabbar ? option.selectedColor : option.color,
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </>
    );
  }, [tabList]);
  return <CoverView className="custom-tab">{renderTabs}</CoverView>;
}
