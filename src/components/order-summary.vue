<template>
    <div class="card filemanager-sidebar ms-lg-2">
        <div class="card-body">
          <div class="text-center">
            <h5 class="font-size-15 mb-4">Order Summary</h5>
            <!--Customer Info-->
            <div v-if="customer">
              <div class="flex">
                  <span class="text-muted">Name</span>
                  <span class="text-muted">{{getName}}</span>
              </div>
              <div class="flex">
                  <span class="text-muted">Phone</span>
                  <span class="text-muted">{{getPhone}}</span>
              </div>
            </div>
          </div>

            <!--Customer's cart-->
          <img src="@/assets/images/clipboard.jpg" alt="clipboard pic" height="" class="center" v-if="cart && cart.length<1"/>

          <div class="mt-4 cart" v-else>


            <div class="card border shadow-none mb-2" v-for="(job,index) in cart" @click="showModal(job,index);$bvModal.show('edit-job-modal')">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div class="avatar-title rounded bg-transparent text-success font-size-20">
                        <i class="mdi mdi-image"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">{{job.printSpecs["groupName"]}}</h5>
                      <p class="text-muted text-truncate mb-0">{{job.name}}</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">{{job.printSpecs["Runsize"]}}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <!--End of Cart-->

        </div>

        <div style="padding:1em;text-align:center;">
          <button type="button" class="btn btn-primary rounded-pill" v-if="cart && cart.length>0" @click="submitOrder()" >Place Order</button>
        </div>

         <!-- EDIT JOB FORM -->
        <b-modal id="edit-job-modal" size="lg" hide-footer >
          <template #modal-title>
            <b-form-group class="mb-3" id="example text" label-cols-lg="2" label="Job Name" label-for="text" >
              <!--Job Name-->
              <b-form-input for="text" v-model="jobName" :state="jobNameState"></b-form-input>
            </b-form-group>
          </template>
          <div v-if="jobSelected">
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                <!--Order Date-->
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Order Date" label-for="order-date-input" >
                      <p>{{orderDate}}</p>
                    </b-form-group>
                  </div>
                  <!--Sample Date-->
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Sample Date" label-for="sample-date-input" >
                      <!-- <b-form-input id="formrow-email-input" type="date" ></b-form-input> -->
                        <b-form-datepicker id="sample-date" class="mb-2" v-model="sampleDate" :min="orderDate" :disabled="isSampleDatePending" :state="sampleDateState"></b-form-datepicker>
                        <input type="checkbox" id="dateCheckbox" name="sampleDate" value="pending" v-model="isSampleDatePending">
                        <label for="date" style="margin-left:1em;"> Date pending</label><br>        
                    </b-form-group>
                  </div>
                  <!--Due Date-->
                  <!-- <div class="col-md-4">
                    <b-form-group class="mb-3" label="Due Date" label-for="due-date-input" >
                      <b-form-input id="formrow-email-input" type="email" ></b-form-input>
                    </b-form-group>
                  </div> -->
                  
                </div>

                <hr>

                <div class="row">

                  <!--Project Specs-->
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Project Specs" label-for="project-specs" >
                      <ul>
                        <li v-for="(value,propertyName) in jobSelected.printSpecs">{{propertyName}} : {{value}}</li>
                      </ul>
                    </b-form-group>
                  </div>

                  <!--Notes-->
                  <div class="col-md-8">
                    <b-form-group class="mb-3" label="Notes" label-for="notes-input" >
                      <b-form-textarea id="textarea" placeholder="No notes to show" rows="10" max-rows="10" v-model="notes"></b-form-textarea>     
                    </b-form-group>
                  </div>
                
                  
                </div>
                
              </div>
            </div>
          </div>

          <!--Edit Form footer-->
          <div class="text-end mt-3">
            <b-button variant="light" @click="$bvModal.hide('edit-job-modal')" ref="editCancelBtn">Cancel</b-button>
            <b-button type="submit" variant="success" class="ms-1" @click="update()">Update</b-button>
          </div>
        </b-modal>
        <!--END of edit job form-->
    </div>
</template>

<script>

import {format} from 'date-format-parse'
const _ = require('lodash')

export default {
    data(){
        return{
            orderDate: format(new Date(), 'YYYY-MM-DD'),
            customer: null,
            jobSelected: null,
            isSampleDatePending: null,
            sampleDate: null,
            notes: null,
            jobIndex: null,
            jobName: null,
            checkValidation: false,
            isUpdated: false
        }

    },
    methods:{
      submitOrder(){
        this.$router.push('/')
        alert('submitted!')
      },
      isEditJobFormValid(){
        this.checkValidation = true
        return ((this.jobNameState ||this.jobNameState===null) && this.sampleDateState)? true : false
       
      },
      update(){
          if(this.isEditJobFormValid()){
            this.jobSelected.name = this.jobName
            this.jobSelected.sampleDate = this.isSampleDatePending? "pending" : this.sampleDate
            this.jobSelected.notes.notes[0] = this.notes
            //update VueX store
            this.$store.dispatch('editJob', {job: this.jobSelected,index: this.jobIndex})
            this.$refs.editCancelBtn.click()
          }
      },
      showModal(job,index){
        this.jobSelected = job
        this.isSampleDatePending = this.jobSelected.sampleDate === "pending"? true:false
        this.sampleDate = this.jobSelected.sampleDate === "pending"? "":this.jobSelected.sampleDate
        this.notes = this.jobSelected.notes.notes[0]
        this.jobIndex = index
        this.jobName = job.name
      }
    },
    computed:{
      jobNameState() {
        return (this.jobName && this.jobName.length>=4)? null : false
      },
      sampleDateState(){
          if(this.checkValidation){
              if(this.isSampleDatePending || this.sampleDate){
                  return true
              }else{
                  return false
              }
          }else{
              null
          }
      },
      cart:function(){
        return _.cloneDeep(this.$store.state.jobs)
      },
      getName: function(){
        if(this.customer){
          return this.customer.name
        }else{
          return null
        }
      },
      getPhone: function(){
        if(this.customer){
          return this.customer.phone
        }else{
          return null
        }
      }
    },
    mounted(){
      console.log("Order Summary mounted.")
      this.customer = this.$store.state.customer
      // this.cart = this.$store.state.jobs
      
    }
}
</script>

<style>
    .flex{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      height: auto;
    }
    img.center{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    #edit-job-modal .modal-title{
      width: 85%;
      height:40px;
    }
    #edit-job-modal ul{
      list-style: none;
      padding-left: 0;
      height:215px; overflow-y: scroll;
    }
   
</style>