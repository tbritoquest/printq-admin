<template>
    <div style="max-width:1024px;width:100%;margin: 80px auto;">
    
        <form action="#" @submit.prevent="handleSearchForm">
                <div class="row">
                    <div class="col-6">
                        <div class="field">
                            <label class="label" style="font-size:16px;font-weight: normal;">Enter phone number associated with customer’s account.</label><br>
                            <div class="input-group rounded">
                                <input v-model="searchForm.phone" class="form-control border-0" type="text" placeholder="phone" v-bind:class="{ 'is-invalid': searchFormSubmit && $v.searchForm.phone.$error,  }" style="padding-right: 3em;">
                                <button type="submit" id="button-addon2" class="btn btn-primary">
                                    <i class="bx bx-right-arrow-alt" style="font-size:1.5em;"></i>
                                </button>
                                <div v-if="searchFormSubmit && $v.searchForm.phone.$error" class="invalid-feedback">
                                    <span v-if="!$v.searchForm.phone.required">This value is required.</span>
                                    <span v-if="!$v.searchForm.phone.numeric" >This value should be a valid number.</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <br>
                <span class="" v-if="this.error">Could not be found.</span>
                <a href="#" @click="showModal = true"> Create customer account?</a>
        </form>
        <br><br>

       <div v-if="firstName" class="col-6">
           <div class="row mb-4">
               <div class="col-6">
                    <label class="label">First Name</label>
                    <div class="control">
                        {{firstName}}
                    </div>
               </div>
               <div class="col-6">
                   <label class="label">Last Name</label>
                    <div class="control">
                        {{lastName}}
                    </div>
               </div>
           </div>
           <div class="row mb-4">
                <div class="col-6">
                    <label class="label">Email</label>
                    <div class="control">
                        {{email}}
                    </div>
                </div>
                <div class="col-6">
                    <label class="label">Phone</label>
                    <div class="control">
                        {{phone}}
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-12">
                    <label class="label">Address</label>
                    <div class="control">
                        {{address}}
                    </div>
                </div>
            </div>
            
       </div>
        
        <button @click="handleNext" class="button next" type="button" v-if="this.firstName" >NEXT<i class="fas fa-arrow-right" style="margin-left:12px;"></i></button>
    
         <!--ADD NEW CUSTOMER-->
        <b-modal v-model="showModal" title="Add New Customer" title-class="text-black font-18" body-class="p-3" hide-footer>
                <form @submit.prevent="handleAddSubmit">
                    <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                        <label for="name">First Name</label>
                        <input id="name" v-model="customers.firstName" type="text" class="form-control" placeholder="Insert first name" :class="{'is-invalid': submitted && $v.customers.firstName.$error,}" />
                        <div v-if="submitted && !$v.customers.firstName.required" class="invalid-feedback">
                            This value is required.
                        </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                        <label for="name">Last Name</label>
                        <input id="name"  v-model="customers.lastName" type="text" class="form-control" placeholder="Insert last name" :class="{'is-invalid': submitted && $v.customers.lastName.$error,}" />
                        <div v-if="submitted && !$v.customers.lastName.required" class="invalid-feedback">
                            This value is required.
                        </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                        <label for="phone">Phone</label>
                        <input id="phone" v-model="customers.phone" type="text" class="form-control" placeholder="Insert phone" :class="{'is-invalid': submitted && $v.customers.phone.$error,}" />
                        <div v-if="submitted && !$v.customers.phone.required" class="invalid-feedback" >
                            This value is required.
                        </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                        <label for="email">Email</label>
                        <input id="email" v-model="customers.email" type="email"  class="form-control" placeholder="Insert email" :class="{ 'is-invalid': submitted && $v.customers.email.$error, }" />
                        <div v-if="submitted && !$v.customers.email.required" class="invalid-feedback" >
                            This value is required.
                        </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                        <label for="address">Address</label>
                        <input id="address" v-model="customers.address" type="text" class="form-control"  placeholder="Insert address" :class="{ 'is-invalid': submitted && $v.customers.address.$error, }" />
                        <div v-if="submitted && !$v.customers.address.required" class="invalid-feedback" >
                            This value is required.
                        </div>
                        </div>
                    </div>
                    
                    </div>

                    <div class="text-end pt-5 mt-3">
                    <b-button variant="light" @click="showModal = false">Close</b-button>
                    <b-button type="submit" variant="success" class="ms-1" >Add Customer</b-button>
                    </div>
                </form>
                </b-modal>
        <!-- end col-->
    </div>

    
</template>

<script>
import Swal from 'sweetalert2'
import {ref} from 'vue'
import axios from "../http-common"
import {
  required,
  email,
  numeric
} from "vuelidate/lib/validators";

export default {
    data(){
        return{
            showModal: false,
            submitted: false,
            customers: {
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                address: ""
            },
            searchForm:{
                phone: ""
            },
            createForm:{
                firstName   : "",
                lastName    : "",
                address     : "",
                email       : "",
                phone       : "",
            },
            searchFormSubmit : false,
            createFormSubmit : false,
            errors: null,
            firstName: null,
            lastName: null,
            address: null,
            email:null,
            phone: null,
            error: null,
            id: null
        }

    },
    validations:{
        searchForm : {
            phone: {required,numeric}
        },
        createForm : {
            firstName   : {required},
            lastName    : {required},
            address     : {required},
            email       : {required , email},
            phone       : {required},
        },
        customers: {
            firstName   : { required },
            lastName    : { required },
            phone       : { required },
            email       : { required, email },
            address     : { required },
        },
    },
    methods: {
        handleAddSubmit(e) {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.customers.$touch();
            if (this.$v.customers.$invalid) {
                return;
            } else {
                axios.post('/customers', this.customers)
                .then(response => {
            
                    // display success notification
                    const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                            })

                    Toast.fire({
                    icon: 'success',
                    title: 'Saved successfully'
                    })

                    this.showModal = false;
                    this.customers = {};

                })
                .catch(error => {
                    console.log(error)
                })
            }
            this.submitted = false;
        },
        handleSearchForm(e) {
            this.searchFormSubmit = true;
            // stop here if form is invalid
            this.$v.$touch()

            if (this.$v.searchForm.$invalid) {
                return;
            } else {
                this.error = null
                axios.get(`/customers?page=1&limit=1&search=${this.searchForm.phone}`).then(response => {
                    
                    if(response.data.results && response.data.results.length){
                        console.log(response.data.results[0])
                        this.firstName = response.data.results[0].firstName
                        this.lastName = response.data.results[0].lastName
                        this.address = response.data.results[0].address
                        this.email = response.data.results[0].email
                        this.phone = response.data.results[0].phone
                        this.id = response.data.results[0].id
                    }else{
                        this.error = error
                    }
                    
                }).catch(error => {
                    this.error = error
                })
            }

            this.searchFormSubmit = false
        },
        handleSubmit(){
            this.checkForm()
            if(this.errors.size === 0){

                axios.post('/customers/search',{
                    email: this.email
                }).then(response => {
                    
                    this.firstName = response.data.firstName
                    this.lastName = response.data.lastName
                    this.address = response.data.address
                    this.email = response.data.email
                    this.phone = response.data.phone
                    this.id = response.data.id

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
            this.$store.dispatch('signInCustomer',{firstName: this.firstName, lastName: this.lastName, address: this.address, email: this.email, phone: this.phone, id: this.id})
            // this.$emit("logPersonalInfo", {customerId: this.customerId, firstName: this.firstName,lastName: this.lastName,address: this.address,email: this.email,phone: this.phone})
        }
    },
    mounted(){
        // let customer = this.$store.state.customer 
        // this.email =  customer? customer.email:null
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