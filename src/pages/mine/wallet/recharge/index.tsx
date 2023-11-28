import { View, ScrollView, Image, Checkbox, Label } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import left from "../../../../static/icon/left.png";
import image from "../../../../static/icon/dou.png";
import wxPay from "../../../../static/icon/wx_pay.png";
import con from "../../../../static/icon/_con.png";
import dis from "../../../../static/icon/_dis.png";
import { getMemberInfo, getWalletProducts } from "@/common/interface";

export default function Search() {
  const [option, setOption] = useState({
    statusBarHeight: 0,
    barHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    active: 1,
    bar: 1,
  });
  const [list, setList] = useState([
    {
      title: "微信支付",
      icon: wxPay,
      checked: 1,
    },
    {
      title: "蚂蚁豆支付",
      icon: image,
      checked: 2,
    },
  ]);
  const [barList, setBarList] = useState([
    {
      id: 1,
      title: "19.9",
      title_eval: "元(多送5元)",
      tips: "91%的用户选择",
      desc: "1990+多送500蚂蚁券",
      pup: "item super",
    },
    {
      id: 2,
      title: "39.9",
      title_eval: "元(多送15元)",
      tips: false,
      desc: "3990+多送1500蚂蚁券",
      pup: "item",
    },
    {
      id: 3,
      title: "59.9",
      title_eval: "元(多送30元)",
      tips: "超值",
      desc: "5990+多送3000蚂蚁券",
      pup: "item super",
    },
    {
      id: 4,
      title: "99.9",
      title_eval: "元(多送100元)",
      tips: "超值",
      desc: "9990+多送10000蚂蚁券",
      pup: "item super",
    },
    {
      id: 5,
      title: "9.9",
      title_eval: "元(多送2元)",
      desc: "990+多送200蚂蚁券",
      pup: "item",
    },
    {
      id: 6,
      title: "299.9",
      title_eval: "元(年卡会员)",
      desc: "限时抢购，再送7天",
      pup: "item",
    },
  ]);
  const [inList, setInList] = useState([]);
  const [info, setInfo] = useState(undefined);

  useLoad(() => {
    let _option = option;
    const rect = Taro.getMenuButtonBoundingClientRect();
    _option.barHeight = rect.height;
    _option.statusBarHeight = rect.top;
    Taro.getSystemInfo({
      success: (res) => {
        _option.screenWidth = res.screenWidth;
        _option.screenHeight = res.screenHeight;
      },
    });
    getProList();
    setOption({ ..._option });
  });

  const getProList = () => {
    getMemberInfo().then((res) => {
      setInfo(res.data);
    });
    getWalletProducts().then((res) => {
      setInList(res.data.product_list);
    });
  };

  const naviBack = () => {
    Taro.navigateBack();
  };
  const checkType = (e) => {
    setOption({ ...option, active: e });
  };
  const checkTab = (e) => {
    console.log(option);
    setOption({ ...option, bar: e });
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
        <Image
          mode="widthFix"
          className="index_header_img"
          src={left}
          onClick={naviBack}
        />
        <View className="index_header_text">充值</View>
      </View>
      <View className="index_content">
        <View className="index_content_banner">创作不易，感谢您的支持</View>
        <View className="index_content_icon">
          <View className="index_content_icon_text">
            <View className="text_main">
              <View className="text_main_title">蚂蚁券余额</View>
              <View className="text_main_eval">
                {info?.score}
                <View className="text_main_eval_text">蚂蚁券</View>
              </View>
            </View>
            <View className="text_main">
              <View className="text_main_title">会员时长</View>
              <View className="text_main_eval">
                {info?.expire_days}
                <View className="text_main_eval_text">天</View>
              </View>
            </View>
          </View>
        </View>
        <View className="index_content_list">
          {inList.map((res) => {
            let item: any = { ...res };
            let cName = "item";
            if (item.intro) {
              cName = cName + " super";
            }
            if (item.id === option.bar) {
              cName = cName + " active";
            }
            return (
              <View className={cName} onClick={() => checkTab(item.id)}>
                {item?.intro ? (
                  <View className="item_tips">{item.intro}</View>
                ) : null}
                <View className="item_value">
                  <View>
                    {item.expire_days > 0 ? (
                      <View className="item_value_score_day">
                        {item.expire_days}
                        <View className="day">天</View>
                      </View>
                    ) : null}
                    {item.type == 2 ? (
                      <View className="item_value_score_day">
                        {item.score}
                        <View className="day">积分</View>
                      </View>
                    ) : null}
                  </View>
                  <View className="item_value_score">
                    {item.gift_score > 0 ? (
                      <View className="item_value_score_text">
                        （送{item.gift_score}积分）
                      </View>
                    ) : null}
                  </View>
                </View>
                <View className="item_desc">
                  {item.name}
                  <View className="item_desc_price">{item.price}</View>
                </View>
              </View>
            );
          })}
        </View>
        <View className="index_content_label">
          {list.map((item) => {
            return (
              <View className="label" onClick={() => checkType(item.checked)}>
                <View className="label_item">
                  <Image
                    mode="widthFix"
                    className="label_item_icon"
                    src={item.icon}
                  />
                  <View className="label_item_text">{item.title}</View>
                </View>
                <View className="label_btn">
                  <Image
                    className="label_btn_img"
                    src={item.checked == option.active ? con : dis}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View className="index_content_desc">
          <View className="title">充值须知</View>
          <View className="desc">
            <View>1、一经充值不予退换；</View>
            <View>
              2、未满18周岁未成年需在监护人的指导、同意下，进行充值操作；
            </View>
            <View>3、赠送为平台同等金额兑换比例的蚂蚁券，不是现金；</View>
            <View>4、遇到问题可在“我的”页面联系客服</View>
          </View>
        </View>
        <View className="index_content_btn" hoverClass="index_content_active">
          确认支付
        </View>
      </View>
    </View>
  );
}
