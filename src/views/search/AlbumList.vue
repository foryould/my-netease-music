<template>
  <div class="album-list">
    <div
      class="album-item"
      v-for="(a, index) in albumList"
      :key="index"
      @click="gotoAlbumDetail(a)"
    >
      <div class="blur-pic">
        <img :src="a.blurPicUrl" />
      </div>
      <div class="album-info">
        <div class="album-name">
          <span>{{ a.name }}</span>
          <span style="color: #aaa" v-for="(s, index) in a.alias" :key="index"
            >({{ s }})</span
          >
        </div>
        <div class="album-msg">
          <span
            :class="search === l.name ? 'ar' : ''"
            class="al"
            v-for="l in a.artists"
            :key="l.id"
            >{{ l.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlbumList',
  props: {
    albumList: {
      type: Array,
      required: true,
    },
    search: String,
  },
  methods: {
    gotoAlbumDetail(a) {
      this.$router.push({
        name: 'AlbumListDetail',
        params: {
          list: a,
        },
        query: {
          id: a.id,
          title: '专辑',
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.album-item {
  height: 50px;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2.67rem;
  }

  .blur-pic {
    height: 100%;
    margin-right: 2.6rem;

    img {
      height: 100%;
      border-radius: 1rem;
    }
  }
}
.al {
  color: #aaa;
  font-size: 12px;
  &:not(:last-child)::after {
    content: '/';
  }
}
.ar {
  color: #92afcd;
}

.album-info {
  overflow: hidden;
}

.album-name {
  font-size: 16px;
  margin-bottom: 1rem;
}

.album-msg {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
