<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <div class="container-fluid bg-white">
      <div class="row">
        <div class="col-2 p-0 stick-l">
          <Login />
        </div>
        <div class="col-8 bg-light">
          <router-view />
        </div>
        <div class="col-2 d-flex flex-column stick-r">
          <SidePics v-for="pic in state.sidePics" :key="pic.title" :pic="pic" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, reactive, watchEffect } from 'vue'
import { AppState } from './AppState'
import { sidePicsService } from './services/SidePicsService'
export default {
  name: 'App',
  setup() {
    const state = reactive({

      sidePics: computed(() => AppState.sidePics)
    })
    watchEffect(() => {
      try {
        sidePicsService.getSidePics()
        setInterval(() => {
          sidePicsService.getSidePics()
        }, 15000)
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state,
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.stick-r{
  position: fixed;
    right: 0px;
}

</style>
