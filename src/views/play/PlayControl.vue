<template>
  <div class="play-control">
    <div class="control-rods"></div>
    <mt-disc :imgUrl="song.al.picUrl" v-if="song" />
    <div class="play-others">
      <div class="icon-item" v-for="i in playicon" :key="i.icon">
        <icon :name="i.icon"></icon>
      </div>
    </div>
  </div>
</template>
<script>
import MtDisc from '@/components/MtDisc.vue'
export default {
  components: { MtDisc },
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
    }
  },
  async mounted() {},
}
</script>
<style lang="scss" scoped>
.play-control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
