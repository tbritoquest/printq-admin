<script>
import Swal from 'sweetalert2'
import _ from 'lodash'
import Layout from '../layouts/main'
import PageHeader from '@/components/page-header'

import { required } from "vuelidate/lib/validators";

import { customersData } from "./data-customers";
import appConfig from "@/app.config";
import axios from '../../http-common'

/**
 * Customers component
 */
export default {
  page: {
    title: "Customers",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      limit: 10,
      numOfPages: null,
      next: null,
      prev: null,
      pageNum: 1,
      search: '',
      customersData: null,
      title: "Customers",
      items: [
        {
          text: "",
          href: "",
        },
        {
          text: "",
          active: false,
        },
      ],
      showModal: false,
      showEditModal:false,
      editSubmitted: false,
      submitted: false,
      customers: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: ""
      },
      customer: null
    }
  },
  validations: {
      customers: {
        firstName: { required },
        lastName: { required },
        phone: { required },
        email: { required },
        address: { required },
      },
      customer:{
        firstName: {required}, 
        lastName: {required}, 
        phone: {required}, 
        email: {required}, 
        address: {required}
      }
    
  },
  methods: {
    setCustomer(customerObj){
      this.customer =  Object.assign({}, customerObj)
    },
    handleNext(){
      this.pageNum = this.next.page
    },
    handlePrevious(){
      this.pageNum = this.prev.page
    },
    searchit: _.debounce(
            function () { 
                this.pageNum = 1
                this.getCustomers()
            }, 300
    ),  
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleEditSubmit(e) {
      this.editSubmitted = true
      // stop here if form is invalid
      this.$v.customer.$touch();
      
      if (this.$v.customer.$invalid) {
        return;
      } else {
        let data = {
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          phone: this.customer.phone,
          address: this.customer.address,
          email: this.customer.email,
          isActive: `${this.customer.isActive? 1:0}`
        }
        axios.put(`/customers/${this.customer.id}`, data)
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

                    this.showEditModal = false
                    this.customer = null

                    this.getCustomers()

                })
                .catch(error => {
                    console.log(error)
                })
      }
      this.editSubmitted = false
    },
    handleSubmit(e) {
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
    getCustomers(pageNum){
      let query = `page=${pageNum || this.pageNum}&limit=${this.limit}&search=${this.search}`

      axios.get(`/customers?${query}`)
      .then(response=>{
          if(pageNum) this.pageNum = 1
          this.numOfPages = response.data.numOfPages
          this.customersData = response.data.results
          this.next = response.data.next
          this.prev = response.data.previous
      }).catch(error=>{
        console.log(error)
        this.numOfPages = null
        this.customers = null
      })
    }
  },
  watch: {
    limit: function(val) {
        this.getCustomers(1)
    },
    pageNum: function(val){
      console.log(val)
        this.getCustomers()
    }
      
  },
  mounted(){
    console.log("customers component")
    this.getCustomers()
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />

    <div class="customers row">
      <div class="col-12">
        <div class="card">
          <div class="card-body" style="min-height:746px;">
            <div class="row mb-2">
                <!--ADD NEW CUSTOMER-->
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                  <div class="text-sm-end">
                    <button type="button" class="btn btn-success btn-rounded mb-2 me-2" @click="showModal = true" >
                      <i class="mdi mdi-plus me-1"></i> New Customers
                    </button>
                    <b-modal v-model="showModal" title="Add New Customer" title-class="text-black font-18" body-class="p-3" hide-footer>
                      <form @submit.prevent="handleSubmit">
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
                  </div>
                </div>
            </div>
            <div class="row mb-2">
              <!--Show x entries-->
              <div class="col-sm-4">
                <div style="display: flex;align-items: baseline;column-gap: 1em;">
                      Select
                      <div class="">
                        <select v-model="limit" class="form-control">
                            <option value=10>10</option>
                            <option value=50>50</option>
                            <option value=100>100</option>
                            <option value=500>500</option>
                            <option value=1000>1000</option>
                        </select>
                      </div>
                  entries
                </div>
                    
              </div>
              <!--Search Bar-->
              <div class="col-sm-6 offset-sm-2">
                <div class="search-box me-2 mb-2 d-inline-block" style="width:100%;">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="Search by name, email, phone" v-model="search" @keyup="searchit"/>
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
              </div>

            </div>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone / Email</th>
                    <th>Address</th>
                    <th>Enabled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-if="customersData && customersData.length">
                  <tr v-for="customerObj in customersData" :key="customerObj.id">
                    
                    <td class="text-capitalize">{{customerObj.firstName}} {{customerObj.lastName}}</td>
                    <td>
                      <p class="mb-1">{{ customerObj.phone }}</p>
                      <p class="mb-0 text-lowercase" >{{ customerObj.email }}</p>
                    </td>
                    <td>{{ customerObj.address }}</td>
                    
                    
                    <td style="padding-left:2em;">
                      <i :class="['mdi mdi-check-circle',customerObj.isActive? 'active':'']" style="font-size:24px;"></i>
                    </td>
                    <td>
                      <b-dropdown class="card-drop" variant="white" right toggle-class="p-0" menu-class="dropdown-menu-end" >
                        <template v-slot:button-content>
                          <i class="mdi mdi-dots-horizontal font-size-18"></i>
                        </template>

                        <b-dropdown-item @click="setCustomer(customerObj);showEditModal=true">
                          <i class="fas fa-pencil-alt text-success me-1"></i>
                          Edit
                        </b-dropdown-item>

                        <b-dropdown-item>
                          <!-- <i class="fas fa-trash-alt text-danger me-1"></i> -->
                          <i class="mdi mdi-cart-arrow-down font-size-18"></i>
                          New Order
                        </b-dropdown-item>
                      </b-dropdown>
                    </td>
                  </tr>
                </tbody>

                <tbody style="height:46vh;min-height: 468px;" v-else>
                    <img src="@/assets/images/customers-clipart.png" alt="clipboard pic" height="150" class="center" />
                </tbody>
              </table>
            </div>
           
            <!-- 1-11 of 1200 pages -->
            <nav class="pagination flex" role="navigation" aria-label="pagination">
                <div>
                  {{numOfPages}} page<span v-if="numOfPages>1">s</span> 
                </div>

                <div class="flex">
                    <span>The page you're on </span>
                    <select class="form-control" v-model="pageNum" style="width:40px;">
                      <option v-for="option in numOfPages" :value="option">{{option}}</option>
                    </select>
                    <a class="page-link" v-if="prev" @click="handlePrevious()" aria-label="Previous" >
                      <i class="mdi mdi-chevron-left"></i>
                    </a>

                    <a class="page-link" v-if="next" @click="handleNext()" aria-label="Next" >
                      <i class="mdi mdi-chevron-right"></i>
                    </a>
                </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!--EDIT CUSTOMER MODAL-->
    <b-modal v-model="showEditModal" title="Edit Customer" title-class="text-black font-18" body-class="p-3" hide-footer>
        <form @submit.prevent="handleEditSubmit" v-if="customer">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="name">First Name</label>
                <input id="name" v-model="customer.firstName" type="text" class="form-control" placeholder="Insert first name" :class="{'is-invalid': editSubmitted && $v.customer.firstName.$error,}" />
                <div v-if="editSubmitted && !$v.customer.firstName.required" class="invalid-feedback">
                  This value is required.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="name">Last Name</label>
                <input id="name"  v-model="customer.lastName" type="text" class="form-control" placeholder="Insert last name" :class="{'is-invalid': editSubmitted && $v.customer.lastName.$error,}" />
                <div v-if="editSubmitted && !$v.customer.lastName.required" class="invalid-feedback">
                  This value is required.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="phone">Phone</label>
                <input id="phone" v-model="customer.phone" type="text" class="form-control" placeholder="Insert phone" :class="{'is-invalid': editSubmitted && $v.customer.phone.$error,}" />
                <div v-if="editSubmitted && !$v.customer.phone.required" class="invalid-feedback" >
                  This value is required.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="email">Email</label>
                <input id="email" v-model="customer.email" type="email"  class="form-control" placeholder="Insert email" :class="{ 'is-invalid': editSubmitted && $v.customer.email.$error, }" />
                <div v-if="editSubmitted && !$v.customer.email.required" class="invalid-feedback" >
                  This value is required.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="mb-3">
                <label for="address">Address</label>
                <input id="address" v-model="customer.address" type="text" class="form-control"  placeholder="Insert address" :class="{ 'is-invalid': editSubmitted && $v.customer.address.$error, }" />
                <div v-if="editSubmitted && !$v.customer.address.required" class="invalid-feedback" >
                  This value is required.
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="form-check form-switch mb-3">
                <label for="isActive">Enable</label>
                <input class="form-check-input" v-model="customer.isActive" type="checkbox" id="flexSwitchCheckDefault" />
              </div>
            </div>
          </div>

          <div class="text-end pt-5 mt-3">
            <b-button variant="light" @click="showEditModal = false">Close</b-button>
            <b-button type="submit" variant="success" class="ms-1" >Save</b-button>
          </div>
        </form>
    </b-modal>

    <!-- end row -->
  </Layout>
</template>

<style scoped>
    .active{
        color: #4ECB71;
    }
    .text-capitalize{
      text-transform: capitalize;
    }
    .text-lowercase{
      text-transform: lowercase;
    }

    .customers .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .customers .pagination .flex{
        height: 100%;
        align-items: center;
        gap: 0.5em;
    }
    .customers nav.pagination{
        background: #fcfbfc;
        padding:1em;
        align-items: center;
    }
    
</style>