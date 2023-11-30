import {
  View,
  Image,
  Video,
  Button,
  MovableArea,
  MovableView,
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
import {
  getMemberShare,
  getMemberView,
  getVideoFavorite,
  getVideoIndex,
  getVideoPay,
  getVideoUpdate,
} from "@/common/interface";
import { TShow } from "@/common/common";
import home from "@/static/icon/home.png";

let timePlay = 0;
let timerPlay = null;
export default function VideoView() {
  const pages = Taro.getCurrentPages();
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
  ]);
  const [show, setShow] = useState(false);
  const [btnList, setBtnList] = useState([]);
  const [current, setCurrent] = useState({
    page: 1,
    v_id: 1,
  });
  const [position, setPosition] = useState({
    y: 0,
    top: 0,
  });
  const [currentInfo, setCurrentInfo] = useState(undefined);
  const [allList, setAllList] = useState([]);
  useLoad(() => {
    const params = router.params;
    getVideoList({ v_id: params.id });
    let _option = option;
    _option.title = "";
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
    setPosition({
      ...position,
      y: -2 - _option.screenHeight,
      top: -2 - _option.screenHeight,
    });
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
      let c_id = info.history_sub_id;
      let index = resData.findIndex((item) => item.id == c_id);
      setBtnList(arr);
      setAllList(resData);
      setCurrentInfo(resData[index]);

      Taro.useShareAppMessage((res) => {
        if (res.from === "button") {
          console.log(res.target);
        }
        return {
          title: info.name,
          path: "/pages/video/index",
        };
      });
    });
  };

  const chooseCurVideo = (bool) => {
    let curInfo = currentInfo;
    let index = allList.findIndex((item) => item.id === curInfo.id);
    if (bool) {
      if (index < allList.length - 1) {
        setCurrentInfo(allList[index + 1]);
      }
    } else {
      if (index > 0) {
        setCurrentInfo(allList[index - 1]);
      }
    }
    setShow(false);
  };

  const handleMovableViewStart = (e) => {
    let val = e.mpEvent.changedTouches[0].clientY;
    setPosition({
      ...position,
      top: val,
    });
  };
  // 处理 MovableView 的移动事件
  const handleMovableViewEnd = (e) => {
    let val = e.mpEvent.changedTouches[0].clientY;
    let page = val - position.top < 0;
    let num = -2 - option.screenHeight;
    let bool = num === position.y;
    if (bool) {
      num = -1 - option.screenHeight;
    }
    chooseCurVideo(page);
    setTimeout(() => {
      setPosition({
        ...position,
        y: num,
      });
    }, 100);
    stopPlay();
  };

  const naviBack = () => {
    Taro.navigateBack();
  };
  const naviHome = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };

  const clickItemValue = (index, value) => {
    let list: any = dataList;
    let bool = value == 1 ? 2 : 1;
    if (value) {
      list[index].check = bool;
      if (value == 1) {
        list[index].value = Number(list[index].value) + 1;
      } else {
        list[index].value = Number(list[index].value) - 1;
      }
      setDataList([...list]);
    }
    currentVideoFavorite(index, bool);
  };
  const shareView = () => {
    getMemberShare({
      v_id: dataInfo.id,
      v_s_id: currentInfo.id,
    }).then((res) => {});
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
  const naviToHotOne = () => {
    Taro.navigateTo({
      url: "../mine/wallet/recharge/index",
    });
  };

  const chooseCurrent = (val) => {
    let info = allList.find((item) => item.id === val);
    if (!info.is_pay) {
      getVideoPay({ v_s_id: info.id }).then((res) => {
        if (res.code !== 200) {
          TShow(res.code);
        } else if (res.code == 101) {
          naviToHotOne();
        }
        TShow("购买成功");
        getVideoList({ v_id: dataInfo.id });
      });
      return;
    }
    if (info) {
      setCurrentInfo(info);
    }
    setShow(false);
    timePlay = 0;
  };

  const currentVideoFavorite = (ind, val) => {
    let act = ["", "del", "add"];
    let types = ["like", "collect"];
    getVideoFavorite({
      type: types[ind],
      act: act[val],
      v_id: dataInfo.id,
      v_s_id: currentInfo.id,
    }).then((res) => {});
  };
  const startPlay = async () => {
    console.log(123);
    await getVideoUpdate({ v_s_id: currentInfo.id });
    clearInterval(timePlay);
    timerPlay = null;
    timerPlay = setInterval(async () => {
      timePlay += 1;
      if (timePlay >= 8) {
        await getMemberView({ v_id: dataInfo.id, v_s_id: currentInfo.id });
        clearInterval(timerPlay);
        timePlay = 1;
      }
    }, 1000);
  };
  const stopPlay = () => {
    clearInterval(timerPlay);
    timerPlay = null;
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
          {pages.length > 1 ? (
            <Image
              mode="widthFix"
              className="index_header_view_img"
              src={left}
              onClick={naviBack}
            />
          ) : (
            <Image
              mode="widthFix"
              className="index_header_view_img"
              src={home}
              onClick={naviHome}
            />
          )}
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
        <Button
          className="index_label_view"
          openType="share"
          onClick={() => shareView()}
          hoverClass="index_label_active"
        >
          <View className="view">
            <Image className="img" src={share_g} />
          </View>
          <View className="text">分享</View>
        </Button>
      </View>
      <View className="index_content">
        <MovableArea className="mova">
          <MovableView
            className="mova-view"
            direction="vertical"
            y={position.y}
            inertia={false}
            outOfBounds={true}
            onTouchEnd={handleMovableViewEnd}
            onTouchStart={handleMovableViewStart}
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
                  onPlay={startPlay}
                  onPause={stopPlay}
                  showPlayBtn={true}
                  showFullscreenBtn={false}
                  autoplay={true}
                  enablePlayGesture={true}
                  showCenterPlayBtn={true}
                  playBtnPosition="center"
                  loop={true}
                  objectFit="cover"
                />
              </View>
              <View className="center_footer" />
            </View>
            <View className="after">
              <Image className="after_image" src={dataInfo?.img} />
            </View>
          </MovableView>
        </MovableArea>
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
