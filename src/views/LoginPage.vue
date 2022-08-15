<template>
  <div class="login-page">
    <div class="login-logo">
      <icon name="wangyiyunyinle-" />
    </div>
    <div class="form">
      <div class="phone">
        <input v-model="phone" type="number" placeholder="手机号" />
      </div>
      <div class="code">
        <input v-model="phoneCode" placeholder="验证码" />
        <button class="btn-code" :disabled="getCodeDisabled" @click="getCode">
          <template v-if="codeCountDown === 0">获取验证码</template>
          <template v-else>{{ codeCountDown }}秒</template>
        </button>
      </div>
      <div class="operate">
        <button class="operate-btn" :disabled="loginDisabled" @click="login">
          登录
        </button>
      </div>
      <div class="agree-terms" :class="agreeAnimate ? 'agree-animate' : ''">
        <input type="checkbox" v-model="agreeBtn" />
        <span class="agree-terms-text"
          >同意 服务条款、隐私条款、中国移动认证服务协议</span
        >
      </div>
    </div>
    <div class="other-login">
      <div
        class="item"
        v-for="i in thirdpartLogin"
        :key="i.icon"
        :title="i.name"
      >
        <icon :name="i.icon" />
      </div>
    </div>
  </div>
</template>
<script>
import { getCode, loginByCode } from '@/api/login'
import toast from '@/utils/toast'
import { mapActions, mapMutations } from 'vuex'
import { setToken, setUser } from '@/utils/auth.js'
export default {
  name: 'LoginPage',
  data() {
    return {
      phone: '',
      phoneCode: '',
      agreeBtn: false,
      codeCountDown: 0,
      agreeAnimate: false,
      thirdpartLogin: [
        { icon: 'qq', name: 'QQ' },
        { icon: 'shejiaotubiao-01', name: '微信' },
        { icon: 'weibo', name: '微博' },
      ],
    }
  },
  computed: {
    getCodeDisabled() {
      const regPhone = /^1[3-9]\d{9}$/
      return !regPhone.test(this.phone) || this.codeCountDown > 0
    },
    loginDisabled() {
      return !(this.phone && this.phoneCode)
    },
  },
  created() {
    // toast('三秒后跳转至播放页')
    // setTimeout(() => {
    //   this.$router.push('/playing')
    // }, 3000)
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapActions(['init']),
    async getCode() {
      try {
        await getCode(this.phone)
        this.codeCountDown = 60
        this.timer = setInterval(() => {
          this.codeCountDown--
          if (this.codeCountDown <= 0) {
            clearInterval(this.timer)
          }
        }, 1000)
      } catch (e) {
        console.error(e)
      }
    },
    async login() {
      if (!this.agreeBtn) {
        this.agreeAnimate = true
        toast('请勾选同意协议')
        setTimeout(() => {
          this.agreeAnimate = false
        }, 700)
        return
      }
      try {
        const loginResult = await loginByCode({
          phone: this.phone,
          captcha: this.phoneCode,
        })
        this.init()
        this.setUserInfo(loginResult.profile)
        setToken(loginResult.token)
        setUser(loginResult.profile)
        this.$router.push({ path: '/' })
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login-logo {
  font-size: 53.33rem;
  display: flex;
  justify-content: center;
}

.login-page {
  height: 100%;
  padding: 1.2rem;
  position: relative;
  .phone,
  .code {
    padding: 2.67rem 0px;
    border-bottom: 1px solid #ccc;
  }
  .phone {
    margin-bottom: 2.67rem;
  }
  .code {
    display: flex;
    justify-content: space-between;
  }
  .btn-code {
    border: none;
    background-color: var(--bg-color);
    color: var(--secondary-text-color);

    &:disabled {
      color: #ddd;
    }
  }
  input {
    border: none;
    outline: none;
  }
  .operate {
    padding-top: 8rem;
    text-align: center;
  }
  .operate-btn {
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    width: 100%;
    padding: 2.67rem 0px;
    border-radius: 13.33rem;
    &:disabled {
      background-color: #ddd;
    }
  }

  .agree-terms {
    padding-top: 5.33rem;
    display: flex;
    align-items: center;
    .agree-terms-btn {
      width: 3.73rem;
      height: 3.73rem;
      border: 1px solid;
      border-radius: 50%;
      margin-right: 6px;
    }
    .agree-terms-text {
      font-size: 3.2rem;
      margin-left: 2rem;
    }
    .is-active {
      background-color: #bbb;
    }
  }
}

.other-login {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;

  .item {
    width: 10.667rem;
    height: 10.667rem;
    font-size: 5.867rem;
    border: 1px solid #ddd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right: 2.67rem;
    }
  }
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2.67rem);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(2.67rem);
  }
  100% {
    transform: translateX(0);
  }
}
.agree-animate {
  animation: shake 0.4s;
}

.form {
  padding: 0 2.67rem;
}
</style>
