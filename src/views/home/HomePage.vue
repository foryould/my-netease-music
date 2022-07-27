<template>
  <div class="home-page">
    <div class="header">
      <div class="icon-list" @click="showDrawer">
        <icon name="list-v2-full"></icon>
      </div>
      <div class="header-search">
        <icon class="icon-search" name="sousuo"></icon>
        <input v-model="search" placeholder="请输入歌曲" />
      </div>
      <div class="icon-record">
        <icon name="record-sound-full"></icon>
      </div>
    </div>
    <div class="body">
      <div class="discovery-banner">
        <mt-swipe :list.sync="list">
          <template #default="{ item }">
            <img
              :src="item.imageUrl || item.pic"
              style="
                height: 100%;
                width: 95vw;
                margin: 0 auto;
                display: block;
                border-radius: 6px;
              "
            />
          </template>
        </mt-swipe>
      </div>
      <div class="discovery-buttons">
        <div class="discovery-item" v-for="d in discs" :key="d.icon">
          <div class="discovery-icon">
            <img :src="d.iconUrl" />
            <div v-if="d.id === -1" class="date">
              {{ new Date().getDate() }}
            </div>
          </div>
          <div class="discovery-name">{{ d.name }}</div>
        </div>
      </div>
      <div class="recommend">
        <div class="recommend-title">
          <h4>推荐歌单</h4>
          <mt-button round>
            <span class="item">
              <span>更多</span>
              <icon name="xe612" />
            </span>
          </mt-button>
        </div>
        <div class="recommend-songs">
          <div class="recommend-item" v-for="r in recommendSongs" :key="r.id">
            <div class="pic-url">
              <img :src="r.picUrl" />
            </div>
            <div class="recommend-name">{{ r.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-play" v-if="songs">
        <mt-lyric :song="songs"></mt-lyric>
      </div>
      <div class="footer-tab">
        <div
          class="footer-item"
          v-for="f in footers"
          :key="f.icon"
          @click="onSelected(f.icon)"
        >
          <div
            class="footer-icon"
            :class="isSelected === f.icon ? 'is-selected' : ''"
          >
            <icon :name="f.icon"></icon>
          </div>
          <div
            class="footer-name"
            :class="isSelected === f.icon ? 'is-selected-name' : ''"
          >
            {{ f.name }}
          </div>
        </div>
      </div>
    </div>
    <mt-drawer :visible.sync="isShowDrawer"></mt-drawer>
  </div>
</template>
<script>
import MtDrawer from '@/components/MtDrawer.vue'
import MtSwipe from '@/components/MtSwipe.vue'
import MtButton from '@/components/MtButton.vue'
import {
  getDiscoveryIcon,
  getRecommendSongs,
  getBanners,
} from '@/api/discovery'
import { mapMutations, mapState } from 'vuex'
import MtLyric from '@/components/MtLyric.vue'
export default {
  components: { MtDrawer, MtSwipe, MtButton, MtLyric },
  name: 'HomePage',
  data() {
    return {
      search: '',
      isShowDrawer: false,
      isSelected: 'faxian',
      footers: [
        { name: '发现', icon: 'faxian' },
        { name: '播客', icon: 'dianbo01' },
        { name: '我的', icon: 'yinle' },
        { name: '关注', icon: 'wodeguanzhu' },
        { name: '云村', icon: 'entertainmentmark' },
      ],
      list: [],
      discs: [],
      recommendSongs: [],
    }
  },
  computed: {
    ...mapState('playing', ['songs', 'songUrl']),
  },
  async created() {
    this.loadBanners()
    this.loadIcon()
    this.loadRecommendSongs()
  },
  methods: {
    ...mapMutations('playing', ['setPlayDrawer']),
    async loadBanners() {
      try {
        const data = await getBanners()
        this.list = data.banners
      } catch (e) {
        console.error(e)
      }
    },
    async loadIcon() {
      try {
        const icons = await getDiscoveryIcon()
        this.discs = icons.data
      } catch (e) {
        console.error(e)
      }
    },
    async loadRecommendSongs() {
      try {
        const recommendSongs = await getRecommendSongs()
        this.recommendSongs = recommendSongs.recommend
      } catch (e) {
        console.error(e)
      }
    },
    showDrawer() {
      this.isShowDrawer = true
    },
    onSelected(icon) {
      this.isSelected = icon
    },
  },
}
</script>
<style lang="scss" scoped>
.home-page {
  height: 100%;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2em;
    .header-search {
      flex: 1;
      padding: 8px 0px;
      border-radius: 12rem;
      background-color: var(--secondary-bg-color);
      display: flex;
      align-items: center;
      input {
        border: none;
        background-color: transparent;

        &::placeholder {
          color: #ccc;
        }
      }
      .icon-search {
        padding: 0px 2.67rem;
      }
    }
    .icon-list {
      padding-right: 2.67rem;
      font-size: 5.867rem;
    }
    .icon-record {
      padding-left: 2.67rem;
      font-size: 5.867rem;
    }
  }
}

.body {
  flex: 1;
  overflow-y: auto;
}

.footer {
  .footer-tab {
    display: flex;
    justify-content: space-between;
    padding: 3.2rem;
  }

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-icon {
    width: 8.667rem;
    height: 8.667rem;
    font-size: 6rem;
    color: #b0b0b0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-name {
    color: #b0b0b0;
  }

  .footer-play {
    height: 15.22rem;
    padding: 1.2rem 3.2rem;
  }

  .is-selected {
    font-size: 6rem;
    width: 8.667rem;
    height: 8.667rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right top, var(--primary-color), #fff);
    color: #fff;
    border-radius: 50%;
  }

  .is-selected-name {
    color: var(--primary-color);
  }
}

.discovery-buttons {
  display: flex;
  overflow-x: auto;
  padding: 3.73rem 2.67rem;
  background-color: var(--bg-color);
  border-bottom: 1px solid #ccc;
  .discovery-item {
    width: 20%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .discovery-icon {
    width: 13.33rem;
    background-color: #fdf5f5;
    border-radius: 50%;
    height: 13.33rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg)
        saturate(600%) contrast(0.8);
    }
    .date {
      position: absolute;
      font-size: 3.73rem;
      color: #fff;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .discovery-name {
    font-size: 3.2rem;
  }
}

.recommend {
  padding: 3.73rem 2.67rem 0px 2.67rem;
  background: var(--bg-color);
}

.recommend-title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 3.73rem;
}

.recommend-songs {
  display: flex;
  overflow-x: auto;
  padding-bottom: 3.73rem;
}

.recommend-item {
  flex-shrink: 0;
  width: 28vw;
  background-color: var(--bg-color);
  &:not(:first-child) {
    padding-left: 2.67rem;
  }
}

.pic-url {
  img {
    width: 26vw;
    height: 26vw;
    border-radius: 2.67rem;
  }
}

.recommend-name {
  font-size: 3.2rem;
}

.discovery-banner {
  height: 35.2vw;
}
</style>
