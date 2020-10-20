import Vue from 'vue'
import Vuex from 'vuex'
import ttt from './modules/games/tic-tac-toe';

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    ttt
  }
})
