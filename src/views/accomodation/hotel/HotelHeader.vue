<template>
  <b-card
    class="profile-header mb-2"
    :img-src="headerData.headerImage"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
            :src="headerData.mainImage"
            rounded
            fluid
            :alt="headerData.name"
          />
        </div>
        <!-- profile title -->
        <div class="profile-title rounded">
          <h2 class="text-white">
            {{ headerData.name }}
          </h2>
          <p class="text-white mb-0">
            {{ headerData.address }}
          </p>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar toggleable="md" type="light">
        <!-- toggle button -->
        <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
          <feather-icon icon="AlignJustifyIcon" size="21" />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse id="nav-text-collapse" is-nav>
          <b-tabs v-model="currentTab" class="profile-tabs" @input="change">
            <b-tab title="Home"></b-tab>
            <b-tab title="Images"></b-tab>
            <b-tab title="Rooms"></b-tab>
            <b-tab title="Facilities"></b-tab>
          </b-tabs>
        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {
  BCard,
  BImg,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BTab,
  BTabs,
  BNavItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BTab,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      currentTab: 0,
    }
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },
  methods : {
    change(){
      this.$emit("tab-changed", this.currentTab);
    }
  }
};
</script>
<style>
.profile-title {
  background-color: #00000066;
  padding: 5px;
  margin-bottom: 15px;
}
</style>