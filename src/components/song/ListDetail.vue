<template>
  <div class="song-list-detail">
    <div class="song-header">
      <div class="song-header_icon">
        <div class="back-icon" @click="goBack">
          <icon name="xe618"></icon>
        </div>
        <div class="title">
          <span ref="title">{{ title }}</span>
        </div>
        <div class="right-icon">
          <div class="search-icon">
            <icon name="xe606"></icon>
          </div>
          <div class="list-icon">
            <icon name="xe8c4"></icon>
          </div>
        </div>
      </div>
    </div>
    <div class="song-body" @scroll="onScroll">
      <div class="song-header_body">
        <div class="song-header_content" ref="con">
          <div class="content-img">
            <img
              :src="(list && list.coverImgUrl) || (list && list.blurPicUrl)"
            />
            <div class="play-count" v-if="dynamic && dynamic.playCounnt">
              <span>
                <icon name="xea6d"></icon>
              </span>
              <span>{{ dynamic.playCount | countFormat }}</span>
            </div>
          </div>
          <div class="content-info">
            <div class="info">
              <div class="info-title">
                <span
                  v-html="(list && list.name) || (list && list.name)"
                ></span>
              </div>
              <div class="info-creator">
                <div class="img"></div>
                <div class="info-nickname">
                  <span>{{
                    (list && list.creator && list.creator.nickname) ||
                    `歌手：${list && list.artists[0].name}`
                  }}</span>
                </div>
                <mt-button round v-if="!list">
                  <span class="attention">
                    <icon name="xeaf3"></icon>
                    <span>关注</span>
                  </span>
                </mt-button>
              </div>
            </div>
            <div>
              <slot name="time" :time="list"></slot>
              <div style="display: flex; align-items: flex-end">
                <div class="content-desc">
                  <span v-if="list && list.description">{{
                    (list && list.description) || (list && list.description)
                  }}</span>
                  <span>暂无简介</span>
                </div>
                <div style="margin-right: 2.67rem">
                  <icon name="xe612" style="color: #fff"></icon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="song-header_msg" v-if="dynamic">
          <div class="count">
            <icon name="xe633"></icon>
            <span>{{
              dynamic.bookedCount || dynamic.subCount | countFormat
            }}</span>
          </div>
          <div class="count">
            <icon name="xe635"></icon>
            <span>{{ dynamic.commentCount | countFormat }}</span>
          </div>
          <div class="count">
            <icon name="xe602"></icon>
            <span>{{ dynamic.shareCount | countFormat }}</span>
          </div>
        </div>
      </div>

      <div class="body_header" v-if="songData">
        <span style="font-size: 22px; margin-right: 6px">
          <icon name="bofang-copy"></icon>
        </span>
        <span style="font-size: 18px">播放全部</span>
        <span
          style="margin-left: 4px; font-size: 12px; color: var(--border-color)"
          >{{ `(${songData.songs.length})` }}</span
        >
      </div>
      <song-list v-if="songData" :songList="songData.songs">
        <template #index="{ index }">
          <div class="song-index">
            <span>{{ index + 1 }}</span>
          </div>
        </template>
      </song-list>
    </div>
    <div class="song-footer">
      <mt-lyric />
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import MtButton from '@/components/MtButton.vue'
import SongList from '@/views/search/SongList.vue'
export default {
  components: { Icon, MtButton, SongList },
  name: 'ListDetail',
  props: {
    list: {
      type: Object,
    },
    title: String,
    dynamic: Object,
    songData: {
      type: Object,
    },
  },
  computed: {},
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'SearchPage',
        params: {
          isShowPage: 'searchDetail',
        },
      })
    },
    onScroll(e) {
      if (e.target.scrollTop >= this.conHeight) {
        this.$refs.title.innerHTML = this.list.name
      } else {
        this.$refs.title.innerHTML = this.title
      }
    },
    onResize() {
      this.conHeight = this.$refs.con.clientHeight
    },
  },
}
</script>
<style lang="scss" scoped>
.song-list-detail {
  height: 100%;
  display: flex;
  flex-direction: column;

  &::v-deep {
    .button-normal {
      background-color: #41424a;
      border: none;
      color: #fff;
    }
  }
}

.song-header {
  background-color: #232c28;
  padding: 2.67rem;

  .song-header_icon {
    color: #fff;
    display: flex;
    justify-content: space-between;

    i {
      font-size: 22px;
    }
  }

  .back-icon {
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 18px;
  }
  .right-icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .search-icon {
      padding-right: 20px;
    }
  }
}

.song-header_body {
  position: relative;
}

.song-header_content {
  display: flex;
  background-color: #232c28;
  padding: 2.67rem;
  height: 150px;
}

.content-info {
  flex: 1;
  overflow: hidden;
  height: 100px;
  padding-left: 2.67rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.content-desc {
  color: var(--secondary-text-color);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-creator {
  display: flex;
  align-items: center;
  margin-top: 2.67rem;
}

.content-img {
  width: 100px;
  height: 100px;
  position: relative;

  img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
}

.play-count {
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: #585c69;
  color: #fff;
  font-size: 12px;
  padding: 0.2rem;
  border-radius: 4px;

  i {
    font-size: 12px;
  }
}

.info-title {
  font-size: 16px;
  color: #fff;
}

.info-nickname {
  color: var(--secondary-text-color);
  margin-right: 2rem;
}

.attention {
  display: flex;
  align-items: center;

  i {
    line-height: initial;
  }
}

.song-header_msg {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  width: 86%;
  background-color: #eee;
  position: absolute;
  bottom: -20px;
  left: 50%;
  border-radius: 40px;
  transform: -50%;
  transform: translateX(-50%);
  font-size: 16px;
  z-index: 2;

  i {
    font-size: 18px;
  }

  .count {
    flex: 1;
    text-align: center;

    span {
      margin-left: 1.67rem;
    }

    &:not(:last-child) {
      border-right: 1px solid #dcdcdd;
    }
  }
}

.song-body {
  &::v-deep {
    .list-item {
      border: none;
    }
    .song-list {
      padding: 0 2.67rem;
    }
  }
  flex: 1;
  overflow-y: auto;

  .body_header {
    display: flex;
    align-items: center;
    padding: 30px 10px 0px 10px;
    position: sticky;
    top: -30px;
    background-color: #fff;
  }
}

.song-index {
  margin-right: 2.67rem;
  font-size: 20px;
  color: #ccc;
}
</style>
