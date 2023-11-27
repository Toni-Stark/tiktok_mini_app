// 获取首页店铺数据
import { cloudPost } from "@/store/request";

export const getIndexRecommend = async (params) => {
  return await cloudPost("index/recommend", params);
};
export const getIndexClassify = async (params) => {
  return await cloudPost("index/classify", params);
};
export const setMember = async (params) => {
  return await cloudPost("member/set", params);
};

export const getMemberInfo = async (params) => {
  return await cloudPost("member/info", params);
};

export const getMemberSign = async (params) => {
  return await cloudPost("member/sign", params);
};
export const getVideoFavorite = async (params) => {
  return await cloudPost("member/favorite", params);
};
export const getVideoHistory = async (params) => {
  return await cloudPost("member/history", params);
};
export const getWalletProducts = async (params) => {
  return await cloudPost("wallet/products", params);
};
export const getIndexBanner = async (params) => {
  return await cloudPost("index/banner", params);
};
