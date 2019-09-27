<template>
  <div class="logreg-box flex-rcc">
    <div class="logreg-from-box">
      <!-- <img src="../../../assets/images/nlogin.png"
           alt=""> -->
      <div class="close-img-box"
           @click="closelogregback"></div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="登录"
                     name="first">
          <div v-if="logByPwd">
            <div>
              <input v-model="loginByAccoutForm.phone"
                     type="text"
                     maxlength="37"
                     autocomplete="off"
                     placeholder="请输入正确的手机号"
                     class="ipt"
                     @blur="verifyAccountPhone(loginByAccoutForm.phone)">
              <div class="tip-text">{{accountPhoneText}}</div>
            </div>
            <div>
              <input v-model="loginByAccoutForm.password"
                     :type="pwdType"
                     maxlength="37"
                     autocomplete="off"
                     placeholder="请输入密码"
                     class="ipt"
                     @blur="verifyAccountPwd(loginByAccoutForm.password)">
              <span class="show-pwd"
                    @click="showPwd">
                <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
              </span>
              <div class="tip-text">{{accountPwdText}}</div>
            </div>
            <div>
              <input v-model="loginByAccoutForm.verifyCode"
                     type="text"
                     maxlength="4"
                     autocomplete="off"
                     placeholder="请输入验证码"
                     class="ipt"
                     @blur="verifyAccountCode(loginByAccoutForm.verifyCode)">
              <li class="el-icon-refresh"
                  @click.prevent="refreshChartCode"></li>
              <verify-code :contentWidth='contentWidth'
                           :contentHeight='contentHeight'
                           :identifyCode='chartCode'
                           :fontSizeMin='fontSizeMin'
                           class="verify-code"
                           v-if="showChartCode"></verify-code>
              <div class="tip-text">{{accountCodeText}}</div>
            </div>
            <div class="login-btn"
                 @click="handLoginByAccount">
              登录
            </div>
            <div class="phone-text"
                 @click="changLoginWay">手机短信登录</div>

          </div>
          <div v-if="!logByPwd">
            <div>
              <input v-model="loginByPhoneCode.phone"
                     type="text"
                     maxlength="11"
                     autocomplete="off"
                     placeholder="请输入正确的手机号(暂不支持)"
                     class="ipt"
                     @blur="verifyCodePhone(loginByPhoneCode.phone)">
              <div class="tip-text">{{codePhoneText}}</div>
            </div>
            <div>
              <input v-model="loginByPhoneCode.phoneCode"
                     :type="pwdType"
                     maxlength="4"
                     autocomplete="off"
                     placeholder="请输入短信验证码(暂不支持)"
                     class="ipt">
              <div class='send-code-text active'
                   @click.self="sendCode"
                   v-show="showSendText">发送验证码</div>
              <div class='send-code-text active'
                   v-show="!showSendText">重新发送 {{sendTime}}s</div>
              <div class="tip-text">123</div>
            </div>
            <div>
              <input v-model="loginByPhoneCode.verifyCode"
                     type="text"
                     maxlength="4"
                     autocomplete="off"
                     placeholder="请输入验证码"
                     class="ipt"
                     @blur="verifyPhoneChart(loginByPhoneCode.verifyCode)">
              <li class="el-icon-refresh"
                  @click.self="refreshChartCode"></li>
              <verify-code :contentWidth='contentWidth'
                           :contentHeight='contentHeight'
                           :identifyCode='chartCode'
                           :fontSizeMin='fontSizeMin'
                           class="verify-code"
                           v-if="showChartCode"></verify-code>
              <div class="tip-text">{{phoneChartText}}</div>
            </div>
            <div class="login-btn"
                 @click="handLoginByPhoneCode">
              登录
            </div>
            <div class="phone-text"
                 @click="changLoginWay">账号密码登录</div>

          </div>

        </el-tab-pane>
        <el-tab-pane label="注册"
                     name="second">
          <div>
            <input v-model="registerForm.phone"
                   type="text"
                   maxlength="11"
                   autocomplete="off"
                   placeholder="请输入注册手机号"
                   class="ipt"
                   @blur="verifyRegisterPhone(registerForm.phone)">
            <div class="tip-text">{{registerPhoneText}}</div>
          </div>
          <div>
            <!-- <input v-model="registerForm.phoneCode"
                   :type="pwdType"
                   maxlength="4"
                   autocomplete="off"
                   placeholder="请输入短信验证码"
                   class="ipt">
            <div class='send-code-text active'
                 @click.self="sendCode"
                 v-show="showSendText">发送验证码</div>
            <div class='send-code-text active'
                 v-show="!showSendText">重新发送 {{sendTime}}s</div> -->
            <input v-model="registerForm.password"
                   :type="pwdType"
                   maxlength="37"
                   autocomplete="off"
                   placeholder="请输入密码"
                   class="ipt"
                   @blur="verifyPhonePwd(registerForm.password)">
            <span class="show-pwd"
                  @click="showPwd">
              <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
            </span>
            <div class="tip-text">{{registerPwdText}}</div>
          </div>
          <div>
            <input v-model="registerForm.verifyCode"
                   type="text"
                   maxlength="4"
                   autocomplete="off"
                   placeholder="请输入验证码"
                   class="ipt"
                   @blur="verifyRegisterChart(registerForm.verifyCode)">
            <li class="el-icon-refresh"
                @click.self="refreshChartCode"></li>
            <verify-code :contentWidth='contentWidth'
                         :contentHeight='contentHeight'
                         :identifyCode='chartCode'
                         :fontSizeMin='fontSizeMin'
                         class="verify-code"
                         v-if="!showChartCode"></verify-code>
            <div class="tip-text">{{registerChartText}}</div>
          </div>
          <div class="login-btn"
               @click="handleRestiger">
            注册
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// import VerifyCode from '@/components/VerifyCode'
import { loginByAccount, register } from '@/api/login'
export default {
  name: 'LogReg',
  data () {
    return {
      showChartCode: true,
      identifyCodes: '123456890',
      // identifyCodes: '2345689ABDGHKMNR',
      // identifyCodes: 'ABCDEFGHIJKLMNOPQRSTUVWSYZ',
      contentWidth: 86,
      contentHeight: 38,
      fontSizeMin: 24,
      chartCode: '1234',
      activeName: 'first',
      pwdType: 'password',
      showSendText: true,
      sendTime: 14,
      interval: null,
      logByPwd: true,
      loginByAccoutForm: {
        phone: '',
        password: '',
        verifyCode: ''
      },
      loginByPhoneCode: {
        phone: '',
        phoneCode: '',
        verifyCode: ''
      },
      registerForm: {
        phone: '',
        password: '',
        verifyCode: ''
      },
      loginByAccoutStatus: {
        phone: false,
        password: false,
        verifyCode: false
      },
      loginByPhoneCodeStatus: {
        phone: false,
        phoneCode: false,
        verifyCode: false
      },
      registerFormStatus: {
        phone: false,
        password: false,
        verifyCode: false
      },
      accountPhoneText: '',
      accountPwdText: '',
      accountCodeText: '',
      codePhoneText: '',
      phoneChartText: '',
      registerPhoneText: '',
      registerChartText: '',
      registerPwdText: ''
    }
  },
  components: {
    // VerifyCode
  },
  mounted () {
    this.refreshChartCode();

  },
  methods: {
    /* 手机 短信 注册 */
    verifyRegisterPhone (val) {// 验证 手机号
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (phoneReg.test(val.trim())) {
        this.registerPhoneText = '';
        this.registerFormStatus.phone = true;
      } else {
        this.registerPhoneText = '请输入正确的手机号';
        this.registerFormStatus.phone = false;
      }
    },
    verifyPhonePwd (val) { // 验证 注册 密码

      let pwdReg = /^[0-9a-zA-Z]{6,16}$/;
      if (pwdReg.test(val.trim())) {
        this.registerPwdText = '';
        this.registerFormStatus.password = true;
      } else {
        this.registerPwdText = '请输入6-16位密码,数字或字母,区分大小写,不能用空格';
        this.registerFormStatus.password = false;
      }

    },
    verifyRegisterChart (val) {// 验证 随机验证码
      if (val == this.chartCode) {
        this.registerChartText = '';
        this.registerFormStatus.verifyCode = true;
      } else {
        this.registerChartText = '验证码有误';
        this.registerFormStatus.verifyCode = false;
      }
    },
    handleRestiger () { // 注册
      if (this.registerFormStatus.phone && this.registerFormStatus.verifyCode) {
        register(this.registerForm).then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.$message({
              message: '注册成功！',
              type: 'success',
              showClose: true
            })
            this.closelogregback();
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.data))

          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              showClose: true
            });
            this.refreshChartCode();

          }
        }).catch(err => {
          // console.log('err');
          this.refreshChartCode();
        })

      } else {
        this.$message({
          message: '输入有误！',
          type: 'warning',
          showClose: true
        })
      }
    },

    /* 手机 短信 登录 */
    verifyCodePhone (val) {// 验证 手机号
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (phoneReg.test(val.trim())) {
        this.codePhoneText = '';
        this.loginByPhoneCodeStatus.phone = true;
      } else {
        this.codePhoneText = '请输入正确的手机号';
        this.loginByPhoneCodeStatus.phone = false;
      }
    },
    verifyPhoneChart (val) {// 验证 随机验证码
      if (val == this.chartCode) {
        this.phoneChartText = '';
        this.loginByPhoneCodeStatus.verifyCode = true;
      } else {
        this.phoneChartText = '验证码有误';
        this.loginByPhoneCodeStatus.verifyCode = false;
      }
    },
    handLoginByPhoneCode () { // 手机 短信 登录
      if (this.loginByPhoneCodeStatus.phone && this.loginByPhoneCodeStatus.verifyCode) {

      } else {
        // console.log(this.loginByPhoneCodeStatus.phone)
        // console.log(this.loginByPhoneCodeStatus.verifyCode)
        this.$message({
          message: '输入有误！',
          type: 'warning',
          showClose: true
        })
      }
    },
    /* 账号 密码 登录 */
    verifyAccountPhone (val) { // 验证 手机号
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (phoneReg.test(val.trim())) {
        this.accountPhoneText = '';
        this.loginByAccoutStatus.phone = true;
      } else {
        this.accountPhoneText = '请输入正确的手机号';
        this.loginByAccoutStatus.phone = false;
      }
    },
    verifyAccountPwd (val) { // 验证 密码
      let pwdReg = /^[0-9a-zA-Z]{6,16}$/;
      if (pwdReg.test(val.trim())) {
        this.accountPwdText = '';
        this.loginByAccoutStatus.password = true;
      } else {
        this.accountPwdText = '请输入6-16位密码,数字或字母,区分大小写,不能用空格';
        this.loginByAccoutStatus.password = false;
      }
    },
    verifyAccountCode (val) {// 验证 随机验证码
      if (val == this.chartCode) {
        this.accountCodeText = '';
        this.loginByAccoutStatus.verifyCode = true;
      } else {
        this.accountCodeText = '验证码有误';
        this.loginByAccoutStatus.verifyCode = false;
      }
    },
    handLoginByAccount () { // 账号密码 登录
      if (this.loginByAccoutStatus.phone && this.loginByAccoutStatus.password && this.loginByAccoutStatus.verifyCode) {
        loginByAccount(this.loginByAccoutForm).then(res => {
          // console.log(res.data)
          if (res.code == 200) {
            this.$message({
              message: '登录成功！',
              type: 'success',
              showClose: true
            })
            this.closelogregback();
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.data))

          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              showClose: true
            });
            this.refreshChartCode();
          }

        }).catch(err => {
          // console.log('err');
          this.refreshChartCode();
        })

      } else {
        this.$message({
          message: '输入有误！',
          type: 'warning',
          showClose: true
        })
      }
    },
    closelogregback () {
      this.$emit('closelogregback', 'closelogregback')
    },
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    changLoginWay () {
      this.logByPwd = !this.logByPwd;
      this.refreshChartCode();
    },
    sendCode () {
      this.showSendText = false;
      let num = 14;
      this.interval = setInterval(() => {
        num--;
        if (num < 10) {
          this.sendTime = '0' + num
        } else {
          this.sendTime = num;
        }
        if (num < 1) {
          clearInterval(this.interval);
          this.sendTime = 14;
          this.showSendText = true;
        }
      }, 1000)

    },
    refreshChartCode () {
      this.chartCode = '';
      this.makeCode(this.identifyCodes, 4);
      console.log(this.chartCode)
    },
    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.chartCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    handleClick (tab, event) {
      // console.log(tab, event);
      this.showChartCode = !this.showChartCode;
      this.logByPwd = true;
      this.refreshChartCode();
    }
  }
}

</script>
<style lang="scss"scoped>
@keyframes myfirst {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-moz-keyframes myfirst {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.logreg-box {
  width: 100%;
  height: 100%;
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // background-color: rgba(0, 0, 0, 0.5);
  // z-index: 1200;

  // animation: myfirst 0.2s;
  // -moz-animation: myfirst 0.2s;
  // /* Firefox */
  // -webkit-animation: myfirst 0.2s;
  // /* Safari and Chrome */
  // -o-animation: myfirst 0.2s;
  // /* Opera */

  .logreg-from-box {
    position: relative;
    width: 384px;
    height: 380px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px 32px 30px;
    box-shadow: 0 12px 24px 0 rgba(28, 31, 33, 0.1);
    border-radius: 12px;

    .close-img-box {
      position: absolute;
      top: 17px;
      right: 20px;
      width: 17px;
      height: 17px;
      cursor: pointer;
      // border: 1px solid red;
      background: url("../../../assets/images/nlogin.png") no-repeat 0 0;
      transition: transform 0.2s;
      -webkit-transition: transform 0.2s;
      -moz-transition: transform 0.2s;
      -o-transition: transform 0.2s;

      &:hover {
        background-position: 0 -21px;
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
      }
    }
  }

  input {
    outline: none;
  }
  .ipt {
    width: 100%;
    height: 48px;
    color: #1c1f21;
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    padding: 14px;
    box-shadow: 2px 0 5px 0 #fff;
    background: rgba(28, 31, 33, 0.06);
    border-radius: 8px;
    border: 0;
  }
  input::-webkit-input-placeholder {
    color: #9199a1;
    font-size: 16px;
  }
  input:-moz-placeholder {
    color: #9199a1;
    font-size: 16px;
  }
  input:-ms-input-placeholder {
    color: #9199a1;
    font-size: 16px;
  }
  .tip-text {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #ef1300;
  }
  .login-btn {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 32px;
    font-size: 16px;
    line-height: 24px;
    border-radius: 24px;
    transition: all 0.3s;
    color: #fff;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    background-color: #f20d0d;
    border-color: #f20d0d;
    opacity: 1;
    cursor: pointer;
    &:hover {
      color: #fff;
      border-color: #c20a0a;
      background: #c20a0a;
      opacity: 1;
    }
  }
  .phone-text {
    margin-left: 30px;
    margin-top: 8px;
    font-size: 14px;
    color: #f20d0d;
    text-align: left;
    line-height: 24px;
    cursor: pointer;

    &:hover {
      color: #c20a0a;
    }
  }
  .send-code-text {
    position: absolute;
    z-index: 100;
    top: 80px;
    right: 14px;
    font-size: 14px;
    color: #9199a1;
    line-height: 24px;
    cursor: pointer;
    &:hover {
      color: #13181e;
    }
  }
  .send-code-text.active {
    color: #1481b8;
    cursor: pointer;
    &:hover {
      color: #248fc6;
    }
  }
  .verify-code-box {
    position: relative;
  }
  .verify-code {
    position: absolute;
    top: 145px;
    right: 6px;
  }
  .el-icon-refresh {
    font-size: 20px;
    position: absolute;
    top: 154px;
    right: 96px;
    color: #1c1f21;
    cursor: pointer;
    // font-weight: 600;
    &:hover {
      color: #1481b8;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 74px;
    font-size: 16px;
    cursor: pointer;
    color: #1c1f21;
    user-select: none;
  }
}
</style>
<style lang="scss" >
.logreg-box {
  .el-tabs__header {
    margin: 0 0 20px;
  }
  .el-tabs__item {
    font-size: 16px;
    font-weight: 700;
    color: #787d82;
  }
  .el-tabs__item.is-active,
  .el-tabs__item:hover {
    color: #f20d0d;
  }
  .el-tabs__nav-wrap::after {
    background-color: #fff;
  }
  .el-tabs__active-bar {
    background-color: #f20d0d;
  }
  // input::-webkit-input-placeholder {
  //   color: red;
  // }
  // input:-moz-placeholder {
  //   color: red;
  // }
  // input:-ms-input-placeholder {
  //   color: red;
  // }
}
</style>