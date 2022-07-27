<template>
  <transition name="slide">
    <div class="playing-page" v-show="visible">
      <div class="playing-header">
        <div class="header-icon" @click="hidePlayDrawer">
          <icon name="xiajiantou"></icon>
        </div>
        <div class="song-info" v-if="songs">
          <div class="song-name">{{ songs.name }}</div>
          <div class="singer-name">{{ songs.ar[0].name }}</div>
        </div>
        <div class="singer">
          <div class="singer-avator"></div>
          <div class="enjoy-icon">
            <icon name="fenxiang"></icon>
          </div>
        </div>
      </div>
      <div class="playing-body">
        <component
          ref="lyric"
          :is="isShowWitch"
          :song="songs"
          :onCurrentTime="onCurrentTime"
        ></component>
      </div>
      <div class="playing-footer">
        <div class="play-song-audio">
          <audio
            :src="songUrl"
            ref="player"
            muted
            @timeupdate="onChangeCurrentTime"
            @canplay="getCanplay"
            @ended="ended"
          ></audio>
          <div style="margin-right: 2.6rem">{{ cTime }}</div>
          <div class="progress-bar" ref="totalbar" @click="playMusic($event)">
            <span
              class="progress__portion"
              ref="runbar"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @touchend="onTouchEnd"
            >
              <span class="progress__pivot" ref="cycle"></span>
            </span>
          </div>
          <div style="margin-left: 2.6rem">{{ dTime }}</div>
        </div>
        <div class="is-to-play">
          <template v-for="c in controls">
            <div
              class="item"
              :key="c.icon"
              v-if="c.key !== isPlay"
              @click="audioState(c.key)"
            >
              <icon :name="c.icon"></icon></div
          ></template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import PlayControl from './PlayControl.vue'
import SongLibretto from './SongLibretto.vue'
import ATest from '../ATest.vue'
import MtSwitch from '@/components/MtSwitch.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  components: { PlayControl, SongLibretto, ATest, MtSwitch },
  name: 'MtPlayDrawer',
  data() {
    return {
      checked: false,
      isShowWitch: 'SongLibretto',
      controls: [
        { name: '循环播放', icon: 'xe6a2', key: 'cycle' },
        { name: '上一曲', icon: 'xe800', key: 'prev' },
        { name: '播放', icon: 'xe624', key: 'play' },
        { name: '暂停', icon: 'xe629', key: 'pause' },
        { name: '下一曲', icon: 'xe7ff', key: 'nextSong' },
        { name: '列表', icon: 'xe60f', key: 'list' },
      ],
      cTime: '00:00', // 已播放时长
      dTime: '00:00', // 总播放时长
      musicWidth: 0, // 进度条总宽度
      showDrawer: true, // 是否显示音乐页面drawer
    }
  },
  async created() {
    this.playCallbacks = []

    this.changeSong(1450574147)
  },
  computed: {
    ...mapState('playing', ['songUrl', 'songs', 'isPlay']),
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    visible() {
      this.$nextTick(() => {
        this.onResize()
      })
    },
  },
  methods: {
    ...mapActions('playing', ['changeSong']),
    ...mapMutations('playing', ['setPlayDrawer', 'setPlayState']),
    hidePlayDrawer() {
      this.setPlayDrawer(false)
    },
    setAudioDTime(time) {
      const branch = Math.floor(time / 60)
      const second = Math.ceil(time % 60)
      if (branch < 10 && second < 10) {
        this.dTime = `0${branch}:0${second}`
      } else if (branch < 10) {
        this.dTime = `0${branch}:${second}`
      } else if (second < 10) {
        this.dTime = `${branch}:0${second}`
      } else {
        this.dTime = `${branch}:${second}`
      }
    },
    setAudioCtime(time) {
      const branch = Math.floor(time / 60)
      const second = Math.ceil(time % 60)
      if (branch < 10 && second < 10) {
        this.cTime = `0${branch}:0${second}`
        return `0${branch}:0${second}`
      } else if (branch < 10) {
        this.cTime = `0${branch}:${second}`
        return `0${branch}:${second}`
      } else if (second < 10) {
        this.cTime = `${branch}:0${second}`
        return `${branch}:0${second}`
      } else {
        this.cTime = `${branch}:${second}`
        return `${branch}:${second}`
      }
    },
    // 控制播放和暂停
    audioState(key) {
      const music = this.$refs.player
      if (key === 'play') {
        this.setPlayState('play')
        music.play()
      } else if (key === 'pause') {
        this.setPlayState('pause')
        music.pause()
      }
    },
    // 获得音频加载完成可播放时的处理
    getCanplay() {
      const music = this.$refs.player
      const musicTime = music.duration
      this.setAudioDTime(musicTime)
    },
    // currentTime属性值发生变化的时候会触发timeupdate事件
    onChangeCurrentTime() {
      if (this.isTouching) return
      const music = this.$refs.player
      const musicBar = this.$refs.runbar
      const currentTime = music.currentTime
      const duration = music.duration
      this.setAudioCtime(currentTime)
      musicBar.style.width = `${(currentTime / duration) * 100}%`
      this.$refs.lyric.setCurrentTime(currentTime * 1000)
      this.playCallbacks.forEach((callback) => {
        callback(currentTime, duration)
      })
    },
    addPlayListener(callback) {
      this.playCallbacks.push(callback)
    },
    removePlayListener(callback) {
      const index = this.playCallbacks.findIndex((c) => {
        return c === callback
      })
      index !== -1 && this.playCallbacks.splice(index, 1)
    },
    onTouchStart() {
      this.isTouching = true
    },
    onTouchMove(e) {
      const musicBar = this.$refs.runbar
      const a = musicBar.getBoundingClientRect()
      const dragDistance = e.targetTouches[0].pageX
      if (dragDistance - a.left >= this.musicWidth) {
        musicBar.style.width = '100%'
        return
      } else if (dragDistance - a.left <= 0) {
        musicBar.style.width = '0%'
        return
      }
      musicBar.style.width = `${
        ((dragDistance - a.left) / this.musicWidth) * 100
      }%`
      const music = this.$refs.player
      const touchingCurrentTime =
        (music.duration * (dragDistance - a.left)) / this.musicWidth
      this.setAudioCtime(touchingCurrentTime)
    },
    onTouchEnd() {
      this.isTouching = false
      const music = this.$refs.player
      const musicBar = this.$refs.runbar
      const touchWidth = musicBar.clientWidth / this.musicWidth
      music.currentTime = music.duration * touchWidth
    },
    playMusic(e) {
      const music = this.$refs.player
      const m = this.$refs.totalbar
      const s = m.getBoundingClientRect()
      const barWidth = (e.pageX - s.left) / this.musicWidth
      this.$refs.runbar.style.width = `${barWidth * 100}%`
      music.currentTime = music.duration * barWidth
    },
    // 播放结束
    ended() {},
    onCurrentTime(time) {
      const music = this.$refs.player
      music.currentTime = time / 1000
    },
    onResize() {
      this.musicWidth = this.$refs.totalbar.clientWidth
    },
    switchComponents() {
      this.isShowWitch = 'PlayControl'
    },
  },
}
</script>
<style lang="scss" scoped>
.slide-enter-active {
  animation: slideInUp 0.5s both;
}
.slide-leave-active {
  animation: slideInUp 0.5s both reverse;
}

@keyframes slideInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }
  100% {
    transform: translateZ(0);
  }
}
.playing-page {
  height: 100%;
  background: linear-gradient(#162333, #7d7d7b);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.playing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rem 4.2rem;
}

.header-icon {
  width: 30.4rem;
}

.singer-avator {
  width: 10.2rem;
  height: 10.2rem;
  border-radius: 50%;
  background-color: #fff;
}

.song-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 4.2rem;
}

.singer {
  width: 30.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 9rem;
}
.singer-name {
  color: #a3a3b5;
}

.enjoy-icon,
.header-icon {
  font-size: 9.2rem;
}

.playing-body {
  flex: 1;
  padding: 0 10rem;
  overflow-y: auto;
}

.playing-footer {
  height: 40vw;
  padding: 10rem 4.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.play-song-audio {
  display: flex;
  align-items: center;
}
.is-to-play {
  display: flex;
  justify-content: space-between;
  padding: 0rem 5.8rem;

  .item {
    i {
      font-size: 6.4rem;
    }
  }
}

.progress-bar {
  position: relative;
  flex: 1;
  height: 1rem;
  border-radius: 1rem;
  background: #9999;
}

.progress__portion {
  position: absolute;
  width: 0;
  height: 1rem;
  background-color: var(--primary-color);
  border-radius: 1rem;
  top: 0;
  left: 0;

  .progress__pivot {
    display: inline-block;
    padding: 1.6rem;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
