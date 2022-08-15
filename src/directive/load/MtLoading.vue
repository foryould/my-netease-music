<template>
  <div class="mt-loading" v-if="visible">
    <div class="loading-box">加载中...</div>
  </div>
</template>
<script>
export default {
  name: 'MtLoading',
  data() {
    return {
      visible: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.mt-loading {
  position: relative;
}
</style>
