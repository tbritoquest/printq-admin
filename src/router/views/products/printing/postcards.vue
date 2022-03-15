
<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
         
         <div class="d-xl-flex">
      <div class="w-100">
        <div class="d-md-flex">
          
          <div class="w-100">
            <div class="card">
              <div class="card-body">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card">
                        <div class="card-body" :id="SERVICE" >
                            <!-- <h4 class="card-title">Select2</h4>
                            <p class="card-title-desc">A mobile and touch friendly input spinner component for Bootstrap</p> -->
                            <!--Initial form-->
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

                            <!--majestic type selected-->
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
                                          <option value=""  selected="" v-if="hierarchy[index].size>1">Select {{question}}</option>
                                          <option v-for="option in hierarchy[index]" :value="option">
                                            {{option}}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </div>
                    </div>
      
                </div>
             

            
              </div>
            </div>
            <!-- end card -->
          </div>
          <!-- end w-100 -->
        </div>
      </div>

     <!-- ORDER SUMMARY -->
      <div class="card filemanager-sidebar ms-lg-2">
        <div class="card-body">
          <div class="text-center">
            <h5 class="font-size-15 mb-4">Storage</h5>
           

            <p class="text-muted mt-4">48.02 GB (76%) of 64 GB used</p>
          </div>

          <div class="mt-4">
            <div class="card border shadow-none mb-2">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div
                        class="avatar-title rounded bg-transparent text-success font-size-20"
                      >
                        <i class="mdi mdi-image"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">Images</h5>
                      <p class="text-muted text-truncate mb-0">176 Files</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">6 GB</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="card border shadow-none mb-2">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div
                        class="avatar-title rounded bg-transparent text-danger font-size-20"
                      >
                        <i class="mdi mdi-play-circle-outline"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">Video</h5>
                      <p class="text-muted text-truncate mb-0">45 Files</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">4.1 GB</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="card border shadow-none mb-2">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div
                        class="avatar-title rounded bg-transparent text-info font-size-20"
                      >
                        <i class="mdi mdi-music"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">Music</h5>
                      <p class="text-muted text-truncate mb-0">21 Files</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">3.2 GB</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="card border shadow-none mb-2">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div
                        class="avatar-title rounded bg-transparent text-primary font-size-20"
                      >
                        <i class="mdi mdi-file-document"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">Document</h5>
                      <p class="text-muted text-truncate mb-0">21 Files</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">2 GB</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div class="card border shadow-none">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div
                        class="avatar-title rounded bg-transparent text-warning font-size-20"
                      >
                        <i class="mdi mdi-folder"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">Others</h5>
                      <p class="text-muted text-truncate mb-0">20 Files</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">1.4 GB</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
   
</template>


<script>
    import Layout from '../../../layouts/main.vue'
    import PageHeader from '@/components/page-header';
    import Multiselect from "vue-multiselect"
    import ExcelReader  from 'read-excel-file';
    import XLSX from 'xlsx'

    import axios from 'axios'
    
    //Publish doc as excel. URL is given
    let gsheet_url_master = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTFWGV2yHbqo9_xjsOUMcaYlQtw39bVqUm5KLNTzo8Q1Q2QFR7U1_D7rAdRyjtmVVN-Jf1VPNOqdQNG/pub?output=xlsx`

    export default {
       
        components: { Layout,PageHeader,Multiselect},
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
                products: null,
                majesticTypeSelected: null,
                gsheet_ids: {
                    "Akuafoil":'2PACX-1vTZHjWm23aB5sb_JhQC0KGL2z8Q4CCFv-Ns0drjS7pHVixK3lqg8Znmr4R0WVZ834lucCZi9scgARD6',
                    "RaisedFoil":'2PACX-1vT8SoHXtP8aiM4Kihm2euFW2hNkzloQzd86fjdA_tXNhi8HDdJNGP3E2Jj_z1-RoFG9YmY7OZ4d79uq',
                    "RaisedSpotUV":'2PACX-1vScC-OvosrpGXjtyVZzDQN69ZRdQVQluhY7Bw3VzfwnHv9j-uEqPVOcTQwcGVdCK9nA8YW88u9gmmTe',
                    "Silk":'2PACX-1vSzXokFgmRROMvqBzq2TDuWv01Upy9IS51NRl6F-LhYe6gV2XE9uNxxqeR5tig5x6gzJi-6nebjDnGy',
                    "Suede":'2PACX-1vRSCboASQkmERjAOxIli7sI7kiX4umH_hAbwzM_C03R8w4pK2D8xODlYPwwOUpPeaOsDZZE4T3qCbWe'
                },
                SERVICE: null,
                questions: null,
                results: null,
                resultsAtQuestion: null,
                currQ: null,
                hierarchy: null,
                set: null,
                formKey:0
            }
            
        },
        methods:{
          
          goBackToQuestion(id,event){
              console.log("goBackToQuestion: ", id)
              this.results = this.resultsAtQuestion[id] //filter this batch
              this.currQ = id
              this.hierarchy.length = id+1
              // this.resultsAtQuestion.length = id+1
              // console.log("ResultsAtQuestion :",this.resultsAtQuestion)

              // this.generateNextQuestion()
              // console.log("right id:", id)
              // window.hey = this.hierarchy
              // return

              // if(this.hierarchy[id+1].size>1){
              //   console.log("now")
              //   document.querySelectorAll('#form-fields select')[id+1].value = ""
              // }

              for(let i=id+1;i<document.querySelectorAll('#form-fields select').length;i++){
                 let selectEl = document.querySelectorAll('#form-fields select')[i]
                 console.log(selectEl)
                 if(selectEl.length >1){
                    selectEl.value =""
                 }
                 
                //  document.querySelectorAll('#form-fields select')[i].remove()
              }
              
              this.checkAnswer(id,event)
              // this.checkAnswer(id,event)
              // console.log(document.querySelectorAll('#form-fields select')[id+1])
              // console.log(id)
              
          },
          generateNextQuestion(){
             //b. store old results
              // this.results = this.products

            this.resultsAtQuestion.push(this.results) // add new results
            
            console.log("generateNextQuestion")
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
              console.log("question generated")
            
          },
          checkAnswer(id, event=null){
              console.log("checkAnswer")
              if(this.currQ>=this.questions.length){ //end of form
                  console.log("No more questions")
                  return
              }

              if(id<this.currQ){ // runs in the event that user changes answer
                 console.log("huhg")
                this.goBackToQuestion(id,event)
                return
              }
          
              if(this.hierarchy[this.currQ].size>1 && event){ // case 2: user has many options. runs only in the event that user selects an option
                  console.log("case 2")
                  
                  let answer = event.target.value
                  console.log("Answer selected: ", answer)
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
              console.log("ok")
              // this.displayQuestion()
              // this.checkAnswer(this.currQ)


             
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

                  window.result = result//test only
                  console.log(result)
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
            // if(this.hierarchy) this.checkAnswer(this.currQ)
            console.log("hello")
            if(this.hierarchy && this.hierarchy[this.currQ].size<2){ //called when user has only one option
                console.log("Watch yourself!")
                this.checkAnswer(this.currQ)
              }
          }
        },
        mounted() {
            // this.getProducts(gsheet_url_master)
        }
    }
</script>


<style scoped>
    /* .d-xl-flex{
        height: 80vh;
    } */
    .field{
      margin-bottom: 1em;
    }
    #form-fields .hide{
      height:0;
      overflow: hidden;
      margin-bottom: 0 !important;
    }
</style>