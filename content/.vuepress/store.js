import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navbarLogo: null
  },
  mutations: {
    setNavbarLogo (state, navbarLogo) {
      state.navbarLogo = navbarLogo
    }
  },
  actions: {

  }
})
