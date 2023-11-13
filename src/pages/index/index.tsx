import {
  View,
  Text,
  ScrollView,
  CoverImage,
  Video,
  Icon,
  CoverView,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";
import { useState } from "react";
import search from "../../static/icon/search.png";
import card from "../../static/source/info.png";
import right from "../../static/icon/right.png";

export default function Index() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
  });
  useLoad(() => {
    let _option = option;
    const rect = Taro.getMenuButtonBoundingClientRect();
    _option.barHeight = rect.height;
    _option.statusBarHeight = rect.top;
    Taro.getSystemInfo({
      success: (res) => {
        _option.videoHeight = res.screenWidth / 0.72;
      },
    });

    setOption({ ..._option });
  });

  return (
    <View className="index">
      <View className="index_zone">
        <ScrollView className="index_zone_view" scrollY>
          <View
            className="index_zone_view_header"
            style={{
              marginTop: option.statusBarHeight + "Px",
              height: option.barHeight + "Px",
            }}
          >
            <CoverImage className="index_zone_view_header_img" src={search} />
          </View>
          <View className="index_zone_view_content">
            <View
              className="components-video"
              style={{ height: option.videoHeight + "Px" }}
            >
              <Video
                id="video"
                className="components-video-video"
                src="http://231110002.ldcvh.china-yun.net/video_h.mp4"
                poster="http://231110002.ldcvh.china-yun.net/video_p.png"
                initialTime={0}
                controls={false}
                autoplay={true}
                loop={true}
                muted={false}
                objectFit="cover"
              />
              <View className="components-video-shadow" />
              <View className="components-video-card">
                <CoverImage
                  className="components-video-card-image"
                  src={card}
                />
                <View className="components-video-card-content">
                  <Text className="title">仙尊师傅太诱人</Text>
                  <Text className="text">甜宠古装仙侠巨制</Text>
                </View>
              </View>
              <View className="components-video-lar">
                <Text className="components-video-lar-text">看你想看</Text>
                <View className="components-video-lar-link">
                  更多分类
                  <CoverImage
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="index_footer"></View>
    </View>
  );
}
