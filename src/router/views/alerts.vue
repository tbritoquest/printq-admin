<script>

import {alerts} from './alertDummyData'
import {format} from 'date-format-parse'
import Swal from 'sweetalert2'
import _ from 'lodash'
import Layout from '../layouts/main'
import PageHeader from '@/components/page-header'

import { required } from "vuelidate/lib/validators";

import appConfig from "@/app.config";
import axios from '../../http-common'

/**
 * Customers component
 */
export default {
    page: {
        title: "Alerts",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: { Layout, PageHeader },
    data() {
        return {
            title: "Alerts",
            createForm:{
                content: ""
            },
            editForm:{
                content: ""
            },
            showCreateForm: false,
            showEditForm: false,
            alerts: alerts,
            format,
            showNewModal: false,
            submitted: false
        }
    },
    validations:{
        createForm: {
            content: {required}
        },
        editForm: {
            content: {required}
        }
    },
    methods: {
        handleCreateForm(e){

            this.submitted = true
            // stop here if form is invalid
            this.$v.createForm.$touch();
            console.log(this.$v.createForm.$invalid)
            if (this.$v.createForm.$invalid) {
                return;
            } else {
                console.log("up to server now")
                this.alerts.push(
                    {
                        id:this.alerts.length+1,
                        text: this.createForm.content,
                        updatedAt: new Date(),
                        enabled: true
                    }
                )
                // const content = this.form.message
                // const currentDate = new Date()
                // axios.post("/notes",{
                //     content,
                //     jobId:  this.job.id
                // })
                // .then(response=>{
                //     this.job.Notes.push({
                //         createdAt:currentDate,
                //         content
                //     })
                //     this.handleScroll();
                // }).catch(error=>{
                //     console.log(error)
                // })

                this.showNewModal = false
                this.createForm = {}
            }

            this.submitted = false
        },
        handleEditForm(){
            console.log("handleEditForm")
        }
    },
    mounted(){
        console.log("alerts component")
    }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />

    <div class="customers row">
      <div class="col-12">
        <div class="card">
          <div class="card-body" style="min-height: 746px;">
            <div class="row mb-2">
                <!--ADD NEW CUSTOMER-->
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                  <div class="text-sm-end">
                    <button type="button" class="btn btn-success btn-rounded mb-2 me-2" @click="showNewModal=true" >
                      <i class="mdi mdi-plus me-1"></i> New Alert
                    </button>
                    <!--New Alert Modal-->
                    <b-modal v-model="showNewModal" title="Add New Alert" title-class="text-black font-18" body-class="p-3" hide-footer>
                        <form @submit.prevent="handleCreateForm">
                            <div class="row">
                                <!-- <div class="col-12">
                                    <div class="mb-3">
                                        <label for="phone">Phone</label>
                                        <input id="phone" v-model="customers.phone" type="text" class="form-control" placeholder="Insert phone" :class="{'is-invalid': submitted && $v.customers.phone.$error,}" />
                                        <div v-if="submitted && !$v.customers.phone.required" class="invalid-feedback" >
                                            This value is required.
                                        </div>
                                    </div>
                                </div> -->
                                <div class="col-md-12">
                                    <b-form-group class="mb-3" label="" label-for="alert-input" >
                                        <b-form-textarea v-model="createForm.content" id="textarea" placeholder="" rows="10" max-rows="10" :class="{'is-invalid': submitted && $v.createForm.content.$error,}" ></b-form-textarea>    
                                        <div v-if="submitted && $v.createForm.content.$error" class="invalid-feedback">
                                            <span v-if="!$v.createForm.content.required">This value is required.</span>
                                        </div> 
                                    </b-form-group>
                                </div>
                            </div>

                            <div class="text-end pt-5 mt-3">
                            <b-button variant="light" @click="showNewModal = false">Close</b-button>
                            <b-button type="submit" variant="success" class="ms-1" >Add Alert</b-button>
                            </div>
                        </form>
                    </b-modal>
                    <!--End of New Alert Modal-->
                  </div>
                </div>
            </div>
        
            <div class="table-responsive" >
              <table class="table table-centered table-nowrap align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Alert</th>
                    <th>Last Updated</th>
                    <th>Enabled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-if="alerts && alerts.length">
                  <tr v-for="(alert,index) in alerts" :key="alert.id">
                    <td>{{index +1}}</td>
                    <td ><div style="max-width:550px; overflow:hidden;text-overflow:ellipsis;">{{alert.text}}</div></td>
                    <td>{{format(alert.updatedAt, 'MM/DD/YYYY hh:mm a')}} </td>
                    <td style="padding-left:2em;">
                      <i :class="['mdi mdi-check-circle',alert.enabled? 'active':'']" style="font-size:24px;"></i>
                    </td>
                    <td>
                      <b-dropdown class="card-drop" variant="white" right toggle-class="p-0" menu-class="dropdown-menu-end" >
                        <template v-slot:button-content>
                          <i class="mdi mdi-dots-horizontal font-size-18"></i>
                        </template>

                        <!-- <b-dropdown-item @click="setCustomer(customerObj);showEditModal=true"> -->
                        <b-dropdown-item @click="">
                          <i class="fas fa-pencil-alt me-1"></i>
                          Edit
                        </b-dropdown-item>

                        <b-dropdown-item>
                          <i class="fas fa-trash-alt me-1"></i>
                          Delete
                        </b-dropdown-item>
                      </b-dropdown>
                    </td>
                  </tr>
                </tbody>

                <tbody v-else>
                    <img src="@/assets/images/alerts2-clipart.png" alt="clipboard pic" height="150" class="center" />
                </tbody>
              </table>
            </div>
    
          </div>
        </div>
      </div>
    </div>


  </Layout>
</template>

<style scoped>
   .active{
        color: #4ECB71;
    }
</style>
