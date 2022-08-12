<template>
  <div class="play-list">
    <div
      class="play-item"
      v-for="(p, index) in playList"
      :key="index"
      @click="gotoListDetail(p)"
    >
      <div class="cover-img">
        <img :src="p.coverImgUrl" />
      </div>
      <div class="play-info">
        <div class="name" v-html="p.name"></div>
        <div class="play-msg">
          <span class="trackcount">{{ p.trackCount }}首音乐</span>
          <span class="by">by</span>
          <span class="creator">{{ p.creator.nickname }}，</span>
          <span class="playcount">播放{{ p.playCount | numberFormat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayList',
  props: {
    playList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    gotoListDetail(p) {
      this.$router.push({
        name: 'SongListDetail',
        params: {
          list: p,
        },
        query: {
          id: p.id,
          title: '歌单',
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.play-item {
  height: 50px;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2.67rem;
  }
}

.cover-img {
  height: 100%;
  margin-right: 2.67rem;

  img {
    height: 100%;
    border-radius: 1.2rem;
  }
}
.name {
  font-size: 16px;
}
.play-msg {
  margin-top: 1.2rem;
  color: #aaa;
  font-size: 12px;

  .by {
    margin: 0 1.67rem;
  }
}
</style>
