
<template>
    <Layout v-if="this.$store.getters['isCustomerSignedIn']">
        <PageHeader :title="title" :items="items" />
         
        <div class="d-xl-flex">
          <div class="w-100">
            <div class="d-md-flex">
              <div class="w-100">
                  <div class="card" style="min-height:75vh;" :id="SERVICE">
                    <div class="card-body">
                        
                      <form-wizard shape="tab" color="#556ee6" @on-complete="onComplete" finish-button-text="Add to order" :key="formWizardKey">

                        <!--Tab 1: PRINT SPECIFICATIONS-->
                        <tab-content title="Print Specification" icon="mdi mdi-cards"  :before-change="beforeTabSwitch">
                          <Loader :loading="updating" >
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
                          </Loader>
                        </tab-content>
                        
                        <!--Tab 2: ADDITIONAL INFO-->
                        <tab-content icon="mdi mdi-cog" title="Additional Info" :before-change="validateAdditionalInfo">
                            <AdditionalInfoForm @interface="getChildInterface"/>
                        </tab-content>

                        <!--Tab 3: Review-->
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


    import Loader from '@/components/widgets/loader'
    import Review from '@/components/review'
    import AdditionalInfoForm from '@/components/forms/additional-info'
    import {format} from 'date-format-parse'
    import { FormWizard, TabContent } from "vue-form-wizard";
    import CustomerLookup from '@/components/customer-lookup'
    import OrderSummary from '@/components/order-summary'
    import XLSX from 'xlsx'
    import axios from 'axios'
    
    //Publish doc as excel. URL is given
    let gsheet_url_master = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTFWGV2yHbqo9_xjsOUMcaYlQtw39bVqUm5KLNTzo8Q1Q2QFR7U1_D7rAdRyjtmVVN-Jf1VPNOqdQNG/pub?output=xlsx`

    export default {
        components: { Layout,PageHeader,Multiselect,OrderSummary,CustomerLookup,FormWizard, TabContent, Review,Loader, AdditionalInfoForm },
        data() {
            return {
                title: "Postcards",
                items: [
                        {
                        text: "Printing Products",
                        },
                        {
                        text: "Postcards",
                        active: true,
                        },
                    ],
                customer: null,
                products: null,
                majesticTypeSelected: null,
                gsheet_ids: {
                    "Akuafoil":'2PACX-1vTZHjWm23aB5sb_JhQC0KGL2z8Q4CCFv-Ns0drjS7pHVixK3lqg8Znmr4R0WVZ834lucCZi9scgARD6',
                    "RaisedFoil":'2PACX-1vT8SoHXtP8aiM4Kihm2euFW2hNkzloQzd86fjdA_tXNhi8HDdJNGP3E2Jj_z1-RoFG9YmY7OZ4d79uq',
                    "RaisedSpotUV":'2PACX-1vScC-OvosrpGXjtyVZzDQN69ZRdQVQluhY7Bw3VzfwnHv9j-uEqPVOcTQwcGVdCK9nA8YW88u9gmmTe',
                    "Silk":'2PACX-1vSzXokFgmRROMvqBzq2TDuWv01Upy9IS51NRl6F-LhYe6gV2XE9uNxxqeR5tig5x6gzJi-6nebjDnGy',
                    "Suede":'2PACX-1vRSCboASQkmERjAOxIli7sI7kiX4umH_hAbwzM_C03R8w4pK2D8xODlYPwwOUpPeaOsDZZE4T3qCbWe'
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
                updating:false,
                //REVIEW
                reviewKey:0,
            }
            
        },
       childInterface: {
          validateAdditionalInfo: () => {},
          getAdditionalInfo: ()=>{}
        },
        methods:{
          getChildInterface(childInterface) {
            this.$options.childInterface = childInterface;
          },
          // Add count through the interface
          validateAdditionalInfo() {
            this.reviewKey++
            return this.$options.childInterface.validateAdditionalInfo()
          },
          getAdditionalInfo(){
            return this.$options.childInterface.getAdditionalInfo()
          },
          //form wizard
          onComplete () { 
            this.results[0]["groupName"] = this.title
            let additionalInfo = this.$options.childInterface.getAdditionalInfo()
             const job = {
                customerId: this.$store.state.customer.id,
                printSpecs: JSON.stringify(this.results[0]),
                notes: {notes: [additionalInfo.notes]},
                sampleDate: additionalInfo.sampleDate,
                dueDate: additionalInfo.dueDate,
                name: additionalInfo.jobName,
            }
            this.$store.dispatch('addToCart', job)
            this.$router.push("/starter")
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
            console.log("generate next question")
            this.resultsAtQuestion.push(this.results) // add new results
            
            this.currQ +=1
            //Get the next question's options
            this.set = new Set() 
            for(let i=0;i<this.results.length;i++){
              let productAttribute = this.questions[this.currQ] //ex. Size
              console.log(this.results[i][productAttribute])
              console.log(typeof this.results[i][productAttribute])
              this.set.add(this.results[i][productAttribute].toString().trim())
            }
            
            if(!this.questions[this.currQ].includes("Runsize")){
              this.set = new Set(Array.from(this.set).sort())
            }
          
            this.hierarchy.push(this.set)
           
          },
          checkAnswer(id, event=null){
            console.log("checkanswer")
              // if(this.currQ>=this.questions.length){ //end of form
              //     console.log("No more questions")
              //     return
              // }

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
                      this.currQ+=1
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
            this.updating = true
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

                  this.updating  = false
                })
                .catch(error=>{
                  console.log(error)
                  this.updating = false
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
        mounted() {
            console.log('Postcards component mounted.')
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