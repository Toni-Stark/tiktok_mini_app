import { Image, ScrollView, Video, View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import search from "../../static/icon/search.png";
import card from "../../static/source/info.png";
import top from "../../static/icon/top.png";
import { getFavorite, getVideoHistory } from "@/common/interface";

export default function List() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    habit: 1,
    refresh: false,
  });
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [btnList, setBtnList] = useState([
    {
      title: "历史",
      id: 1,
      list: [],
      p: 1,
      count: 0,
    },
    {
      title: "点赞",
      id: 2,
      list: [],
      p: 1,
      count: 0,
    },
    {
      title: "收藏",
      id: 3,
      list: [],
      p: 1,
      count: 0,
    },
  ]);
  const [newData, setNewData] = useState<any>([]);
  const [videoDefault, setVideoDefault] = useState(undefined);
  useLoad(async () => {
    let _option = option;
    const rect = Taro.getMenuButtonBoundingClientRect();
    _option.barHeight = rect.height;
    _option.statusBarHeight = rect.top;
    Taro.getSystemInfo({
      success: (res) => {
        _option.screenWidth = res.screenWidth;
        _option.screenHeight = res.screenHeight;
        _option.videoHeight = res.screenWidth / 0.72;
      },
    });
    setOption({ ..._option });
    await getDefaultList();
  });

  const videoFavorite = (params) => {
    return new Promise((resolve) => {
      getFavorite(params).then((res) => {
        if (res.code === 200) {
          resolve({ list: res.data.favorite_list, count: res.data.count });
        }
      });
    });
  };
  const videoHistory = (params) => {
    return new Promise((resolve) => {
      getVideoHistory(params).then((res) => {
        if (res.code === 200) {
          resolve({ list: res.data.history_list, count: res.data.count });
        }
      });
    });
  };

  const getDefaultList = async () => {
    let arr = [...btnList];
    arr[0] = { ...arr[0], ...(await videoHistory({ p: 1 })) };
    arr[1] = { ...arr[1], ...(await videoFavorite({ p: 1, type: 1 })) };
    arr[2] = { ...arr[2], ...(await videoFavorite({ p: 1, type: 2 })) };
    setBtnList([...arr]);
    await currentTab(option.habit, arr);
    if (arr[0].list.length > 0) {
      setVideoDefault(arr[0].list[0]);
    }
  };

  const currentList = async (params) => {
    const { id } = params;
    let arr: any = [...btnList];
    if (id === 1) {
      let page = arr[0].p + 1;
      let result = await videoHistory({ p: page });
      arr[0].list.concat(result.list);
      arr[0].count = result.count;
      arr[0].p = page;
    } else if (id === 2) {
      let page = arr[1].p + 1;
      let result = await videoFavorite({ p: arr[1].p + 1, type: 1 });
      arr[1].list.concat(result.list);
      arr[1].count = result.count;
      arr[1].p = page;
    } else {
      let page = arr[2].p + 1;
      let result = await videoFavorite({ p: arr[2].p + 1, type: 2 });
      arr[2].list.concat(result.list);
      arr[2].count = result.count;
      arr[2].p = page;
    }
    setBtnList([...arr]);
    await currentTab(option.habit, arr);
  };

  const onScroll = (e) => {
    if (scrollOpacity === 0 && e.detail.scrollTop >= option.screenHeight) {
      setScrollOpacity(1);
    }
    if (scrollOpacity > 0 && e.detail.scrollTop < option.screenHeight) {
      setScrollOpacity(0);
    }
  };
  const currentTab = (id, list) => {
    let arr = [...btnList];
    if (list) {
      arr = list;
    }
    let data = arr.find((item) => item.id === id);
    setNewData([...data.list]);
    setOption({ ...option, habit: id });
  };
  const addScrollList = () => {
    currentList({ id: option.habit });
  };
  const refreshChange = async () => {
    setOption({ ...option, refresh: true });
    await getDefaultList();
    setOption({ ...option, refresh: false });
  };

  const naviToCateOne = (type) => {
    Taro.navigateTo({
      url: "../index/search/index?type=" + type,
    });
  };
  const naviToVideo = (id) => {
    Taro.navigateTo({
      url: "../video/index?id=" + id,
    });
  };
  return (
    <View className="index">
      <View
        className="index_header"
        style={{
          marginTop: option.statusBarHeight + "Px",
          height: option.barHeight + "Px",
        }}
      >
        <Image
          mode="widthFix"
          onClick={naviToCateOne}
          className="index_header_img"
          src={search}
        />
        <View className="index_header_text">追剧</View>
      </View>
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          scrollY
          scrollWithAnimation={true}
          refresherEnabled={true}
          refresherTriggered={option.refresh}
          refresherBackground="#1e212a"
          onRefresherRefresh={refreshChange}
          enhanced
          onScroll={onScroll}
          lowerThreshold={30}
          onScrollToLower={addScrollList}
        >
          <View className="index_zone_view_content">
            <View
              className="components-video"
              style={{ height: option.videoHeight + "Px" }}
            >
              {videoDefault ? (
                <View
                  className="components-video-large"
                  onClick={() => {
                    naviToVideo(videoDefault.id);
                  }}
                >
                  <Video
                    className="components-video-large-video"
                    style={{ height: option.screenWidth + "px" }}
                    src={videoDefault.video_url}
                    poster={videoDefault.video_img}
                    initialTime={0}
                    controls={false}
                    autoplay={true}
                    loop={true}
                    muted={true}
                    objectFit="cover"
                  />
                  <View className="components-video-large-content">
                    <View className="large-content-main">
                      <View className="large-content-main-title">
                        {videoDefault.class_name}
                      </View>
                      <View className="large-content-main-eval">
                        {videoDefault.video_name}
                      </View>
                    </View>
                    <text className="large-content-count">378人正在看</text>
                  </View>
                </View>
              ) : null}

              <View className="components-video-list">
                <View className="components-video-list-tabs">
                  {btnList.map((item) => {
                    return (
                      <View
                        className="components-video-list-tabs-tab"
                        style={{
                          color:
                            option.habit === item.id ? "#ffffff" : "#888888",
                        }}
                        onClick={() => currentTab(item.id)}
                      >
                        {item.title}
                        {item?.count || ""}
                        {option.habit === item.id ? (
                          <View className="components-video-list-tabs-tab-line" />
                        ) : null}
                      </View>
                    );
                  })}
                </View>
                {newData.map((item) => {
                  return (
                    <View
                      className="components-video-list-item"
                      onClick={() => {
                        naviToVideo(item.id);
                      }}
                    >
                      <Image className="image" src={item.video_img} />
                    </View>
                  );
                })}
              </View>
              <View className="components-video-more">暂无更多</View>
            </View>
          </View>
        </ScrollView>
        <View className="scroll_top" style={{ opacity: scrollOpacity }}>
          <Image className="scroll_top_img" src={top} />
        </View>
      </View>
      <View className="index_footer" />
    </View>
  );
}
