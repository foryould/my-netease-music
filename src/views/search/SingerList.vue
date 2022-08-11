<template>
  <div class="singer-list">
    <div class="singer-item" v-for="(s, index) in singerList" :key="index">
      <div class="singer-info">
        <div class="imgurl">
          <img :src="s.img1v1Url" />
        </div>
        <div class="singer-name" v-html="s.name"></div>
      </div>
      <mt-button round type="danger" plain>
        <span class="attention">
          <icon name="xe695"></icon>
          <span>关注</span>
        </span>
      </mt-button>
    </div>
  </div>
</template>
<script>
import MtButton from '@/components/MtButton.vue'
import Icon from '@/components/Icon.vue'
export default {
  components: { MtButton, Icon },
  name: 'SingerList',
  props: {
    singerList: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.singer-item {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.67rem 0;
  border-bottom: 1px solid #eee;
}

.singer-info {
  height: 100%;
  display: flex;
  align-items: center;

  .imgurl {
    height: 100%;
    margin-right: 2.67rem;
  }
  img {
    height: 100%;
    border-radius: 50%;
  }
}

.singer-name {
  font-size: 16px;
}

.attention {
  display: flex;
  align-items: center;
  color: var(--primary-color);

  i {
    line-height: initial;
    font-weight: 600;
  }
}
</style>
