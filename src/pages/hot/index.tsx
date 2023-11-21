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
import { useState } from "react";
import search from "../../static/icon/search.png";
import card from "../../static/source/info.png";
import top from "../../static/icon/top.png";
import naviBar from "../../static/source/naviBar.png";
import right from "../../static/icon/right.png";
import refresh from "../../static/icon/refresh.png";
import { AtButton } from "taro-ui";

export default function Hot() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [btnList, setBtnList] = useState([
    {
      title: "推荐",
      id: 1,
    },
    {
      title: "都市",
      id: 2,
    },
    {
      title: "战神",
      id: 3,
    },
    {
      title: "甜宠",
      id: 4,
    },
    {
      title: "玄幻",
      id: 5,
    },
    {
      title: "古装",
      id: 6,
    },
  ]);
  const handleScrollTop = () => {
    setScrollTop(scrollTop ? 0 : 1);
  };
  useLoad(() => {
    let _option = option;
    const rect = Taro.getMenuButtonBoundingClientRect();
    _option.barHeight = rect.height;
    _option.statusBarHeight = rect.top;
    Taro.getSystemInfo({
      success: (res) => {
        _option.screenWidth = res.screenWidth;
        _option.screenHeight = res.screenHeight;
        _option.videoHeight = res.screenWidth / 0.72;
      },
    });

    setOption({ ..._option });
  });

  const setActive = (id) => {
    setOption({ ...option, active: id });
  };
  const onScroll = (e) => {
    if (scrollOpacity === 0 && e.detail.scrollTop >= option.screenHeight) {
      setScrollOpacity(1);
    }
    if (scrollOpacity > 0 && e.detail.scrollTop < option.screenHeight) {
      setScrollOpacity(0);
    }
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

  return (
    <View className="index">
      <View
        className="index_header"
        style={{
          marginTop: option.statusBarHeight + "Px",
          height: option.barHeight + "Px",
        }}
      >
        <Image mode="widthFix" className="index_header_img" src={search} />
        <View className="index_header_text">热播</View>
      </View>
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          id="scroll_view"
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          enhanced
          onScroll={onScroll}
        >
          <View id="top" />
          <View className="index_zone_view_content">
            <View className="swiper-view">
              <Swiper
                className="swiper-view-views"
                indicatorColor="#999"
                indicatorActiveColor="#333"
                circular
                autoplay
              >
                <SwiperItem>
                  <View className="swiper-view-views-item">
                    <Image
                      className="img"
                      src="http://231110002.ldcvh.china-yun.net/wximg/swiper1.png"
                    />
                  </View>
                </SwiperItem>
                <SwiperItem>
                  <View className="swiper-view-views-item">
                    <Image
                      className="img"
                      src="http://231110002.ldcvh.china-yun.net/wximg/swiper1.png"
                    />
                  </View>
                </SwiperItem>
                <SwiperItem>
                  <View className="swiper-view-views-item">
                    <Image
                      className="img"
                      src="http://231110002.ldcvh.china-yun.net/wximg/swiper1.png"
                    />
                  </View>
                </SwiperItem>
              </Swiper>
            </View>
            <View className="navi-list">
              <View className="button-pad" />
              <View className="navi-list-item" onClick={() => naviToTheater(0)}>
                <Image
                  mode="widthFix"
                  src={naviBar}
                  className="navi-list-item-img"
                />
                <Text className="navi-list-item-text">真得鹿剧场</Text>
              </View>
              <View className="navi-list-item" onClick={() => naviToTheater(1)}>
                <Image
                  mode="widthFix"
                  src={naviBar}
                  className="navi-list-item-img"
                />
                <Text className="navi-list-item-text">真得鹿剧场</Text>
              </View>
              <View className="navi-list-item" onClick={() => naviToTheater(2)}>
                <Image
                  mode="widthFix"
                  src={naviBar}
                  className="navi-list-item-img"
                />
                <Text className="navi-list-item-text">真得鹿剧场</Text>
              </View>
              <View className="navi-list-item" onClick={() => naviToTheater(3)}>
                <Image
                  mode="widthFix"
                  src={naviBar}
                  className="navi-list-item-img"
                />
                <Text className="navi-list-item-text">真得鹿剧场</Text>
              </View>
              <View className="navi-list-item" onClick={() => naviToTheater(4)}>
                <Image
                  mode="widthFix"
                  src={naviBar}
                  className="navi-list-item-img"
                />
                <Text className="navi-list-item-text">真得鹿剧场</Text>
              </View>
              <View className="navi-list-item" onClick={() => naviToTheater(5)}>
                <Image
                  mode="widthFix"
                  src={naviBar}
                  className="navi-list-item-img"
                />
                <Text className="navi-list-item-text">真得鹿剧场</Text>
              </View>
              <View className="button-pad" />
            </View>
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
                  <SwiperItem className="swiper-items">
                    <View className="card">
                      <View className="card-title">
                        男频热推
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
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                    </View>
                  </SwiperItem>
                  <SwiperItem className="swiper-items">
                    <View className="card">
                      <View className="card-title">
                        古装精品
                        <View
                          className="card-title-catch"
                          onClick={() => {
                            naviToCateOne(2, "古装精品");
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
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                    </View>
                  </SwiperItem>
                  <SwiperItem className="swiper-items">
                    <View className="card">
                      <View className="card-title">
                        现代都市
                        <View
                          className="card-title-catch"
                          onClick={() => {
                            naviToCateOne(2, "现代都市");
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
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                      <View className="card-item">
                        <Image
                          mode="widthFix"
                          src={card}
                          className="card-item-img"
                        />
                        <View className="card-item-view">
                          <View className="card-item-view-content">
                            <View className="card-item-view-content-main">
                              替身的诱惑
                            </View>
                            <View className="card-item-view-content-eval">
                              互换身份身陷阴谋
                            </View>
                          </View>
                          <View className="card-item-view-eval">
                            316人正在看 更新至第78集
                          </View>
                        </View>
                      </View>
                    </View>
                  </SwiperItem>
                </Swiper>
              </View>
            </View>
            <View className="navi-line">
              他们都在看
              <View className="navi-line-fresh">
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
                    {item.title}
                  </AtButton>
                );
              })}
              <View className="button-pad" />
            </View>
            <View className="navi-data">
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
              <View className="navi-data-item">
                <Image
                  mode="widthFix"
                  src={card}
                  className="navi-data-item-img"
                />
                <View className="navi-data-item-view">
                  <View className="navi-data-item-view-content">
                    <View className="navi-data-item-view-content-main">
                      替身的诱惑
                    </View>
                    <View className="navi-data-item-view-content-eval">
                      互换身份身陷阴谋
                    </View>
                  </View>
                  <View className="navi-data-item-view-eval">
                    <View>316人正在看</View>
                    <View>更新至第78集</View>
                  </View>
                </View>
              </View>
            </View>
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
