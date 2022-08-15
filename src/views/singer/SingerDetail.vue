<template>
  <div class="singer-detail">歌手页面</div>
</template>
<script>
import { getSingerDetail } from '@/api/singer'
export default {
  name: 'SingerDetail',
  computed: {
    id() {
      return this.$route.query.id
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const data = await getSingerDetail(this.id)
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
