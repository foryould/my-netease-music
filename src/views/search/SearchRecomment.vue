<template>
  <div class="search-recommend">
    <div v-if="history && history.length > 0" class="search-history">
      <div class="history-title">
        <div class="title">历史</div>
        <div class="icon" @click="deleteHistory">
          <icon name="xe621"></icon>
        </div>
      </div>
      <div class="history-content">
        <span
          class="history-item"
          v-for="(h, index) in showWitch"
          :key="index"
          @click="onClickHis(h)"
        >
          <span class="song-name">{{ h }}</span>
        </span>
        <span v-if="history.length > 3" class="unfold" @click="changeState">
          <icon :name="fold ? 'xe6cc' : 'xe603'"></icon>
        </span>
      </div>
    </div>
    <div class="recommend">
      <div class="recommend-title">
        <div class="title">推荐</div>
        <div class="icon" @click="refresh">
          <icon name="xe668"></icon>
        </div>
      </div>
      <div class="recommend-content">
        <span
          class="recommend-item"
          v-for="(r, index) in isRecommend"
          :key="index"
          @click="onClickRec(r)"
        >
          <div class="recommend-name">{{ r.first }}</div>
        </span>
      </div>
    </div>
    <div class="search-types">
      <div class="types card" v-for="t in searchType" :key="t.id">
        <div class="type-title">
          <span class="name">{{ t.title }}</span>
        </div>
        <div class="type-item">
          <div
            class="item"
            :class="index < 3 ? 'top-three' : ''"
            v-for="(d, index) in t.data"
            :key="d.id"
          >
            <span class="tag">{{ index + 1 }}</span>
            <span class="item-name">{{ d.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import dialog from '@/utils/dialog'

export default {
  name: 'SearchRecommend',
  components: { Icon },
  props: {
    history: {
      type: Array,
    },
    recommend: Array,
    searchType: Array,
  },
  data() {
    return {
      fold: true,
      s: 0,
      e: 3,
    }
  },
  computed: {
    showWitch() {
      return this.fold ? this.history.slice(0, 3) : this.history
    },
    isRecommend() {
      return this.recommend.slice(this.s, this.e)
    },
  },
  methods: {
    changeState() {
      this.fold = !this.fold
    },
    onClickHis(h) {
      this.$emit('onChange', h)
    },
    onClickRec(r) {
      this.$emit('onChange', r.first)
    },
    async deleteHistory() {
      try {
        await dialog.confirm('确认清空历史记录吗？')
        this.$emit('clear-search-history')
      } catch {
        // console.log('取消了')
      }
    },
    refresh() {
      this.e += parseInt(this.recommend.length / 3)
      this.s = this.e - 3
      if (this.e > this.recommend.length) {
        this.s = 0
        this.e = 3
        return
      }
      if (this.e === this.recommend.length - 1) {
        this.e = this.e + (this.recommend.length % 3)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.search-recommend {
  height: 100%;
  overflow-y: auto;
  padding: 3.2rem;
}

.history-title,
.recommend-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 5rem;
  font-weight: 600;
}
i {
  color: #aaa;
  font-size: 5rem;
}

.history-item,
.recommend-item,
.unfold {
  display: inline-block;
  background-color: var(--bg-color);
  border-radius: 6.2rem;
  padding: 1.6rem 5.2rem;
  color: var(--secondary-text-color);
  font-size: 4.27rem;
  margin-top: 2.67rem;

  &:not(:last-child) {
    margin-right: 2.67rem;
  }
}

.recommend {
  margin-top: 2.67rem;
}

.search-types {
  display: flex;
  margin-top: 4rem;
  overflow-x: auto;

  .types {
    padding: 2.67rem;
    background-color: var(--bg-color);
    flex: 0 0 53.33rem;

    &:not(:first-child) {
      margin-left: 2.67rem;
    }
  }
  .type-title {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2.67rem;
  }
  .name {
    color: var(--primary-text-color);
    font-size: 4.8rem;
    font-weight: bold;
  }
  .item {
    padding-top: 2.67rem;
    font-size: 4rem;

    .tag {
      margin-right: 2.67rem;
    }
  }
}

.top-three {
  .tag {
    color: var(--primary-color);
    font-weight: 600;
  }
  .item-name {
    font-weight: 600;
  }
}
</style>
