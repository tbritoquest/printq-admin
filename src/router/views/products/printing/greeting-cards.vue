
<template>
    <Layout v-if="customer">
        <PageHeader :title="title" :items="items" />
         
        <div class="d-xl-flex">
          <div class="w-100">
            <div class="d-md-flex">
              
              <div class="w-100">
                        
                  <div class="card" style="min-height:75vh;" :id="SERVICE">
                  <div class="card-body">
                      
                    <form-wizard shape="tab" color="#556ee6" @on-complete="onComplete" @on-change="handleChange" finish-button-text="Add to order" :key="formWizardKey">

                      <!--Tab 1: PRINT SPECIFICATIONS-->
                      <tab-content title="Print Specification" icon="mdi mdi-cards"  :before-change="beforeTabSwitch">
                          <div class="col-sm-8" v-if="!products">
                              <div class="field">
                                  <label class="label">Product Type</label>
                                  <div class="select is-medium">
                                      <select class="form-select" aria-label="select product type">
                                          <option value="Majestic">Majestic</option>
                                      </select>
                                  </div>
                              </div>

                              <div class="field">
                                  <label class="label">Majestic Type</label>
                                  <div class="select is-medium">
                                      <select class="form-select" aria-label="select majestic type" @change="getMajesticType($event)">
                                        <option value="" disabled="" selected="">Select Majestic Type</option>
                                        <option value="Akuafoil">Akuafoil</option>
                                        <option value="RaisedFoil">Raised Foil</option>
                                        <option value="RaisedSpotUV">Raised Spot UV</option>
                                        <option value="Silk">Silk</option>
                                        <option value="Suede">Suede</option>
                                      </select>
                                  </div>
                              </div>
                          </div>

                          <div class="col-sm-8" v-else>
                              <!--PRODUCT TYPE-->
                              <div class="field field-perm">
                                  <label class="label">Product Type</label>
                                  <div class="select is-medium">
                                      <select class="form-select" aria-label="select product type">
                                          <option value="Majestic">Majestic</option>
                                      </select>
                                  </div>
                              </div>
                              <!--MAJESTIC TYPE-->
                              <div class="field field-perm">
                                  <label class="label">Majestic Type</label>
                                  <div class="select is-medium">
                                      <select class="form-select" aria-label="select majestic type" @change="getMajesticType($event)">
                                          <!-- <option value="" disabled="" selected="">Select Majestic Type</option> -->
                                          <option value="Akuafoil" :selected="majesticTypeSelected == 'Akuafoil'">Akuafoil</option>
                                          <option value="RaisedFoil" :selected="majesticTypeSelected == 'RaisedFoil'">Raised Foil</option>
                                          <option value="RaisedSpotUV" :selected="majesticTypeSelected == 'RaisedSpotUV'">Raised Spot UV</option>
                                          <option value="Silk" :selected="majesticTypeSelected == 'Silk'">Silk</option>
                                          <option value="Suede" :selected="majesticTypeSelected == 'Suede'">Suede</option>
                                      </select>
                                  </div>
                              </div>
                              
                              <div id="form-fields" :key="'form'+formKey">
                                  <div :class="['field', index<2? 'hide':'']" v-for="(question, index) in questions" :key="index" v-if="index <= currQ" >
                                    <label class="label">{{question}}</label>
                                    <div class="select is-medium">
                                      <select @change="checkAnswer(index, $event)" class="form-select">
                                        <option value=""  disabled="" selected="" v-if="hierarchy[index].size>1">Select {{question}}</option>
                                        <option v-for="option in hierarchy[index]" :value="option">
                                          {{option}}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                              </div>
                          </div>

                      </tab-content>
                      
                      <!--Tab 2: ADDITIONAL INFO-->
                      <tab-content icon="mdi mdi-cog" title="Additional Info" :before-change="validateAdditionalInfo">
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
                                    <!-- <p class="help is-danger" v-if="isInvalid('sampleDate')">Please select a date</p> -->
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
                      </tab-content>


              <tab-content icon="mdi mdi-checkbox-marked-circle-outline" title="Review">
                <Review  :additionalInfoObj='getAdditionalInfo()' :projectInfoObj='getSpecs()' :key='reviewKey'/>
              </tab-content>
                      <!--END OF TEST-->
                    </form-wizard>
                  </div>
              
                  
                  </div>
              
                <!-- end card -->
              </div>
              <!-- end w-100 -->
            </div>
          </div>

          <!-- ORDER SUMMARY -->
            <OrderSummary />
        </div>
    </Layout>

    <Layout v-else>
        <CustomerLookup />
    </Layout>
   
</template>


<script>
    import Layout from '../../../layouts/main.vue'
    import PageHeader from '@/components/page-header'
    import Multiselect from "vue-multiselect"


    import Review from '@/components/review'
    import {format} from 'date-format-parse'
    import { FormWizard, TabContent } from "vue-form-wizard";
    import CustomerLookup from '@/components/customer-lookup'
    import OrderSummary from '@/components/order-summary'
    import XLSX from 'xlsx'
    import axios from 'axios'
    
    //Publish doc as excel. URL is given
    let gsheet_url_master = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQrRdXtS-K3L7g_zL33dkSzxm_vWX0T7CbzEMYCOaACTOoQATtccMsnPTSK3eXR8WjMaTX2DNMj3PET/pub?output=xlsx`

    export default {
        components: { Layout,PageHeader,Multiselect,OrderSummary,CustomerLookup,FormWizard, TabContent, Review },
        data() {
            return {
                title: "Greeting Cards",
                items: [
                        {
                        text: "Printing Products",
                        },
                        {
                        text: "Greeting Cards",
                        active: true,
                        },
                    ],
                customer: null,
                products: null,
                majesticTypeSelected: null,
                gsheet_ids: {
                    "Akuafoil": '2PACX-1vRhNIHcN8dUUO1Jzl1mUzPdeMeeAxZUwdHgiTp0H9A004ntn-ZzXXBZWr5X4nMOvcO1IdXpA_DGSq-r',
                    "RaisedFoil":'2PACX-1vToQepOqcsnDOpBr8YyAlsVhMbgJUaup_yoywgKjqwd68ClA7GnaO-9-IVrtnv1BJ5FrIDSlYTQx0Pv',
                    "RaisedSpotUV":'2PACX-1vSwzdg2FjyEf_DwHiABffXXatFUtkF-TL56KXQJeWXT_PHuu7PrcsmEBu-eZE5UlqbAovFVIG7xf88g',
                    "Silk":'2PACX-1vT0-9in1aDPUlUh6vDxm-l6eVEK0WMKUSevZLEPIhqz6MpQFkEsp7VeqmIs1gP8jLmFOyMeXjusI_He',
                    "Suede":'2PACX-1vSxHEgmuO_vNPXCP4fadP-ExdOFAS-Iam1ozVLnb18YnDMC3dBKIpQktPNbSpFLrylTX1wle2g48zh9'
                },
                formWizardKey:0,
                //PRINT SPECS
                formKey:0,
                SERVICE: null,
                questions: null,
                results: null,
                resultsAtQuestion: null,
                currQ: null,
                hierarchy: null,
                set: null,
                //ADDITIONAL INFO 
                orderDate: format(new Date(), 'YYYY-MM-DD'),
                sampleDate: '',
                isSampleDatePending: false,
                checkValidation:false,
                jobName: '',
                notes: '',
                //REVIEW
                reviewKey:0,
            }
            
        },
        methods:{
          //form wizard
          validateAdditionalInfo(){
            this.checkValidation = true
            this.reviewKey++ // update review component
            return (this.jobNameState && this.sampleDateState)? true : false
          },
          resetFormWizard(){
            this.SERVICE= null,
            this.questions= null,
            this.results= null,
            this.resultsAtQuestion= null,
            this.currQ= null,
            this.hierarchy= null,
            this.set= null,
            this.formWizardKey++
            this.checkValidation = false 
            this.isSampleDatePending = false 
            this.jobName = ""
            this.majesticTypeSelected = null 
            this.notes = ""
            this.products = null 
            this.sampleDate = ""
            
          },
          onComplete () { //runs when user submits form
            
            this.results[0]["groupName"] = this.title
            const job = {
                customerId: this.customer.id,
                printSpecs: JSON.stringify(this.results[0]),
                notes: {notes: [this.notes]},
                sampleDate: this.isSampleDatePending? 'pending':this.sampleDate,
                name: this.jobName
            }
            this.$store.dispatch('addToCart', job)
            this.resetFormWizard()
          },
          handleChange(prevIndex, nextIndex){
              console.log(`Changing from ${prevIndex} to ${nextIndex}`)
          },
          beforeTabSwitch(){
            if(this.results && this.results.length<2){
              return true
            }else{
              alert("Please fill out form.")
              return false
            }
          },
          //Review
          getAdditionalInfo(){
            // if isSampleDatePending = true then answer is 'pending' else answer is date
            let sd = this.isSampleDatePending? 'pending':this.sampleDate
            return {orderDate:this.orderDate,sampleDate:sd,jobName:this.jobName,notes:this.notes}
          },
          getSpecs(){
            if(this.results && this.results.length===1){
              return this.results[0]
            }
            return null
          },
          //Print Specs
          goBackToQuestion(id,event){
              this.results = this.resultsAtQuestion[id] //filter this batch
              this.currQ = id
              this.hierarchy.length = id+1
             
              for(let i=id+1;i<document.querySelectorAll('#form-fields select').length;i++){
                 let selectEl = document.querySelectorAll('#form-fields select')[i]
                 if(selectEl.length >1){
                    selectEl.value =""
                 }
              }
              
              this.checkAnswer(id,event)
             
          },
          generateNextQuestion(){
      
            this.resultsAtQuestion.push(this.results) // add new results
            
            this.currQ +=1
            //Get the next question's options
            this.set = new Set() 
            for(let i=0;i<this.results.length;i++){
              let productAttribute = this.questions[this.currQ] //ex. Size
              this.set.add(this.results[i][productAttribute].toString().trim())
            }
            
            if(!this.questions[this.currQ].includes("Runsize")){
              this.set = new Set(Array.from(this.set).sort())
            }
          
            this.hierarchy.push(this.set)
          },
          checkAnswer(id, event=null){
              if(this.currQ>=this.questions.length){ //end of form
                  console.log("No more questions")
                  return
              }

              if(id<this.currQ){ // runs in the event that user changes answer
                this.goBackToQuestion(id,event)
                return
              }
          
              if(this.hierarchy[this.currQ].size>1 && event){ // case 2: user has many options. runs only in the event that user selects an option
                
                  let answer = event.target.value

                  //Generate Results 
                  let newResults = []
                  for(let i=0;i<this.results.length;i++){ // filter results based on answer selected
                      let productAttribute = this.questions[this.currQ]
                      if(this.results[i][productAttribute] == answer){
                          newResults.push(this.results[i])
                      }
                  }
                  
                  this.resultsAtQuestion.length = this.currQ
                  this.resultsAtQuestion[this.currQ] = this.results //store old results
                  this.results = newResults

                  // Check if we're done with form
                  if(this.results.length<2){ // DONE
                      console.log("final result: ", this.results)
                      return
                  }
                  
              }
              
              this.generateNextQuestion()
              
          },
          startForm(){
              this.SERVICE = `pc-${this.majesticTypeSelected}`
             

              //INITIALIZE FORM
  
              //a. get questions
              this.questions = []
              for(const prop in this.products[0]){
                  this.questions.push(prop)
              }

              //b. get results
              this.results = this.products
              this.resultsAtQuestion = [this.results]

              // c. Get all possible options pertaining to current question AND Results
              this.currQ = 0
              this.hierarchy =[]

              this.set = new Set()
              for(let i=0;i<this.results.length;i++){
                let productAttribute = this.questions[this.currQ] //ex. Size
                this.set.add(this.results[i][productAttribute].trim())// ex. set = ['2x2','2x3',etc]
              }
                  
              //d. store options for latest question
              this.hierarchy.push(this.set)
              
              this.formKey++
             
              //Question is displayed and checked in watch method

             
          },
          getMajesticType(event){
            this.majesticTypeSelected = event.target.value
            let gsheet_url = `https://docs.google.com/spreadsheets/d/e/${this.gsheet_ids[this.majesticTypeSelected]}/pub?output=xlsx`
            this.getProducts(gsheet_url)
          },
          getProducts(url){
              axios
              .get(url,{responseType: 'arraybuffer'})
                .then(response => {
                  let workbook = XLSX.readFile(response.data)
                  
                  let result = []
                  let sheets = workbook.SheetNames
                  for(let i = 0; i < sheets.length; i++)
                  {
                      const temp = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]])
                      temp.forEach((res) => {
                          result.push(res)
                      })
                  }

                  this.products = result

                  // Initiate form
                  this.startForm()
                })
                .catch(error=>{
                  console.log(error)
                })
          }
        },
        watch: {
          hierarchy(newH, oldH) {
            if(this.hierarchy && this.hierarchy[this.currQ].size<2) //called when user has only one option
                this.checkAnswer(this.currQ)
          },
          results(oldR,newR){
            if(this.results && this.results.length<2){
              document.querySelector('button.wizard-btn').disabled = false
              this.reviewKey++ //update review component
            }
            else
              document.querySelector('button.wizard-btn').disabled = true
          }
        },
        computed: {
          //ADDITIONAL INFO
          jobNameState() {
            return this.checkValidation? this.jobName.length>=4 : null
          },
          invalidJobNameFeedback() {
            return this.jobName.length > 0? 'Enter at least 4 characters.' : 'Please enter something.'
          },
          sampleDateState(){
            if(this.checkValidation)
              return (this.isSampleDatePending || this.sampleDate) ? true: false
            else
              return null
          }
        },
        mounted() {
            console.log('Greeting Cards component mounted.')
            this.customer = this.$store.state.customer
        }
    }
</script>


<style scoped>
  
    .field{
      margin-bottom: 1em;
    }
    #form-fields .hide{
      height:0;
      overflow: hidden;
      margin-bottom: 0 !important;
    }
</style>