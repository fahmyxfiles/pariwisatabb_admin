<template>
  <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
    <div id="user-profile">
      <hotel-header :header-data="headerData" />
      <!-- profile info  -->
      <section id="profile-info">
        <b-row>
          <!-- about suggested page and twitter feed -->
          <b-col lg="3" cols="12" order="2" order-lg="1">
            
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
  </b-overlay>
</template>

<script>
import { BOverlay, BRow, BCol } from "bootstrap-vue";

import HotelHeader from "./HotelHeader.vue";

import { toastErrorMsg, getImageByType } from "@/libs/helpers.js";

export default {
  components: {
    BOverlay,
    BRow,
    BCol,

    HotelHeader,
  },
  data() {
    return {
      hotelData: {},
      headerData: { 
        name: '', 
        address: '', 
        headerImage: require('@/assets/images/profile/user-uploads/timeline.jpg'), 
        mainImage: require('@/assets/images/placeholders/16-9.png')
      },
      hotelId: null,
      defaultParams: {
        regency_id: 0,
        name: "",
        address: "",
        postal_code: 0,
        description: "",
        regency: null,
        images: [],
        rooms: [],
        facilities: [],
      },
      params: null,
      imagePath: this.$imagePath,
      loading: true,
    };
  },
  computed: {},
  methods: {
    toastErrorMsg,
    getData() {
      this.loading = true;
      this.$http
        .get("/hotel/" + this.hotelId)
        .then((res) => {
          this.hotelData = res.data.data;
          this.headerData = { 
            name: this.hotelData.name, 
            address: this.hotelData.address, 
            headerImage: this.imagePath + getImageByType(this.hotelData.images, 'banner').image_filename, 
            mainImage: this.imagePath + getImageByType(this.hotelData.images, 'main').image_filename 
          };
          console.log(this.headerData);
          this.loading = false;
        })
        .catch((err) => {
          if (err.response) {
            var errMsg = err.response.data.message;
            if (errMsg) {
              // Data not found
              this.$router.push({ path: 'error-404' });
              return this.toastErrorMsg(errMsg);
            }
          }
          this.$router.go(-1)
          return this.toastErrorMsg(err.message);
        });
    },
    initDefaultParams() {
      this.params = JSON.parse(JSON.stringify(this.defaultParams));
    },
    getImageByType,
  },
  created() {
    this.initDefaultParams();
    this.hotelId = this.$route.params.id;
    // this.initDefaultParams();
    this.getData();
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";
</style>
