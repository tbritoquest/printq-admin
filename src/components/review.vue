<template>



<div>


    <b-row>
        <b-col><label class="label">First Name</label></b-col>
        <b-col>Last Name</b-col>
        <div class="w-100"></div>
        <b-col>{{firstName}}</b-col>
        <b-col>{{lastName}}</b-col>
    </b-row><br>

    <b-row>
        <b-col><label class="label">Address</label></b-col>
        <div class="w-100"></div>
        <b-col>{{customer.address}}</b-col>
    </b-row><br>

    
    <b-row>
        <b-col><label class="label">Email</label></b-col>
        <b-col>Phone</b-col>
        <div class="w-100"></div>
        <b-col>{{customer.email}}</b-col>
        <b-col>{{customer.phone}}</b-col>
    </b-row><br>

    <!-- <div class="columns">
        <div class="column">
            <label class="label">Address</label>
            <div class="control">
                {{personalInfo.address}}
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <label class="label">Email</label>
            <div class="control">
                {{personalInfo.email}}
            </div>
        </div>
        <div class="column">
            <label class="label">Phone</label>
            <div class="control">
                {{personalInfo.phone}}
            </div>
        </div>
    </div> -->
  
    <h6>Project Specs</h6>
    <ul>
        <li v-for="(value,propertyName) in projectInfo">{{propertyName}} : {{value}}</li>
    </ul>

    <hr>

    <b-row>
        <b-col><label class="label">Order Date</label></b-col>
        <b-col>Sample Date</b-col>
        <div class="w-100"></div>
        <b-col>{{additionalInfo.orderDate}}</b-col>
        <b-col>{{additionalInfo.sampleDate}}</b-col>
    </b-row><br>

     <b-row>
        <b-col><label class="label">Notes</label></b-col>
        <div class="w-100"></div>
        <b-col>{{additionalInfo.notes}}</b-col>
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
    },
    computed:{
        firstName(){
            return this.customer.name.split(' ')[0]
        },
        lastName(){
            return this.customer.name.split(' ')[1]
        }
    }
}
</script>

<style>

</style>