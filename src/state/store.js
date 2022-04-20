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
    UPDATE_POST (state, customer) {
      state.customer = customer
    },
    SIGNIN_CUSTOMER(state){
        state.isCustomerSignedIn = true
    },
    ADD_TO_CART(state, job){
        job.printSpecs = JSON.parse(job.printSpecs)
        state.jobs.push(job)
    },
    REMOVE_JOB(state, index){
      state.jobs.splice(index,1)
    },
    PLACE_ORDER(state){
        axios.post('orders/', {
            agentId: state.user.id,
            customerId: state.customer.id,
            jobs: state.jobs
          })
          .then(response =>{
            state.customer = {}
            state.isCustomerSignedIn = false 
            state.jobs = []
            router.push('orders')
          })
          .catch(error => {
            console.log(error)
          });
    },
    RESET_CUSTOMER(state){
        state.customer = {}
        state.isCustomerSignedIn = false
        state.jobs =  []
    },
    EDIT_JOB(state,obj){
      console.log("Job",obj.job)
      console.log("Index",obj.index)
    
      state.jobs[obj.index] = obj.job
    }
  },
  actions: {
    resetCustomer({commit}){
      commit('RESET_CUSTOMER')
    },
    updateCustomer ({ commit }, payload) {
        commit('UPDATE_POST', payload)
    },
    signInCustomer({commit}){
        commit('SIGNIN_CUSTOMER')
    },
    addToCart({commit}, payload){
        commit('ADD_TO_CART', payload)
    },
    removeJob({commit}, payload){
        commit('REMOVE_JOB', payload)
    },
    editJob({commit},payload){
      commit('EDIT_JOB', payload)
    },
    placeOrder({commit}){
        commit('PLACE_ORDER')
    }
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
})

export default store

