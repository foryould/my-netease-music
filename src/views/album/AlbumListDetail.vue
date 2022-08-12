<template>
  <list-detail
    :title="title"
    :list="albumData"
    :dynamic="dynamic"
    :songData="songs"
  >
    <template #time="{ time }">
      <div
        class="issue-date"
        v-if="time"
        style="color: var(--secondary-text-color)"
      >
        <span>发行时间：{{ time.publishTime | dateFormat }}</span>
      </div>
    </template>
  </list-detail>
</template>
<script>
import ListDetail from '@/components/song/ListDetail.vue'
import { getAlbumDynamic, getAlbum } from '@/api/album'
export default {
  components: { ListDetail },
  name: 'AlbumListDetail',
  data() {
    return {
      dynamic: undefined,
      albumData: undefined,
      songs: undefined,
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    },
    list() {
      return this.$route.params.list
    },
    id() {
      return this.$route.query.id
    },
  },
  created() {
    this.loadAlbum()
    this.loadDynamicData()
  },
  methods: {
    async loadAlbum() {
      try {
        const data = await getAlbum(this.id)
        this.albumData = data.album
        this.songs = { songs: data.songs }
      } catch (e) {
        console.error(e)
      }
    },
    async loadDynamicData() {
      try {
        const data = await getAlbumDynamic(this.id)
        this.dynamic = data
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.issue-date {
  color: var(--secondary-text-color);
}
</style>
