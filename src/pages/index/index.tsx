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
  getIndexRecommend,
  getIndexRecommendList,
  getIndexTags,
  getIndexTagsVideo,
} from "@/common/interface";
import { Loading } from "@/components/loading";
import { IndexCard } from "@/components/indexCard";
import { IndexVideo } from "@/components/IndexVideo";
import { setInterFun, setTimerFun } from "@/common/tools";
export default function Index() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    videoHeight: 0,
    active: 1,
    screenWidth: 0,
    screenHeight: 0,
    refresh: false,
  });
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [recommend, setRecommend] = useState([]);
  const [headerVideo, setHeaderVideo] = useState<any>(undefined);
  const [btnList, setBtnList] = useState([]);
  const [reComm, setReCmm] = useState([]);
  const [tagsData, setTagsData] = useState([]);

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
    refreshReList();
    setInterFun(() => {
      refreshReList();
    });
  });

  const refreshReList = () => {
    getIndexRecommend().then((res) => {
      let arr = res.data;
      setRecommend(arr);
      if (arr.length > 0) {
        setHeaderVideo(arr[0]);
      }
      setTimeout(() => {
        setLoading1(true);
      }, 300);
    });
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

  useDidShow(() => {
    currentRecommendList(88).then(() => {
      getIndexClassifyList().then((res) => {
        setBtnList([...res.data]);
        setTimeout(() => {
          setLoading2(true);
        }, 300);
      });
    });
    getIndexTags({ is_main: "1" }).then(async (res) => {
      let arr = res.data.tag_list;
      currentFraList(arr, (data) => {
        setTagsData(data);
        setTimeout(() => {
          setLoading3(true);
        }, 300);
      });
    });
  });
  const refreshChange = () => {
    setOption({ ...option, refresh: true });
    getIndexRecommend().then((res) => {
      let arr = res.data;
      setRecommend(arr);
      if (arr.length > 0) {
        setHeaderVideo(arr[0]);
      }
      setTimeout(() => {
        setLoading1(true);
      }, 300);
    });
    currentRecommendList(88).then(() => {
      getIndexClassifyList().then((res) => {
        setBtnList([...res.data]);
        setTimeout(() => {
          setLoading2(true);
        }, 300);
      });
    });
    getIndexTags({ is_main: "1" }).then(async (res) => {
      let arr = res.data.tag_list;
      currentFraList(arr, (data) => {
        setTagsData(data);
        setTimeout(() => {
          setLoading3(true);
          setOption({ ...option, refresh: false });
        }, 300);
      });
    });
  };
  const currentRecommendList = async (id) => {
    let result = await getIndexRecommendList();
    setReCmm(result.data.video_list);
    setOption({ ...option, active: id });
  };
  const currentList = async ({ classify, p }) => {
    let result = await getIndexClassify({ class_id: classify, p });
    setReCmm(result.data.list);
    setOption({ ...option, active: classify });
  };
  const setActive = (id) => {
    if (id == 88) {
      currentRecommendList({ classify: id });
    } else {
      currentList({ classify: id, p: 1 });
    }
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
            <AtButton
              className={88 === option.active ? "active" : ""}
              type="primary"
              size="normal"
              onClick={() => {
                setActive(88);
              }}
            >
              推荐
            </AtButton>
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
    if (!loading2) {
      return (
        <View className="loading_lar">
          <Loading size={40} />
        </View>
      );
    } else {
      if (reComm.length > 0) {
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
                        <Image
                          src={item.img}
                          className="scroll-list-item-img"
                        />
                        <Text
                          numberOfLines={1}
                          className="scroll-list-item-text"
                        >
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
    }
  }, [reComm, loading2]);

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
          refresherEnabled={true}
          refresherTriggered={option.refresh}
          refresherBackground="#1e212a"
          onRefresherRefresh={refreshChange}
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
              {tagsData.length > 0 ? (
                <IndexCard data={tagsData[0]} loading={loading3} />
              ) : null}
              {recommend.length >= 2 ? (
                <IndexVideo height={option.screenWidth} data={recommend[1]} />
              ) : null}
              {tagsData.length > 1 ? (
                <IndexCard data={tagsData[1]} loading={loading3} />
              ) : null}
              {recommend.length >= 3 ? (
                <IndexVideo height={option.screenWidth} data={recommend[2]} />
              ) : null}
              {tagsData.map((item, index) => {
                if (index > 1) {
                  return <IndexCard data={item} loading={loading3} />;
                }
              })}
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
      {/*<View className="index_footer" />*/}
    </View>
  );
}
