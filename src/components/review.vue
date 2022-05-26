<template>

    <div>
        <b-row>
            <b-col><label class="label">First Name</label></b-col>
            <b-col><label class="label">Last Name</label></b-col>
            <div class="w-100"></div>
            <b-col>{{customer.firstName}}</b-col>
            <b-col>{{customer.lastName}}</b-col>
        </b-row><br>

        <b-row>
            <b-col><label class="label">Address</label></b-col>
            <div class="w-100"></div>
            <b-col>{{customer.address}}</b-col>
        </b-row><br>

        
        <b-row>
            <b-col><label class="label">Email</label></b-col>
            <b-col><label class="label">Phone</label></b-col>
            <div class="w-100"></div>
            <b-col>{{customer.email}}</b-col>
            <b-col>{{customer.phone}}</b-col>
        </b-row><br>
    
        <h6>Project Specs</h6>
        <ul>
            <li v-for="(value,propertyName) in projectInfo">{{propertyName}} : {{value}}</li>
        </ul>

        <hr>

        <b-row>
            <b-col><label class="label">Order Date</label></b-col>
            <b-col><label class="label">Sample Date</label></b-col>
            <b-col><label class="label">Due Date</label></b-col>
            <div class="w-100"></div>
            <b-col v-if="additionalInfo && additionalInfo.orderDate">{{additionalInfo.orderDate}}</b-col>
            <b-col v-if="additionalInfo && additionalInfo.sampleDate">{{additionalInfo.sampleDate}}</b-col>
            <b-col v-if="additionalInfo && additionalInfo.dueDate">{{additionalInfo.dueDate}}</b-col>
        </b-row><br>

        <b-row>
            <b-col><label class="label">Job Name</label></b-col>
            <div class="w-100"></div>
            <b-col v-if="additionalInfo && additionalInfo.jobName">{{additionalInfo.jobName}}</b-col>
        </b-row><br>

        <b-row>
            <b-col><label class="label">Notes</label></b-col>
            <div class="w-100"></div>
            <b-col v-if="additionalInfo && additionalInfo.notes">{{additionalInfo.notes}}</b-col>
        </b-row><br>

    
    </div>
</template>

<script>
export default {
    props: ['projectInfoObj','additionalInfoObj'],
    data(){
        return {
            customer:this.$store.state.customer,
            projectInfo: this.projectInfoObj,
            additionalInfo: this.additionalInfoObj
        }
    }
}
</script>

<style>

</style>