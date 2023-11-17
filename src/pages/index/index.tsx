import { View, Text, ScrollView, Image, Video } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import search from "../../static/icon/search.png";
import card from "../../static/source/info.png";
import right from "../../static/icon/right.png";
import top from "../../static/icon/top.png";
import { AtButton } from "taro-ui";

export default function Index() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [btnList, setBtnList] = useState([
    {
      title: "推荐",
      id: 1,
    },
    {
      title: "都市",
      id: 2,
    },
    {
      title: "战神",
      id: 3,
    },
    {
      title: "甜宠",
      id: 4,
    },
    {
      title: "玄幻",
      id: 5,
    },
    {
      title: "古装",
      id: 6,
    },
  ]);
  const [reComm, setReCmm] = useState([
    {
      img: card,
      text: "仙尊师傅太诱人",
    },
    {
      img: card,
      text: "天降龙医生",
    },
    {
      img: card,
      text: "我老公不是一个人老公不是一个人",
    },
    {
      img: card,
      text: "灶神出世",
    },
    {
      img: card,
      text: "总裁大人的秋裤",
    },
    {
      img: card,
      text: "绝世神医",
    },
    {
      img: card,
      text: "绝世赘婿之仙人跳",
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

  const naviToCateOne = (type, title) => {
    Taro.navigateTo({
      url: "./cate/index?type=" + type + "&title=" + title,
    });
  };

  const naviToSearch = (type) => {
    Taro.navigateTo({
      url: "./search/index?type=" + type,
    });
  };
  const naviToVideo = () => {
    Taro.navigateTo({
      url: "../video/index",
    });
  };

  return (
    <View className="index">
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          enhanced
          onScroll={onScroll}
        >
          <View
            className="index_zone_view_header"
            style={{
              marginTop: option.statusBarHeight + "Px",
              height: option.barHeight + "Px",
            }}
          >
            <Image
              mode="widthFix"
              className="index_zone_view_header_img"
              src={search}
              onClick={naviToSearch}
            />
          </View>
          <View className="index_zone_view_content">
            <View
              className="components-video"
              style={{ height: option.videoHeight + "Px" }}
            >
              <Video
                id="video"
                className="components-video-video"
                src="http://231110002.ldcvh.china-yun.net/wximg/video_h.mp4"
                poster="http://231110002.ldcvh.china-yun.net/wximg/video_p.png"
                initialTime={0}
                controls={false}
                autoplay={true}
                loop={true}
                muted={true}
                objectFit="cover"
              />
              <View className="components-video-shadow" />
              <View className="components-video-card">
                <Image className="components-video-card-image" src={card} />
                <View className="components-video-card-content">
                  <Text className="title">仙尊师傅太诱人</Text>
                  <Text className="text">甜宠古装仙侠巨制</Text>
                </View>
              </View>
              <View className="components-video-lar">
                <Text className="components-video-lar-text">看你想看</Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(1, "更多分类");
                  }}
                >
                  更多分类
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-buttons">
                {btnList.map((item, index) => {
                  return (
                    <AtButton
                      className={item.id === option.active ? "active" : ""}
                      key={index}
                      type="primary"
                      size="normal"
                      onClick={() => {
                        setActive(item.id);
                      }}
                    >
                      {item.title}
                    </AtButton>
                  );
                })}
                <View className="button-pad" />
              </View>
              <View className="components-video-scroll">
                <ScrollView scrollX>
                  <View className="scroll-list">
                    {reComm.map((item, index) => {
                      return (
                        <View
                          key={index}
                          className="scroll-list-item"
                          onClick={naviToVideo}
                        >
                          <Image
                            mode="widthFix"
                            src={item.img}
                            className="scroll-list-item-img"
                          />
                          <Text
                            numberOfLines={1}
                            className="scroll-list-item-text"
                          >
                            {item.text}
                          </Text>
                        </View>
                      );
                    })}
                    <View className="button-pad" />
                  </View>
                </ScrollView>
              </View>
              {/*<View className="components-video-bar">*/}
              {/*  <Image*/}
              {/*    mode="widthFix"*/}
              {/*    src={bar1}*/}
              {/*    className="components-video-bar-image"*/}
              {/*  />*/}
              {/*</View>*/}
              <View className="components-video-lar">
                <Text className="components-video-lar-text">
                  N剧刷不腻！宝藏热剧爆款出圈
                </Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(2, "热门独播");
                  }}
                >
                  热门独播
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-list">
                {newData.map((item) => {
                  return (
                    <View className="components-video-list-item">
                      <Image mode="widthFix" className="image" src={item.img} />
                      <Text className="text">{item.text}</Text>
                      <Text className="eval">{item.eval}</Text>
                    </View>
                  );
                })}
              </View>
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
                  muted={false}
                  objectFit="cover"
                />
                <text className="components-video-large-desc">
                  穷小子钓鱼钓到了金鱼，然后发生了什么奇怪的事呢？
                </text>
              </View>
              <View className="components-video-lar">
                <Text className="components-video-lar-text">
                  最新短剧速递 精彩内容抢先看
                </Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(2, "热门独播");
                  }}
                >
                  热门独播
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-list">
                {newData.map((item) => {
                  return (
                    <View className="components-video-list-item">
                      <Image mode="widthFix" className="image" src={item.img} />
                      <Text className="text">{item.text}</Text>
                      <Text className="eval">{item.eval}</Text>
                    </View>
                  );
                })}
              </View>
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
                  muted={false}
                  objectFit="cover"
                />
                <text className="components-video-large-desc">
                  穷小子钓鱼钓到了金鱼，然后发生了什么奇怪的事呢？
                </text>
              </View>
              <View className="components-video-lar">
                <Text className="components-video-lar-text">
                  女生必看！高甜短剧让你心动
                </Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(2, "热门独播");
                  }}
                >
                  热门独播
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-list">
                {newData.map((item) => {
                  return (
                    <View className="components-video-list-item">
                      <Image mode="widthFix" className="image" src={item.img} />
                      <Text className="text">{item.text}</Text>
                      <Text className="eval">{item.eval}</Text>
                    </View>
                  );
                })}
              </View>
              <View className="components-video-lar">
                <Text className="components-video-lar-text">
                  神秘异能再掀波澜，熬夜都要看完
                </Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(2, "热门独播");
                  }}
                >
                  热门独播
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-list">
                {newData.map((item) => {
                  return (
                    <View className="components-video-list-item">
                      <Image mode="widthFix" className="image" src={item.img} />
                      <Text className="text">{item.text}</Text>
                      <Text className="eval">{item.eval}</Text>
                    </View>
                  );
                })}
              </View>
              <View className="components-video-lar">
                <Text className="components-video-lar-text">
                  全程高能，多重翻转，下饭最佳！
                </Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(2, "热门独播");
                  }}
                >
                  热门独播
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-list">
                {newData.map((item) => {
                  return (
                    <View className="components-video-list-item">
                      <Image mode="widthFix" className="image" src={item.img} />
                      <Text className="text">{item.text}</Text>
                      <Text className="eval">{item.eval}</Text>
                    </View>
                  );
                })}
              </View>
              <View className="zone_footer" />
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
      <View className="index_footer" />
    </View>
  );
}
