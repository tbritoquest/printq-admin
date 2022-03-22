<template>
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
            <p class="help is-danger" v-if="isInvalid('sampleDate')">Please select a date</p>
        </b-form-group>

        <!--Job Name-->
        <b-form-group class="mb-3" id="job-name" label-cols-lg="3" label="Job Name" label-for="job name" :invalid-feedback="invalidJobNameFeedback" :state="jobNameState">
            <b-form-input for="text" v-model="jobName" :state="jobNameState"></b-form-input>
            
        </b-form-group>

        <!--Notes-->
        <b-form-group class="mb-3" id="notes" label-cols-lg="3" label="Notes" label-for="notes" >
            <b-form-textarea id="textarea" placeholder="Enter something..." rows="3" max-rows="6" v-model="notes"></b-form-textarea>
        </b-form-group>

        </div>
    </div>

</template>

<script>
import {format} from 'date-format-parse'

export default {
    data(){
        return {
            orderDate: format(new Date(), 'YYYY-MM-DD'),
            sampleDate: '',
            isSampleDatePending: false,
            checkValidation:false,
            jobName: '',
            notes: ''
        }
    },
    methods: {
         isInvalid(key){
            return false
        },
    },
    computed: {

        jobNameState() {
            return this.checkValidation? this.jobName.length>=4:null
        },
        invalidJobNameFeedback() {
            if (this.jobName.length > 0) {
            return 'Enter at least 4 characters.'
            }
            return 'Please enter something.'
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
        }
       
    },
    mounted(){
    }
}
</script>

<style>

</style>