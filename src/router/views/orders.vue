<template>
<Layout>
    <PageHeader :title="title"  />
        <div class="orders">
            <!-- <h1 class="title mb-4">Orders</h1> -->
            
            <div class="row mb-2">

                <div class="col-sm-4">
                <div class="search-box me-2 mb-2 d-inline-block" style="width:100%;">
                  <div class="position-relative">
                    <input type="text" class="form-control" placeholder="Search by Job Number or Job Name" style="border-radius: 0" v-model="search" @keyup="searchit" />
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu" v-if="search.length">
                            <div class="dropdown-content" v-if="jobs && jobs.length">
                                <a v-for="(job, index) in jobs" href="#" class="dropdown-item" @click="searchBy(job.orderId)" >
                                    {{formatOrderId(job.orderId)}} - {{job.name}}
                                </a>
                            </div>
                            <div class="dropdown-content" v-else>
                                <span style="margin-left: 1em;font-style: italic;font-size:12px;">No search results found for {{search}}</span>
                            </div>
                        </div>
                </div>
              </div>
                
              <div class="col-sm-8">
                <div class="text-sm-end">
                  <div class="num-entries" style="float:right;">
                     
                    <label class="col-form-label">Filter</label>
                    <div class="select">
                        <select v-model="dateSelected" class="form-control">
                            <option value="0">Today</option>
                            <option value="1">Yesterday</option>
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>

                    </div>

                    <div class="select">
                        <select v-model="statusSelected" class="form-control" >
                            <option value="">Show all</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                            <option value="new">New</option>
                            <option value="under review">Under Review</option>
                        </select>

                    </div>
                </div>
                  
                </div>
              </div>
              <!-- end col-->
            </div><br>
            

            <h5 class="title is-5" style="font-style:italic;">Results: <span style="font-weight:500;" v-if="orders">{{orders.length}}</span> orders placed</h5><br>

            <div v-for="(order, index) in orders" class="order-list mb-5">
                <div class="grid border" style="background: #efeeee;">
                    <div>
                        <h6 class="title is-6">Order ID</h6>
                        <h4 class="subtitle is-5">{{formatOrderId(order.id)}}</h4>
                    </div>
                    <div>
                        <h6 class="title is-6">Customer Name</h6>
                        <h5 class="subtitle is-5">{{order.Customer.firstName}} {{order.Customer.lastName}}</h5>
                    </div>
                    <div>
                        <h6 class="title is-6">Total Jobs</h6>
                        <h5 class="subtitle is-5" style="padding-left: 2em;">{{order.Jobs.length}}</h5>
                    </div>
                    <div>
                        <h6 class="title is-6">Created On</h6>
                        <h5 class="subtitle is-5">{{format(new Date(order.createdAt), 'MM/DD/YYYY')}}</h5>
                    </div>
                </div>
            
                <div class="grid border job-header" style="border-bottom:0;border-top:0;">
                    <div><h6 class="title is-6">Job ID</h6></div>
                    <div><h6 class="title is-6">Job Name</h6></div>
                    <div><h6 class="title is-6">Job Status</h6></div>
                    <div></div>
                </div>
                
                <div v-for="(job, index) in order.Jobs" >
                    <div v-if="statusSelected == ''  || statusSelected==job.status" class="grid border job-list">
                    <!-- <a @click="openJobEditForm(job,order,formatJobId(index+1))"><span>{{formatOrderId(order.id)}}-{{formatJobId(index+1)}}</span></a>  -->
                    <a href="#" @click="getJob(job.id)"><span>{{formatOrderId(order.id)}}-{{formatJobId(index+1)}}</span></a> 
                    <span>{{job.name}}</span>
                    <span>{{job.status}}</span>
                    </div>
                </div>

            </div>

            <!-- <JobEdit v-on:close="closeJobEditForm()" v-if="visible" v-bind:job="jobSelected"/> -->

            <!--EDIT Job MODAL-->
    <b-modal v-model="showEditModal" id="editJobModal" ref="editJobModal" size="xl" title="Edit Customer" title-class="text-black font-18" body-class="editJobModal" hide-footer hide-header>
        <div class="row editJob" v-if="job">
            <div class="col col-8 p-5" style="background:#F2F5F8;">
                <h3>Job Name : {{job.name}}</h3>
                <p class="mb-5">Job ID : {{job.id}}</p>
               
                <div class="row">
                        
                        <b-tabs pills content-class="mt-5 text-muted">
                        <b-tab active class="border-0">
                            <template v-slot:title>
                            <span class="d-inline-block d-sm-none">
                                <i class="fas fa-home"></i>
                            </span>
                            <span class="d-none d-sm-inline-block">Print Specifications</span>
                            </template>
                            <div class="print-specs p-3">
                                <div class="spec mb-3" v-for="(value,name) in job.printSpecs" >
                                    <span>{{name}}</span> <span>{{value}}</span>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <span class="d-inline-block d-sm-none">
                                    <i class="far fa-user"></i>
                                </span>
                                <span class="d-none d-sm-inline-block">Notes</span>
                            </template>
                            <!--Notes Content-->
<div class="w-100 user-chat">
        <div class="card">

          <div class="chat-users">
            <div class="chat-conversation p-3 max-height-360">
              <simplebar style="max-height: 360px" id="containerElement" ref="current">
                <ul class="list-unstyled">
                  <!-- <li v-for="data of chatMessagesData" :key="data.message" :class="{ right: `${data.align}` === 'right' }"> -->
                  <li v-for="data of job.Notes" :key="data.content" >
                    <div class="conversation-list mb-0">
                        <!-- <span style="float:left" class="m-3">hello</span> -->
                      <div class="ctext-wrap">
                        <div class="conversation-name">Author Name</div>
                        <p>{{data.content}}</p>
                        <p class="chat-time mb-0">
                          {{format(new Date(data.createdAt), 'MM/DD/YYYY')}}
                          <i class="bx bx-time-five align-middle me-1 ms-2"></i>
                          {{format(new Date(data.createdAt), 'HH:mm a')}}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </simplebar>
            </div>
            <div class="p-3 chat-input-section">
              <form @submit.prevent="formSubmit" class="row">
                <div class="col">
                  <div class="position-relative">
                    <!-- <input type="text" v-model="form.message" class="form-control chat-input rounded" placeholder="Enter Message..." :class="{'is-invalid': submitted && $v.form.message.$error,}"/> -->
                    <textarea rows="3" v-model="form.message" class="form-control chat-input rounded" placeholder="Enter Message..." :class="{'is-invalid': submitted && $v.form.message.$error,}"></textarea>
                    <div v-if="submitted && $v.form.message.$error" class="invalid-feedback">
                      <span v-if="!$v.form.message.required">This value is required.</span>
                    </div>
                  </div>
                </div>
                <div class="col-auto mt-3">
                    <a href="#" class="d-none d-sm-inline-block me-2" @click="discardNote()">Discard</a>
                    <button type="submit">
                        <span class="d-none d-sm-inline-block ">Save Note</span>
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
                            <!--End of Notes Content-->
                        </b-tab>
                        
                        </b-tabs>
                   
                </div>
                <!--END OF TABS-->
            </div>
            <div class="col col-4 edit-job-attribute-col pt-5 pb-5 ps-4 pe-4">
                <!-- <div style="width:100%;height:50px;"></div> -->
                <div class="wrapper">
                    <div class="job-attribute mb-4">
                        <span>Status</span>
                         <!-- <span>{{job.status}}</span> -->
                        <select class="form-control" style="width:34%;" v-model="editForm.status" :class="{ sentBg: `${editForm.status}` === 'sent',recBg: `${editForm.status}` === 'received',underBg: `${editForm.status}` === 'under review',canBg: `${editForm.status}` === 'cancelled' }">
                             <option value="new order">New Order</option>
                             <option value="sent">Sent</option>
                             <option value="received">Received</option>
                             <option value="done">Done</option>
                             <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div class="job-attribute mb-4">
                        <span>Customer</span> <span>Name</span>
                    </div>
                    <div class="job-attribute mb-4">
                        <span>Order #</span> <span>{{job.orderId}}</span>
                    </div>
                    <div class="job-attribute mb-4">
                        <span>Order Date</span> <span>11/04/2021 n/a</span>
                    </div>
                    <div class="job-attribute">
                        <span style="margin-bottom: 4em;">Sample Date</span>
                       
                         <!--Sample Date-->
                        <b-form-group class="mb-3" id="sample-date" label="" label-for="sample date" >
                            <input id="date" type="date" class="form-control mb-2" v-model="editForm.sampleDate" :disabled="editForm.isSamplePending" >
                            <input type="checkbox" id="dateCheckbox" name="sampleDate" value="pending" v-model="editForm.isSamplePending">
                            <label for="date" style="margin-left:1em;"> Date pending</label><br>              
                        </b-form-group>
                    </div>
                    <div class="job-attribute">
                        <span style="margin-bottom: 4em;">Due Date</span>
                        <b-form-group class="mb-3" id="due-date" label="" label-for="due date" >
                            <input id="date" type="date" class="form-control mb-2" v-model="editForm.dueDate" :disabled="editForm.isDueDatePending" >
                            <input type="checkbox" id="dateCheckbox" name="dueDate" value="pending" v-model="editForm.isDueDatePending">
                            <label for="date" style="margin-left:1em;"> Date pending</label><br>              
                        </b-form-group>
                    </div>
                </div>
                <div style="text-align:right;">
                    <button type="button" class="btn btn-outline-secondary me-2" @click="$bvModal.hide('editJobModal')">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="editJobForm()">Save</button>
                </div>
            </div>
        </div>
    </b-modal>
        </div>

</Layout>
</template>

<script>
import { required, requiredUnless } from "vuelidate/lib/validators";
import simplebar from "simplebar-vue";
import { chatData, chatMessagesData } from "./data"

// import JobEdit from "../components/JobEdit.vue"
import axios from "../../http-common"
// import router from '../router'
import _ from 'lodash'
// import { format } from 'date-fns'
import {format} from 'date-format-parse'

import { ordersData } from "./data-orders";

import Layout from '../layouts/main'
import PageHeader from '@/components/page-header'

export default {
    page: {
        title: "Orders"
    },
    components:{
        Layout,PageHeader, simplebar
        // JobEdit
    },
    data(){
        return{
        editSubmitform: false,
        editForm: {
            status: '',
            sampleDate: '',
            isSamplePending: '',
            dueDate: '',
            isDueDatePending: '',
        },
        submitted: false,
        form: {
            message: "",
        },
        chatData: chatData,
      chatMessagesData: chatMessagesData,
            job: null,
            title: "Orders",
            items: [
                {
                text: "Ecommerce",
                href: "/",
                },
                {
                text: "Orders",
                active: true,
                },
            ],
            showEditModal: false,
            orders: null,
            jobs:null,
            dateSelected: 30,
            page: 1,
            numOfPages: null,
            next: null,
            prev: null,
            search: '',
            showNewCustomerForm:false,
            format,
            visible:false,
            jobSelected: null,
            statusSelected: ""
        }
    },
    validations: {
        form: {
         message: {required},
        },
        editForm: {
            status: {required},
            sampleDate: {requiredIf: requiredUnless(function(){
                return this.editForm.isSamplePending
            })},
            dueDate: {requiredIf: requiredUnless(function(){
                console.log(this.editForm.isDueDatePending)
                return this.editForm.isDueDatePending
            })},

        },
    },
    methods:{
       editJobForm() {
            this.editSubmitform = true;
            this.$v.editForm.$touch();
            if (this.$v.editForm.$invalid) {
                console.log("invalid")
                return;
            } else {
                axios.put(`/jobs/${this.job.id}`,{
                    status: this.editForm.status,
                    sampleDate: this.editForm.isSamplePending? "pending":this.editForm.sampleDate,
                    dueDate: this.editForm.isDueDatePending? "pending":this.editForm.dueDate
                })
                .then(response=>{
                    this.getOrders()
                    this.$refs['editJobModal'].hide()
                }).catch(error=>{
                    console.log(error)
                })  
            }


        },
        discardNote(){
            this.form = {}
            this.submitted = false
        },
        handleScroll() {
      if (this.$refs.current.$el) {
        setTimeout(() => {
          this.$refs.current.SimpleBar.getScrollElement().scrollTop =
            this.$refs.current.SimpleBar.getScrollElement().scrollHeight + 1500;
        }, 500);
      }
    },
    formSubmit(e) {

        this.submitted = true
        // stop here if form is invalid
        this.$v.form.$touch();

        if (this.$v.form.$invalid) {
            return;
        } else {
            const content = this.form.message
            const currentDate = new Date()
            axios.post("/notes",{
                content,
                jobId:  this.job.id
            })
            .then(response=>{
                this.job.Notes.push({
                    createdAt:currentDate,
                    content
                })
                this.handleScroll();
            }).catch(error=>{
                console.log(error)
            })
        }

        this.submitted = false;
        this.form = {};
    },
        getJob(id){
            axios.get(`/jobs/${id}`)
            .then(response=>{
                this.job = response.data
                this.editForm.status = response.data.status
                this.setSampleDate(response.data.sampleDate)
                this.setDueDate(response.data.dueDate)
                this.showEditModal = true
            }).catch(error=>{
                console.log(error)
            })
            
        },
        setDueDate(date){
            if(date === "pending"){
                this.editForm.isDueDatePending = true
                this.editForm.dueDate = ''
            }else{
                this.editForm.isDueDatePending = false
                this.editForm.dueDate = date
            }
        },
        setSampleDate(date){
            if(date === "pending"){
                this.editForm.isSamplePending = true
                this.editForm.sampleDate = ''
            }else{
                this.editForm.isSamplePending = false
                this.editForm.sampleDate = date
            }
        },
       closeJobEditForm(){
           console.log("closeJobEditForm")
           this.visible = false
       },
        openJobEditForm(job,order,indexOfJob){
            console.log(order)
            console.log(job)
            this.visible = true
            this.jobSelected = {...job,order,indexOfJob}
            // document.getElementById('createCustomerForm').classList.add('is-active')
        },
        searchBy(id){
            axios.get(`/orders/${id}`)
                .then(response=>{
                    this.jobs = null
                    this.search = ''
                    this.orders = []
                    this.orders.push(response.data)
                }).catch(error =>{
                    console.log(error)
                })

        },

        formatOrderId(id){
            return String(id).padStart(8,'0')
        },
        formatJobId(id){
            return String(id).padStart(3,'0')
        },
        searchit: _.debounce(
            function () { 
                this.getJobs()
               
            }, 300
        ),
        close(id){
            let openedEl = document.getElementById(`customer${id}`)
            if(openedEl) openedEl.classList.remove("is-active")
        },
        getJobs(){
            if(this.search == ''){
                this.jobs = null
            }else{
                axios.get(`/jobs?search=${this.search}`)
                .then(response=>{
                    this.jobs = response.data.results
                }).catch(error =>{
                    console.log(error)
                })
            }
            
        },
        getOrders(page){
            axios.get(`/orders?date=${this.dateSelected}`)
            .then(response => {
                this.orders = response.data.results
                
            })
            .catch(error => {
                // handle error
                console.log(error);
                 this.numOfPages = null
                this.orders = null
            })
        },
        openNewCustomerForm(){
            document.getElementById('createCustomerForm').classList.add('is-active')
        }

    },
    watch: {
        dateSelected: function(val) {
            this.getOrders(1)
        },
        page: function(val){
            this.getOrders()
        }
        
    },
    mounted(){
       this.getOrders()
    }
    
}
</script>

<style>
    .orders .grid{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 2fr;
        gap:1em;
    }
   .orders{
       /* margin:40px 3em; */
       padding-bottom:40px;
   }
    .orders .table th{
        text-align: left;
        color: #04162b;
        font-size: 14px;
        padding: 1.2em .75em 0 .75em;
        font-weight:500;
    }
    .orders .table td{
        padding: 1em .75em;
        width:0.1%;
        white-space: nowrap;
        vertical-align: middle;
    }
    .orders .action_bar{
        background: #fcfbfc;
        padding: 1em;
        margin-bottom: 2em;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .orders #dropdown-menu{
        width: 100%;
    }
    .orders .action_bar input{
        padding-left: 2.5em;
    }
    .orders .action_bar input::placeholder{
        color: #a7aab1;
    }
    .orders .action_bar .fa-search{
        font-size: 1.2em;
        position: absolute;
        top: 10px;
        left: 0.5em;
        z-index: 1;
        color:#9499a1;
    }
    .orders .num-entries{
        display: flex;
        align-items: center;
        gap: 0.5em;
        justify-self: flex-end;
    }
    .orders .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .orders .pagination .flex{
        height: 100%;
        align-items: center;
        gap: 0.5em;
    }
    .orders nav.pagination{
        background: #fcfbfc;
        padding:1em;
    }
    .orders .border{
        border:1px solid grey !important;
        padding:1em;
    }
    .order-list .title{
        color:grey;
        text-transform: uppercase;
    }
    .job-header .title{
        color:#333;
        font-weight:600 !important;
    }
    .job-list{
        padding-top:12px;
        padding-bottom:12px;
        border-bottom: 0 !important;
    }
    .order-list{
        border-bottom:1px solid grey !important;
    }
    .orders #dropdown-menu{
        display: block;
        max-height: 500px;
        height: fit-content;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .job-attribute{
        display:flex;justify-content:space-between;
    }
    .editJob .spec{
        display:flex;justify-content:space-between;
    }
    .editJob{
        height:80vh;
        max-height:750px;
        width: 100%;
        margin-left: 0;
    }
    .editJob .nav-pills .nav-link.active{
        background-color: #fff !important;
        color: #333;
        border: 1px solid rgba(238, 241, 244, 1);
    }
    .editJob .print-specs{
        width:100%;
        height:360px;
        background:#fff;
        overflow-y: scroll;
        border:1px dotted #333;
    }
    .max-height-360{
        min-height: 180px !important;
    }
    .editJob .user-chat .card{
        background-color: transparent;
        border-left: 1px solid darkgray;
    }
    .editJob .chat-conversation .conversation-list .ctext-wrap{
        background-color: transparent !important;
    }
    .editJob .chat-input-section .row{
        flex-direction: column !important;
    }
    .editJob .chat-input-section button[type="submit"] {
        border: none;
        background-color: transparent;
    }
    .editJob .chat-input-section button[type="submit"] span{
        color: rgba(54, 203, 131, 1) !important;
    }
    .editJob .chat-input{
        background-color: #fff !important;
    }
    .editJob #containerElement{
        height:200px;
    }
    .editJobModal{
        padding:0 !important;
    }
    .editJob .job-attribute{
        align-items: center;
    }
    .editJob .chat-conversation{
        padding-top: 0!important;
    }
    .edit-job-attribute-col{
        background: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    /* .sentBg{
        background-color: yellow;
    }
    .recBg{
        background-color: orange;
    }
    .underBg{
        background-color: green;
    }
    .canBg{
        background-color: purple;
    } */
</style>