import { View, ScrollView, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../static/icon/left.png";
import right from "../../../static/icon/right.png";

export default function System() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    count: 0,
  });
  const [dataList, setDataList] = useState([
    {
      title: '服务协议',
      url: './service /index',
    },
    {
      title: '隐私协议',
      url: './privacy/index',
    },
    {
      title: '注销账号',
      url: './log_off/index',
    },
    {
      title: '关于蚂蚁看看 3.0.4',
      url: './about/index',
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
        <View className="index_header_text">系统服务</View>
      </View>
      <View className="index_content">
        <View className="index_content_card">
          {
            dataList.map((item)=> {
              return (
                <View className="index_content_card_item">
                  {item.title}
                  <Image className="index_content_card_item_image" src={right} />
                </View>
              )
            })
          }
        </View>
      </View>
    </View>
  );
}
