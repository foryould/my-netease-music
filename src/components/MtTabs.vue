<template>
  <div class="mt-tabs">
    <div class="tab-items">
      <div class="item" v-for="t in tabs" :key="t.name" @click="onTabClick(t)">
        <span class="tab-text">{{ t.title }}</span>
        <span :class="active === t.name ? 'is-active' : ''"></span>
      </div>
    </div>
    <div
      class="tab-content"
      v-for="t in tabs"
      :key="t.name"
      v-show="active === t.name"
    >
      <slot :name="t.name" :tab="t"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MtTabs',
  model: {
    prop: 'active',
    event: 'change',
  },
  props: {
    active: {
      type: String,
    },
    tabs: Array,
  },
  data() {
    return {}
  },
  methods: {
    onTabClick(t) {
      this.$emit('change', t)
    },
  },
}
</script>
<style lang="scss" scoped>
.tab-items {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: var(--bg-color);
}

.tab-text {
  color: var(--secondary-text-color);
}

.tab-content {
  margin-top: 2.67rem;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.is-active {
  width: 100%;
  height: 1rem;
  border-radius: 2.67rem;
  background-color: var(--primary-color);
}
</style>
