<template>
  <div class="mt-swipe">
    <div
      ref="swiper"
      class="mt-swipe-wrapper"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="{ width: `${bannerWidth * list.length}px` }"
    >
      <div
        class="mt-swipe-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{ width: `${bannerWidth}px` }"
      >
        <slot :item="item"></slot>
      </div>
    </div>
    <div class="swipe-dot">
      <span
        v-for="(item, index) in list"
        :key="index"
        :class="currentIndex === index ? 'active' : ''"
        @click="onChangeIndex(index)"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MtSwipe',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bannerWidth: 0, // 轮播图宽度
      currentIndex: 0, // 当前轮播图索引
    }
  },
  mounted() {
    this.onResize() // 获取图片宽度
    window.addEventListener('resize', this.onResize)
    this.startAutoPlay()
  },
  computed: {},
  methods: {
    setCurrentActive(index) {
      this.setTranslateOffset(index, 0, true)
    },
    setTranslateOffset(index, delta = 0, anim) {
      if (index < 0) index = 0
      if (index > this.list.length - 1) index = this.list.length - 1
      this.$refs.swiper.style.transition = anim ? 'all 0.5s' : '' // 切换下一张图片
      this.$refs.swiper.style.transform = `translateX(${-(
        this.bannerWidth * index +
        delta
      )}px)`
      this.currentIndex = index
    },
    onChangeIndex(index) {
      this.setCurrentActive(index)
      this.stopAutoPlay()
      this.startAutoPlay()
    },
    startAutoPlay() {
      this.playTimer = setInterval(() => {
        this.setCurrentActive((this.currentIndex + 1) % this.list.length)
      }, 5000)
    },
    stopAutoPlay() {
      clearInterval(this.playTimer)
    },
    // 手指开始触摸事件
    onTouchStart(e) {
      this.stopAutoPlay()
      this.startX = e.targetTouches[0].clientX
    },
    // 手指开始移动
    onTouchMove(e) {
      const delta = -(e.targetTouches[0].clientX - this.startX)
      this.setTranslateOffset(this.currentIndex, delta)
    },
    // 结束触摸
    onTouchEnd(e) {
      const threshold = this.bannerWidth / 3
      const delta = -(e.changedTouches[0].clientX - this.startX)
      const offset = (delta / Math.abs(delta)) * +(Math.abs(delta) > threshold)
      this.setCurrentActive(this.currentIndex + offset)
      this.startAutoPlay()
    },
    onResize() {
      this.bannerWidth = this.$el.clientWidth
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    this.stopAutoPlay()
  },
}
</script>
<style lang="scss" scoped>
.mt-swipe {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.mt-swipe-wrapper {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
}

.mt-swipe-item {
  height: 100%;
}

.swipe-dot {
  width: 100%;
  position: absolute;
  bottom: 8%;
  display: flex;
  justify-content: center;

  span {
    width: 2.67rem;
    height: 2.67rem;
    background: rgba(255, 255, 255, 0.5);
    margin: 0 5px;
    border-radius: 50%;
  }
  .active {
    background: #fff;
  }
}
</style>
