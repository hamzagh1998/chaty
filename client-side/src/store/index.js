import Vue from 'vue'
import Vuex from 'vuex'
import RequestHandler from '@/services/request-handler.js'

import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    token: null,
    userData: null,
    messages: null
  },
  mutations: {
    setLoadingStatus(state) {
      state.isLoading = true
    },
    removeLodingStatus(state) {
      state.isLoading = false
    },
    getToken(state) {
      state.token = localStorage.getItem('token')
      if (state.token) {
        state.userData = VueJwtDecode.decode(state.token)
        localStorage.setItem('userData', JSON.stringify(state.userData))
      }
    },
    removeToken(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      state.token = null
      state.userData = null
      state.messages = null
      clearInterval(window.msgInterval)
      clearInterval(window.chatInterval)
    },
    async updateMessageBox(state) {
      clearInterval(window.msgInterval)
      window.msgInterval = setInterval(
        () => { 
          RequestHandler.getHandler('api/box/messages', 'Bearer '+state.token)
            .then(data => {
              if (data) {
                if (!data.error) {
                  state.messages = data.messages.reverse() 
                  state.userData.blockedBy = data.blockedBy
                  localStorage.setItem('userData', JSON.stringify(state.userData))
                }
              }
              state.isLoading = false
            })
          }, 
        3500)
    }
  },
  actions: {
    setLoadingStatus({commit}) {
      commit('setLoadingStatus')
    },
    removeLodingStatus({commit}) {
      commit('removeLodingStatus')
    },
    getToken({commit}) {
      commit('getToken')
    },
    removeToken({commit}) {
      commit('removeToken')
    },
    updateMessageBox({commit}) {
      commit('updateMessageBox')
    }
  },
  getters: {
  },
  modules: {
  }
})
