import { View, ScrollView, Image } from "@tarojs/components";
import Taro, { useLoad, useRouter } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import { getScoreList, getWalletList } from "@/common/interface";
import { NoneView } from "@/components/noneView";
import { HeaderView } from "@/components/headerView";
import top from "../../../../static/icon/top.png";

export default function Hot() {
  const router = useRouter();
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    more: false,
    refresh: false,
    title: "",
    id: "",
    p: 1,
  });
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [dataList, setDataList] = useState([]);
  const handleScrollTop = () => {
    setScrollTop(scrollTop ? 0 : 1);
  };
  useLoad(() => {
    const params = router.params;
    let _option = option;
    _option.title = params.title;
    _option.id = params.id;
    const rect = Taro.getMenuButtonBoundingClientRect();
    console.log(rect, "123");

    _option.barHeight = rect.top;
    _option.statusBarHeight = rect.height;

    setOption({ ..._option });
    getDataList(1, params.id);
  });
  const getDataList = (p, id) => {
    if (id == 1) {
      getPayList(p).then((res) => {
        let list = [...dataList];
        if (p == 1) {
          list = res;
        } else {
          list = list.concat(res);
        }
        setDataList(list);
        setOption({ ...option, p, refresh: false });
      });
    } else if (id == 2) {
      getScore(p).then((res) => {
        let list = [...dataList];
        if (p == 1) {
          list = res;
        } else {
          list = list.concat(res);
        }
        setDataList(list);
        setOption({ ...option, p, refresh: false });
      });
    }
  };

  const getPayList = (p) => {
    return new Promise((resolve) => {
      getWalletList({ p }).then((res) => {
        resolve(res.data.score_list);
      });
    });
  };
  const getScore = (p) => {
    return new Promise((resolve) => {
      getScoreList({ p }).then((res) => {
        resolve(res.data.score_list);
      });
    });
  };

  const onScroll = (e) => {
    if (scrollOpacity === 0 && e.detail.scrollTop >= option.screenHeight) {
      setScrollOpacity(1);
    }
    if (scrollOpacity > 0 && e.detail.scrollTop < option.screenHeight) {
      setScrollOpacity(0);
    }
  };
  const addScrollList = () => {
    getDataList(option.p + 1, option.id);
  };
  const refreshChange = () => {
    setOption({ ...option, refresh: true });
    getDataList(option.id, 1, option.id);
  };
  return (
    <View className="index">
      <HeaderView
        barHeight={option.barHeight}
        height={option.statusBarHeight}
        text={option.title}
      />
      <View className="index_zone">
        <ScrollView
          className="index_zone_view"
          id="scroll_view"
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          refresherEnabled={true}
          refresherTriggered={option.refresh}
          refresherBackground="#1e212a"
          onRefresherRefresh={refreshChange}
          lowerThreshold={30}
          onScrollToLower={addScrollList}
          enhanced
          onScroll={onScroll}
        >
          <View id="top" />
          <View className="index_zone_view_content">
            <View className="navi-data">
              {dataList?.map((item) => {
                let count = 0;
                if (item.flow_type == 1) {
                  count = Number(item.after_score) + Number(item.score);
                } else {
                  count = Number(item.after_score) - Number(item.score);
                }
                return (
                  <View className="navi-data-item">
                    <View className="conte">
                      <View className="text">
                        {item.flow_type_desc}：
                        <View className="coin">{item.score}</View>
                      </View>
                      <View className="time">{item.created_time}</View>
                    </View>
                    <View className="share">
                      <View className="value">
                        总数：<View className="eval">{count}</View>
                      </View>
                      <View className="value">
                        余额：<View className="eval">{item.type_desc}</View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            {dataList?.length > 0 ? (
              <View className="index-footer">
                {option.more ? (
                  <View className="index-footer-view">加载中...</View>
                ) : (
                  <View className="index-footer-view">暂无更多</View>
                )}
              </View>
            ) : (
              <View
                style={{
                  height: "35Vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoneView />
              </View>
            )}
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
    </View>
  );
}
