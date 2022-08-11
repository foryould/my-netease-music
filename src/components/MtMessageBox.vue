<template>
  <div v-show="visible" class="message-box__wrapper">
    <div class="message-box__overlay"></div>
    <div class="message-box">
      <div class="message-box__content">
        <slot></slot>
      </div>
      <div class="message-box__actions">
        <button
          v-if="showCancel"
          class="message-box__action-button"
          :class="`message-box__action-${cancelType}`"
          @click="onCancel"
        >
          {{ cancelText }}
        </button>
        <button
          class="message-box__action-button"
          :class="`message-box__action-${confirmType}`"
          @click="onConfirm"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MtMessageBox',
  props: {
    visible: {
      type: Boolean,
    },
    showCancel: {
      type: Boolean,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    cancelType: {
      type: String,
      default: 'default',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    confirmType: {
      type: String,
      default: 'primary',
    },
  },
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
    },
  },
}
</script>
<style lang="scss" scoped>
.message-box__wrapper {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-box__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  // backdrop-filter: grayscale(1);
}

.message-box {
  background-color: var(--bg-color);
  z-index: 2;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  // backdrop-filter: blur(4px);
  min-width: 65vw;
}

.message-box__content {
  padding: 20px;
}

.message-box__actions {
  display: flex;
  border-top: 1px solid var(--border-color);
}

.message-box__action-button {
  flex: 1;
  outline: none;
  background: none;
  border: none;
  padding: 12px 20px;

  & + .message-box__action-button {
    margin-left: 8px;
    border-left: 1px solid var(--border-color);
  }
}

.message-box__action-default {
  color: var(--secondary-text-color);
}
.message-box__action-primary {
  color: var(--primary-color);
}
</style>
