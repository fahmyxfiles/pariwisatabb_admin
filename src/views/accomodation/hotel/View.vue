<template>
  <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
    <div id="user-profile">
      <hotel-header :header-data="headerData" @tab-changed="tabChanged" />
      <!-- profile info  -->
      <section id="profile-info">
        <b-overlay :show="tabLoading" spinner-variant="primary" rounded="sm">
          <b-row v-show="activeTab === 0">
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
                        v-for="(facility, index) in hotelData.facilities"
                        :key="index"
                        style="margin-top: 0.3rem"
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
          <b-row v-show="activeTab === 1">
            <b-col lg="12">
              <b-card title="Hotel Gallery">
                <b-row>
                  <b-col md="6">
                    <h4>Main Image (Aspect Ratio 16:9)</h4>
                    <vue-dropzone
                      id="dropzoneMainImage"
                      ref="dropzoneMainImage"
                      :options="dropzoneImageOptions"
                      class="mb-2"
                      @vdropzone-file-added="dropzoneMainImageAdded"
                      @vdropzone-sending="dropzoneMainImageSending"
                    />
                  </b-col>
                  <b-col md="6">
                    <h4>Banner Image (Aspect Ratio 15:4)</h4>
                    <vue-dropzone
                      id="dropzoneBannerImage"
                      ref="dropzoneBannerImage"
                      :options="dropzoneImageOptions"
                      class="mb-2"
                      @vdropzone-file-added="dropzoneBannerImageAdded"
                    />
                  </b-col>
                </b-row>
                <h4 class="text-center mt-2">
                  Common Image
                </h4>
                <b-row class="justify-content-center">
                  <b-col md="6">
                    <!-- swiper1 -->
                    <swiper
                      ref="swiperCommonImage"
                      class="swiper-gallery gallery-top"
                      :options="swiperOptions"
                      @slideChange="swiperSlideChange"
                    >
                      <swiper-slide
                        v-for="(data, index) in swiperData"
                        :key="index"
                      >
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
                      <swiper-slide
                        v-for="(data, index) in swiperData"
                        :key="index"
                      >
                        <b-img :src="data.img" fluid />
                      </swiper-slide>
                    </swiper>
                  </b-col>
                </b-row>
                <b-row class="justify-content-center">
                  <b-col md="6">
                    <b-button-group class="mt-2 d-flex justify-content-center">
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                      >
                        <feather-icon icon="PlusIcon" />
                        Add
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                      >
                        <feather-icon icon="ImageIcon" />
                        Replace
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-danger"
                      >
                        <feather-icon icon="TrashIcon" />
                        Delete
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <!-- Tab Room -->
          <b-row v-show="activeTab === 2">
            <b-col lg="12">
              <b-card title="Hotel Room">
                <app-collapse accordion>
                  <app-collapse-item
                    v-for="(room, index) in hotelData.rooms"
                    :key="index"
                    :title="room.name"
                  >
                    {{ room.description }}
                    <b-row>
                      <b-col md="4">
                        <h5 class="text-capitalize mb-75 mt-2">
                          Number of Guest
                        </h5>
                        <b-card-text>
                          {{ room.num_of_guest }}
                        </b-card-text>
                      </b-col>
                      <b-col md="4">
                        <h5 class="text-capitalize mb-75 mt-2">
                          Room size
                        </h5>
                        <b-card-text>
                          {{ room.room_size }} &#13217;
                        </b-card-text>
                      </b-col>
                      <b-col md="4">
                        <h5 class="text-capitalize mb-75 mt-2">
                          Bed size
                        </h5>
                        <b-card-text class="text-capitalize">
                          {{ room.bed_size }}
                        </b-card-text>
                      </b-col>
                    </b-row>

                    <b-table-lite
                      hover
                      :items="parseRoomPricing(room.pricings)"
                    />
                  </app-collapse-item>
                </app-collapse>
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
  BButtonGroup,
  BButton,
  BTableLite,
} from "bootstrap-vue";

import { toastErrorMsg, getImageByType, createGoogleMap } from "@/libs/helpers";
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Ripple from "vue-ripple-directive";
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import HotelHeader from "./HotelHeader.vue";

export default {
  components: {
    vueDropzone,
    BCardCode,
    BTableLite,
    Swiper,
    SwiperSlide,
    AppCollapse,
    AppCollapseItem,
    BButtonGroup,
    BButton,
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
  directives: {
    Ripple,
  },
  data() {
    return {
      dropzoneImageOptions: {
        url: "url",
        maxFilesize: 5.0,
        maxFiles: 1,
        autoProcessQueue: true,
        addRemoveLinks: false,
        acceptedFiles: "image/*",
      },
      dropzoneMainImageSelectedFile: null,
      dropzoneBannerImageSelectedFile: null,
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
        loop: false,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: false,
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
    parseRoomPricing(pricings) {
      return pricings.map((pricing) => {
        return {
          type: pricing.type,
          date: pricing.date,
          price: pricing.price,
        };
      });
    },
    dropzoneMainImageAdded(file) {
      if (this.dropzoneMainImageSelectedFile !== null) {
        this.$refs.dropzoneMainImage.removeFile(
          this.dropzoneMainImageSelectedFile
        );
      }
      this.dropzoneMainImageSelectedFile = file;
    },
    dropzoneMainImageSending(file, xhr, formData) {
      formData.append("_method", "PUT");
    },
    dropzoneBannerImageAdded(file) {
      if (this.dropzoneBannerImageSelectedFile !== null) {
        this.$refs.dropzoneBannerImage.removeFile(
          this.dropzoneBannerImageSelectedFile
        );
      }
      this.dropzoneBannerImageSelectedFile = file;
    },
    drawMap() {
      return this.createGoogleMap(
        this.hotelData.map_coordinate,
        this.hotelData.map_center,
        this.$refs.map,
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
              this.getImageByType(this.hotelData.images, "banner")
                .image_filename,
            mainImage:
              this.imagePath +
              this.getImageByType(this.hotelData.images, "main").image_filename,
          };
          this.$refs.dropzoneMainImage.setOption(
            "url",
            `${this.$http.defaults.baseURL}/hotel_image/${
              this.getImageByType(this.hotelData.images, "main").id
            }`
          );
          this.$refs.dropzoneBannerImage.setOption(
            "url",
            `${this.$http.defaults.baseURL}/hotel_image/${
              this.getImageByType(this.hotelData.images, "banner").id
            }`
          );
          this.drawMap();
          this.swiperData = [];
          const commonImage = this.getImageByType(
            this.hotelData.images,
            "common"
          );
          for (let i = 0; i < commonImage.length; i++) {
            this.swiperData.push({
              img: this.imagePath + commonImage[i].image_filename,
              id: commonImage[i].id,
            });
          }
          // next tick adalah fungsi bawaan vue js yang berfungsi untuk mengeksekusi perintah apabila komponen sdh di render
          this.$nextTick(() => {
            const swiperCommonImage = this.$refs.swiperCommonImage.$swiper;
            const swiperThumbs = this.$refs.swiperThumbs.$swiper;
            swiperCommonImage.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperCommonImage;
          });
          this.$nextTick(() => {
            const mainImage = this.getImageByType(
              this.hotelData.images,
              "main"
            );
            const fileExt = mainImage.image_filename.split(".").pop();
            const file = { size: 1, type: `image/${fileExt}` };
            const url = this.imagePath + mainImage.image_filename;
            this.$refs.dropzoneMainImage.removeAllFiles();
            this.$refs.dropzoneMainImage.manuallyAddFile(file, url);
          });
          this.$nextTick(() => {
            const bannerImage = this.getImageByType(
              this.hotelData.images,
              "banner"
            );
            const fileExt = bannerImage.image_filename.split(".").pop();
            const file = { size: 1, type: `image/${fileExt}` };
            const url = this.imagePath + bannerImage.image_filename;
            this.$refs.dropzoneBannerImage.removeAllFiles();
            this.$refs.dropzoneBannerImage.manuallyAddFile(file, url);
          });
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
    swiperSlideChange() {},
    tabChanged(tab) {
      this.tabLoading = true;
      this.activeTab = tab;
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

.dropzone .dz-preview .dz-image img {
  width: inherit !important;
  height: fit-content !important;
  max-height: 230px;
}
.dz-progress {
  display: none !important;
}
.dz-details {
  display: none !important;
}
</style>
