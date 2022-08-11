<template>
  <div class="mt-search">
    <div class="back-icon">
      <icon name="changyongicon-1"></icon>
    </div>
    <div class="search-input">
      <icon class="icon-search" name="sousuo"></icon>
      <input v-model="search" placeholder="请输入歌曲" clearable />
    </div>
    <div class="search-button" v-if="searchButtonable">
      <span>搜索</span>
    </div>
  </div>
</template>
<script>
import Icon from './Icon.vue'
export default {
  components: { Icon },
  name: 'MtSearch',
  props: {
    value: {
      type: String,
    },
    searchButtonable: {
      type: Boolean,
    },
    searchInputWidth: Number,
  },
  data() {
    return {
      search: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.mt-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-icon {
  font-size: 6.2rem;
}

.search-input {
  flex: 1;
  background-color: #f6f6f6;
  padding: 3rem 2.2rem;
  border-radius: 26rem;

  input {
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 10px;

    &::placeholder {
      color: #ccc;
    }
  }
}

.search-button {
  margin-left: 2.67rem;
  font-size: 4.5rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
