<template>
  <i
    v-if="unicodeIcon"
    class="icon iconfont unicode-icon"
    v-html="unicodeIcon"
  ></i>
  <svg v-else class="svg-icon icon" aria-hidden="true">
    <use :xlink:href="svgIcon"></use>
  </svg>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    unicodeIcon() {
      if (this.name.match(/^x[a-f0-9]{4}$/)) {
        return `&#${this.name};`
      }
      return undefined
    },
    svgIcon() {
      if (this.unicodeIcon) return undefined
      return `#icon-${this.name}`
    },
  },
}
</script>
<style lang="scss">
.unicode-icon {
  width: 1em;
  height: 1em;
  color: inherit;
}

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
