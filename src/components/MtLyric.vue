<template>
  <div class="mt-lyric" v-if="songs">
    <div class="lyric-name" @click="showPlayDrawer">
      <mt-disc :imgUrl="songs.al.picUrl" isSmall></mt-disc>
      <div class="name">
        <span style="font-size: 4.27rem; color: var(--primary-text-color)">{{
          songs.name
        }}</span>
        <span>-</span>
        <span style="color: var(--secondary-text-color)">{{
          songs.ar[0].name
        }}</span>
      </div>
    </div>
    <div class="lyric-icon">
      <div class="play-icon" ref="circle" @click="playMusic">
        <mt-circle-progress :value="playProgress"></mt-circle-progress>
        <icon
          class="play-state"
          :name="isPlay === 'pause' ? 'xea82' : 'xe63d'"
        ></icon>
      </div>
      <div class="pause-icon" @click="musicList">
        <icon name="bofangliebiao"></icon>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import MtCircleProgress from './MtCircleProgress.vue'
import MtDisc from './MtDisc.vue'
export default {
  name: 'MtLyric',
  components: { MtCircleProgress, MtDisc },
  inject: ['getPlayState'],
  data() {
    return {
      playProgress: 0,
    }
  },
  computed: {
    ...mapState('playing', ['isPlay', 'lyrics', 'songs']),
  },
  mounted() {
    this.getPlayState().addPlayListener(this.onPlayProgressChange)
  },
  beforeDestroy() {
    this.getPlayState().removePlayListener(this.onPlayProgressChange)
  },
  methods: {
    ...mapMutations('playing', ['setPlayDrawer', 'setPlayState']),
    onPlayProgressChange(currentTime, duration) {
      if (!duration) {
        this.playProgress = 0
        return
      }
      this.playProgress = currentTime / duration
    },
    playMusic() {
      if (this.isPlay === 'pause') {
        this.setPlayState('play')
        this.getPlayState().audioState('play')
      } else if (this.isPlay === 'play') {
        this.setPlayState('pause')
        this.getPlayState().audioState('pause')
      }
    },
    musicList() {},
    showPlayDrawer() {
      this.setPlayDrawer(true)
    },
  },
}
</script>
<style lang="scss" scoped>
.mt-lyric {
  height: 15.22rem;
  padding: 1.2rem 3.2rem;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.lyric-name {
  height: 100%;
  display: flex;
  align-items: center;
}

.play-disc {
  height: 100%;
  width: 12.81rem;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
  .play-disc-two {
    height: 70%;
    width: 70%;
    border-radius: 50%;
  }
  .play-disc-three {
    height: 100%;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}

.lyric-icon {
  display: flex;
  align-items: center;
  height: 100%;

  .play-icon {
    font-size: 5rem;
    margin-right: 5.33rem;
    height: 11.33rem;
    position: relative;
    width: 11.33rem;
  }

  .pause-icon {
    font-size: 6rem;
  }
}

.play-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
