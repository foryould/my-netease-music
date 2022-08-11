<template>
  <div class="mt-button">
    <button
      @click="onClick"
      class="button button-normal"
      :class="[
        type ? `button-${type}` : '',
        round ? `button-round` : '',
        size ? `button-${size}` : '',
        plain ? 'button-plain' : '',
      ]"
      :disabled="disabeld"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  name: 'MtButton',
  props: {
    size: {
      type: String,
    },
    disabeld: {
      type: Boolean,
      default: () => false,
    },
    type: {
      type: String,
    },
    plain: {
      type: Boolean,
      default: () => false,
    },
    round: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>
<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-block;
  height: 6.4rem;
  font-size: 3.2rem;
  line-height: 1.2;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0 2.67rem;
}

.button-normal {
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
}

.button-primary {
  color: #fff;
  background-color: #07c160;
  border: 1px solid #07c160;
}
.button-danger {
  color: #fff;
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.button-round {
  border-radius: 999px;
}

.button-plain {
  background-color: var(--bg-color);
}
</style>
