<template>
    <Layout >
        <PageHeader />
         
        <div class="d-xl-flex">
          <div class="w-100">
            <div class="d-md-flex">
              
              <div class="w-100">
                        
                  <div class="card" style="min-height:75vh;background: transparent;box-shadow: none;" >
                  <div class="card-body">
                      
                    <div style="text-align:center;height: 300px;" class="vertically-center">
                        <i class="mdi mdi-arrow-left-circle" style="font-size: 120px;color: #6B7A90;opacity: 27%;"></i>
                        <p>Please select a product from the side.</p>
                    </div>
                  </div>
              
                  
                  </div>
              
                <!-- end card -->
              </div>
              <!-- end w-100 -->
            </div>
          </div>

          <!-- ORDER SUMMARY -->
            <!-- <OrderSummary /> -->
        </div>
    </Layout>
</template>

<script>
    import Layout from '../layouts/main'
    import PageHeader from '@/components/page-header'
    import OrderSummary from '@/components/order-summary'

    export default {
        components: { Layout, PageHeader,OrderSummary },
    }
</script>

<style scoped>
    .vertically-center{
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>