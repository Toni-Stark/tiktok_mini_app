import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../static/icon/left.png";
import one from "../../../static/icon/one.png";
import two from "../../../static/icon/two.png";
import three from "../../../static/icon/three.png";
import down from "../../../static/icon/down_load.png";
import share from "../../../static/icon/share.png";
import code from "../../../static/icon/e_code.png";

export default function Wallet() {
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
  const [list, setList] = useState([
    {
      title: "普通会员",
      status: "已达成",
      status_desc: "您已达成该等级",
      icon: one,
      color: "#333333",
      start_color: "#ececec",
      end_color: "#ababab",
    },
    {
      title: "普通剧推官",
      status: "未达成",
      status_desc: "尚未达到升级条件",
      main: "可享受邀请会员消费15%的奖励",
      count: 3,
      num: 0,
      icon: two,
      color: "#7289b5",
      start_color: "#eff0f2",
      end_color: "#cbdaef",
    },
    {
      title: "金牌剧推官",
      status: "未达成",
      status_desc: "尚未达到升级条件",
      main: "可享受邀请会员消费20%的奖励",
      count: 100,
      num: 0,
      icon: three,
      color: "#ff7d01",
      start_color: "#ffe8d6",
      end_color: "#ffb167",
    },
  ]);
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
        <View className="index_header_text">我要推广</View>
      </View>
      <View className="index_content">
        <View className="index_content_header">
          <Swiper
            className="swiper_view"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            circular
            autoplay
          >
            {list.map((res) => {
              let item: any = res;
              return (
                <SwiperItem>
                  <View className="swiper">
                    <View
                      className="swiper_item"
                      style={{
                        background:
                          "linear-gradient(to right, " +
                          item.start_color +
                          ", " +
                          item.end_color +
                          ")",
                      }}
                    >
                      <View
                        className="swiper_item_content"
                        style={{ color: item.color }}
                      >
                        <View className="title">{item.title}</View>
                        <View className="label">
                          <View
                            className="label_icon"
                            style={{ background: item.color }}
                          >
                            {item.status}
                          </View>
                          <View className="label_text">{item.status_desc}</View>
                        </View>
                        <View className="text">
                          {item.main ? <View>{item.main}</View> : null}
                          {item.count ? (
                            <View>
                              {item.num}/{item.count}还需邀请
                              {item.count - item.num}人升级
                            </View>
                          ) : null}
                        </View>
                      </View>
                      <View className="swiper_item_img">
                        <Image
                          className="swiper_item_img_logo"
                          src={item.icon}
                        />
                      </View>
                    </View>
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
        <View className="index_content_code">
          <View className="content">
            <View className="content_title">剧推码</View>
            <View className="content_code">
              <Image className="content_code_img" src={code} />
            </View>
          </View>
          <View className="control">
            <View className="control_view">
              <Image className="control_view_img" src={down} />
              保存图片
            </View>
            <View className="control_view">
              <Image className="control_view_img" src={share} />
              分享好友
            </View>
          </View>
        </View>
        <View className="index_content_desc">
          <View className="title">剧推官权益说明</View>
          <View className="desc">
            <View>
              1、用户等级分为普通会员、普通剧推官、金牌剧推官、钻石剧推官四个等级，注册登录后自动成为普通会员；
            </View>
            <View>
              2、分享剧推码给好友，好友扫码下载APP并注册后，即成功邀请好友，达到一定数量等级将自动升级；
            </View>
            <View>
              3、被邀请人在平台消费，你将获得一定奖励，不同等级剧推官获得奖励不同，等级越高奖励越多。
            </View>
            <View>普通剧推官：邀请3-99人</View>
            <View>金牌剧推官：邀请100人</View>
            <View>钻石剧推官：邀请500人</View>
          </View>
        </View>
      </View>
    </View>
  );
}
