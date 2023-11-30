import { View, Text, ScrollView, Image, Video } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useMemo, useState } from "react";
import search from "../../static/icon/search.png";
import right from "../../static/icon/right.png";
import top from "../../static/icon/top.png";
import { AtButton } from "taro-ui";
import {
  getIndexClassify,
  getIndexClassifyList,
  getIndexHot,
  getIndexNews,
  getIndexPopular,
  getIndexRecommend,
} from "@/common/interface";
import { Loading } from "@/components/loading";
export default function Index() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
  });
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [recommend, setRecommend] = useState([]);
  const [headerVideo, setHeaderVideo] = useState<any>(undefined);
  const [btnList, setBtnList] = useState([]);
  const [reComm, setReCmm] = useState([]);
  const [newData, setNewData] = useState([]);
  const [hotData, setHotData] = useState([]);
  const [popData, setPopData] = useState([]);

  const handleScrollTop = () => {
    setScrollTop(scrollTop ? 0 : 1);
  };
  useLoad(() => {
    Taro.getSystemInfoAsync({
      success: (res) => {
        let _option = option;
        const rect = Taro.getMenuButtonBoundingClientRect();
        _option.barHeight = rect.top;
        _option.statusBarHeight = rect.height;
        _option.screenWidth = res.screenWidth;
        _option.screenHeight = res.screenHeight;
        _option.videoHeight = res.screenWidth / 0.72;
        setOption({ ..._option });
      },
    });
    getIndexRecommend().then((res) => {
      setRecommend(res.data);
      if (res.data.length > 0) {
        setHeaderVideo(res.data[0]);
      }
      setTimeout(() => {
        setLoading1(true);
      }, 300);
    });
  });
  useDidShow(() => {
    getIndexClassifyList().then((res) => {
      setBtnList([...res.data]);
      if (res.data.length > 0) {
        currentList({ classify: res.data[0].id, p: 1 });
      }
      setTimeout(() => {
        setLoading2(true);
      }, 300);
    });
    getIndexNews({ p: 1 }).then((res) => {
      setNewData(res.data.list);
      setTimeout(() => {
        setLoading3(true);
      }, 300);
    });
    getIndexHot({ p: 1 }).then((res) => {
      setHotData(res.data.list);
      setTimeout(() => {
        setLoading4(true);
      }, 300);
    });
    getIndexPopular({ p: 1 }).then((res) => {
      setPopData(res.data.list);
      setTimeout(() => {
        setLoading5(true);
      }, 300);
    });
  });

  const currentList = async ({ classify, p }) => {
    let result = await getIndexClassify({ class_id: classify, p });
    setReCmm(result.data.list);
    setOption({ ...option, active: classify });
  };
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

  const naviToCateOne = (type, title) => {
    Taro.navigateTo({
      url: "./cate/index?type=" + type + "&title=" + title,
    });
  };
  const naviToPopuOne = (type, title) => {
    Taro.navigateTo({
      url: "./popular/index?type=" + type + "&title=" + title,
    });
  };
  const naviToHotOne = () => {
    Taro.navigateTo({
      url: "./hot/index",
    });
  };

  const naviToNewOne = () => {
    Taro.navigateTo({
      url: "./new/index",
    });
  };

  const naviToSearch = (type) => {
    Taro.navigateTo({
      url: "./search/index?type=" + type,
    });
  };
  const naviToVideo = (id) => {
    Taro.navigateTo({
      url: "../video/index?id=" + id,
    });
  };
  const currentHeader = useMemo(() => {
    if (!loading1) {
      return (
        <View className="loading_pla">
          <Loading size={80} />
        </View>
      );
    } else {
      return (
        <>
          <Video
            id="video"
            className="components-video-video"
            src={headerVideo?.url}
            poster={headerVideo?.img}
            initialTime={0}
            controls={false}
            autoplay={true}
            muted={true}
            loop={true}
            onClick={() => naviToVideo(headerVideo?.id)}
            objectFit="cover"
          />
          <View className="components-video-shadow" />
          <View
            className="components-video-card"
            onClick={() => naviToVideo(headerVideo?.id)}
          >
            <Image
              className="components-video-card-image"
              src={headerVideo?.img}
            />
            <View className="components-video-card-content">
              <Text className="title">{headerVideo?.name}</Text>
              <Text className="text">{headerVideo?.describe}</Text>
            </View>
          </View>
        </>
      );
    }
  }, [headerVideo, loading1]);
  const currentLarContent = useMemo(() => {
    if (!loading2) {
      return (
        <View className="loading_lar">
          <Loading size={40} />
        </View>
      );
    } else {
      return (
        <>
          <View className="components-video-buttons">
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
        </>
      );
    }
  }, [btnList, loading2, option.active]);

  const currentTeTContent = useMemo(() => {
    if (!loading3) {
      return (
        <View className="loading_lar">
          <Loading size={40} />
        </View>
      );
    } else {
      return (
        <>
          <View className="components-video-scroll">
            <ScrollView scrollX>
              <View className="scroll-list">
                {reComm.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="scroll-list-item"
                      onClick={() => {
                        naviToVideo(item.id);
                      }}
                    >
                      <Image src={item.img} className="scroll-list-item-img" />
                      <Text numberOfLines={1} className="scroll-list-item-text">
                        {item.name}
                      </Text>
                    </View>
                  );
                })}
                <View className="button-pad" />
              </View>
            </ScrollView>
          </View>
        </>
      );
    }
  }, [reComm, loading3]);
  const currentFouContent = useMemo(() => {
    if (!loading4) {
      return (
        <View className="loading_lar">
          <Loading size={40} />
        </View>
      );
    } else {
      return (
        <>
          <View className="components-video-lar">
            <Text className="components-video-lar-text">
              N剧刷不腻！宝藏热剧爆款出圈
            </Text>
            <View
              className="components-video-lar-link"
              onClick={() => {
                naviToPopuOne();
              }}
            >
              最近流行
              <Image
                mode="widthFix"
                className="components-video-lar-link-icon"
                src={right}
              />
            </View>
          </View>
          <View className="components-video-list">
            {popData.map((item) => {
              return (
                <View
                  className="components-video-list-item"
                  onClick={() => naviToVideo(item.id)}
                >
                  <Image className="image" src={item.img} />
                  <Text className="text">{item.name}</Text>
                  <Text className="eval">{item.describe}</Text>
                </View>
              );
            })}
          </View>
        </>
      );
    }
  }, [popData, loading4]);
  const currentFieContent = useMemo(() => {
    if (!loading5) {
      return (
        <View className="loading_lar">
          <Loading size={40} />
        </View>
      );
    } else {
      return (
        <>
          <View className="components-video-lar">
            <Text className="components-video-lar-text">
              最新短剧速递 精彩内容抢先看
            </Text>
            <View
              className="components-video-lar-link"
              onClick={() => {
                naviToHotOne();
              }}
            >
              热播新剧
              <Image
                mode="widthFix"
                className="components-video-lar-link-icon"
                src={right}
              />
            </View>
          </View>
          <View className="components-video-list">
            {newData.map((item) => {
              return (
                <View
                  className="components-video-list-item"
                  onClick={() => naviToVideo(item.id)}
                >
                  <Image className="image" src={item.img} />
                  <Text className="text">{item.name}</Text>
                  <Text className="eval">{item.describe}</Text>
                </View>
              );
            })}
          </View>
        </>
      );
    }
  }, [newData, loading5]);
  return (
    <View className="index">
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          enhanced
          onScroll={onScroll}
        >
          <View
            className="index_zone_view_header"
            style={{
              marginTop: option.statusBarHeight + "Px",
              height: option.barHeight + "Px",
            }}
          >
            <Image
              mode="widthFix"
              className="index_zone_view_header_img"
              src={search}
              onClick={naviToSearch}
            />
          </View>
          <View className="index_zone_view_content">
            <View
              className="components-video"
              style={{ height: option.videoHeight + "Px" }}
            >
              {currentHeader}
              <View className="components-video-lar">
                <Text className="components-video-lar-text">看你想看</Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToCateOne(1, "更多分类");
                  }}
                >
                  更多分类
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              {currentLarContent}
              {currentTeTContent}
              {currentFouContent}
              {currentFieContent}
              {recommend.length >= 2 ? (
                <View
                  className="components-video-large"
                  onClick={() => naviToVideo(recommend[1].id)}
                >
                  <Video
                    className="components-video-large-video"
                    style={{ height: option.screenWidth + "px" }}
                    src={recommend[1].url}
                    poster={recommend[1].img}
                    initialTime={0}
                    controls={false}
                    autoplay={true}
                    loop={true}
                    muted={true}
                    objectFit="cover"
                  />
                  <text className="components-video-large-desc">
                    {recommend[1].describe}
                  </text>
                </View>
              ) : null}

              {currentFieContent}
              {recommend.length >= 3 ? (
                <View
                  className="components-video-large"
                  onClick={() => naviToVideo(recommend[2].id)}
                >
                  <Video
                    className="components-video-large-video"
                    style={{ height: option.screenWidth + "px" }}
                    src={recommend[2].url}
                    poster={recommend[2].img}
                    initialTime={0}
                    controls={false}
                    autoplay={true}
                    loop={true}
                    muted={true}
                    objectFit="cover"
                  />
                  <text className="components-video-large-desc">
                    {recommend[2].describe}
                  </text>
                </View>
              ) : null}
              <View className="components-video-lar">
                <Text className="components-video-lar-text">
                  女生必看！高甜短剧让你心动
                </Text>
                <View
                  className="components-video-lar-link"
                  onClick={() => {
                    naviToNewOne();
                  }}
                >
                  最新更新
                  <Image
                    mode="widthFix"
                    className="components-video-lar-link-icon"
                    src={right}
                  />
                </View>
              </View>
              <View className="components-video-list">
                {hotData.map((item) => {
                  return (
                    <View
                      className="components-video-list-item"
                      onClick={() => naviToVideo(item.id)}
                    >
                      <Image className="image" src={item.img} />
                      <Text className="text">{item.name}</Text>
                      <Text className="eval">{item.describe}</Text>
                    </View>
                  );
                })}
              </View>
              <View className="zone_footer" />
            </View>
          </View>
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
