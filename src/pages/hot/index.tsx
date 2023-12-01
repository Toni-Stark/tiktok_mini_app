import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useMemo, useState } from "react";
import top from "../../static/icon/top.png";
import refresh from "../../static/icon/refresh.png";
import right from "../../static/icon/right.png";
import { AtButton } from "taro-ui";
import {
  getIndexBanner,
  getIndexClassify,
  getIndexClassifyList,
  getIndexTags,
  getIndexTagsVideo,
} from "@/common/interface";
import { HeaderView } from "@/components/headerView";
import { NoneView } from "@/components/noneView";
import { Loading } from "@/components/loading";

export default function Hot() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    p: 1,
  });
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [btnList, setBtnList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [currentData, setCurrentList] = useState<any>([]);
  const [tagsData, setTagsData] = useState([]);
  const handleScrollTop = () => {
    setScrollTop(scrollTop ? 0 : 1);
  };
  useLoad(() => {
    let _option = option;
    const rect = Taro.getMenuButtonBoundingClientRect();
    _option.barHeight = rect.top;
    _option.statusBarHeight = rect.height;
    Taro.getSystemInfo({
      success: (res) => {
        _option.screenWidth = res.screenWidth;
        _option.screenHeight = res.screenHeight;
        setOption({ ..._option });
      },
    });
    getIndexBanner().then((res) => {
      if (res.code === 200) {
        setBannerList(res.data);
      }
    });
    getIndexClassifyList().then((res) => {
      setBtnList(res.data);
      if (res.data.length > 0) {
        currentList({ classify: res.data[0].id, p: 1 });
      }
    });
    getIndexTags({ is_main: "0" }).then(async (res) => {
      let arr = res.data.tag_list;
      currentFraList(arr, (data) => {
        setTagsData(data);
        setTimeout(() => {
          setLoading1(true);
        }, 300);
      });
    });
  });
  useDidShow(() => {});
  const setActive = (id) => {
    currentList({ classify: id, p: 1 });
  };
  const currentFraList = async (list, callback) => {
    let arr = [];
    async function getInfo(li, nu) {
      if (nu >= li.length) {
        callback(arr);
        return;
      }
      let result = await getIndexTagsVideo({ tag_id: li[nu].id });
      li[nu].video_list = result.data.video_list;
      arr.push(li[nu]);
      await getInfo(li, nu + 1);
    }
    await getInfo(list, 0);
  };
  const onScroll = (e) => {
    if (scrollOpacity === 0 && e.detail.scrollTop >= option.screenHeight) {
      setScrollOpacity(1);
    }
    if (scrollOpacity > 0 && e.detail.scrollTop < option.screenHeight) {
      setScrollOpacity(0);
    }
  };

  const naviToVideo = (id) => {
    Taro.navigateTo({
      url: "../video/index?id=" + id,
    });
  };
  const naviToCateOne = (type, title) => {
    Taro.navigateTo({
      url: "../index/cate/index?type=" + type + "&title=" + title,
    });
  };
  const currentList = async ({ classify, p }) => {
    let arr: any;
    if (option.active === classify && p !== 1) {
      arr = [...currentData];
    } else {
      arr = [];
    }
    let result = await getIndexClassify({ class_id: classify, p });
    arr = arr.concat(result.data.list);
    setCurrentList([...arr]);
    setOption({ ...option, p, active: classify });
    setLoading(true);
  };
  const addScrollList = () => {
    currentList({ classify: option.active, p: option.p + 1 });
  };
  const refreshList = () => {
    currentList({ classify: option.active, p: 1 });
  };
  const currentSwiper = useMemo(() => {
    if (bannerList.length <= 0) {
      return null;
    }
    return (
      <View className="swiper-view">
        <Swiper
          className="swiper-view-views"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          circular
          autoplay
        >
          {bannerList.map((item, index) => {
            return (
              <SwiperItem>
                <View className="swiper-view-views-item">
                  <Image className="img" src={item.img} />
                </View>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    );
  }, [bannerList]);
  const currentContent = useMemo(() => {
    return (
      <>
        <View className="navi-line">
          他们都在看
          <View className="navi-line-fresh" onClick={refreshList}>
            换一换
            <Image
              mode="widthFix"
              className="navi-line-fresh-img"
              src={refresh}
            />
          </View>
        </View>
        <View className="navi-buttons">
          {btnList.map((item, index) => {
            return (
              <AtButton
                className={item.id === option.active ? "active" : ""}
                key={index}
                type="primary"
                size="normal"
                onClick={() => {
                  setActive(item.id);
                }}
              >
                {item.name}
              </AtButton>
            );
          })}
          <View className="button-pad" />
        </View>
        {loading ? (
          <View className="navi-data">
            {currentData?.map((item) => {
              return (
                <View
                  className="navi-data-item"
                  onClick={() => {
                    naviToVideo(item.id);
                  }}
                >
                  <Image src={item.img} className="navi-data-item-img" />
                  <View className="navi-data-item-view">
                    <View className="navi-data-item-view-content">
                      <View className="navi-data-item-view-content-main">
                        {item.name}
                      </View>
                      <View className="navi-data-item-view-content-eval">
                        {item.describe}
                      </View>
                    </View>
                    <View className="navi-data-item-view-eval">
                      <View>{item.watching}人正在看</View>
                      <View>更新至第{item.updated_eps}集</View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View className="loading_pla">
            <Loading size={60} />
          </View>
        )}

        {currentData?.length && loading <= 0 ? (
          <View
            style={{
              height: "50Vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NoneView />
          </View>
        ) : null}
      </>
    );
  }, [refresh, btnList, currentData, loading]);
  const currentTagsView = useMemo(() => {
    if (tagsData.length <= 0) {
      return null;
    }
    return (
      <View className="hot-res">
        <View className="hot-res-title">热门推荐</View>
        <View className="hot-res-swiper">
          <Swiper
            className="hot-res-swiper-data"
            indicatorColor="#999"
            indicatorActiveColor="#333"
            circular
            nextMargin="80px"
          >
            {tagsData.map((item) => {
              return (
                <SwiperItem className="swiper-items">
                  <View className="card">
                    <View className="card-title">
                      {item.name}
                      <View
                        className="card-title-catch"
                        onClick={() => {
                          naviToCateOne(2, "男频热推");
                        }}
                      >
                        查看全部
                        <Image
                          mode="widthFix"
                          className="card-title-catch-img"
                          src={right}
                        />
                      </View>
                    </View>
                    {item.video_list.map((it, idx) => {
                      if (idx < 3) {
                        return (
                          <View className="card-item">
                            <Image src={it.img} className="card-item-img" />
                            <View className="card-item-view">
                              <View className="card-item-view-content">
                                <View className="card-item-view-content-main">
                                  {it.name}
                                </View>
                                <View className="card-item-view-content-eval">
                                  {it.describe}
                                </View>
                              </View>
                              <View className="card-item-view-eval">
                                {it.views}人正在看 更新至第
                                {it.updated_eps}集
                              </View>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </View>
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
      </View>
    );
  }, [tagsData]);
  return (
    <View className="index">
      <HeaderView
        barHeight={option.barHeight}
        height={option.statusBarHeight}
        search={true}
        text="热播剧"
        url="../index/search/index"
      />
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          id="scroll_view"
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          enhanced
          onScroll={onScroll}
          lowerThreshold={30}
          onScrollToLower={addScrollList}
        >
          <View id="top" />
          <View className="index_zone_view_content">
            {currentSwiper}
            {currentTagsView}
            {currentContent}
          </View>
          <View className=".button-pad" />
        </ScrollView>
        <View
          className="scroll_top"
          style={{ opacity: scrollOpacity }}
          onClick={handleScrollTop}
        >
          <Image className="scroll_top_img" src={top} />
        </View>
      </View>
      <View className="index_footer" />
    </View>
  );
}
