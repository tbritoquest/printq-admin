
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
                        <div class="card-body">
                            <h4 class="card-title">Select2</h4>
                            <p
                            class="card-title-desc"
                            >A mobile and touch friendly input spinner component for Bootstrap</p>
                            <div class="col-sm-8">
                                <label>Single Select</label>
                                <multiselect v-model="value" :options="options" class="helo"></multiselect>
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
                value: null,
                 options: [
                    "Alaska",
                    "Hawaii",
                    "California",
                    "Nevada",
                    "Oregon",
                    "Washington",
                    "Arizona",
                    "Colorado",
                    "Idaho",
                    "Montana",
                    "Nebraska",
                    "New Mexico",
                    "North Dakota",
                    "Utah",
                    "Wyoming",
                    "Alabama",
                    "Arkansas",
                    "Illinois",
                    "Iowa",
                ]
            }
            
        }
    }
</script>

<style scoped>
    .d-xl-flex{
        height: 80vh;
    }
</style>