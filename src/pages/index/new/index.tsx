import { View, ScrollView, Image } from "@tarojs/components";
import Taro, { useLoad, useRouter } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../static/icon/left.png";
import card from "../../../static/source/info.png";
import top from "../../../static/icon/top.png";
import { getIndexNews } from "@/common/interface";
import { NoneView } from "@/components/noneView";

export default function New() {
  const router = useRouter();
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    more: false,
    refresh: false,
    title: "",
    type: "",
    p: 1,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [dataList, setDataList] = useState([]);
  const handleScrollTop = () => {
    setScrollTop(scrollTop ? 0 : 1);
  };
  useLoad(() => {
    const params = router.params;
    let _option = option;
    _option.title = params.title;
    _option.type = params.type;
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
    getIndexClassList();
  });
  const getIndexClassList = () => {
    getDataList(1);
  };
  const getDataList = (p) => {
    getIndexNews({ p }).then((res) => {
      let list = [...dataList];
      if (p == 1) {
        list = res.data.list;
      } else {
        list = list.concat(res.data.list);
      }
      setDataList(list);
      setOption({ ...option, p, refresh: false });
    });
  };
  const onScroll = (e) => {
    if (scrollOpacity === 0 && e.detail.scrollTop >= option.screenHeight) {
      setScrollOpacity(1);
    }
    if (scrollOpacity > 0 && e.detail.scrollTop < option.screenHeight) {
      setScrollOpacity(0);
    }
  };
  const addScrollList = () => {
    getDataList(option.p + 1);
  };
  const refreshChange = () => {
    setOption({ ...option, refresh: true });
    getDataList(1);
  };
  const naviBack = () => {
    Taro.navigateBack();
  };

  const naviToVideo = (id) => {
    Taro.navigateTo({
      url: "../../video/index?id=" + id,
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
          className="index_header_img"
          src={left}
          onClick={naviBack}
        />
        <View className="index_header_text">最近更新</View>
      </View>
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          id="scroll_view"
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          refresherEnabled={true}
          refresherTriggered={option.refresh}
          refresherBackground="#1e212a"
          onRefresherRefresh={refreshChange}
          lowerThreshold={30}
          onScrollToLower={addScrollList}
          enhanced
          onScroll={onScroll}
        >
          <View id="top" />
          <View className="index_zone_view_content">
            <View className="navi-data">
              {dataList.map((item) => {
                return (
                  <View
                    className="navi-data-item"
                    onClick={() => {
                      naviToVideo(item.id);
                    }}
                  >
                    <Image src={card} className="navi-data-item-img" />
                    <View className="navi-data-item-view">
                      <View className="navi-data-item-view-content">
                        <View className="navi-data-item-view-content-main">
                          {item.name}
                        </View>
                        <View className="navi-data-item-view-content-eval">
                          {item.describe}
                        </View>
                      </View>
                      <View className="navi-data-item-view-eval">
                        <View>{item.watching}人正在看</View>
                        <View>更新至第{item.episode}集</View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            {dataList.length > 0 ? (
              <View className="index-footer">
                {option.more ? (
                  <View className="index-footer-view">加载中...</View>
                ) : (
                  <View className="index-footer-view">暂无更多</View>
                )}
              </View>
            ) : (
              <View
                style={{
                  height: "35Vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoneView />
              </View>
            )}
          </View>
        </ScrollView>
        <View
          className="scroll_top"
          style={{ opacity: scrollOpacity }}
          onClick={handleScrollTop}
        >
          <Image className="scroll_top_img" src={top} />
        </View>
      </View>
    </View>
  );
}
