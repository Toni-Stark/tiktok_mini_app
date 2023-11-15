import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
  Text,
  Input,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useMemo, useState } from "react";
import left from "../../../static/icon/left.png";
import card from "../../../static/source/info.png";
import top from "../../../static/icon/top.png";
import search from "../../../static/icon/search_gray.png";

let list = [
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
  {
    title: "仙尊太诱人",
    img: card,
    desc: "互换身份身陷阴谋",
    current: "356",
    now: "78",
  },
];
export default function Cate() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    more: false,
    refresh: false,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [dataList, setDataList] = useState([]);
  const handleScrollTop = () => {
    setScrollTop(scrollTop ? 0 : 1);
  };
  useLoad(() => {
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
  });

  const setActive = (id) => {
    setOption({ ...option, active: id });
  };
  const onScroll = (e) => {
    if (scrollOpacity === 0 && e.detail.scrollTop >= option.screenHeight) {
      setScrollOpacity(1);
    }
    if (scrollOpacity > 0 && e.detail.scrollTop < option.screenHeight) {
      setScrollOpacity(0);
    }
  };
  const refreshChange = () => {
    setOption({ ...option, refresh: true });
    setTimeout(() => {
      setOption({ ...option, refresh: false });
    }, 1500);
  };
  const naviBack = () => {
    Taro.navigateBack();
  };
  const getCurrentList = (e) => {
    console.log(e);
    setDataList(list);
  };
  const currentContext = useMemo(() => {
    if (dataList.length > 0) {
      return (
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
            enhanced
            onScroll={onScroll}
          >
            <View id="top" />
            <View className="index_zone_view_content">
              <View className="navi-data">
                {dataList.map((item) => {
                  return (
                    <View className="navi-data-item">
                      <Image
                        mode="widthFix"
                        src={card}
                        className="navi-data-item-img"
                      />
                      <View className="navi-data-item-view">
                        <View className="navi-data-item-view-content">
                          <View className="navi-data-item-view-content-main">
                            替身的诱惑
                          </View>
                          <View className="navi-data-item-view-content-eval">
                            互换身份身陷阴谋
                          </View>
                        </View>
                        <View className="navi-data-item-view-eval">
                          <View>316人正在看</View>
                          <View>更新至第78集</View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View className="index-footer">
                {option.more ? (
                  <View className="index-footer-view">加载中...</View>
                ) : (
                  <View className="index-footer-view">暂无更多</View>
                )}
              </View>
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
      );
    } else {
      return (
        <View className="history">
          <View className="history-title">历史搜索</View>
          <View className="history-list">
            <View className="history-list-item">大</View>
            <View className="history-list-item">还不是</View>
            <View className="history-list-item">其他</View>
          </View>
        </View>
      );
    }
  }, [dataList]);
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
        <View className="index_header_text">搜索</View>
      </View>
      <View className="index_search">
        <Image mode="widthFix" src={search} className="index_search_img" />
        <View className="index_search_input">
          <Input
            className="index_search_input_value"
            placeholder="在此处搜索"
            onConfirm={getCurrentList}
          />
        </View>
        <View
          className="index_search_btn"
          hoverClass="index_search_hover"
          onClick={getCurrentList}
        >
          搜索
        </View>
      </View>
      {currentContext}
    </View>
  );
}
