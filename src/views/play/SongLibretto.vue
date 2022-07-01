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
import { getSongLyrics } from '@/api/play'
import { formatTime } from '@/utils/index.js'
export default {
  name: 'SongLibretto',
  props: {
    onCurrentTime: {
      type: Function,
    },
  },
  data() {
    return {
      lyrics: [],
      currentIndex: '',
    }
  },
  async created() {
    await this.loadLyrics()
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    async loadLyrics() {
      try {
        const data = await getSongLyrics(186315)
        const lyrics = data.lrc.lyric
        const lineLyric = lyrics.split(/\n/)
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
        lineLyric.forEach((item) => {
          const obj = {}
          const time = item.match(regTime)
          obj.lyric = item.split(']')[1] === '' ? '' : item.split(']')[1]
          obj.time = time ? formatTime(time[0].slice(1, time[0].length - 1)) : 0
          this.lyrics.push(obj)
          this.lyrics = this.lyrics.filter((item) => {
            return item.lyric !== ''
          })
        })
      } catch (e) {
        console.error(e)
      }
    },
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
  }
  & .high-light {
    color: #fff;
  }
}
</style>
