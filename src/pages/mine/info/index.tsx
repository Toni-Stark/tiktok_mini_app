import { View, ScrollView, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../static/icon/left.png";
import right from "../../../static/icon/right.png";
import header from "../../../static/source/header.png";

export default function Info() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    count: 0,
  });

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
        <View className="index_header_text">个人资料</View>
      </View>
      <View className="index_content">
        <View className="index_content_header">
          <View className="header_view">
            <Image className="header_view_img" src={header} />
            <View className="header_view_text">修改头像</View>
          </View>
        </View>
        <View className="index_content_card">
          <View className="index_content_card_item">
            昵称
            <View className="value">
              匿名用户
            </View>
          </View>
          <View className="index_content_card_item">
            性别
            <View className="value">
              男
              <Image className="value_image" src={right} />
            </View>
          </View>
          <View className="index_content_card_item">
            手机号
            <View className="value">
              未知
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
