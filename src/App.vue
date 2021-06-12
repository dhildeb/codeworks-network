<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 p-0">
          <Login />
        </div>
        <div class="col-8">
          <router-view />
        </div>
        <div class="col-2 d-flex flex-column">
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
      sidePicsService.getSidePics()
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

</style>
