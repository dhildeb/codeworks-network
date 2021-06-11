<template>
  <div class="col-12 h-100">
    <img class=" img-fluid" :src="pic.square" alt="error">
  </div>
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
img{
  height: 45%;
  width: 45%;
}
</style>
