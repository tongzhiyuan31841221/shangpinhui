<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html">登陆</a> </span>
      </h3>
      <div class="content">
        <!-- <input type="text" name="fieldName" v-validate="'required'">
<span>{{ errors.first('fieldName') }}</span> -->
        <label>手机号:</label>
        <input
          type="text"
          v-model="phone"
          placeholder="请输入你的手机号"
          name="phone"
          v-validate="{ required:true, regex: /^1[0-9]{10}/ }"
        />
        <!-- <input
          type="text"
          v-model="phone"
          placeholder="请输入你的手机号"
          name="email"
          v-validate="'required|email'"
        /> -->
        <!-- <span class="error-msg">{{ errors.first("email") }}</span> -->
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          ref="codebox"
          v-model="code"
          type="text"
          placeholder="请输入验证码"
        />
        <button
          @click="getCode"
          style="width: 100px; height: 40px; margin-right: 10px"
          ref="code"
          alt="code"
        >
          点击获取验证码
        </button>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          v-model="password"
          type="text"
          placeholder="请输入你的登录密码"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input v-model="passwords" type="text" placeholder="请输入确认密码" />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" checked ref="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="registerAndsaveToken">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export { mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      passwords: "",
      code: "",
    };
  },
  computed: {
    ...mapGetters("register", ["stocode"]),
  },
  methods: {
    async getCode() {
      if (this.phone.trim() != "") {
        await this.$store.dispatch("register/getcode", this.phone);
      }
      // 同步异步混一起了,还是要用await

      this.$refs.codebox.value = this.stocode;
    },
    finishRegiser() {
      if (this.$refs.agree.checked && this.password == this.passwords)
        alert(123);
      alert(121231231);
    },
    registerAndsaveToken() {
      let { phone, password } = this;
      try {
        this.$store.dispatch("register/userRegister", {
          phone,
          password,
          code: this.stocode,
        });
        this.$router.push("login");
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>