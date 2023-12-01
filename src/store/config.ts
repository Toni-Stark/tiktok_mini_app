import Taro from "@tarojs/taro";

export const Config = {
  // baseUri: "http://dev.shortvideo.ink/api/abc123/",
  baseUri: "https://video.test.jixuejima.com/api/dsadfs/",
  appId: "wx2b63e1935c7fa58f",
  debug: true,
};
const envConf = {
  // 开发版-本地环境
  develop: {
    mode: "dev",
    DEBUG: false,
    VCONSOLE: true,
    appid: "wx2b63e1935c7fa58f",
    // BASE_URL: "http://dev.shortvideo.ink/api/abc123/",
    BASE_URL: "https://video.test.jixuejima.com/api/dsadfs/",
  },
  // 体验版-测试环境
  trial: {
    mode: "test",
    DEBUG: false,
    VCONSOLE: false,
    appid: "wx2b63e1935c7fa58f",
    BASE_URL: "https://video.test.jixuejima.com/api/dsadfs/",
  },
  // 正式版-正式环境
  release: {
    mode: "prod",
    DEBUG: false,
    VCONSOLE: false,
    appid: "wx2b63e1935c7fa58f",
    BASE_URL: "https://video.test.jixuejima.com/api/dsadfs/",
  },
};
export const env = envConf[Taro.getAccountInfoSync().miniProgram.envVersion];
