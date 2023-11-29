import {
  View,
  ScrollView,
  Image,
  Swiper,
  SwiperItem,
  Text,
} from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
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

export default function Hot() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    p: 1,
  });
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
    setOption({ ..._option });
  });

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
            {/*<View className="navi-list">*/}
            {/*  <View className="button-pad" />*/}
            {/*  <View className="navi-list-item" onClick={() => naviToTheater(0)}>*/}
            {/*    <Image*/}
            {/*      mode="widthFix"*/}
            {/*      src={naviBar}*/}
            {/*      className="navi-list-item-img"*/}
            {/*    />*/}
            {/*    <Text className="navi-list-item-text">真得鹿剧场</Text>*/}
            {/*  </View>*/}
            {/*  <View className="navi-list-item" onClick={() => naviToTheater(1)}>*/}
            {/*    <Image*/}
            {/*      mode="widthFix"*/}
            {/*      src={naviBar}*/}
            {/*      className="navi-list-item-img"*/}
            {/*    />*/}
            {/*    <Text className="navi-list-item-text">真得鹿剧场</Text>*/}
            {/*  </View>*/}
            {/*  <View className="navi-list-item" onClick={() => naviToTheater(2)}>*/}
            {/*    <Image*/}
            {/*      mode="widthFix"*/}
            {/*      src={naviBar}*/}
            {/*      className="navi-list-item-img"*/}
            {/*    />*/}
            {/*    <Text className="navi-list-item-text">真得鹿剧场</Text>*/}
            {/*  </View>*/}
            {/*  <View className="navi-list-item" onClick={() => naviToTheater(3)}>*/}
            {/*    <Image*/}
            {/*      mode="widthFix"*/}
            {/*      src={naviBar}*/}
            {/*      className="navi-list-item-img"*/}
            {/*    />*/}
            {/*    <Text className="navi-list-item-text">真得鹿剧场</Text>*/}
            {/*  </View>*/}
            {/*  <View className="navi-list-item" onClick={() => naviToTheater(4)}>*/}
            {/*    <Image*/}
            {/*      mode="widthFix"*/}
            {/*      src={naviBar}*/}
            {/*      className="navi-list-item-img"*/}
            {/*    />*/}
            {/*    <Text className="navi-list-item-text">真得鹿剧场</Text>*/}
            {/*  </View>*/}
            {/*  <View className="navi-list-item" onClick={() => naviToTheater(5)}>*/}
            {/*    <Image*/}
            {/*      mode="widthFix"*/}
            {/*      src={naviBar}*/}
            {/*      className="navi-list-item-img"*/}
            {/*    />*/}
            {/*    <Text className="navi-list-item-text">真得鹿剧场</Text>*/}
            {/*  </View>*/}
            {/*  <View className="button-pad" />*/}
            {/*</View>*/}
            {/*<View className="hot-res">*/}
            {/*  <View className="hot-res-title">热门推荐</View>*/}
            {/*  <View className="hot-res-swiper">*/}
            {/*    <Swiper*/}
            {/*      className="hot-res-swiper-data"*/}
            {/*      indicatorColor="#999"*/}
            {/*      indicatorActiveColor="#333"*/}
            {/*      circular*/}
            {/*      nextMargin="80px"*/}
            {/*    >*/}
            {/*      <SwiperItem className="swiper-items">*/}
            {/*        <View className="card">*/}
            {/*          <View className="card-title">*/}
            {/*            男频热推*/}
            {/*            <View*/}
            {/*              className="card-title-catch"*/}
            {/*              onClick={() => {*/}
            {/*                naviToCateOne(2, "男频热推");*/}
            {/*              }}*/}
            {/*            >*/}
            {/*              查看全部*/}
            {/*              <Image*/}
            {/*                mode="widthFix"*/}
            {/*                className="card-title-catch-img"*/}
            {/*                src={right}*/}
            {/*              />*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*        </View>*/}
            {/*      </SwiperItem>*/}
            {/*      <SwiperItem className="swiper-items">*/}
            {/*        <View className="card">*/}
            {/*          <View className="card-title">*/}
            {/*            古装精品*/}
            {/*            <View*/}
            {/*              className="card-title-catch"*/}
            {/*              onClick={() => {*/}
            {/*                naviToCateOne(2, "古装精品");*/}
            {/*              }}*/}
            {/*            >*/}
            {/*              查看全部*/}
            {/*              <Image*/}
            {/*                mode="widthFix"*/}
            {/*                className="card-title-catch-img"*/}
            {/*                src={right}*/}
            {/*              />*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*        </View>*/}
            {/*      </SwiperItem>*/}
            {/*      <SwiperItem className="swiper-items">*/}
            {/*        <View className="card">*/}
            {/*          <View className="card-title">*/}
            {/*            现代都市*/}
            {/*            <View*/}
            {/*              className="card-title-catch"*/}
            {/*              onClick={() => {*/}
            {/*                naviToCateOne(2, "现代都市");*/}
            {/*              }}*/}
            {/*            >*/}
            {/*              查看全部*/}
            {/*              <Image*/}
            {/*                mode="widthFix"*/}
            {/*                className="card-title-catch-img"*/}
            {/*                src={right}*/}
            {/*              />*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*          <View className="card-item">*/}
            {/*            <Image*/}
            {/*              mode="widthFix"*/}
            {/*              src={card}*/}
            {/*              className="card-item-img"*/}
            {/*            />*/}
            {/*            <View className="card-item-view">*/}
            {/*              <View className="card-item-view-content">*/}
            {/*                <View className="card-item-view-content-main">*/}
            {/*                  替身的诱惑*/}
            {/*                </View>*/}
            {/*                <View className="card-item-view-content-eval">*/}
            {/*                  互换身份身陷阴谋*/}
            {/*                </View>*/}
            {/*              </View>*/}
            {/*              <View className="card-item-view-eval">*/}
            {/*                316人正在看 更新至第78集*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*        </View>*/}
            {/*      </SwiperItem>*/}
            {/*    </Swiper>*/}
            {/*  </View>*/}
            {/*</View>*/}
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

            {currentData?.length <= 0 ? (
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
