import {
  View,
  Image,
  CoverView,
  Video,
  ScrollView,
  CoverImage,
} from "@tarojs/components";
import Taro, { useLoad, useRouter } from "@tarojs/taro";
import { AtButton, AtFloatLayout } from "taro-ui";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/float-layout.scss";
import "./index.less";
import { useState } from "react";

import left from "../../static/icon/left.png";
import top from "../../static/icon/z_top.png";
import heart from "../../static/icon/heart.png";
import heart_g from "../../static/icon/heart_g.png";
import gets from "../../static/icon/get.png";
import getg from "../../static/icon/get_g.png";
import share_g from "../../static/icon/share-arrow.png";
import down from "../../static/icon/down.png";
import yuan from "../../static/icon/yuan.png";

export default function VideoView() {
  const router = useRouter();
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    more: false,
    refresh: false,
    title: "",
    type: "",
  });
  const [scrollTop, setScrollTop] = useState(option.screenHeight);
  const [rBool, setRBool] = useState(false);
  const [dataList, setDataList] = useState([
    {
      value: 3423,
      icon: heart,
      icon_g: heart_g,
      check: 1,
    },
    {
      value: 534,
      icon: getg,
      icon_g: gets,
      check: 1,
    },
    {
      value: "分享",
      icon: share_g,
    },
  ]);

  const [show, setShow] = useState(false);
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      title: "1-30",
    },
    {
      id: 2,
      title: "31-60",
    },
    {
      id: 3,
      title: "61-90",
    },
    {
      id: 4,
      title: "91-99",
    },
  ]);
  const [current, setCurrent] = useState({
    page: 1,
    val: 1,
    url: "http://231110002.ldcvh.china-yun.net/wximg/video_h.mp4",
    png: "http://231110002.ldcvh.china-yun.net/wximg/video_p.png",
    data: [],
  });

  useLoad(() => {
    const params = router.params;
    let _option = option;
    _option.title = "第一集";
    _option.type = 3;
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
    setScrollTop(_option.screenHeight);
    setOption({ ..._option });
  });

  const positionTo = () => {
    // 获取目标元素的位置信息
    const query = Taro.createSelectorQuery();
    query.select("#targetPosition").boundingClientRect();
    query.exec((res) => {
      if (res[0].top > 5 || res[0].top < -5) {
        let keyPosition = rBool ? option.screenHeight : option.screenHeight + 1;
        Taro.pageScrollTo({
          scrollTop: keyPosition,
          duration: 300,
        });
        setScrollTop(keyPosition);
        setRBool(!rBool);
      }
    });
  };

  const scrollEnd = () => {
    positionTo();
  };
  let timer = undefined;
  const scrollIng = (e) => {
    clearTimeout(timer);
    timer = null;
    timer = setTimeout(() => {
      positionTo();
    }, 200);
    return true;
  };

  const naviBack = () => {
    Taro.navigateBack();
  };

  const clickItemValue = (index, value) => {
    let list: any = dataList;
    if (value) {
      list[index].check = value === 1 ? 2 : 1;
      setDataList([...list]);
    }
  };

  const openLayout = () => {
    let list = [];
    let info = btnList.find((item) => item.id === current.page);
    let key = info.title.split("-");
    for (let i = key[0]; i <= key[1]; i++) {
      list.push({
        val: i,
        imp: i > 10 ? 1 : 0,
      });
    }
    setCurrent({ ...current, data: list });
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const currentListInfo = (id) => {
    let list = [];
    let info = btnList.find((item) => item.id === id);
    let key = info.title.split("-");
    for (let i = key[0]; i <= key[1]; i++) {
      list.push({
        val: i,
        imp: i > 10 ? 1 : 0,
      });
    }
    setCurrent({ ...current, page: id, data: list });
  };
  const chooseCurrent = (val) => {
    setCurrent({ ...current, val });
  };

  return (
    <View className="index">
      <CoverView
        className="index_header"
        style={{
          top: option.statusBarHeight + "Px",
          height: option.barHeight + "Px",
        }}
      >
        <CoverView className="index_header_view">
          <CoverImage
            mode="widthFix"
            className="index_header_view_img"
            src={left}
            onClick={naviBack}
          />
          <CoverView className="index_header_view_text">
            {option.title}
          </CoverView>
        </CoverView>
      </CoverView>
      <CoverView className="index_footer" onClick={openLayout}>
        <CoverView className="index_footer_text">
          《踹了渣男后，我嫁入了豪门》·共92集
        </CoverView>
        <CoverImage mode="heightFix" className="index_footer_img" src={top} />
      </CoverView>
      <CoverView className="index_label">
        {dataList.map((res, index) => {
          let item: any = res;
          return (
            <CoverView
              className="index_label_view"
              onClick={() => clickItemValue(index, item.check)}
              hoverClass="index_label_active"
            >
              <CoverView className="view">
                <CoverImage
                  className="img"
                  src={
                    item.check
                      ? item.check == 2
                        ? item.icon_g
                        : item.icon
                      : item.icon
                  }
                />
              </CoverView>
              <CoverView className="text">{item.value}</CoverView>
            </CoverView>
          );
        })}
      </CoverView>
      <View className="index_content">
        <ScrollView
          className="index_content_view"
          scrollY
          showScrollbar={false}
          scrollTop={scrollTop}
          scrollWithAnimation={false}
          disableScroll={true}
          enhanced
          onScroll={scrollIng}
          onTouchEnd={scrollEnd}
        >
          <View className="before">
            <Image
              className="before_image"
              src="http://231110002.ldcvh.china-yun.net/wximg/video_n.jpg"
            />
          </View>
          <View id="targetPosition" />
          <View className="center">
            <View className="center_video">
              <Video
                className="center_video_large"
                src={current.url}
                poster={current.png}
                initialTime={0}
                controls={true}
                showPlayBtn={true}
                showFullscreenBtn={false}
                autoplay={true}
                enablePlayGesture={true}
                showCenterPlayBtn={true}
                playBtnPosition="center"
                loop={true}
                muted={true}
                objectFit="cover"
              />
            </View>
            <View className="center_footer" />
          </View>
          <View className="after">
            <Image
              className="after_image"
              src="http://231110002.ldcvh.china-yun.net/wximg/video_n.jpg"
            />
          </View>
        </ScrollView>
      </View>
      <AtFloatLayout isOpened={show} onClose={handleClose}>
        <View className="layout">
          <View className="layout_header">
            《沈爷 您失宠了》 · 共99集
            <Image
              mode="widthFix"
              onClick={handleClose}
              className="layout_header_img"
              src={down}
            />
          </View>
          <View className="layout_button">
            {btnList.map((item, index) => {
              return (
                <AtButton
                  className={item.id === current.page ? "active" : ""}
                  key={index}
                  type="primary"
                  size="normal"
                  onClick={() => {
                    currentListInfo(item.id);
                  }}
                >
                  {item.title}
                </AtButton>
              );
            })}
            <View className="button-pad" />
          </View>
          <View className="layout_list">
            {current.data.map((item) => {
              return (
                <View
                  className="layout_list_item"
                  style={{
                    background:
                      item.val === current.val
                        ? "linear-gradient(to right, #a829e8, #3c6fef);"
                        : "#3e4150",
                  }}
                  onClick={() => chooseCurrent(item.val)}
                >
                  {item.val}
                  <Image className="layout_list_item_img" src={yuan} />
                </View>
              );
            })}
          </View>
          <View className="layout_bar" />
        </View>
      </AtFloatLayout>
    </View>
  );
}
