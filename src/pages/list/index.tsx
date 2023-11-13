import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";

export default function List() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>追剧列表</Text>
    </View>
  );
}
