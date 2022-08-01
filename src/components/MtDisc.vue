<template>
  <div
    ref="disc"
    class="play-disc-one"
    :class="isSmall ? 'is-small' : 'is-big'"
  >
    <div class="play-disc-two">
      <div class="play-disc-three">
        <img :src="imgUrl" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MtDisc',
  props: {
    imgUrl: String,
    isSmall: Boolean,
  },
  data() {
    return {
      currentAngle: 0,
    }
  },
  computed: {
    ...mapState('playing', ['isPlay']),
  },
  watch: {
    isPlay() {
      this.startPlay()
    },
  },
  mounted() {
    this.startPlay()
  },
  methods: {
    startAnimation() {
      window.requestAnimationFrame(this.onAnimation)
    },
    onAnimation(t) {
      if (this.destroyed) return
      if (!this.lastTime) {
        this.lastTime = t
      }
      const delt = t - this.lastTime
      this.lastTime = t
      if (this.isPlay === 'play') {
        window.requestAnimationFrame(this.onAnimation)
        this.currentAngle += (delt / 1000) * 15 // 每秒转动15°
        this.$refs.disc.style.transform = `rotate(${this.currentAngle}deg)`
      }
    },
    startPlay() {
      this.lastTime = 0
      this.startAnimation()
    },
  },
  beforeDestroy() {
    this.destroyed = true
  },
}
</script>
<style lang="scss" scoped>
.play-disc-one {
  border-radius: 50%;
  display: flex;
  align-items: center;
}

.is-big {
  height: 80.2rem;
  background-color: #40424d;
  justify-content: center;
}
.is-small {
  height: 100%;
  width: 12.82rem;
}
.play-disc-two {
  width: 90%;
  height: 90%;
  background-color: #0c0c0c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-disc-three {
  width: 70%;
  height: 70%;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}
</style>
