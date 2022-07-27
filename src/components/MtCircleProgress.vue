<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="-10 -10 120 120"
  >
    <circle
      cx="50"
      cy="50"
      r="50"
      style="stroke: #e1e1e1; fill: transparent"
      stroke-width="4"
    ></circle>
    <circle
      cx="50"
      cy="50"
      r="50"
      stroke-width="4"
      stroke="#787878"
      fill="transparent"
      stroke-dashoffset="78.5"
      :stroke-dasharray="dasharray"
    />
  </svg>
</template>
<script>
const PERIMETER = Math.PI * 100
export default {
  name: 'MtCircleProgress',
  props: {
    value: {
      type: Number,
      required: true,
      validator: (v) => v >= 0 && v <= 1,
    },
  },
  data() {
    return {}
  },
  computed: {
    dasharray() {
      return `${PERIMETER * this.value} ${PERIMETER - PERIMETER * this.value}`
    },
  },
  methods: {},
}
</script>
