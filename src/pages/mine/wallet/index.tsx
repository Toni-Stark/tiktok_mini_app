import { View, ScrollView, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../static/icon/left.png";
import right from "../../../static/icon/right.png";

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
  const naviToDetail = () => {
    Taro.navigateTo({
      url: "./recharge/index",
    });
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
        <View className="index_header_text">我的钱包</View>
      </View>
      <View className="index_content">
        <View className="index_content_icon">
          <View className="index_content_icon_text">
            <View className="text_main">
              <View className="text_main_title">蚂蚁券余额</View>
              <View className="text_main_eval">
                0 <View className="text_main_eval_text">蚂蚁券</View>
              </View>
            </View>
            <View className="text_main">
              <View className="text_main_title">会员时长</View>
              <View className="text_main_eval">
                0 <View className="text_main_eval_text">天</View>
              </View>
            </View>
          </View>
          <View className="index_content_icon_btn" onClick={naviToDetail}>
            去充值
          </View>
        </View>
        <View className="index_content_bug">
          <View className="title">蚂蚁豆余额</View>
          <View className="value">0.00</View>
        </View>
        <View className="index_content_list">
          <View className="index_item">
            充值记录
            <Image className="index_item_image" src={right} />
          </View>
          <View className="index_item">
            消费记录
            <Image className="index_item_image" src={right} />
          </View>
          <View className="index_item">
            蚂蚁豆记录
            <Image className="index_item_image" src={right} />
          </View>
        </View>
      </View>
    </View>
  );
}
