import { View, Text, ScrollView, Image, Video } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import search from "../../static/icon/search.png";
import card from "../../static/source/info.png";
import top from "../../static/icon/top.png";

export default function List() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    habit: 1,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [btnList, setBtnList] = useState([
    {
      title: "历史15",
      id: 1,
    },
    {
      title: "点赞12",
      id: 2,
    },
    {
      title: "收藏9",
      id: 3,
    },
  ]);
  const [newData, setNewData] = useState([
    {
      img: card,
      text: "仙尊师傅太诱人",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "天降龙医生",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "我老公不是一个人老公不是一个人",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "灶神出世",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "总裁大人的秋裤",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "绝世神医",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "绝世赘婿之仙人跳",
      eval: "甜宠古装仙侠巨制",
    },
    ,
    {
      img: card,
      text: "绝世神医",
      eval: "甜宠古装仙侠巨制",
    },
    {
      img: card,
      text: "绝世赘婿之仙人跳",
      eval: "甜宠古装仙侠巨制",
    },
  ]);
  const handleScrollTop = () => {
    setScrollTop(0);
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

  const naviToCateOne = (type) => {
    Taro.navigateTo({
      url: "../index/search/index?type=" + type,
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
          scrollTop={scrollTop}
          enhanced
          onScroll={onScroll}
        >
          <View className="index_zone_view_content">
            <View
              className="components-video"
              style={{ height: option.videoHeight + "Px" }}
            >
              <View className="components-video-large">
                <Video
                  className="components-video-large-video"
                  style={{ height: option.screenWidth + "px" }}
                  src="http://231110002.ldcvh.china-yun.net/wximg/video_h.mp4"
                  poster="http://231110002.ldcvh.china-yun.net/wximg/video_p.png"
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
                      替身的牛逼之处
                    </View>
                    <View className="large-content-main-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <text className="large-content-count">378人正在看</text>
                </View>
              </View>
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
                        onClick={() => {
                          setOption({ ...option, habit: item.id });
                        }}
                      >
                        {item.title}
                        {option.habit === item.id ? (
                          <View className="components-video-list-tabs-tab-line" />
                        ) : null}
                      </View>
                    );
                  })}
                </View>
                {newData.map((item) => {
                  return (
                    <View className="components-video-list-item">
                      <Image mode="widthFix" className="image" src={item.img} />
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
