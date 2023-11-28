import { View, Image, Video, ScrollView } from "@tarojs/components";
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
import { getVideoFavorite, getVideoIndex } from "@/common/interface";

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
  const [dataInfo, setDataInfo] = useState<any>(undefined);
  const [dataList, setDataList] = useState([
    {
      value: 0,
      icon: heart,
      icon_g: heart_g,
      check: 1,
    },
    {
      value: 0,
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
  const [btnList, setBtnList] = useState([]);
  const [current, setCurrent] = useState({
    page: 1,
    v_id: 1,
  });
  const [currentInfo, setCurrentInfo] = useState(undefined);
  const [allList, setAllList] = useState([]);

  useLoad(() => {
    const params = router.params;
    getVideoList({ v_id: params.id });
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

  const getVideoList = (params) => {
    getVideoIndex(params).then((res) => {
      let btnArr: any = [...dataList];
      const { info, list } = res.data;
      btnArr[0].value = info.like;
      btnArr[1].value = info.collect;
      btnArr[0].check = info?.is_liked ? 2 : 1;
      btnArr[1].check = info.is_collected ? 2 : 1;
      setDataInfo(info);
      setDataList([...btnArr]);
      let arr = [];
      let resData = [];
      for (let key in list) {
        arr.push({
          title: key,
          id: arr.length + 1,
        });
        for (let i in list[key]) {
          resData.push(list[key][i]);
        }
      }
      setBtnList(arr);
      setAllList(resData);
      setCurrentInfo(resData[0]);
    });
  };

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
        console.log(res, "res");
        chooseCurVideo(res[0].bottom);
      }
    });
  };

  const chooseCurVideo = (bm) => {
    let curInfo = currentInfo;
    let index = allList.findIndex((item) => item.id === curInfo.id);
    if (bm < 50) {
      if (index < allList.length - 1) {
        setCurrentInfo(allList[index + 1]);
      }
    } else if (bm > 50) {
      if (index > 0) {
        setCurrentInfo(allList[index - 1]);
      }
    }
    setShow(false);
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
    let bool = value == 1 ? 2 : 1;
    if (value) {
      list[index].check = bool;
      setDataList([...list]);
    }
    currentVideoFavorite(index, bool);
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
    let info = allList.find((item) => item.id === val);
    if (info) {
      setCurrentInfo(info);
    }
    setShow(false);
  };

  const currentVideoFavorite = (ind, val) => {
    let act = ["", "del", "add"];
    let types = ["like", "collect"];
    getVideoFavorite({
      type: types[ind],
      act: act[val],
      v_id: current.v_id,
    }).then((res) => {});
  };
  return (
    <View className="index">
      <View
        className="index_header"
        style={{
          top: option.statusBarHeight + "Px",
          height: option.barHeight + "Px",
        }}
      >
        <View className="index_header_view">
          <Image
            mode="widthFix"
            className="index_header_view_img"
            src={left}
            onClick={naviBack}
          />
          <View className="index_header_view_text">{currentInfo?.name}</View>
        </View>
      </View>
      <View className="index_footer" onClick={openLayout}>
        <View className="index_footer_text">
          《{dataInfo?.name}》·共{dataInfo?.episode}集
        </View>
        <Image mode="heightFix" className="index_footer_img" src={top} />
      </View>
      <View className="index_label">
        {dataList.map((res, index) => {
          let item: any = res;
          return (
            <View
              className="index_label_view"
              onClick={() => clickItemValue(index, item.check)}
              hoverClass="index_label_active"
            >
              <View className="view">
                <Image
                  className="img"
                  src={
                    item.check
                      ? item.check == 2
                        ? item.icon_g
                        : item.icon
                      : item.icon
                  }
                />
              </View>
              <View className="text">{item.value}</View>
            </View>
          );
        })}
      </View>
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
            <Image className="before_image" src={dataInfo?.img} />
          </View>
          <View id="targetPosition" />
          <View className="center">
            <View className="center_video">
              <Video
                className="center_video_large"
                src={currentInfo?.url}
                poster={dataInfo?.img}
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
            <Image className="after_image" src={dataInfo?.img} />
          </View>
        </ScrollView>
      </View>
      <AtFloatLayout isOpened={show} onClose={handleClose}>
        <View className="layout">
          <View className="layout_header">
            《{dataInfo?.name}》 · 共{dataInfo?.episode}集
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
            {allList.map((item) => {
              return (
                <View
                  className="layout_list_item"
                  style={{
                    background:
                      item.id === currentInfo.id
                        ? "linear-gradient(to right, #a829e8, #3c6fef);"
                        : "#3e4150",
                  }}
                  onClick={() => chooseCurrent(item.id)}
                >
                  {item.id}
                  {!item?.is_pay ? (
                    <Image className="layout_list_item_img" src={yuan} />
                  ) : null}
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
