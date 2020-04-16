import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const type = {
  AUTHENTICATED:'SET_AUTHENTICATED',
  USER:'SET_USER'
}


const state = {
  Authenticated:false,
  user:{}
}
const getters = {
  getAuthenticated: state =>{
    return state.Authenticated
  },
  getUser: state =>{
    return state.user
  } 
}

//同步
const mutations = {
  [type.AUTHENTICATED](state,authenticated){
    state.Authenticated = authenticated
  },
  [type.USER](state,user){
    state.user = user
  },
  clear(state){
    state.user = {}
    state.Authenticated = false
  }
}


//异步
const actions = {
  setAuthenticated({commit},authenticated){
      commit('SET_AUTHENTICATED',authenticated)
  },
  setUser({commit},user){
    commit('SET_USER',user)
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
