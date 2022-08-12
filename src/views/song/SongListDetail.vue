<template>
  <list-detail
    :list="playlist"
    :title="title"
    :dynamic="dynamic"
    :songData="songsData"
  ></list-detail>
</template>
<script>
import ListDetail from '@/components/song/ListDetail.vue'
import {
  getSongListDetail,
  getSongTrack,
  getPlayListDetail,
} from '@/api/playlist'
export default {
  components: { ListDetail },
  name: 'SongListDetail',
  data() {
    return {
      dynamic: undefined,
      songsData: undefined,
      playlist: undefined,
    }
  },
  computed: {
    list() {
      return this.$route.params.list
    },
    title() {
      return this.$route.query.title
    },
    id() {
      return this.$route.query.id
    },
  },
  async created() {
    this.loadData()
    this.getPlayListDetail()
    this.loadSongList()
  },
  methods: {
    async loadData() {
      try {
        const data = await getSongListDetail(this.id)
        this.dynamic = data
      } catch (e) {
        console.error(e)
      }
    },
    async loadSongList() {
      try {
        const data = await getSongTrack(this.id)
        this.songsData = data
      } catch (e) {
        console.error(e)
      }
    },
    async getPlayListDetail() {
      try {
        const data = await getPlayListDetail(this.id)
        this.playlist = data.playlist
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
