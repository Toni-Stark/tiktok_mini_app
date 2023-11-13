import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

export default function Hot() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>热播电影</Text>
    </View>
  );
}
