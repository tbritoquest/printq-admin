import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  //custom
  state:{
    customer: {id: '1',name: 'John Doe', email: 'fake@email.com', address: '123 example lane', phone: '1234567890'}, //id: '1',name: 'John Doe', email: 'fake@email.com', address: '123 example lane', phone: '1234567890' or NULL
    // customer: null, //id: '1',name: 'John Doe', email: 'fake@email.com', address: '123 example lane', phone: '1234567890' or NULL
    isCustomerSignedIn: false,
    jobs: [], //aka "cart"
    user: {id:'1'}
  },  
  mutations:{
    ADD_TO_CART(state, job){
      job.printSpecs = JSON.parse(job.printSpecs)
      state.jobs.push(job)
    }
  },
  actions: {
    addToCart({commit}, payload){
      commit('ADD_TO_CART', payload)
    }
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
})

export default store

