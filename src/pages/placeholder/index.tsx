import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function Placeholder() {
  setTimeout(() => {
    Taro.switchTab({
      url: "../index/index",
    });
  }, 2000);
  return (
    <View
      style={{ fontSize: 50, color: "red", width: "100vw", height: "100vh" }}
    >
      中文
    </View>
  );
}
