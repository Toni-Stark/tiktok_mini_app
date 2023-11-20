export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/index/cate/index",
    "pages/index/search/index",
    "pages/list/index",
    "pages/mine/index",
    "pages/mine/wallet/index",
    "pages/mine/wallet/recharge/index",
    "pages/mine/code/index",
    "pages/mine/hobby/index",
    "pages/mine/system/index",
    "pages/mine/info/index",
    "pages/hot/index",
    "pages/hot/theater/index",
    "pages/video/index",
  ],
  window: {
    navigationStyle: "custom",
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/list/index",
        text: "追剧",
      },
      {
        pagePath: "pages/hot/index",
        text: "热播",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ],
    color: "#b2b5bc",
    selectedColor: "#fbffff", // 选中状态下的文本颜色
    backgroundColor: "#1e212a", // 背景颜色
    borderStyle: "black", // 边框样式
  },
});
