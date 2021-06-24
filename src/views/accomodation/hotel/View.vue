<template>
  <div id="user-profile">
    <hotel-header :header-data="null" />
    <!-- profile info  -->
    <section id="profile-info">
      <b-row>
        <!-- about suggested page and twitter feed -->
        <b-col lg="3" cols="12" order="2" order-lg="1">
          <profile-about :about-data="profileData.userAbout" />
          <!--/ about suggested page and twitter feed -->
        </b-col>
        <!-- post -->
        <b-col lg="6" cols="12" order="1" order-lg="2"> </b-col>
        <!-- post -->

        <!-- latest photos suggestion and polls -->
        <b-col lg="3" cols="12" order="3"> </b-col>
        <!--/ latest photos suggestion and polls -->

        <!-- load more  -->
        <b-col cols="12" order="4">
          <!-- <profile-bottom /> -->
        </b-col>
        <!--/ load more  -->
      </b-row>
    </section>
    <!--/ profile info  -->
  </div>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";

import HotelHeader from "./HotelHeader.vue";
import ProfileAbout from "./ProfileAbout.vue";
// import profileBottom from "./profileBottom.vue";

export default {
  components: {
    BRow,
    BCol,

    HotelHeader,
    ProfileAbout,
    // profileBottom,
  },
  computed: {},
  methods: {},
  data() {
    return {
      profileData: {},
    };
  },
  created() {
    // this.initDefaultParams();
    // this.getData();
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";
</style>
