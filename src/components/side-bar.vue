<script>
import simplebar from "simplebar-vue";

import SideNav from "./side-nav";
import { layoutComputed } from "@/state/helpers";

/**
 * Sidebar component
 */
export default {
  components: { simplebar, SideNav },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...layoutComputed,
  },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  methods: {
    onRoutechange() {
      setTimeout(() => {
        if(document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
            currentPosition + 300;
        }
      }, 300);
    },
  },
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar");
              document.body.removeAttribute("data-sidebar-size");
              document.body.removeAttribute("data-keep-enlarged");
              document.body.classList.remove("vertical-collpsed");
              break;
            case "light":
              document.body.setAttribute("data-topbar", "dark");
              document.body.removeAttribute("data-sidebar");
              document.body.removeAttribute("data-sidebar-size");
              document.body.classList.remove("vertical-collpsed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "small");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "icon":
              document.body.setAttribute("data-keep-enlarged", "true");
              document.body.classList.add("vertical-collpsed");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "colored":
              document.body.setAttribute("data-sidebar", "colored");
              document.body.removeAttribute("data-keep-enlarged");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-sidebar-size");
              break;
            default:
              document.body.setAttribute("data-sidebar", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              document.body.removeAttribute("data-layout-scrollable");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              document.body.removeAttribute("data-layout-scrollable");
              break;
            case "scrollable":
              document.body.setAttribute("data-layout-scrollable", "true");
              document.body.removeAttribute("data-layout-mode");
              document.body.removeAttribute("data-layout-size")
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
};
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">

    <simplebar v-if="!isCondensed" :settings="settings" class="h-100" ref="currentMenu" id="my-element" >
      <div class="profile-box" style="text-align:center;">
      <div class="mb-4">
        <!-- <img src="@/assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-sm"> -->
        <!-- <i class="fas fa-user-circle" style="font-size:52px;color:#ccc;"></i> -->
      </div>
      <h5 class="font-size-15 mb-1"><a href="javascript: void(0);" class="text-light">Frank Kirk</a></h5>
      <p style="color:#94A3B8;">frankkirtk@example.com</p>
    </div>
      <SideNav />
    </simplebar>

    <simplebar v-else class="h-100">
      <div class="profile-box" style="text-align:center;">
      <div class="mb-4">
        <!-- <img src="@/assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-sm"> -->
        <!-- <i class="fas fa-user-circle" style="font-size:52px;color:#ccc;"></i> -->
      </div>
      <h5 class="font-size-15 mb-1"><a href="javascript: void(0);" class="text-light">Frank Kirk</a></h5>
      <p style="color:#94A3B8;">frankkirtk@example.com</p>
    </div>
      <SideNav />
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>

<style>

  .vertical-menu,
  .navbar-brand-box{
    background: #172775 !important;
  }
  .menu-title{
    font-size: 18px !important;
    color: #556ee6 !important;
  }
  #side-menu span {
    font-size: 16px;
  }
  #sidebar-menu ul li a { padding: 0.3rem 1.5rem }
</style>