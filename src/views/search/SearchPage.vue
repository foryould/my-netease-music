<template>
  <div
    class="search-page"
    :class="isShowWitch === 'searchRecommend' ? 'is-recommend' : 'is-detail'"
  >
    <div class="search-header">
      <div class="mt-search">
        <div class="back-icon" @click="onBack">
          <icon name="xe618"></icon>
        </div>
        <div class="search-input">
          <icon class="icon-search" name="sousuo"></icon>
          <input
            v-focus
            v-model="search"
            :placeholder="defaultKeywords"
            clearable
            @input="onInput($event)"
            @focus="onFocus"
          />
        </div>
        <div
          class="search-button"
          @click="seek"
          v-if="isShowWitch === 'searchRecommend'"
        >
          <span>搜索</span>
        </div>
      </div>
    </div>
    <div class="search-suggest" ref="sug">
      <template v-if="allMatch">
        <div
          class="sug-item"
          v-for="(s, index) in allMatch"
          :key="index"
          @click.stop="onSugClick(s.keyword)"
        >
          <div class="sug-icon">
            <icon name="xe606"></icon>
          </div>
          <div class="sug-keyword">
            <span class="word" v-html="s.keyword">{{ s.keyword }}</span>
          </div>
        </div>
      </template>
      <div class="empty" v-else>暂无数据</div>
    </div>
    <div class="search-body">
      <search-recommend
        v-show="isShowWitch === 'searchRecommend'"
        :history="historys"
        :recommend="recommend"
        :searchType="searchTypes"
        @onChange="onChange"
        @clear-search-history="onClearSearchHistory"
      ></search-recommend>
      <search-details
        ref="detail"
        v-if="isShowWitch === 'searchDetail'"
        :search="search"
      ></search-details>
    </div>
    <div class="search-footer">
      <mt-lyric />
    </div>
  </div>
</template>
<script>
import MtLyric from '@/components/MtLyric.vue'
import Icon from '@/components/Icon.vue'
import SearchRecommend from './SearchRecomment.vue'
import SearchDetails from './SearchDetails.vue'
import { getSearchSuggest, getSearchHot, getSearchDetail } from '@/api/search'
import { debounce } from '@/utils/index'
export default {
  components: { MtLyric, Icon, SearchRecommend, SearchDetails },
  name: 'SearchPage',
  data() {
    return {
      search: '',
      isShowWitch: 'searchRecommend',
      musictype: [
        { name: '歌手', icon: 'xe605' },
        { name: '曲风', icon: 'yinle1' },
        { name: '专区', icon: 'xe61b' },
        { name: '识曲', icon: 'xe615' },
      ],
      historys: JSON.parse(localStorage.getItem('h')) || [],
      recommend: [],
      searchTypes: [
        {
          id: 1,
          title: '热搜榜',
          data: [
            { id: 1, name: '许嵩' },
            { id: 2, name: '必杀技' },
            { id: 3, name: '无名之辈' },
            { id: 4, name: '再见莫妮卡' },
            { id: 5, name: '林俊杰' },
            { id: 6, name: '孤勇者' },
            { id: 7, name: '小城夏天' },
            { id: 8, name: ' 告五人' },
            { id: 9, name: 'Hug me' },
          ],
        },
        {
          id: 2,
          title: '话题榜',
          data: [
            { id: 1, name: '网恋' },
            { id: 2, name: '结婚前发现你' },
            { id: 3, name: '怎么看待他' },
            { id: 4, name: '躺平' },
            { id: 5, name: 'yyds' },
            { id: 6, name: '真的爱你' },
            { id: 7, name: '别回头看我' },
            { id: 8, name: '真是疯了' },
            { id: 9, name: '好的呀' },
          ],
        },
      ],
      allMatch: [],
    }
  },
  computed: {
    defaultKeywords() {
      return this.$route.params.defaultKeywords
    },
    isShowPage() {
      return this.$route.params.isShowPage
    },
    isSearch() {
      return this.$route.params.search
    },
    active() {
      return this.$route.params.active
    },
  },
  created() {
    this.onInput = debounce(this.onInput)
    // this.search = this.defaultKeywords
    this.getSearchHot()
    this.getSearchDetail()
    if (this.isShowPage) {
      this.isShowWitch = this.isShowPage
    }
    if (this.isSearch) {
      this.search = this.isSearch
    }
  },
  methods: {
    async getSearchHot() {
      try {
        const data = await getSearchHot()
        this.recommend = data.result.hots
      } catch (e) {
        console.error(e)
      }
    },
    async getSearchDetail() {
      const data = await getSearchDetail()
      console.log(data)
    },
    onBack() {
      this.search = ''
      if (this.isShowWitch === 'searchRecommend') {
        this.$router.push('/')
      } else {
        this.$refs.sug.style.display = 'none'
        this.isShowWitch = 'searchRecommend'
      }
    },
    async seek() {
      if (!this.search) {
        this.search = this.defaultKeywords
      }
      if (!this.search) return
      if (this.historys.indexOf(this.search) === -1) {
        this.historys.unshift(this.search)
      }
      localStorage.setItem('h', JSON.stringify(this.historys))
      this.$refs.sug.style.display = 'none'
      this.isShowWitch = 'searchDetail'
    },
    async onFocus() {
      if (this.search) {
        const data = await getSearchSuggest(this.search, 'mobile')
        this.allMatch = data.result.allMatch?.map((a) => {
          a.keyword = a.keyword.replaceAll(
            this.search,
            `<span style="color: #aaa">${this.search}</span>`
          )
          return a
        })
      }
      if (this.search) {
        this.$refs.sug.style.display = 'block'
      }
    },
    async onInput(e) {
      try {
        if (e.target.value) {
          const data = await getSearchSuggest(e.target.value, 'mobile')
          this.allMatch = data.result.allMatch?.map((a) => {
            a.keyword = a.keyword.replaceAll(
              e.target.value,
              `<span style="color: #aaa">${e.target.value}</span>`
            )
            return a
          })
          this.$refs.sug.style.display = 'block'
        } else if (!e.target.value) {
          this.$refs.sug.style.display = 'none'
          this.isShowWitch = 'searchRecommend'
        }
      } catch (e) {
        console.error(e)
      }
    },
    onChange(h) {
      this.search = h
      this.seek()
      this.isShowWitch = 'searchDetail'
      this.$refs.detail?.loadSongListData()
    },
    onSugClick(keyword) {
      this.search = keyword.replace(/<[^<>]+>/g, '')
      this.$refs.sug.style.display = 'none'
      this.seek()
    },
    onClearSearchHistory() {
      localStorage.removeItem('h')
      this.historys = []
    },
  },
}
</script>
<style lang="scss" scoped>
.search-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.search-header {
  background-color: var(--bg-color);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.search-item {
  display: flex;
  justify-content: space-between;
  margin-top: 2.67rem;

  .item {
    font-size: 4.5rem;
    display: flex;
    align-items: center;
    width: 23.43rem;
    justify-content: center;
    i {
      color: red;
      font-size: 4.5rem;
    }

    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }

  .type-name {
    margin-left: 1.67rem;
  }
}

.search-suggest {
  display: none;
  position: absolute;
  top: 16.67rem;
  bottom: 15.22rem;
  left: 0;
  right: 0;
  background-color: #fff;
  transition: all 0.3s;
  padding: 0 2.67rem;
  z-index: 9999;
}

.search-body {
  flex: 1;
  overflow: hidden;
}

.mt-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-icon {
  font-weight: bold;
  margin-right: 2.67rem;
  color: var(--primary-text-color);
}

.search-input {
  flex: 1;
  background-color: var(--secondary-bg-color);
  padding: 3rem 2.2rem;
  border-radius: 26rem;

  input {
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 10px;

    &::placeholder {
      color: var(--secondary-text-color);
    }
  }
}

.search-button {
  margin-left: 2.67rem;
  font-size: 4.5rem;
  font-family: 'Courier New', Courier, monospace;
}

.is-recommend {
  background-color: var(--secondary-bg-color);
}

.is-detail {
  background-color: var(--bg-color);
}

.sug-item {
  display: flex;
  align-items: center;
}

.sug-icon {
  margin-right: 2.67rem;
  i {
    color: #aaa;
  }
}

.sug-keyword {
  flex: 1;
  border-bottom: 1px solid #eee;
  padding: 2.67rem 0;
}

.empty {
  text-align: center;
}
</style>
