import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
  Text,
} from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useMemo, useState } from "react";
import top from "../../static/icon/top.png";
import refresh from "../../static/icon/refresh.png";
import { AtButton } from "taro-ui";
import {
  getIndexBanner,
  getIndexClassify,
  getIndexClassifyList,
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
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [btnList, setBtnList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [currentData, setCurrentList] = useState<any>([]);
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
  });
  useDidShow(() => {});
  const setActive = (id) => {
    currentList({ classify: id, p: 1 });
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
  const naviToTheater = (type) => {
    Taro.navigateTo({
      url: "./theater/index?type=" + type,
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
