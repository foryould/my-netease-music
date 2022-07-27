<template>
  <div class="song-libretto">
    <div class="lyric" ref="currentLyric">
      <template v-for="(l, index) in lyrics">
        <div
          :ref="`lyr-${index}`"
          class="lyric-item"
          :key="index"
          @click="onchangeLyrics(l.time)"
          :class="currentIndex === index ? 'high-light' : ''"
        >
          {{ l.lyric }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SongLibretto',
  props: {
    onCurrentTime: {
      type: Function,
    },
  },
  data() {
    return {
      currentIndex: '',
    }
  },
  async created() {},
  computed: {
    ...mapState('playing', ['lyrics', 'isShowPlayDawer']),
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    isShowPlayDawer(value) {
      if (value) {
        this.$nextTick(() => {
          this.onResize()
        })
      }
    },
  },
  inject: {},
  provide: {},
  methods: {
    setCurrentTime(time) {
      let start = 0
      let end = this.lyrics.length - 1
      let mid
      while (start <= end) {
        mid = Math.floor((start + end) / 2)
        if (this.lyrics[mid].time < time) {
          start = mid + 1
        } else if (this.lyrics[mid].time > time) {
          end = mid - 1
        } else {
          break
        }
      }
      if (mid > 0 && time < this.lyrics[mid].time) mid--
      if (this.currentIndex !== mid) {
        this.$refs[`lyr-${mid}`]
          ? this.$refs[`lyr-${mid}`][0].scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          : ''
      }
      this.currentIndex = mid
    },
    onchangeLyrics(time) {
      this.setCurrentTime(time)
      this.onCurrentTime(time)
    },
    onResize() {
      this.lyrHeight = this.$refs.currentLyric.clientHeight
      this.$refs.currentLyric.style.paddingTop = `${this.lyrHeight / 2}px`
    },
  },
}
</script>
<style lang="scss" scoped>
.song-libretto {
  height: 100%;
}
.lyric {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .lyric-item {
    padding: 2.2rem 0;
    color: #a3a3b5;
    text-align: center;
  }
  & .high-light {
    color: #fff;
  }
}
</style>
