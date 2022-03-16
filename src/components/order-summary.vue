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

            <div class="card border shadow-none mb-2">
              <a href="javascript: void(0);" class="text-body">
                <div class="p-2">
                  <div class="d-flex">
                    <div class="avatar-xs align-self-center me-2">
                      <div class="avatar-title rounded bg-transparent text-success font-size-20">
                        <i class="mdi mdi-image"></i>
                      </div>
                    </div>

                    <div class="overflow-hidden me-auto">
                      <h5 class="font-size-13 text-truncate mb-1">Postcards</h5>
                      <p class="text-muted text-truncate mb-0">"Christmas Cards Winter Theme"</p>
                    </div>

                    <div class="ms-2">
                      <p class="text-muted">1000</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <!--End of Cart-->

        </div>

        <div style="padding:1em;text-align:center;">
          <button type="button" class="btn btn-primary rounded-pill" v-if="cart && cart.length>0">Place Order</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            customer: null,
            cart: null
        }

    },
    computed:{
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
      this.cart = this.$store.state.jobs
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
</style>