import { Image, Text, View } from "@tarojs/components";

import "./index.less";
import Taro from "@tarojs/taro";
import { Loading } from "@/components/loading";
import right from "@/static/icon/right.png";

type Props = {
  data: any;
  loading: boolean;
};

export const IndexCard = (props: Props) => {
  const { loading, data } = props;
  const naviToList = (title, id) => {
    Taro.navigateTo({
      url: "./hot/index?title=" + title + "&id=" + id,
    });
  };
  const naviToVideo = (id) => {
    Taro.navigateTo({
      url: "../video/index?id=" + id,
    });
  };
  if (!loading) {
    return (
      <View className="loading_lar">
        <Loading size={40} />
      </View>
    );
  } else {
    return (
      <>
        <View className="ssview-lar">
          <Text className="ssview-lar-text">{data.intro}</Text>
          <View
            className="ssview-lar-link"
            onClick={() => {
              naviToList(data.name, data.id);
            }}
          >
            {data.name}
            <Image
              mode="widthFix"
              className="ssview-lar-link-icon"
              src={right}
            />
          </View>
        </View>
        <View className="ssview-list">
          {data?.video_list.map((item) => {
            return (
              <View
                className="ssview-list-item"
                onClick={() => naviToVideo(item.id)}
              >
                <Image className="image" src={item.img} />
                <Text className="text">{item.name}</Text>
                <Text className="eval">{item.describe}</Text>
              </View>
            );
          })}
        </View>
      </>
    );
  }
};
