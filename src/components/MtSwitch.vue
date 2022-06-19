<template>
  <div
    class="mt-switch"
    :class="checked ? 'van-switch__on' : ''"
    @click="change"
  >
    <div class="mt-switch__node"></div>
  </div>
</template>
<script>
export default {
  name: 'MtSwitch',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    change() {
      this.$emit('change', !this.checked)
    },
  },
}
</script>
<style lang="scss" scoped>
.mt-switch {
  width: 3em;
  height: 1.2em;
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
}

.mt-switch__node {
  position: absolute;
  top: 0;
  left: 0;
  width: 1em;
  height: 1em;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 3px 1px 0 rgb(0 0 0 / 5%);
  transition: transform 0.3s;
}

.van-switch__on {
  background-color: var(--primary-color);

  & .mt-switch__node {
    transform: translateX(2em);
  }
}
</style>
