<template>
  <div id="app">
    <router-view />
    <mt-play-drawer :visible="isShowPlayDawer" ref="play"></mt-play-drawer>
  </div>
</template>

<script>
import MtPlayDrawer from '@/views/play/PlayingPage.vue'

export default {
  components: { MtPlayDrawer },
  provide() {
    return {
      getPlayState: () => this.$refs.play,
    }
  },
  computed: {
    isShowPlayDawer: {
      get() {
        return this.$store.state.playing.isShowPlayDawer
      },
      set(v) {
        this.$store.commit('playing/setPlayDrawer', v)
      },
    },
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  overflow: hidden;
  font-size: 3.73rem;
  color: var(--primary-text-color);
}
div {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: hidden;
}
</style>
