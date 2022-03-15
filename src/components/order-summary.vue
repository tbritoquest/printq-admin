<template>
    <div class="card filemanager-sidebar ms-lg-2">
        <div class="card-body">
          <div class="text-center">
            <h5 class="font-size-15 mb-4">Order Summary</h5>
            <!--Customer Info-->
            <div class="flex">
                <span class="text-muted">Name</span>
                <span class="text-muted">Alex Kunde</span>
            </div>
            <div class="flex">
                <span class="text-muted">Phone</span>
                <span class="text-muted">1234567789</span>
            </div>
          </div>

            <!--Customer's cart-->
          <div class="mt-4">

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
        </div>
      </div>
</template>

<script>
export default {

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
</style>