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
export const getFavorite = async (params) => {
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
export const getIndexClassifyList = async (params) => {
  return await cloudPost("index/classify-list", params);
};
export const getIndexSearch = async (params) => {
  return await cloudPost("index/search", params);
};
export const getVideoIndex = async (params) => {
  return await cloudPost("video/index", params);
};
export const getVideoFavorite = async (params) => {
  return await cloudPost("video/favourite", params);
};
export const getIndexNews = async (params) => {
  return await cloudPost("index/news", params);
};
export const getIndexHot = async (params) => {
  return await cloudPost("index/hot", params);
};
export const getIndexPopular = async (params) => {
  return await cloudPost("index/popular", params);
};
export const getWalletList = async (params) => {
  return await cloudPost("wallet/order-list", params);
};
export const getScoreList = async (params) => {
  return await cloudPost("wallet/score-list", params);
};

// type 1 // 购买会员时长 expire_days gift_score（赠送的
//  type 2 // 购买积分 score(积分数）
