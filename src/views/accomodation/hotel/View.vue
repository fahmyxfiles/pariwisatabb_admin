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
                <div class="d-flex justify-content-between">
                  <h4 class="text-capitalize mb-75" style="margin-top: 3px;">
                    Profile
                  </h4>
                  <b-form-group class="ml-1">
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      size="sm"
                    >
                      <feather-icon icon="Edit2Icon" class="mr-50" />
                      <span class="align-middle">Edit</span>
                    </b-button>
                  </b-form-group>
                </div>
                <div>
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
                <div class="d-flex justify-content-between">
                  <h4 class="text-capitalize mb-75" style="margin-top: 3px;">
                    Rooms
                  </h4>
                  <b-form-group class="ml-1">
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      size="sm"
                    >
                      <feather-icon icon="Edit2Icon" class="mr-50" />
                      <span class="align-middle">Edit</span>
                    </b-button>
                  </b-form-group>
                </div>
                <b-list-group>
                  <b-list-group-item
                    v-for="(room, index) in hotelData.rooms"
                    :key="index"
                    >{{ room.name }}</b-list-group-item
                  >
                </b-list-group>
              </b-card>
              <!--/ about suggested page and twitter feed -->
            </b-col>
            <!-- post -->
            <b-col lg="6" cols="12" order="1" order-lg="2">
              <b-card>
                <div class="d-flex justify-content-between">
                  <h4 class="text-capitalize mb-75" style="margin-top: 3px;">
                    Maps
                  </h4>
                  <b-form-group class="ml-1">
                    <b-button
                      v-show="!mapEditMode"
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      size="sm"
                      @click="setMapEditMode()"
                    >
                      <feather-icon icon="Edit2Icon" class="mr-50" />
                      <span class="align-middle">Edit</span>
                    </b-button>
                    <b-button
                      v-show="mapEditMode"
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-success"
                      size="sm"
                      @click="saveMapEdit()"
                    >
                      <feather-icon icon="SaveIcon" class="mr-50" />
                      <span class="align-middle">Save</span>
                    </b-button>
                    <b-button
                      v-show="mapEditMode"
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      class="ml-1"
                      variant="outline-danger"
                      size="sm"
                      @click="cancelMapEdit()"
                    >
                      <feather-icon icon="XIcon" class="mr-50" />
                      <span class="align-middle">Cancel</span>
                    </b-button>
                  </b-form-group>
                </div>
                <div id="map" ref="map" />
              </b-card>
            </b-col>
            <!-- post -->

            <!-- latest photos suggestion and polls -->
            <b-col lg="3" cols="12" order="3">
              <b-card>
                <div class="d-flex justify-content-between">
                  <h4 class="text-capitalize mb-75" style="margin-top: 3px;">
                    Facilities
                  </h4>
                  <b-form-group class="ml-1">
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      size="sm"
                      @click="tabChanged(3)"
                    >
                      <feather-icon icon="Edit2Icon" class="mr-50" />
                      <span class="align-middle">Edit</span>
                    </b-button>
                  </b-form-group>
                </div>
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
              </b-card>
            </b-col>
            <!--/ latest photos suggestion and polls -->
          </b-row>
          <b-row v-show="activeTab === 1">
            <b-col lg="12">
              <b-card title="Hotel Images">
                <b-row>
                  <b-col md="6">
                    <h4>Main Image (Aspect Ratio 16:9)</h4>
                    <vue-dropzone
                      id="dropzoneMainImage"
                      ref="dropzoneMainImage"
                      :options="dropzoneImageOptions"
                      class="mb-2"
                      @vdropzone-file-added="dropzoneMainImageAdded"
                      @vdropzone-sending="dropzoneSendingMethodPut"
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
                      @vdropzone-sending="dropzoneSendingMethodPut"
                    />
                  </b-col>
                </b-row>
                <h4 class="text-center mt-2 mb-1">
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
                        variant="outline-success"
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
                <b-form-group class="ml-1">
                  <div class="d-flex align-items-center">
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                    >
                      <feather-icon icon="PlusIcon" class="mr-50" />
                      <span class="align-middle">Add</span>
                    </b-button>
                  </div>
                </b-form-group>
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
                    <div class="d-flex justify-content-between mt-2">
                      <h5
                        class="text-capitalize mb-75"
                        style="margin-top: 10px;"
                      >
                        Pricing
                      </h5>
                      <b-form-group class="ml-1">
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-primary"
                        >
                          <feather-icon icon="PlusIcon" class="mr-50" />
                          <span class="align-middle">Add</span>
                        </b-button>
                      </b-form-group>
                    </div>
                    <b-table-lite
                      class="mt-2"
                      hover
                      :items="parseRoomPricing(room.pricings)"
                      :fields="roomPricingFields"
                    >
                      <!-- A virtual column -->
                      <template #cell(No)="data">
                        {{ data.index + 1 }}
                      </template>

                      <!-- A virtual composite column -->
                      <template #cell(action)="data">
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-primary"
                          class="btn-icon rounded-circle"
                          @click="editRoomPricingModal(data.item)"
                        >
                          <feather-icon icon="Edit2Icon" />
                        </b-button>

                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-danger"
                          class="btn-icon rounded-circle ml-1"
                          @click="deleteRoomPricing(data.item)"
                        >
                          <feather-icon icon="TrashIcon" />
                        </b-button>
                      </template>

                      <!-- Optional default data cell scoped slot -->
                      <template #cell()="data">
                        <i>{{ data.value }}</i>
                      </template>
                    </b-table-lite>
                  </app-collapse-item>
                </app-collapse>
              </b-card>
            </b-col>
          </b-row>
          <b-row v-show="activeTab === 3">
            <b-col md="12">
              <b-card
                v-if="availableFacilityCategories.length > 0"
                title="Hotel Facilities"
              >
                <div
                  v-for="(facilityCategory,
                  facilityCategoryIndex) in availableFacilityCategories"
                  :key="facilityCategoryIndex"
                  class="group-wrapper"
                >
                  <div class="group-title">
                    {{ facilityCategory.name }}
                  </div>
                  <div class="group-content">
                    <div
                      v-for="(facility,
                      facilityIndex) in getAvailableFacilityByCategoryId(
                        facilityCategory.id
                      )"
                      :key="facilityIndex"
                      class="facility-item"
                    >
                      <div class="facility-check-box">
                        <b-form-checkbox
                          v-model="facility.value"
                          value="Y"
                          class="custom-control-primary"
                        >
                          <div class="facility-label">
                            {{ facility.name }}
                          </div>
                        </b-form-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
                <b-row class="justify-content-center">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="info"
                  >
                    Save
                  </b-button>
                </b-row>
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
  BFormCheckbox,
  BFormGroup,
} from "bootstrap-vue";

import {
  toastErrorMsg,
  getImageByType,
  createGoogleMap,
  createGoogleMapMarker,
} from "@/libs/helpers";
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
    BFormGroup,
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
    BFormCheckbox,
    HotelHeader,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      availableFacilityCategories: [],
      availableFacilities: [],
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
      defaultHotelParams: {
        regency_id: 0,
        name: "",
        address: "",
        postal_code: 0,
        description: "",
        map_coordinate: "",
        map_center: "",
      },
      hotelParams: null,
      imagePath: this.$imagePath,
      loading: true,
      tabLoading: false,
      activeTab: 0,
      map: null,
      marker: null,
      mapEditMode: false,
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
      roomPricingFields: [
        // A virtual column that doesn't exist in items
        "No",
        // A regular column
        "type",
        "date",
        "price",
        // A virtual column made up from two fields
        { key: "action", label: "Action" },
      ],
    };
  },
  created() {
    this.initDefaultParams();
    this.getAvailableFacilityCategories();
    this.getAvailableFacilities();
    this.hotelId = this.$route.params.id;
    // this.initDefaultParams();
    this.getData();
  },
  methods: {
    setMapEditMode() {
      this.mapEditMode = true;
      this.marker.setDraggable(true);
    },
    saveMapEdit() {
      this.mapEditMode = false;
      this.marker.setDraggable(false);
      const center = this.map.getCenter().toString();
      const zoom = this.map.getZoom().toString();
      const coord = this.marker.getPosition().toString();

      this.hotelData.map_coordinate = coord;
      this.hotelData.map_center = `${center}, ${zoom}`;

      this.initDefaultParams();
      for (const key in this.defaultHotelParams) {
        this.hotelParams[key] = this.hotelData[key];
      }
      this.hotelParams._method = "PUT";
      this.tabLoading = true;
      this.$http
        .post(`/hotel/${this.hotelData.id}`, this.hotelParams)
        .then((res) => {
          this.hotelData = res.data.data;
          this.tabLoading = false;
          this.drawMap();
        })
        .catch((err) => {
          this.tabLoading = false;
          if (err.response) {
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    cancelMapEdit() {
      this.mapEditMode = false;
      this.marker.setDraggable(false);
      this.marker.setMap(null);
      this.marker = this.createGoogleMapMarker(
        this.hotelData.map_coordinate,
        this.map
      );
    },
    getAvailableFacilityByCategoryId(id) {
      return this.availableFacilities.filter(
        (facility) => facility.category_id == id
      );
    },
    editRoomPricingModal(data) {
      console.log(data);
    },
    deleteRoomPricing(data) {
      console.log(data);
    },
    toastErrorMsg,
    createGoogleMap,
    createGoogleMapMarker,
    parseRoomPricing(pricings) {
      return pricings.map((pricing) => {
        if (pricing.type == "Weekday") {
          pricing.date = "Mon to Fri";
        }
        if (pricing.type == "Weekend") {
          pricing.date = "Sat and Sun";
        }
        return {
          id: pricing.id,
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
    dropzoneSendingMethodPut(file, xhr, formData) {
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
      this.map = this.createGoogleMap(
        this.hotelData.map_center,
        this.$refs.map
      );
      this.marker = this.createGoogleMapMarker(
        this.hotelData.map_coordinate,
        this.map
      );
    },
    getAvailableFacilityCategories() {
      this.$http
        .get("/facility/getAvailableCategoriesByType/hotel")
        .then((res) => {
          this.availableFacilityCategories = res.data.data;
        })
        .catch((err) => {
          if (err.response) {
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    getAvailableFacilities() {
      this.$http
        .get("/facility/getAllFacility")
        .then((res) => {
          this.availableFacilities = res.data.data;
        })
        .catch((err) => {
          if (err.response) {
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    setHeaderImage() {
      this.headerData = {
        name: this.hotelData.name,
        address: this.hotelData.address,
        headerImage:
          this.imagePath +
          this.getImageByType(this.hotelData.images, "banner").image_filename,
        mainImage:
          this.imagePath +
          this.getImageByType(this.hotelData.images, "main").image_filename,
      };
    },
    setDropzoneOptions() {
      this.$refs.dropzoneMainImage.setOption(
        "url",
        `${this.$http.defaults.baseURL}hotel_image/${
          this.getImageByType(this.hotelData.images, "main").id
        }`
      );
      this.$refs.dropzoneBannerImage.setOption(
        "url",
        `${this.$http.defaults.baseURL}hotel_image/${
          this.getImageByType(this.hotelData.images, "banner").id
        }`
      );
    },
    setSwiperImage() {
      this.swiperData = [];
      const commonImage = this.getImageByType(this.hotelData.images, "common");
      for (let i = 0; i < commonImage.length; i++) {
        this.swiperData.push({
          img: this.imagePath + commonImage[i].image_filename,
          id: commonImage[i].id,
        });
      }
    },
    setFacility() {
      for (let a = 0; a < this.availableFacilities.length; a++) {
        this.availableFacilities[a].value = "";
      }
      for (let i = 0; i < this.hotelData.facilities.length; i++) {
        const facilityId = this.hotelData.facilities[i].id;
        for (let j = 0; j < this.availableFacilities.length; j++) {
          const currentFacilityId = this.availableFacilities[j].id;
          if (currentFacilityId == facilityId) {
            this.availableFacilities[j].value = "Y";
          }
        }
      }
    },
    getData() {
      this.loading = true;
      this.$http
        .get(`/hotel/${this.hotelId}`)
        .then((res) => {
          this.hotelData = res.data.data;
          this.setHeaderImage();
          this.drawMap();
          this.setDropzoneOptions();
          this.setSwiperImage();
          this.setFacility();
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
      this.hotelParams = JSON.parse(JSON.stringify(this.defaultHotelParams));
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
.group-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 24px;
}
.group-title {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #35405a;
  margin-bottom: 4px;
  padding-top: 4px;
  width: 24%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}
.group-content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #dee2ee;
}
.facility-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}
.facility-icon {
  margin-right: 16px;
}
.facility-label {
  font-size: 14px;
  line-height: 22px;
  color: #35405a;
}
</style>
