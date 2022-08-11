import MtMessageBox from '@/components/MtMessageBox.vue'
import Vue from 'vue'

import './styles.scss'

let vm
let promise

function confirm(text) {
  if (!vm) {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const app = new Vue({
      data() {
        return {
          text: '',
          visible: false,
        }
      },
      render(h) {
        return h(
          MtMessageBox,
          {
            ref: 'box',
            props: {
              visible: this.visible,
              showCancel: true,
            },
            on: {
              confirm: () => {
                this.visible = false
                promise && promise.resolve()
                promise = undefined
              },
              cancel: () => {
                this.visible = false
                promise && promise.reject()
                promise = undefined
              },
            },
          },
          [h('div', { staticClass: 'message-box__text' }, [this.text])]
        )
      },
    })

    vm = app.$mount(div)
  }

  vm.text = text
  vm.visible = true

  return new Promise((resolve, reject) => {
    promise = { resolve, reject }
  })
}

export default {
  confirm,
}
