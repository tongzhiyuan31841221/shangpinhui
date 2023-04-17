<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        v-for="(item, index) in userAddressList"
        :key="item.id"
        class="address clearFix"
      >
        <span
          class="username"
          @click="changeDefault(index)"
          :class="{
            selected: item.isDefault == 1,
          }"
          >{{ item.consignee }}</span
        >
        <p>
          <span class="s1">{{ item.fullAddress }}</span>
          <span class="s2">{{ item.phoneNum }}</span>
          <span v-if="item.isDefault == 1" class="s3">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span
          @click="changePayway('ONLINE')"
          class="username"
          :class="{
            selected: paymentWay == 'ONLINE',
          }"
          >在线支付</span
        >
        <span
          @click="changePayway('')"
          :class="{
            selected: paymentWay == '',
          }"
          class="username"
          style="margin-left: 5px"
          >货到付款</span
        >
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          style="display: flex; flex-wrap: nowrap"
          class="list clearFix"
          v-for="(detailItem, i) in detailArrayList"
          :key="i"
        >
          <li style="text-align: center">
            <img
              style="width:80px;height=80px;"
              :src="detailItem.imgUrl"
              alt=""
            />
          </li>
          <li>
            <p>
              {{ detailItem.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ detailItem.orderPrice }}</h3>
          </li>
          <li>{{ detailItem.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="orderComment"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ originalTotalAmount.toFixed(2) }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ totalAmount.toFixed(2) }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ defaultUser.fullAddress }}</span>
        收货人：<span>{{ defaultUser.consignee }}</span>
        <span>{{ defaultUser.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- 千万不要发请求 -->
      <a @click="submitOrder" class="subBtn">提交订单</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trade",
  data() {
    return {
      tradeinfo: {},
      orderComment: "",
      paymentWay: "",
    };
  },
  computed: {
    totalAmount() {
      return this.tradeinfo.totalAmount || 0;
    },
    totalNum() {
      return this.tradeinfo.totalNum || 0;
    },
    originalTotalAmount() {
      return this.tradeinfo.originalTotalAmount || 0;
    },
    userAddressList() {
      return this.tradeinfo.userAddressList || [];
    },
    detailArrayList() {
      return this.tradeinfo.detailArrayList || [];
    },
    defaultUser() {
      return this.userAddressList.find((item) => {
        return item.isDefault == 1;
      });
    },
    tradeNo() {
      return this.tradeinfo.tradeNo || "";
    },
  },
  mounted() {
    try {
      this.getTradeinfo();
    } catch (e) {
      alert(e.message);
    }
  },
  methods: {
    // 获取交易详情
    async getTradeinfo() {
      let res = await this.$API.getTradeinfo();
      if (res.code == 200) {
        this.tradeinfo = res.data;
        return "ok";
      } else {
        return Promise.reject("获取交易详情fail");
      }
    },
    // 改变默认小选项
    changeDefault(index) {
      this.userAddressList.forEach((item) => {
        item.isDefault = 0;
      });
      this.userAddressList[index].isDefault = 1;
    },
    changePayway(way) {
      this.paymentWay = way;
    },
    // 发送请求提交订单,并跳转路由
    async submitOrder() {
      let data = {
       
        consignee: this.defaultUser.consignee, //付款人的名字
        consigneeTel: this.defaultUser.fullAddress, //付款人的手机号
        deliveryAddress: this.defaultUser.fullAddress, //付款人收货地址
        paymentWay: "ONLINE", //支付方式都是在线支付
        orderComment: this.orderComment, //买家留言
        orderDetailList: this.detailArrayList, //购物车商品信息
      };
      // 先不要发那个请求
      let res = await this.$API.submitOrder(this.tradeNo, data);
      if (res.code == 200) {
        this.$router.push({
          name:"pay",
          query:{
            orderId :res.data
          }
        })
      } else {
        alert("请求失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>