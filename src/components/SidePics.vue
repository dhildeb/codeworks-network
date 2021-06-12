<template>
  <img class="img-fluid my-3" :src="pic.square" alt="ad here">
</template>

<script>

export default {
  props: { pic: { type: Object, required: true } },
  setup() {
    return {

    }
  }
}
</script>

<style scoped>
</style>
