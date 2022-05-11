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
                    <a href="#"><span>{{formatOrderId(order.id)}}-{{formatJobId(index+1)}}</span></a> 
                    <span>{{job.name}}</span>
                    <span>{{job.status}}</span>
                    </div>
                </div>

            </div>

            <!-- <JobEdit v-on:close="closeJobEditForm()" v-if="visible" v-bind:job="jobSelected"/> -->
        </div>

</Layout>
</template>

<script>
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
        Layout,PageHeader
        // JobEdit
    },
    data(){
        return{
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
    methods:{
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
</style>