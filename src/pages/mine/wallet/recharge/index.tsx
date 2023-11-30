import { View, ScrollView, Image, Checkbox, Label } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "taro-ui/dist/style/components/loading.scss";
import "./index.less";
import { useState } from "react";
import wxPay from "../../../../static/icon/wx_pay.png";
import con from "../../../../static/icon/_con.png";
import dis from "../../../../static/icon/_dis.png";
import {
  getMemberInfo,
  getPayOrder,
  getWalletProducts,
} from "@/common/interface";
import { GetStorageSync } from "@/store/storage";
import { HeaderView } from "@/components/headerView";
import { TShow } from "@/common/common";

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
    // {
    //   title: "蚂蚁豆支付",
    //   icon: image,
    //   checked: 2,
    // },
  ]);
  const [inList, setInList] = useState([]);
  const [info, setInfo] = useState(undefined);

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
    getProList();
    setOption({ ..._option });
  });

  const getProList = () => {
    getMemberInfo().then((res) => {
      setInfo(res.data);
    });
    getWalletProducts().then((res) => {
      setInList(res.data.product_list);
      setOption({ ...option, bar: res.data.product_list[0].id });
    });
  };

  const checkType = (e) => {
    setOption({ ...option, active: e });
  };
  const checkTab = (e) => {
    setOption({ ...option, bar: e });
  };
  const payOrder = () => {
    let allJson = GetStorageSync("allJson");
    getPayOrder({ openid: allJson.openid, product_id: option.bar }).then(
      (res) => {
        if (res.code !== 200) {
          return TShow(res.msg);
        }
        let data = res.data.json_params;
        Taro.requestPayment({
          timeStamp: data.time.toString(),
          nonceStr: data.nonce_str,
          package: data.package,
          signType: "RSA",
          paySign: data.sign,
          success: function (res) {
            TShow("充值成功");
            getProList();
          },
          fail: function (err) {
            console.log(err);
            TShow("充值失败");
          },
        });
      }
    );
    // Taro.requestPayment({})
  };
  return (
    <View className="index">
      <HeaderView
        barHeight={option.barHeight}
        height={option.statusBarHeight}
        text="充值"
      />
      <View className="index_content">
        <View className="index_content_banner">创作不易，感谢您的支持</View>
        <View className="index_content_icon">
          <View className="index_content_icon_text">
            <View className="text_main">
              <View className="text_main_title">积分</View>
              <View className="text_main_eval">
                {info?.score}
                {/*<View className="text_main_eval_text">蚂蚁券</View>*/}
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
        <View
          className="index_content_btn"
          hoverClass="index_content_active"
          onClick={payOrder}
        >
          确认支付
        </View>
      </View>
    </View>
  );
}
