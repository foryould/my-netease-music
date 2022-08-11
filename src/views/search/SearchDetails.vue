<template>
  <div class="search-details" @scroll="onScroll">
    <mt-tabs v-model="active" :tabs="tabs" @change="onClickTab">
      <template #song>
        <song-list v-if="songList" :songList="songList"></song-list>
      </template>
      <template #playlist>
        <play-list v-if="playList" :play-list="playList"></play-list>
      </template>
      <template #singer>
        <singer-list v-if="singerList" :singer-list="singerList"></singer-list>
      </template>
      <template #album>
        <album-list
          v-if="albumList"
          :album-list="albumList"
          :search="search"
        ></album-list>
      </template>
    </mt-tabs>
    <div ref="refreshText" class="refreshText"></div>
  </div>
</template>
<script>
import MtTabs from '@/components/MtTabs.vue'
import SongList from './SongList.vue'
import PlayList from './PlayList.vue'
import { getsearchContent } from '@/api/search'
import SingerList from './SingerList.vue'
import AlbumList from './AlbumList.vue'
export default {
  name: 'SearchDetails',
  props: {
    search: String,
  },
  components: { MtTabs, SongList, PlayList, SingerList, AlbumList },
  data() {
    return {
      active: 'song',
      tabs: [
        { title: '单曲', name: 'song', type: 1 },
        { title: '歌单', name: 'playlist', type: 1000 },
        { title: '歌手', name: 'singer', type: 100 },
        { title: '专辑', name: 'album', type: 10 },
      ],
      songList: [],
      playList: [],
      singerList: [],
      albumList: [],
      loading: false,
      limit: 30,
      page: 1, // 页数
      flag: false,
    }
  },
  created() {
    this.loadSongListData()
  },
  methods: {
    async loadSongListData() {
      const type = this.tabs.find((t) => t.name === this.active).type
      const offset = (this.page - 1) * this.limit
      this.loading = true
      try {
        const data = await getsearchContent(
          this.search,
          type,
          this.limit,
          offset
        )
        if (
          data.result.songCount === 0 ||
          data.result.playlistCount === 0 ||
          data.result.artistCount === 0 ||
          data.result.albumCount === 0
        ) {
          this.flag = true
          this.$refs.refreshText.innerHTML = ''
        }
        const p = data.result.playlists?.map((p) => {
          p.name = p.name.replaceAll(
            this.search,
            `<span style="color: #92AFCD">${this.search}</span>`
          )
          return p
        })
        this.playList.push(...(p || []))
        const s = data.result.artists?.map((s) => {
          s.name = s.name.replaceAll(
            this.search,
            `<span style="color: #92AFCD">${this.search}</span>`
          )
          return s
        })
        this.singerList.push(...(s || []))
        this.albumList.push(...(data.result.albums || []))
        this.songList.push(...(data.result.songs || []))
        this.$refs.refreshText.innerHTML = ''
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    onClickTab(t) {
      this.page = 1
      this.songList = []
      this.playList = []
      this.singerList = []
      this.albumList = []
      this.active = t.name
      this.loadSongListData()
    },
    onScroll(e) {
      let clientHeight = e.target.clientHeight
      let scrollTop = e.target.scrollTop
      let scrollHeight = e.target.scrollHeight
      if (clientHeight + scrollTop >= scrollHeight - 100) {
        this.$refs.refreshText.innerHTML = '加载中...'
        if (!this.loading && !this.flag) {
          this.page++
          this.loadSongListData()
        }
      }
    },
  },
  watch: {
    search(v) {
      if (v) {
        this.loadSongListData()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.search-details {
  height: 100%;
  overflow-y: auto;
  padding: 0 3.2rem 3.2rem 3.2rem;
}

.refreshText {
  text-align: center;
}
</style>
