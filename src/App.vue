<template>
  <header class="sticky-top">
  </header>
  <main>
    <div class="container-fluid bg-white">
      <div class="row">
        <div class="col-2 p-0 stick-l d-none d-lg-block" v-if="state.account.id">
          <Login />
        </div>
        <div class="col bg-light">
          <div class="row">
            <Navbar />
          </div>
          <div class="row">
            <div class="col-lg-10">
              <router-view />
            </div>
            <div class="col-2 d-flex flex-column stick-r d-none d-lg-block">
              <SidePics class="d-none d-lg-block" v-for="pic in state.sidePics" :key="pic.title" :pic="pic" />
            </div>
          </div>
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
      account: computed(() => AppState.account),
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
