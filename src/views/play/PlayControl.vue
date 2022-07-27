<template>
  <div class="play-control" v-if="song">
    <div class="control-rods"></div>
    <div ref="disc" class="play-disc-one">
      <div class="play-disc-two">
        <div class="play-disc-three">
          <img :src="song.al.picUrl" />
        </div>
      </div>
    </div>
    <div class="play-others">
      <div class="icon-item" v-for="i in playicon" :key="i.icon">
        <icon :name="i.icon"></icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayControl',
  props: {
    song: {
      type: Object,
    },
  },
  data() {
    return {
      playicon: [
        { name: '喜欢', icon: 'xe60a' },
        { name: '下载', icon: 'xe607' },
        { name: '唱歌', icon: 'xe686' },
        { name: '评论', icon: 'xe635' },
        { name: '更多', icon: 'xe8c4' },
      ],
      currentAngle: 0,
    }
  },
  async mounted() {
    this.startPlay()
  },
  methods: {
    setCurrentAngle() {
      this.$refs.disc.style.transform = `rotate(${this.currentAngle}deg)`
      window.requestAnimationFrame(this.setCurrentAngle)
      this.currentAngle++
      // this.currentAngle = index
      // this.$refs.disc.style.transition = 'all 0.5s'
      // this.$refs.disc.style.transform = `rotate(${index}deg)`
    },
    startPlay() {
      // this.timer = setInterval(() => {
      //   this.setCurrentAngle((this.currentAngle + 1) % 360)
      // }, 500)
      this.setCurrentAngle
    },
    stopPlay() {
      clearInterval(this.timer)
    },
  },
}
</script>
<style lang="scss" scoped>
.play-control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.play-disc-one {
  height: 80.1rem;
  border-radius: 50%;
  background-color: #40424d;
  display: flex;
  align-items: center;
  justify-content: center;
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

.play-others {
  display: flex;
  justify-content: space-between;

  .icon-item {
    i {
      font-size: 6.4rem;
    }
  }
}
</style>
