<template>
<!-- <tab-content icon="mdi mdi-cog" title="Additional Info" :before-change="validateAdditionalInfo"> -->
    <div class="row">
        <div class="col-12">
            <!--Order Date-->
            <b-form-group class="mb-3" id="order-date" label-cols-sm="2" label-cols-lg="3" label="Date" label-for="order date" >
                <b-form-input id="date" v-model="orderDate" type="date" disabled></b-form-input>
            </b-form-group>


            <!--Sample Date-->
            <b-form-group class="mb-3" id="sample-date" label-cols-sm="2" label-cols-lg="3" label="Sample Date" label-for="sample date" >
                <b-form-datepicker id="sample-date" class="mb-2" v-model="sampleDate" :min="orderDate" :disabled="isSampleDatePending" :state="sampleDateState"></b-form-datepicker>
                <input type="checkbox" id="dateCheckbox" name="sampleDate" value="pending" v-model="isSampleDatePending">
                <label for="date" style="margin-left:1em;"> Date pending</label><br>              
            </b-form-group>

            <!--Due Date-->
            <b-form-group class="mb-3" id="due-date" label-cols-sm="2" label-cols-lg="3" label="Due Date" label-for="due date" >
                <b-form-datepicker id="due-date" class="mb-2" v-model="dueDate" :min="orderDate" :disabled="isDueDatePending" :state="dueDateState"></b-form-datepicker>
                <input type="checkbox" id="dateCheckbox" name="dueDate" value="pending" v-model="isDueDatePending">
                <label for="date" style="margin-left:1em;"> Date pending</label><br>              
            </b-form-group>

            <!--Job Name-->
            <b-form-group class="mb-3" id="job-name" label-cols-lg="3" label="Job Name" label-for="job name" :invalid-feedback="invalidJobNameFeedback" :state="jobNameState">
                <b-form-input for="text" v-model="jobName" :state="jobNameState"></b-form-input>
                
            </b-form-group>

            <!--Notes-->
            <b-form-group class="mb-3" id="notes" label-cols-lg="3" label="Notes" label-for="notes" >
                <b-form-textarea id="textarea" placeholder="" rows="3" max-rows="6" v-model="notes"></b-form-textarea>
            </b-form-group>
        </div>
    </div>
<!-- </tab-content> -->
</template>

<script>

import {format} from 'date-format-parse'
import { FormWizard, TabContent } from "vue-form-wizard";

export default {
    components: { FormWizard, TabContent},
    data(){
        return {
            orderDate: format(new Date(), 'YYYY-MM-DD'),
            sampleDate: '',
            isSampleDatePending: false,
            dueDate: '',
            isDueDatePending: false,
            checkValidation:false,
            jobName: '',
            notes: '',
        }
    },
    methods: {
        getAdditionalInfo(){
            let sampleDate = this.isSampleDatePending? 'pending':this.sampleDate
            let dueDate = this.isDueDatePending? 'pending':this.dueDate
            return {orderDate:this.orderDate,sampleDate,dueDate,jobName:this.jobName,notes:this.notes}
        },
        validateAdditionalInfo(){
            this.checkValidation = true
            return (this.jobNameState && this.sampleDateState && this.dueDateState)? true : false
        },
        emitInterface() {
            this.$emit("interface", {
                validateAdditionalInfo: () => this.validateAdditionalInfo(),
                getAdditionalInfo: () => this.getAdditionalInfo()
            });
        }
    },
    computed: {

        jobNameState() {
            return this.checkValidation? this.jobName.length>=4 : null
        },
        invalidJobNameFeedback() {
            return this.jobName.length > 0? 'Enter at least 4 characters.' : 'Please enter a job name.'
        },
        sampleDateState(){
            if(this.checkValidation)
                return (this.isSampleDatePending || this.sampleDate) ? true: false
            else
                return null
        },
        dueDateState(){
            if(this.checkValidation)
                return (this.isDueDatePending || this.dueDate) ? true: false
            else
                return null
        },
       
    },
    mounted(){
        this.emitInterface()
    }
}
</script>

<style>
 #sample-date .form-control.is-invalid,
 #sample-date .form-control.is-valid,
 #due-date .form-control.is-invalid,
 #due-date .form-control.is-valid{
     padding-right: 0 !important;
 }
</style>