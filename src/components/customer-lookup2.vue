<template>
<div style="max-width:1024px;width:100%;margin: 80px auto;">
    <!-- <h3 class="title is-3">Personal Info</h3> -->

    <div class="notification is-warning" v-if="this.error">
        Could not be found.<router-link :to="{name: 'Customers'}" > Create customer account?</router-link>
   </div>

    <div class="columns">
        <div class="column ">
                <div class="field">
                    <label class="label">Enter email associated with customer's account.</label>
                    <div class="control email">
                        <input v-model="email" class="input" type="text" placeholder="Email"  v-bind:class="{ 'is-danger': isInvalid('email') }" style="padding-right: 3em;">
                        <i class="far fa-arrow-alt-circle-right" @click="handleSubmit"></i>
                    </div>
                </div>
            </div>
        </div>

        <br><br>

        <div class="customerDetails" v-if="this.firstName">
            <div class="columns">
        <div class="column">
            <label class="label">First Name</label>
            <div class="control">
                {{firstName}}
            </div>
        </div>
        <div class="column">
            <label class="label">Last Name</label>
            <div class="control">
                {{lastName}}
            </div>
        </div>
    </div>


    <div class="columns">
        <div class="column">
            <label class="label">Address</label>
            <div class="control">
                {{address}}
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <label class="label">Email</label>
            <div class="control">
                {{emailInfo}}
            </div>
        </div>
        <div class="column">
            <label class="label">Phone</label>
            <div class="control">
                {{phone}}
            </div>
        </div>
    </div>
  
        </div>
        <button @click="handleNext" class="button next" type="button" v-if="this.firstName" >NEXT<i class="fas fa-arrow-right" style="margin-left:12px;"></i></button>
</div>
</template>

<script>
import {ref} from 'vue'
import axios from "axios"

export default {
    emits: ["logPersonalInfo"],
    data(){
        return{
            errors: null,
            firstName: null,
            lastName: null,
            address: null,
            emailInfo: null,
            email:null,
            phone: null,
            error: null,
            customerId: null
        }

    },
    methods: {

        handleSubmit(){
            this.resetCustomerDetails()
            this.checkForm()
            if(this.errors.size === 0){

                axios.post('/customers/search',{
                    email: this.email
                }).then(response => {
                    
                    this.firstName = response.data.firstName
                    this.lastName = response.data.lastName
                    this.address = response.data.address
                    this.emailInfo = response.data.email
                    this.phone = response.data.phone
                    this.customerId = response.data.id
                }).catch(error => {
                    this.error = error
                })
                
            }
           

        },
        checkForm(){
            this.errors = new Set()
            this.error = null
            if(!this.email){
                this.errors.add("email")
            }else if(!this.validEmail(this.email)){
                this.errors.add("email")
            }

        },
        validEmail(email){
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        isInvalid(key){
            return this.errors && this.errors.has(key)
        },
        resetCustomerDetails(){
            this.errors= null
            this.firstName= null
            this.lastName= null
            this.address= null
            this.phone= null
            this.error= null
            this.emailInfo = null
            this.customerId = null
        },
        handleNext(){
            this.$store.dispatch('signInCustomer')
            this.$emit("logPersonalInfo", {customerId: this.customerId, firstName: this.firstName,lastName: this.lastName,address: this.address,email: this.email,phone: this.phone})
        }
    },
    mounted(){
        let customer = this.$store.state.customer 
        console.log("Customer lookup component mounted.")
        console.log("Customer: ", customer)
        this.email =  customer? customer.email:null
    }
 
}
</script>

<style scoped>
    i.fa-arrow-alt-circle-right{
        position: absolute;
        top: 0.35em;
        right: 0.5em;
        font-size: 1.5em;
        color: #625e5e;
        cursor: pointer;
    }
    div.email{
        width: 100%;
        max-width: 400px;
    }
</style>