import Taro from "@tarojs/taro";

const config = {
  wx: {
    dev: {
      appid: "wx529fadf983b0b19e",
      BASE_URL: "https://video.test.jixuejima.com/api/dskafdsl/",
    },
    test: {
      appid: "wx529fadf983b0b19e",
      BASE_URL: "https://video.test.jixuejima.com/api/dskafdsl/",
    },
    prod: {
      appid: "wx529fadf983b0b19e",
      BASE_URL: "https://video.test.jixuejima.com/api/dskafdsl/",
    },
  },
  tt: {
    dev: {
      appid: "wx529fadf983b0b19e",
      BASE_URL: "https://video.test.jixuejima.com/api/dskafdsl/",
    },
    test: {
      appid: "wx529fadf983b0b19e",
      BASE_URL: "https://video.test.jixuejima.com/api/dskafdsl/",
    },
    prod: {
      appid: "wx529fadf983b0b19e",
      BASE_URL: "https://video.test.jixuejima.com/api/dskafdsl/",
    },
  },
};
// 微信小程序
// export const env = envConf[Taro.getAccountInfoSync().miniProgram.envVersion];
// 抖音小程序
export const env = config["tt"]["dev"];
