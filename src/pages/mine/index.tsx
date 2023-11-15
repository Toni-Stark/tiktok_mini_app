import { View, Text, ScrollView, Image, Video } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import header from "../../static/source/header.png";
import bar1 from "../../static/source/bar1.png";
import code from "../../static/icon/code.png";

export default function Mine() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
  });

  const [list, setList] = useState([
    {
      title: "我的钱包",
      icon: code,
    },
    {
      title: "我要推广",
      icon: code,
    },
    {
      title: "内容偏好",
      icon: code,
    },
    {
      title: "我的客服",
      icon: code,
    },
    {
      title: "系统服务",
      icon: code,
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

  return (
    <View className="index">
      <View className="index_body">
        <View className="index_body_header">
          <Image
            mode="widthFix"
            className="index_body_header_img"
            src={header}
          />
        </View>
        <View className="index_body_content">
          <View className="content-wel">
            <View className="content-wel-main">
              <View className="content-wel-main-title">欢迎回来，匿名用户</View>
              <View className="content-wel-main-list">
                <View className="content-wel-main-list-title">ID:129151</View>
                <View className="content-wel-main-list-title">普通会员</View>
              </View>
            </View>
            <View className="content-wel-mon">
              <View className="content-wel-mon-coin">
                <View className="content-wel-mon-coin-content">
                  <View className="content-wel-mon-coin-content-value">
                    0
                    <View className="content-wel-mon-coin-content-value-text">
                      蚂蚁券
                    </View>
                  </View>
                  <View className="content-wel-mon-coin-content-value">
                    0
                    <View className="content-wel-mon-coin-content-value-text">
                      会员时长(天)
                    </View>
                  </View>
                </View>
                <View className="content-wel-mon-coin-into">充值</View>
              </View>
              <View className="content-wel-mon-people">
                <View className="content-wel-mon-people-value">
                  0.00
                  <View className="content-wel-mon-coin-content-value-text">
                    蚂蚁豆
                  </View>
                </View>
                <View className="content-wel-mon-people-value">
                  0
                  <View className="content-wel-mon-coin-content-value-text">
                    邀请人数
                  </View>
                </View>
              </View>
            </View>
            <View className="content-wel-bar">
              <Image
                mode="widthFix"
                src={bar1}
                className="content-wel-bar-image"
              />
            </View>
            <View className="content-wel-list">
              {list.map((item) => {
                return (
                  <View className="content-wel-list-item">
                    <Image
                      mode="widthFix"
                      src={item.icon}
                      className="content-wel-list-item-img"
                    />
                    <View className="content-wel-list-item-text">
                      {item.title}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <View className="index_footer" />
    </View>
  );
}
