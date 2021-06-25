<template>
  <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
    <div id="user-profile">
      <hotel-header :header-data="headerData" @tab-changed="tabChanged" />
      <!-- profile info  -->
      <section id="profile-info">
        <b-overlay :show="tabLoading" spinner-variant="primary" rounded="sm">
          <b-row v-if="activeTab === 0">
            <!-- about suggested page and twitter feed -->
            <b-col lg="3" cols="12" order="2" order-lg="1">
              <b-card>
                <!-- about -->
                <div class="">
                  <h5 class="text-capitalize mb-75">
                    Name
                  </h5>
                  <b-card-text>
                    {{ hotelData.name }}
                  </b-card-text>
                </div>
                <div class="mt-2">
                  <h5 class="text-capitalize mb-75">
                    Address
                  </h5>
                  <b-card-text>
                    {{ hotelData.address }}
                  </b-card-text>
                </div>
                <div class="mt-2">
                  <h5 class="text-capitalize mb-75">
                    Description
                  </h5>
                  <b-card-text>
                    {{ hotelData.description }}
                  </b-card-text>
                </div>
              </b-card>
              <b-card>
                <!-- about -->
                <div class="">
                  <h5 class="text-capitalize mb-75">
                    Rooms
                  </h5>
                  <b-list-group>
                    <b-list-group-item
                      v-for="(room, index) in hotelData.rooms"
                      :key="index"
                      >{{ room.name }}</b-list-group-item
                    >
                  </b-list-group>
                </div>
              </b-card>
              <!--/ about suggested page and twitter feed -->
            </b-col>
            <!-- post -->
            <b-col lg="6" cols="12" order="1" order-lg="2">
              <b-card title="Maps">
                <div id="map" ref="map" />
              </b-card>
            </b-col>
            <!-- post -->

            <!-- latest photos suggestion and polls -->
            <b-col lg="3" cols="12" order="3">
              <b-card>
                <div class="">
                  <h5 class="text-capitalize mb-75">
                    Facilities
                  </h5>
                  <b-card-text>
                    <ul class="pl-2">
                      <li
                        style="margin-top: 0.3rem"
                        v-for="(facility, index) in hotelData.facilities"
                        :key="index"
                      >
                        {{ facility.name }}
                      </li>
                    </ul>
                  </b-card-text>
                </div>
              </b-card>
            </b-col>
            <!--/ latest photos suggestion and polls -->
          </b-row>
          <b-row v-if="activeTab === 1">
            <b-col lg="12">
              <b-card title="Gallery">
                <!-- swiper1 -->
                <swiper
                  ref="swiperTop"
                  class="swiper-gallery gallery-top"
                  :options="swiperOptions"
                >
                  <swiper-slide v-for="(data, index) in swiperData" :key="index">
                    <b-img :src="data.img" fluid />
                  </swiper-slide>

                  <div
                    slot="button-next"
                    class="swiper-button-next swiper-button-white"
                  />
                  <div
                    slot="button-prev"
                    class="swiper-button-prev swiper-button-white"
                  />
                </swiper>

                <!-- swiper2 Thumbs -->
                <swiper
                  ref="swiperThumbs"
                  class="swiper gallery-thumbs"
                  :options="swiperOptionThumbs"
                >
                  <swiper-slide v-for="(data, index) in swiperData" :key="index">
                    <b-img :src="data.img" fluid />
                  </swiper-slide>
                </swiper>
              </b-card>
            </b-col>
          </b-row>
        </b-overlay>
      </section>
      <!--/ profile info  -->
    </div>
  </b-overlay>
</template>

<script>
import {
  BListGroup,
  BListGroupItem,
  BCardText,
  BCard,
  BOverlay,
  BRow,
  BCol,
  BImg,
} from "bootstrap-vue";

import { toastErrorMsg, getImageByType, createGoogleMap } from "@/libs/helpers";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import HotelHeader from "./HotelHeader.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    BListGroup,
    BListGroupItem,
    BCardText,
    BCard,
    BOverlay,
    BRow,
    BCol,
    BImg,

    HotelHeader,
  },
  data() {
    return {
      hotelData: {},
      headerData: {
        name: "",
        address: "",
        headerImage: require("@/assets/images/profile/user-uploads/timeline.jpg"),
        mainImage: require("@/assets/images/placeholders/16-9.png"),
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
      tabLoading: false,
      activeTab: 0,
      map: null,
      swiperData: [],
      /* eslint-disable global-require */

      swiperOptions: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },
  created() {
    this.initDefaultParams();
    this.hotelId = this.$route.params.id;
    // this.initDefaultParams();
    this.getData();
  },
  methods: {
    toastErrorMsg,
    createGoogleMap,
    drawMap() {
      return this.createGoogleMap(
        this.hotelData.map_coordinate,
        this.hotelData.map_center,
        this.$refs["map"],
        this.map
      );
    },
    getData() {
      this.loading = true;
      this.$http
        .get(`/hotel/${this.hotelId}`)
        .then((res) => {
          this.hotelData = res.data.data;
          this.headerData = {
            name: this.hotelData.name,
            address: this.hotelData.address,
            headerImage:
              this.imagePath +
              getImageByType(this.hotelData.images, "banner").image_filename,
            mainImage:
              this.imagePath +
              getImageByType(this.hotelData.images, "main").image_filename,
          };
          this.drawMap();
          this.loading = false;
        })
        .catch((err) => {
          if (err.response) {
            const errMsg = err.response.data.message;
            if (errMsg) {
              // Data not found
              this.$router.push({ path: "error-404" });
              return this.toastErrorMsg(errMsg);
            }
          }
          this.$router.go(-1);
          return this.toastErrorMsg(err.message);
        });
    },
    initDefaultParams() {
      this.params = JSON.parse(JSON.stringify(this.defaultParams));
    },
    getImageByType,
    tabChanged(tab) {
      this.activeTab = tab;
      this.tabLoading = true;
      // Get Images
      if (tab === 0) {
        this.$nextTick(() => {
          this.drawMap();
        });
      }
      if (tab === 1) {
        this.swiperData = [];
        var commonImage = this.getImageByType(this.hotelData.images, 'common');
        for(var i = 0; i < commonImage.length; i++){
          this.swiperData.push({img: this.imagePath + commonImage[i].image_filename})
        }
        // next tick adalah fungsi bawaan vue js yang berfungsi untuk mengeksekusi perintah apabila komponen sdh di render
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.$swiper;
          const swiperThumbs = this.$refs.swiperThumbs.$swiper;
          swiperTop.controller.control = swiperThumbs;
          swiperThumbs.controller.control = swiperTop;
        });
      }
      setTimeout(() => {
        this.tabLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";
@import "@core/scss/vue/libs/swiper.scss";
#map {
  height: 600px;
  background: gray;
}
</style>
