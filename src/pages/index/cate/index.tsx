import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
  Text,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../static/icon/left.png";
import card from "../../../static/source/info.png";
import top from "../../../static/icon/top.png";
import { AtButton } from "taro-ui";

export default function Search() {
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
        <View className="index_header_text">短剧分类</View>
      </View>
      <View className="index_buttons">
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
          <Image mode="widthFix" className="scroll_top_img" src={top} />
        </View>
      </View>
    </View>
  );
}
