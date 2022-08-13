<template>
  <div class="mt-drawer" @click="removeDrawer" v-if="visible">
    <transition name="slide" @after-leave="onAfterLeave">
      <div v-if="showDrawer" class="drawer-content" @click.stop>
        <div class="user-info">
          <div class="users">
            <span class="avatar-url" v-if="userInfo">
              <img :src="userInfo.avatarUrl" />
            </span>
            <span class="nickname" v-if="userInfo">{{
              userInfo.nickname
            }}</span>
            <span @click="toLoginPage" v-if="!userInfo">立即登录</span>
            <div class="jkh">
              <icon name="changyongicon-"></icon>
            </div>
          </div>
          <div class="ewm">
            <icon name="saoma"></icon>
          </div>
        </div>
        <div class="user-content">
          <div class="background">
            <div class="members">
              <div class="vip">
                <h3>续费黑胶VIP</h3>
                <h5>立享超21项专属特权</h5>
              </div>
              <div class="mem-center">
                <button>会员中心</button>
              </div>
            </div>
            <div class="discount">
              <h5>限量专属！四周年4.9折秒杀热卖中</h5>
              <div>4.9折</div>
            </div>
          </div>
          <div class="menu-list card" v-for="(item, key) in menu" :key="key">
            <div class="title" v-if="item.title">
              {{ item.title }}
            </div>
            <div class="menu-item" v-for="s in item.m" :key="s.icon">
              <div class="left">
                <icon :name="s.icon" class="menu-icon"></icon>
                <span class="menu-name">{{ s.name }}</span>
              </div>
              <div class="right">
                <div v-if="s.o">
                  <mt-switch v-model="isSwitch" @change="onchange"></mt-switch>
                </div>
                <icon name="changyongicon-" v-else></icon>
              </div>
            </div>
          </div>
          <div class="logout card" @click="logout">
            <button>退出登录</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import MtSwitch from './MtSwitch.vue'
import { setTheme } from '@/utils/changeTheme'
import dialog from '@/utils/dialog'
import { logout } from '@/api/login'
import { mapState } from 'vuex'
export default {
  name: 'MtDrawer',
  components: { MtSwitch },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showDrawer: false,
      isSwitch: false,
      menu: {
        msg: {
          m: [
            { name: '我的消息', icon: 'xe617' },
            { name: '云贝中心', icon: 'xe988' },
            { name: '创作者中心', icon: 'xe739' },
          ],
        },
        music: {
          title: '音乐服务',
          m: [
            { name: '云村有票', icon: 'xe640' },
            { name: '商城', icon: 'xe667' },
            { name: 'Beat交易平台', icon: 'xe62d' },
            { name: '游戏专区', icon: 'xe69d' },
            { name: '口袋彩铃', icon: 'xe604' },
          ],
        },
        others: {
          title: '其他',
          m: [
            { name: '设置', icon: 'xe8b7' },
            { name: '夜间模式', icon: 'xe620', o: true },
            { name: '定时关闭', icon: 'xe630' },
            { name: '个性装扮', icon: 'xe638' },
          ],
        },
      },
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  watch: {
    visible(value) {
      if (value) {
        this.$nextTick(() => {
          this.showDrawer = true
        })
      }
    },
  },
  methods: {
    removeDrawer() {
      this.showDrawer = false
    },
    onAfterLeave() {
      this.$emit('update:visible', false)
    },
    onchange(e) {
      this.isSwitch = e
      e ? setTheme('dark') : setTheme('light')
    },
    // 退出登录
    async logout() {
      try {
        await dialog.confirm('确定退出登录吗？')
        await logout()
        localStorage.removeItem('user')
        location.reload()
      } catch (e) {
        return
      }
    },
    // 跳转至登录页面
    toLoginPage() {
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped>
.slide-enter-active {
  animation: slideInup 0.5s both;
}
.slide-leave-active {
  animation: slideInup 0.5s both reverse;
}

@keyframes slideInup {
  0% {
    transform: translateX(-100%);
    visibility: visible;
  }

  to {
    transform: translateX(0);
  }
}
.mt-drawer {
  background-color: rgba(54, 54, 54, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.drawer-content {
  height: 100%;
  background-color: var(--bg-color);
  width: 76%;
  display: flex;
  flex-direction: column;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 13.3rem;
  margin: 4.2rem 4.2rem 0 4.2rem;

  .users {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .avatar-url {
    width: 13.3rem;
    height: 100%;
    padding-right: 2.67rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .ewm {
    font-size: 8rem;
  }
  .nickname {
    font-size: 3.73rem;
  }

  .jkh {
    font-size: 4.8rem;
  }
}

.user-content {
  flex: 1;
  overflow-y: auto;
  padding: 4.2rem;
}

.background {
  width: 100%;
  height: 20%;
  background-color: #323232;
  border-radius: 2.67rem;
  padding: 2.67rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h5 {
    color: #696564;
  }
}

.members {
  display: flex;
  justify-content: space-between;

  h3 {
    color: #fce7e4;
    margin-bottom: 2.67rem;
  }

  .mem-center {
    button {
      background: transparent;
      border: 1px solid #696564;
      padding: 1.6rem 4.267rem;
      color: #c9b5b7;
      border-radius: 5.33rem;
    }
  }
}

.discount {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    background-color: var(--primary-color);
    width: 10.67rem;
    height: 10.67rem;
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: 1.6rem;
    font-size: 3.73rem;
    justify-content: center;
  }
}

.menu-list {
  margin-top: 5.33rem;

  .title {
    padding-bottom: 2.67rem;
    color: #aeaeae;
    font-size: 3.73rem;
  }
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.67rem 0px;
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  &:first-child {
    padding-top: 0px;
  }
  &:last-child {
    padding-bottom: 0px;
  }
}

.menu-icon {
  padding-right: 2.67rem;
}

.logout {
  margin-top: 2.67rem;
  text-align: center;
  padding: 2.67rem;

  button {
    border: none;
    color: var(--priary-color);
    background-color: transparent;
  }
}
</style>
