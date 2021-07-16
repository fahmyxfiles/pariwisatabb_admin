<template>
  <div>
    <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
      <div id="user-profile">
        <tourist-attraction-header
          ref="header"
          :header-data="headerData"
          @tab-changed="tabChanged"
        />
        <!-- profile info  -->
        <section id="profile-info">
          <b-overlay :show="tabLoading" spinner-variant="primary" rounded="sm">
            <b-row v-show="activeTab === 0">
              <!-- about suggested page and twitter feed -->
              <b-col lg="3" cols="12" order="2" order-lg="1">
                <b-card>
                  <!-- about -->
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize mb-75" style="margin-top: 3px">
                      Profile
                    </h4>
                    <b-form-group class="ml-1">
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        size="sm"
                        @click="editTouristAttractionModal()"
                      >
                        <feather-icon icon="Edit2Icon" class="mr-50" />
                        <span class="align-middle">Edit</span>
                      </b-button>
                    </b-form-group>
                  </div>
                  <div>
                    <h5 class="text-capitalize mb-75">Name</h5>
                    <b-card-text>
                      {{ touristAttractionData.name }}
                    </b-card-text>
                  </div>
                  <div class="mt-2">
                    <h5 class="text-capitalize mb-75">Address</h5>
                    <b-card-text>
                      {{ touristAttractionData.address }}
                    </b-card-text>
                  </div>
                  <div class="mt-2">
                    <h5 class="text-capitalize mb-75">Description</h5>
                    <b-card-text>
                      {{ touristAttractionData.description }}
                    </b-card-text>
                  </div>
                  <div class="mt-2">
                    <h5 class="text-capitalize mb-75">Instagram Hashtags</h5>
                    <b-card-text v-html="printHashtags(touristAttractionData.instagram_hashtags)"></b-card-text>
                  </div>
                </b-card>
                <!--/ about suggested page and twitter feed -->
              </b-col>
              <!-- post -->
              <b-col lg="6" cols="12" order="1" order-lg="2">
                <b-card>
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize mb-75" style="margin-top: 3px">
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
                    <h4 class="text-capitalize mb-75" style="margin-top: 3px">
                      Facilities
                    </h4>
                    <b-form-group class="ml-1">
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        size="sm"
                        @click="setCurrentTab(3)"
                      >
                        <feather-icon icon="Edit2Icon" class="mr-50" />
                        <span class="align-middle">Edit</span>
                      </b-button>
                    </b-form-group>
                  </div>
                  <b-card-text>
                    <ul class="pl-2">
                      <li
                        v-for="(
                          facility, index
                        ) in touristAttractionData.facilities"
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
                <b-card title="Tourist Attraction Images">
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
                        @vdropzone-success="dropzoneMainImageSuccess"
                        @vdropzone-error="dropzoneMainImageError"
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
                        @vdropzone-sending="dropzoneBannerImageSending"
                        @vdropzone-success="dropzoneBannerImageSuccess"
                        @vdropzone-error="dropzoneBannerImageError"
                      />
                    </b-col>
                  </b-row>
                  <h4 class="text-center mt-2 mb-1">Common Image</h4>
                  <b-row class="justify-content-center">
                    <b-col md="6">
                      <!-- swiper1 -->
                      <swiper
                        v-if="swiperData.length > 0"
                        ref="swiperCommonImage"
                        class="swiper-gallery gallery-top"
                        :options="swiperOptions"
                        @slideChange="swiperSlideChange"
                      >
                        <swiper-slide
                          v-for="(data, index) in swiperData"
                          :key="index"
                        >
                          <div class="text-center mb-2">
                            <h5>
                              {{
                                data
                                  | printTouristAttractionImage(
                                    touristAttractionData
                                  )
                              }}
                            </h5>
                          </div>
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
                        v-if="swiperData.length > 0"
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
                  <b-row v-if="swiperData.length == 0">
                    <b-col md="12">
                      <h5 class="text-center">No common image added</h5>
                    </b-col>
                  </b-row>
                  <b-row class="justify-content-center">
                    <b-col md="6">
                      <b-button-group
                        class="mt-2 d-flex justify-content-center"
                      >
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-success"
                          @click="addTouristAttractionImageModal()"
                        >
                          <feather-icon icon="PlusIcon" />
                          Add
                        </b-button>
                        <b-button
                          v-if="swiperData.length > 0"
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-primary"
                          @click="editTouristAttractionImageModal()"
                        >
                          <feather-icon icon="Edit2Icon" />
                          Edit
                        </b-button>
                        <b-button
                          v-if="swiperData.length > 0"
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-danger"
                          @click="
                            deleteTouristAttractionImage(
                              swiperData[swiperCommonImageActiveIndex]
                            )
                          "
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
            <!-- Tab Pricing -->
            <b-row v-show="activeTab === 2">
              <b-col lg="12">
                <b-card>
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize mb-75" style="margin-top: 3px">
                      Tourist Attraction Pricings
                    </h4>
                    <b-form-group class="ml-1">
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        size="sm"
                        @click="addTouristAttractionPricingModal()"
                      >
                        <feather-icon icon="PlusIcon" class="mr-50" />
                        <span class="align-middle">Add</span>
                      </b-button>
                    </b-form-group>
                  </div>
                  <div v-if="touristAttractionData.pricings == null">
                    <b-row>
                      <b-col md="12">
                        <h4 class="text-center">
                          No tourist attraction pricing has been added
                        </h4>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else class="overflow-auto">
                    <h5 class="my-1">
                        Per Person Pricing
                    </h5>
                    <b-table-lite
                      class=""
                      hover
                      :items="parsePricingForPerson(touristAttractionData.pricings)"
                      :fields="pricingPersonFields"
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
                          size="sm"
                          @click="
                            editTouristAttractionPricingModal(
                              data.item
                            )
                          "
                        >
                          <feather-icon icon="Edit2Icon" />
                        </b-button>

                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-danger"
                          class="btn-icon rounded-circle ml-md-1"
                          size="sm"
                          @click="deleteTouristAttractionPricing(data.item)"
                        >
                          <feather-icon icon="TrashIcon" />
                        </b-button>
                      </template>

                      <!-- Optional default data cell scoped slot -->
                      <template #cell()="data">
                        <i>{{ data.value }}</i>
                      </template>
                    </b-table-lite>
                    <h5 class="my-1">
                        Per Vehicle Pricing
                    </h5>
                    <b-table-lite
                      class=""
                      hover
                      :items="parsePricingForVehicle(touristAttractionData.pricings)"
                      :fields="pricingVehicleFields"
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
                          size="sm"
                          @click="
                            editTouristAttractionPricingModal(
                              data.item
                            )
                          "
                        >
                          <feather-icon icon="Edit2Icon" />
                        </b-button>

                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-danger"
                          class="btn-icon rounded-circle ml-md-1"
                          size="sm"
                          @click="deleteTouristAttractionPricing(data.item)"
                        >
                          <feather-icon icon="TrashIcon" />
                        </b-button>
                      </template>

                      <!-- Optional default data cell scoped slot -->
                      <template #cell()="data">
                        <i>{{ data.value }}</i>
                      </template>
                    </b-table-lite>
                  </div>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-show="activeTab === 3">
              <b-col md="12">
                <b-card
                  v-if="availableTouristAttractionFacilityCategories.length > 0"
                  title="Tourist Attraction Facilities"
                >
                  <div
                    v-for="(
                      facilityCategory, facilityCategoryIndex
                    ) in availableTouristAttractionFacilityCategories"
                    :key="facilityCategoryIndex"
                    class="group-wrapper"
                  >
                    <div class="group-title">
                      {{ facilityCategory.name }}
                    </div>
                    <div class="group-content">
                      <div
                        v-for="(
                          facility, facilityIndex
                        ) in getAvailableTouristAttractionFacilityByCategoryId(
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
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-primary"
                      @click="saveTouristAttractionFacilitiesEdit()"
                    >
                      <feather-icon icon="SaveIcon" class="mr-50" />
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
    <b-modal
      ref="modal-tourist-attraction-input"
      centered
      :title="modalTitle"
      :no-close-on-backdrop="true"
    >
      <b-overlay :show="modalLoading" spinner-variant="primary" rounded="sm">
        <b-form>
          <b-form-group>
            <label for="Regency">Regency :</label>
            <v-select
              v-model="touristAttractionParams.regency_id"
              :options="availableRegencies"
              :reduce="(regency) => regency.id"
              label="name"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
                <label for="Regency">Category :</label>
                <v-select
                v-model="touristAttractionParams.category_id"
                :options="availableCategories"
                :reduce="(category) => category.id"
                label="name"
                autocomplete="off"
                />
            </b-form-group>
          <b-form-group>
            <label for="name">Name :</label>
            <b-form-input
              id="name"
              v-model="touristAttractionParams.name"
              type="text"
              placeholder="Tourist Attraction Name"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="address">Address :</label>
            <b-form-input
              id="address"
              v-model="touristAttractionParams.address"
              type="text"
              placeholder="Tourist Attraction Address"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="postalCode">Postal Code :</label>
            <b-form-input
              id="postalCode"
              v-model="touristAttractionParams.postal_code"
              type="text"
              placeholder="Tourist Attraction Postal Code"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="description">Description :</label>
            <b-form-textarea
              id="description"
              v-model="touristAttractionParams.description"
              placeholder="Tourist Attraction Description"
              rows="3"
              no-resize
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
              <label for="instagram_hashtags">Instagram Hashtags :</label>
              <v-select
                v-model="touristAttractionParams.instagram_hashtags"
                multiple
                taggable
                push-tags
                label="title"
                autocomplete="off"
              />
            </b-form-group>
        </b-form>
      </b-overlay>
    </b-modal>
    <b-modal
      ref="modal-tourist-attraction-pricing-input"
      centered
      :title="modalTitle"
      :no-close-on-backdrop="true"
    >
      <b-overlay :show="modalLoading" spinner-variant="primary" rounded="sm">
        <b-form>
          <b-form-group>
            <label for="type">Category Type :</label>
            <b-form-radio-group
              v-model="touristAttractionPricingParams.category"
              :options="pricingCategoryOptions"
              class="spacer"
            />
          </b-form-group>
          <b-form-group v-if="touristAttractionPricingParams.category == 'person'">
            <label for="type">Category Type :</label>
            <b-form-radio-group
              v-model="touristAttractionPricingParams.category_type"
              :options="pricingCategoryTypePersonOptions"
              class="spacer"
            />
          </b-form-group>
          <b-row v-if="touristAttractionPricingParams.category == 'person'">
              <b-col md="6">
            <b-form-group>
                <label for="age_min">Min. Age :</label>
                <b-form-input
                id="age_min"
                v-model="touristAttractionPricingParams.age_min"
                type="number"
                placeholder="Min. Age"
                />
            </b-form-group>
              </b-col>
              <b-col md="6">
            <b-form-group>
                <label for="age_min">Max Age :</label>
                <b-form-input
                id="age_max"
                v-model="touristAttractionPricingParams.age_max"
                type="number"
                placeholder="Max Age"
                />
            </b-form-group>
              </b-col>
          </b-row>
          <b-form-group v-if="touristAttractionPricingParams.category == 'vehicle'">
            <label for="type">Category Type :</label>
            <b-form-radio-group
              v-model="touristAttractionPricingParams.category_type"
              :options="pricingCategoryTypeVehicleOptions"
              class="spacer"
            />
          </b-form-group>
          <b-form-group>
            <label for="type">Type :</label>
            <b-form-radio-group
              v-model="touristAttractionPricingParams.type"
              :options="pricingTypeOptions"
              class="spacer"
            />
          </b-form-group>
          <b-form-group>
            <label for="date">Date :</label>
            <b-form-input
              v-if="touristAttractionPricingParams.type == 'Weekday'"
              id="date"
              type="text"
              placeholder="date"
              value="Mon to Fri"
              :disabled="true"
            />
            <b-form-input
              v-if="touristAttractionPricingParams.type == 'Weekend'"
              id="date"
              type="text"
              placeholder="date"
              value="Sat and Sun"
              :disabled="true"
            />
            <b-form-datepicker
              v-if="touristAttractionPricingParams.type == 'Date'"
              id="date"
              v-model="touristAttractionPricingParams.date"
              class="mb-1"
            />
          </b-form-group>
          <b-form-group>
            <label for="price">Price :</label>
            <b-form-input
              id="price"
              v-model="touristAttractionPricingParams.price"
              type="number"
              placeholder="Price"
            />
          </b-form-group>
        </b-form>
      </b-overlay>
    </b-modal>
    <b-modal
      ref="modal-tourist-attraction-image-input"
      centered
      :title="modalTitle"
      :no-close-on-backdrop="true"
    >
      <b-overlay :show="modalLoading" spinner-variant="primary" rounded="sm">
        <b-form>
          <b-form-group>
            <label for="name">Name :</label>
            <b-form-input
              id="name"
              v-model="touristAttractionImageParams.name"
              type="text"
              placeholder="Name"
            />
          </b-form-group>
          <b-form-group>
            <label for="image">Image (Aspect Ratio 4:3):</label>
            <vue-dropzone
              id="dropzoneCommonImage"
              ref="dropzoneCommonImage"
              :options="dropzoneImageOptions"
              @vdropzone-file-added="dropzoneCommonImageAdded"
            />
          </b-form-group>
        </b-form>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import {
  BForm,
  BFormInput,
  BFormDatepicker,
  BModal,
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
  BFormCheckboxGroup,
  BFormTextarea,
  BFormGroup,
  BFormRadioGroup,
} from "bootstrap-vue";

import {
  toastErrorMsg,
  getImageByType,
  createGoogleMap,
  createGoogleMapMarker,
  capitalize,
} from "@/libs/helpers";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Ripple from "vue-ripple-directive";
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import VSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import TouristAttractionHeader from "./TouristAttractionHeader.vue";

export default {
  components: {
    BFormDatepicker,
    flatPickr,
    BFormRadioGroup,
    VSelect,
    BFormInput,
    BFormTextarea,
    BModal,
    BForm,
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
    BFormCheckboxGroup,
    TouristAttractionHeader,
  },
  directives: {
    Ripple,
  },
  filters: {
    printTouristAttractionImage(data) {
      return data.name;
    },
  },
  data() {
    return {
      availableRegencies: [],
      availableCategories: [],
      availableTouristAttractionFacilityCategories: [],
      availableFacilities: [],
      dropzoneImageOptions: {
        url: "url",
        maxFilesize: 5.0,
        maxFiles: 1,
        autoProcessQueue: true,
        addRemoveLinks: false,
        acceptedFiles: "image/*",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      },
      modalTitle: "",
      dropzoneMainImageSelectedFile: null,
      dropzoneBannerImageSelectedFile: null,
      dropzoneCommonImageSelectedFile: null,
      touristAttractionData: {},
      headerData: {
        name: "",
        address: "",
        headerImage: require("@/assets/images/profile/user-uploads/timeline.jpg"),
        mainImage: require("@/assets/images/placeholders/16-9.png"),
      },
      touristAttractionId: null,
      defaultTouristAttractionParams: {
        regency_id: 0,
        category_id: 0,
        name: "",
        address: "",
        postal_code: "",
        description: "",
        map_coordinate: "",
        map_center: "",
        instagram_hashtags: "",
      },
      touristAttractionParams: null,
      defaultTouristAttractionImageParams: {
        tourist_attraction_id: 0,
        name: "",
        type: "",
        file: null,
      },
      touristAttractionImageParams: null,
      defaultTouristAttractionPricingParams: {
        tourist_attraction_id: 0,
        type: "Weekday",
        category: "person",
        category_type: "all",
        age_min: 0,
        age_max: 60,
        date: null,
        price: 0,
      },
      touristAttractionPricingParams: null,
      pricingTypeOptions: [
        { text: "Weekday", value: "Weekday" },
        { text: "Weekend", value: "Weekend" },
        { text: "Custom Date", value: "Date" },
      ],
      pricingCategoryOptions: [
        { text: "Person", value: "person" },
        { text: "Vehicle", value: "vehicle" },
      ],
      pricingCategoryTypePersonOptions: [
        { text: 'All', value: 'all' },
        { text: 'Adult', value: 'adult' },
        { text: 'Child', value: 'child' },
      ],
      pricingCategoryTypeVehicleOptions: [
        { text: 'All', value: 'all' },
        { text: 'Car', value: 'car' },
        { text: 'Bus', value: 'bus' },
        { text: 'Motorbike', value: 'motorbike' },
      ],
      imagePath: this.$imagePath,
      loading: true,
      tabLoading: false,
      modalLoading: false,
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
      swiperCommonImageActiveIndex: 0,
      pricingPersonFields: [
        // A virtual column that doesn't exist in items
        "No",
        // A regular column
        { key: "category_type", label: "Person Type" },
        "age_min",
        "age_max",
        "type",
        "date",
        "price",
        // A virtual column made up from two fields
        { key: "action", label: "Action" },
      ],
      pricingVehicleFields: [
        // A virtual column that doesn't exist in items
        "No",
        // A regular column
        { key: "category_type", label: "Vehicle Type" },
        "type",
        "date",
        "price",
        // A virtual column made up from two fields
        { key: "action", label: "Action" },
      ],
    };
  },
  created() {
    this.touristAttractionId = this.$route.params.id;
    this.initDefaultTouristAttractionParams();
    this.initDefaultTouristAttractionPricingParams();
    this.initDefaultTouristAttractionImageParams();
    this.getAvailableRegencies();
    this.getAvailableCategories();
    this.getAvailableFacilityCategories();
    this.getAvailableFacilities();
    this.getData();
  },
  methods: {
    printHashtags(data){
        if(data){
            var strRet = "";
            for(var i = 0; i < data.length; i++){
                strRet += `<a href="https://instagram.com/explore/tags/${data[i].substr(1)}/" target="_blank">${data[i]}</a><br>`;
            }
            return strRet;
        }
        return "";
    },
    setMapEditMode() {
      if (this.touristAttractionData.map_coordinate == null) {
        this.marker = this.createGoogleMapMarker(
          "-5.466450019745824, 122.60788425767214",
          this.map
        );
      }
      this.marker.setDraggable(true);
      this.mapEditMode = true;
    },
    editTouristAttractionModal() {
      this.initDefaultTouristAttractionParams();
      for (const key in this.defaultTouristAttractionParams) {
        this.touristAttractionParams[key] = this.touristAttractionData[key];
      }
      this.modalTitle = "Edit Tourist Attraction";
      this.$refs["modal-tourist-attraction-input"].onOk = () =>
        this.editTouristAttraction(this.touristAttractionParams);
      this.$refs["modal-tourist-attraction-input"].show();
    },
    editTouristAttraction(params) {
      this.modalLoading = true;
      params._method = "PUT";
      params.instagram_hashtags = params.instagram_hashtags.join(",");
      this.$http
        .post(`/tourist_attraction/${this.touristAttractionData.id}`, params)
        .then((res) => {
          this.touristAttractionData = res.data.data;
          this.drawMap();
          this.$refs["modal-tourist-attraction-input"].hide();
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
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    addTouristAttractionPricingModal() {
      this.initDefaultTouristAttractionPricingParams();
      this.touristAttractionPricingParams.tourist_attraction_id =
        this.touristAttractionData.id;
      this.modalTitle = "Add Tourist Attraction Pricing";
      this.$refs["modal-tourist-attraction-pricing-input"].onOk = () =>
        this.addTouristAttractionPricing(this.touristAttractionPricingParams);
      this.$refs["modal-tourist-attraction-pricing-input"].show();
    },
    addTouristAttractionPricing(params) {
      this.modalLoading = true;
      if (params.type == "Weekday" || params.type == "Weekend") {
        delete params.date;
      }
      this.$http
        .post("/tourist_attraction_pricing", params)
        .then((res) => {
          this.getData();
          this.$refs["modal-tourist-attraction-pricing-input"].hide();
        })
        .catch((err) => {
          if (err.response) {
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    editTouristAttractionPricingModal(params) {
      this.initDefaultTouristAttractionPricingParams();
      for (const key in this.defaultTouristAttractionPricingParams) {
        this.touristAttractionPricingParams[key] = params[key];
      }
      this.touristAttractionPricingParams.tourist_attraction_id =
        this.touristAttractionData.id;
      console.log(this.touristAttractionPricingParams)
      this.modalTitle = "Edit Tourist Attraction Pricing";
      this.$refs["modal-tourist-attraction-pricing-input"].onOk = () =>
        this.editTouristAttractionPricing(
          params.id,
          this.touristAttractionPricingParams
        );
      this.$refs["modal-tourist-attraction-pricing-input"].show();
    },
    editTouristAttractionPricing(id, params) {
      this.modalLoading = true;
      params._method = "PUT";
      if (params.type == "Weekday" || params.type == "Weekend") {
        delete params.date;
      }
      this.$http
        .post(`/tourist_attraction_pricing/${id}`, params)
        .then((res) => {
          this.getData();
          this.$refs["modal-tourist-attraction-pricing-input"].hide();
        })
        .catch((err) => {
          if (err.response) {
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    deleteTouristAttractionPricing(item) {
      this.$swal({
        title: "Are you sure?",
        text: "Tourist Attraction Pricing will be removed. All related data with this Tourist Attraction Pricing will also be removed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$http
            .delete(`/tourist_attraction_pricing/${item.id}`)
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Tourist Attraction Pricing has been deleted.",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.getData();
            })
            .catch((err) => {
              const errMsg = err.response.data.data;
              this.toastErrorMsg(errMsg);
            });
        }
      });
    },
    editTouristAttractionImageModal() {
      this.initDefaultTouristAttractionImageParams();
      const currentImageId =
        this.swiperData[this.swiperCommonImageActiveIndex].id;
      const params = this.touristAttractionData.images.find(
        (image) => image.id === currentImageId
      );
      for (const key in this.defaultTouristAttractionImageParams) {
        this.touristAttractionImageParams[key] = params[key];
      }
      this.modalTitle = `Edit Tourist Attraction Image : ${params.name}`;
      this.$refs["modal-tourist-attraction-image-input"].onOk = () =>
        this.editTouristAttractionImage(
          params.id,
          this.touristAttractionImageParams
        );
      this.$refs["modal-tourist-attraction-image-input"].show();
      this.$nextTick(() => {
        const currentImageId =
          this.swiperData[this.swiperCommonImageActiveIndex].id;
        const params = this.touristAttractionData.images.find(
          (image) => image.id === currentImageId
        );
        this.$refs.dropzoneCommonImage.setOption("autoProcessQueue", false);
        const fileExt = params.image_filename.split(".").pop();
        const file = { size: 1, type: `image/${fileExt}` };
        const url = this.imagePath + params.image_filename;
        this.$refs.dropzoneCommonImage.manuallyAddFile(file, url);
      });
    },
    editTouristAttractionImage(id, params) {
      if (this.dropzoneCommonImageSelectedFile) {
        params.file = this.dropzoneCommonImageSelectedFile.dataURL;
      }
      params._method = "PUT";
      this.modalLoading = true;
      this.$http
        .post(`/tourist_attraction_image/${id}`, params)
        .then((res) => {
          this.modalLoading = false;
          this.$refs["modal-tourist-attraction-image-input"].hide();
          this.getData();
        })
        .catch((err) => {
          this.modalLoading = false;
          if (err.response) {
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    deleteTouristAttractionImage(item) {
      this.$swal({
        title: "Are you sure?",
        text: `Image : ${item.name} will be removed. All related data with this Tourist Attraction Image will also be removed.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$http
            .delete(`/tourist_attraction_image/${item.id}`)
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Tourist Attraction Image has been deleted.",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.getData();
            })
            .catch((err) => {
              const errMsg = err.response.data.data;
              this.toastErrorMsg(errMsg);
            });
        }
      });
    },
    addTouristAttractionImageModal() {
      this.initDefaultTouristAttractionImageParams();
      this.touristAttractionImageParams.tourist_attraction_id =
        this.touristAttractionData.id;
      this.touristAttractionImageParams.type = "common";
      this.modalTitle = "Add Tourist Attraction Image";
      this.$refs["modal-tourist-attraction-image-input"].onOk = () =>
        this.addTouristAttractionImage(this.touristAttractionImageParams);
      this.$refs["modal-tourist-attraction-image-input"].show();
      this.$nextTick(() => {
        this.$refs.dropzoneCommonImage.setOption("autoProcessQueue", false);
      });
    },
    addTouristAttractionImage(params) {
      this.modalLoading = true;
      if (this.dropzoneCommonImageSelectedFile) {
        params.file = this.dropzoneCommonImageSelectedFile.dataURL;
      }
      const formData = new FormData();
      formData.append(
        "file",
        this.dropzoneCommonImageSelectedFile,
        this.dropzoneCommonImageSelectedFile.upload.filename
      );
      Object.keys(params).map((e) => {
        formData.append(e, params[e]);
      });
      this.$http
        .post("/tourist_attraction_image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.$refs["modal-tourist-attraction-image-input"].hide();
          this.getData();
        })
        .catch((err) => {
          const errMsg = err.response.data.data;
          this.toastErrorMsg(errMsg);
        })
        .finally(() => {
          this.modalLoading = false;
        });
    },
    saveTouristAttractionFacilitiesEdit() {
      const selectedFacilities = this.availableFacilities.filter(
        (facility) => facility.value == "Y"
      );
      const _facilities = [];
      for (let i = 0; i < selectedFacilities.length; i++) {
        _facilities.push(selectedFacilities[i].id);
      }
      this.tabLoading = true;
      this.$http
        .post(
          `/tourist_attraction/${this.touristAttractionData.id}/syncFacilities`,
          {
            facilities: _facilities,
          }
        )
        .then((res) => {
          this.touristAttractionData = res.data.data;
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
    saveMapEdit() {
      this.mapEditMode = false;
      this.marker.setDraggable(false);
      const center = this.map.getCenter().toString().substr(1).slice(0, -1);
      const zoom = this.map.getZoom().toString();
      const coord = this.marker.getPosition().toString().substr(1).slice(0, -1);

      this.touristAttractionData.map_coordinate = coord;
      this.touristAttractionData.map_center = `${center}, ${zoom}`;

      this.initDefaultTouristAttractionParams();
      for (const key in this.defaultTouristAttractionParams) {
        this.touristAttractionParams[key] = this.touristAttractionData[key];
      }
      this.touristAttractionParams._method = "PUT";
      this.tabLoading = true;
      this.$http
        .post(
          `/tourist_attraction/${this.touristAttractionData.id}`,
          this.touristAttractionParams
        )
        .then((res) => {
          this.touristAttractionData = res.data.data;
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
      if (this.touristAttractionData.map_coordinate !== null) {
        this.marker = this.createGoogleMapMarker(
          this.touristAttractionData.map_coordinate,
          this.map
        );
      }
    },
    getAvailableTouristAttractionFacilityByCategoryId(id) {
      return this.availableFacilities.filter(
        (facility) => facility.category_id == id
      );
    },
    toastErrorMsg,
    createGoogleMap,
    createGoogleMapMarker,
    parsePricingForPerson(pricings) {
        var personPricing = pricings.filter(pricing => { return pricing.category == 'person'; });
      return personPricing.map((pricing) => {
        if (pricing.type == "Weekday") {
          pricing.date = "Mon to Fri";
        }
        if (pricing.type == "Weekend") {
          pricing.date = "Sat and Sun";
        }
        return {
          id: pricing.id,
          category: pricing.category,
          category_type: pricing.category_type,
          age_min: pricing.age_min,
          age_max: pricing.age_max,
          type: pricing.type,
          date: pricing.date,
          price: pricing.price,
        };
      });
    },
    parsePricingForVehicle(pricings) {
        var vehiclePricing = pricings.filter(pricing => { return pricing.category == 'vehicle'; });
      return vehiclePricing.map((pricing) => {
        if (pricing.type == "Weekday") {
          pricing.date = "Mon to Fri";
        }
        if (pricing.type == "Weekend") {
          pricing.date = "Sat and Sun";
        }
        return {
          id: pricing.id,
          category: pricing.category,
          category_type: pricing.category_type,
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
    dropzoneCommonImageAdded(file) {
      if (this.dropzoneCommonImageSelectedFile !== null) {
        this.$refs.dropzoneCommonImage.removeFile(
          this.dropzoneCommonImageSelectedFile
        );
      }
      this.dropzoneCommonImageSelectedFile = file;
    },
    dropzoneBannerImageAdded(file) {
      if (this.dropzoneBannerImageSelectedFile !== null) {
        this.$refs.dropzoneBannerImage.removeFile(
          this.dropzoneBannerImageSelectedFile
        );
      }
      this.dropzoneBannerImageSelectedFile = file;
    },
    dropzoneMainImageSending(file, xhr, formData) {
      const mainImage = this.getImageByType(
        this.touristAttractionData.images,
        "main"
      );
      if (mainImage.length !== 0) {
        formData.append("_method", "PUT");
      }
      formData.append("type", "main");
      formData.append("name", "Main Image");
      formData.append("tourist_attraction_id", this.touristAttractionData.id);
    },
    dropzoneBannerImageSending(file, xhr, formData) {
      const bannerImage = this.getImageByType(
        this.touristAttractionData.images,
        "banner"
      );
      if (bannerImage.length !== 0) {
        formData.append("_method", "PUT");
      }
      formData.append("type", "banner");
      formData.append("name", "Banner Image");
      formData.append("tourist_attraction_id", this.touristAttractionData.id);
    },
    dropzoneMainImageSuccess(file, response) {
      const mainImage = this.getImageByType(
        this.touristAttractionData.images,
        "main"
      );
      if (mainImage.length == 0) {
        this.touristAttractionData.images.push(response.data);
      } else {
        mainImage.image_filename = response.data.image_filename;
      }
      this.setHeaderData();
      this.setDropzoneImages();
    },
    dropzoneBannerImageSuccess(file, response) {
      const bannerImage = this.getImageByType(
        this.touristAttractionData.images,
        "banner"
      );
      if (bannerImage.length == 0) {
        this.touristAttractionData.images.push(response.data);
      } else {
        bannerImage.image_filename = response.data.image_filename;
      }
      this.setHeaderData();
      this.setDropzoneImages();
    },
    dropzoneMainImageError(file) {
      const error = JSON.parse(file.xhr.responseText);
      if (error !== null) {
        const errMsg = error.data;
        this.toastErrorMsg(errMsg);
      } else {
        this.toastErrorMsg(file.xhr.responseText);
      }
      this.setDropzoneImages();
    },
    dropzoneBannerImageError(file) {
      const error = JSON.parse(file.xhr.responseText);
      if (error !== null) {
        const errMsg = error.data;
        this.toastErrorMsg(errMsg);
      } else {
        this.toastErrorMsg(file.xhr.responseText);
      }
      this.setDropzoneImages();
    },
    drawMap() {
      this.$refs.map.innerHTML = "";
      if (this.touristAttractionData.map_center == null) {
        this.touristAttractionData.map_center =
          "-5.466090678870657, 122.60769753809814, 14";
      }

      this.map = this.createGoogleMap(
        this.touristAttractionData.map_center,
        this.$refs.map
      );
      if (this.touristAttractionData.map_coordinate !== null) {
        this.marker = this.createGoogleMapMarker(
          this.touristAttractionData.map_coordinate,
          this.map
        );
      }
    },
    getAvailableRegencies() {
      this.$http
        .get("/tourist_attraction/getAvailableRegencies")
        .then((res) => {
          this.availableRegencies = res.data.data;
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
    getAvailableCategories() {
      this.$http
        .get('/tourist_attraction/getAvailableCategories')
        .then(res => {
          this.availableCategories = res.data.data
        })
        .catch(err => {
          if (err.response) {
            const errMsg = err.response.data.data
            if (errMsg) {
              return this.toastErrorMsg(errMsg)
            }
          }
          return this.toastErrorMsg(err.message)
        })
    },
    getAvailableFacilityCategories() {
      this.$http
        .get("/facility/getAvailableCategoriesByType/tourist_attraction")
        .then((res) => {
          this.availableTouristAttractionFacilityCategories = res.data.data;
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
    setHeaderData() {
      const mainImage = this.getImageByType(
        this.touristAttractionData.images,
        "main"
      );
      const bannerImage = this.getImageByType(
        this.touristAttractionData.images,
        "banner"
      );
      this.headerData.name = this.touristAttractionData.name;
      this.headerData.address = this.touristAttractionData.address;
      if (mainImage.length !== 0) {
        this.headerData.mainImage = this.imagePath + mainImage.image_filename;
      }
      if (bannerImage.length !== 0) {
        this.headerData.headerImage =
          this.imagePath + bannerImage.image_filename;
      }
    },
    setDropzoneImages() {
      this.$refs.dropzoneMainImage.removeAllFiles();
      this.$refs.dropzoneBannerImage.removeAllFiles();
      const mainImage = this.getImageByType(
        this.touristAttractionData.images,
        "main"
      );
      if (mainImage.length !== 0) {
        this.$refs.dropzoneMainImage.setOption(
          "url",
          `${this.$http.defaults.baseURL}tourist_attraction_image/${mainImage.id}`
        );
        this.$nextTick(() => {
          const mainImage = this.getImageByType(
            this.touristAttractionData.images,
            "main"
          );
          const fileExt = mainImage.image_filename.split(".").pop();
          const file = { size: 1, type: `image/${fileExt}` };
          const url = this.imagePath + mainImage.image_filename;
          this.$refs.dropzoneMainImage.manuallyAddFile(file, url);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.dropzoneMainImage.setOption(
            "url",
            `${this.$http.defaults.baseURL}tourist_attraction_image`
          );
        });
      }
      const bannerImage = this.getImageByType(
        this.touristAttractionData.images,
        "banner"
      );
      if (bannerImage.length !== 0) {
        this.$refs.dropzoneBannerImage.setOption(
          "url",
          `${this.$http.defaults.baseURL}tourist_attraction_image/${bannerImage.id}`
        );
        this.$nextTick(() => {
          const bannerImage = this.getImageByType(
            this.touristAttractionData.images,
            "banner"
          );
          const fileExt = bannerImage.image_filename.split(".").pop();
          const file = { size: 1, type: `image/${fileExt}` };
          const url = this.imagePath + bannerImage.image_filename;
          this.$refs.dropzoneBannerImage.manuallyAddFile(file, url);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.dropzoneBannerImage.setOption(
            "url",
            `${this.$http.defaults.baseURL}tourist_attraction_image`
          );
        });
      }
    },
    setSwiperImage() {
      this.swiperData = [];
      const commonImage = this.getImageByType(
        this.touristAttractionData.images,
        "common"
      );
      if (Array.isArray(commonImage)) {
        for (let i = 0; i < commonImage.length; i++) {
          this.swiperData.push({
            img: this.imagePath + commonImage[i].image_filename,
            id: commonImage[i].id,
            name: commonImage[i].name,
            type: commonImage[i].type,
          });
        }
      } else {
        this.swiperData.push({
          img: this.imagePath + commonImage.image_filename,
          id: commonImage.id,
          name: commonImage.name,
          type: commonImage.type,
        });
      }
      if (this.swiperData.length > 0) {
        this.$nextTick(() => {
          const swiperCommonImage = this.$refs.swiperCommonImage.$swiper;
          const swiperThumbs = this.$refs.swiperThumbs.$swiper;
          swiperCommonImage.controller.control = swiperThumbs;
          swiperThumbs.controller.control = swiperCommonImage;
        });
      }
    },
    setFacilities() {
      for (let a = 0; a < this.availableFacilities.length; a++) {
        this.availableFacilities[a].value = "";
      }
      for (let i = 0; i < this.touristAttractionData.facilities.length; i++) {
        const facilityId = this.touristAttractionData.facilities[i].id;
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
        .get(`/tourist_attraction/${this.touristAttractionId}`)
        .then((res) => {
          this.touristAttractionData = res.data.data;
          this.setHeaderData();
          this.drawMap();
          this.setSwiperImage();
          this.setDropzoneImages();
          this.setFacilities();
          // next tick adalah fungsi bawaan vue js yang berfungsi untuk mengeksekusi perintah apabila komponen sdh di render
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
    initDefaultTouristAttractionParams() {
      this.touristAttractionParams = JSON.parse(
        JSON.stringify(this.defaultTouristAttractionParams)
      );
    },
    initDefaultTouristAttractionPricingParams() {
      this.touristAttractionPricingParams = JSON.parse(
        JSON.stringify(this.defaultTouristAttractionPricingParams)
      );
    },
    initDefaultTouristAttractionImageParams() {
      this.touristAttractionImageParams = JSON.parse(
        JSON.stringify(this.defaultTouristAttractionImageParams)
      );
    },
    getImageByType,
    swiperSlideChange() {
      const currentSlide = this.$refs.swiperCommonImage.$swiper.activeIndex;
      this.swiperCommonImageActiveIndex = currentSlide;
    },
    tabChanged(tab) {
      this.activeTab = tab;

      if (tab == 0) {
        this.drawMap();
      } else if (tab == 1) {
        this.setSwiperImage();
        this.setDropzoneImages();
      } else if (tab == 2) {
      } else if (tab == 3) {
        this.setFacilities();
      }
    },
    setCurrentTab(tab) {
      this.$refs.header.setCurrentTab(tab);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";
@import "@core/scss/vue/libs/swiper.scss";
#map {
  height: calc(100vh * 0.5);
  background: gray;
}
.spacer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  & > * {
    margin-left: 0.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
}
.dropzone .dz-preview .dz-image img {
  width: inherit !important;
  height: fit-content !important;
  max-height: 230px;
}
.dz-message {
  display: none !important;
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
