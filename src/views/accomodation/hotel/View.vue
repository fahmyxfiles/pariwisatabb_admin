<template>
  <div>
    <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
      <div id="user-profile">
        <hotel-header
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
                        @click="editHotelModal()"
                      >
                        <feather-icon icon="Edit2Icon" class="mr-50" />
                        <span class="align-middle">Edit</span>
                      </b-button>
                    </b-form-group>
                  </div>
                  <div>
                    <h5 class="text-capitalize mb-75">Name</h5>
                    <b-card-text>
                      {{ hotelData.name }}
                    </b-card-text>
                  </div>
                  <div class="mt-2">
                    <h5 class="text-capitalize mb-75">Address</h5>
                    <b-card-text>
                      {{ hotelData.address }}
                    </b-card-text>
                  </div>
                  <div class="mt-2">
                    <h5 class="text-capitalize mb-75">Description</h5>
                    <b-card-text>
                      {{ hotelData.description }}
                    </b-card-text>
                  </div>
                </b-card>
                <b-card>
                  <!-- about -->
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize mb-75" style="margin-top: 3px">
                      Rooms
                    </h4>
                    <b-form-group class="ml-1">
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        size="sm"
                        @click="setCurrentTab(2)"
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
                            <h5>{{ data | printHotelImage(hotelData) }}</h5>
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
                          @click="addHotelImageModal()"
                        >
                          <feather-icon icon="PlusIcon" />
                          Add
                        </b-button>
                        <b-button
                          v-if="swiperData.length > 0"
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-primary"
                          @click="editHotelImageModal()"
                        >
                          <feather-icon icon="Edit2Icon" />
                          Edit
                        </b-button>
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-danger"
                          v-if="swiperData.length > 0"
                          @click="deleteHotelImage(swiperData[swiperCommonImageActiveIndex])"
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
                <b-card>
                  <div class="d-flex justify-content-between">
                    <h4 class="text-capitalize mb-75" style="margin-top: 3px">
                      Hotel Rooms
                    </h4>
                    <b-form-group class="ml-1">
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        size="sm"
                        @click="addHotelRoomModal()"
                      >
                        <feather-icon icon="PlusIcon" class="mr-50" />
                        <span class="align-middle">Add</span>
                      </b-button>
                    </b-form-group>
                  </div>
                  <div v-if="Object.keys(hotelData).length !== 0">
                    <b-row v-if="hotelData.rooms.length == 0">
                      <b-col md="12">
                        <h4 class="text-center">
                          No hotel room has been added
                        </h4>
                      </b-col>
                    </b-row>
                  </div>
                  <app-collapse accordion>
                    <app-collapse-item
                      v-for="(room, hotelRoomIndex) in hotelData.rooms"
                      :key="hotelRoomIndex"
                      :title="room.name"
                    >
                      {{ room.description }}
                      <b-row>
                        <b-col md="3">
                          <h5 class="text-capitalize mb-75 mt-2">
                            Number of Guest
                          </h5>
                          <b-card-text>
                            {{ room.num_of_guest }}
                          </b-card-text>
                        </b-col>
                        <b-col md="3">
                          <h5 class="text-capitalize mb-75 mt-2">Room size</h5>
                          <b-card-text>
                            {{ room.room_size }} &#13217;
                          </b-card-text>
                        </b-col>
                        <b-col md="3">
                          <h5 class="text-capitalize mb-75 mt-2">Bed size</h5>
                          <b-card-text class="text-capitalize">
                            {{ room.bed_size }}
                          </b-card-text>
                        </b-col>
                        <b-col md="3">
                          <h5 class="text-capitalize mb-75 mt-2">Action</h5>
                          <b-card-text class="text-capitalize">
                            <b-button
                              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                              variant="outline-primary"
                              class="btn-icon rounded-circle"
                              size="sm"
                              @click="editHotelRoomModal(room)"
                            >
                              <feather-icon icon="Edit2Icon" />
                            </b-button>

                            <b-button
                              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                              variant="outline-danger"
                              class="btn-icon rounded-circle ml-1"
                              size="sm"
                              @click="deleteHotelRoom(room)"
                            >
                              <feather-icon icon="TrashIcon" />
                            </b-button>
                          </b-card-text>
                        </b-col>
                      </b-row>
                      <hr />
                      <h5 class="text-capitalize mb-75" style="margin-top: 5px">
                        Room Facilities
                      </h5>
                      <b-form-checkbox-group
                        id="room-facilities-checkbox"
                        v-model="room.facilityList"
                      >
                        <div
                          v-for="(
                            facilityCategory, facilityCategoryIndex
                          ) in availableHotelRoomFacilityCategories"
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
                              ) in getAvailableHotelFacilityByCategoryId(
                                facilityCategory.id
                              )"
                              :key="facilityIndex"
                              class="facility-item"
                            >
                              <div class="facility-check-box">
                                <b-form-checkbox
                                  :value="facility.id"
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
                      </b-form-checkbox-group>
                      <b-row class="justify-content-center">
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-primary"
                          @click="saveHotelRoomFacilitiesEdit(room.id)"
                        >
                          <feather-icon icon="SaveIcon" class="mr-50" />
                          Save
                        </b-button>
                      </b-row>
                      <hr />
                      <div class="d-flex justify-content-between">
                        <h5
                          class="text-capitalize mb-75"
                          style="margin-top: 5px"
                        >
                          Pricing
                        </h5>
                        <b-form-group class="ml-1">
                          <b-button
                            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                            variant="outline-primary"
                            size="sm"
                            @click="addHotelRoomPricingModal(room.id)"
                          >
                            <feather-icon icon="PlusIcon" class="mr-50" />
                            <span class="align-middle">Add</span>
                          </b-button>
                        </b-form-group>
                      </div>
                      <div class="overflow-auto">
                        <b-table-lite
                          class=""
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
                              size="sm"
                              @click="
                                editHotelRoomPricingModal(room.id, data.item)
                              "
                            >
                              <feather-icon icon="Edit2Icon" />
                            </b-button>

                            <b-button
                              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                              variant="outline-danger"
                              class="btn-icon rounded-circle ml-md-1"
                              size="sm"
                              @click="deleteHotelRoomPricing(data.item)"
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
                    </app-collapse-item>
                  </app-collapse>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-show="activeTab === 3">
              <b-col md="12">
                <b-card
                  v-if="availableHotelFacilityCategories.length > 0"
                  title="Hotel Facilities"
                >
                  <div
                    v-for="(
                      facilityCategory, facilityCategoryIndex
                    ) in availableHotelFacilityCategories"
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
                        ) in getAvailableHotelFacilityByCategoryId(
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
                      @click="saveHotelFacilitiesEdit()"
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
      ref="modal-hotel-input"
      centered
      :title="modalTitle"
      :no-close-on-backdrop="true"
    >
      <b-overlay :show="modalLoading" spinner-variant="primary" rounded="sm">
        <b-form>
          <b-form-group>
            <label for="Regency">Regency :</label>
            <v-select
              v-model="hotelParams.regency_id"
              :options="availableRegencies"
              :reduce="(regency) => regency.id"
              label="name"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="name">Name :</label>
            <b-form-input
              id="name"
              v-model="hotelParams.name"
              type="text"
              placeholder="Hotel Name"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="address">Address :</label>
            <b-form-input
              id="address"
              v-model="hotelParams.address"
              type="text"
              placeholder="Hotel Address"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="postalCode">Postal Code :</label>
            <b-form-input
              id="postalCode"
              v-model="hotelParams.postal_code"
              type="text"
              placeholder="Hotel Postal Code"
              autocomplete="off"
            />
          </b-form-group>
          <b-form-group>
            <label for="description">Description :</label>
            <b-form-textarea
              id="description"
              v-model="hotelParams.description"
              placeholder="Hotel Description"
              rows="3"
              no-resize
              autocomplete="off"
            />
          </b-form-group>
        </b-form>
      </b-overlay>
    </b-modal>
    <b-modal
      ref="modal-hotel-room-input"
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
              v-model="hotelRoomParams.name"
              type="text"
              placeholder="Room Name"
            />
          </b-form-group>
          <b-form-group>
            <label for="description">Description :</label>
            <b-form-textarea
              id="description"
              v-model="hotelRoomParams.description"
              placeholder="Room Description"
              rows="3"
              no-resize
            />
          </b-form-group>
          <b-form-group>
            <label for="num_of_guest">Number Of Guest :</label>
            <b-form-input
              id="num_of_guest"
              v-model="hotelRoomParams.num_of_guest"
              type="number"
              placeholder="Number Of Guest"
            />
          </b-form-group>
          <b-form-group>
            <label for="room_size">Room Size :</label>
            <b-form-input
              id="room_size"
              v-model="hotelRoomParams.room_size"
              type="number"
              placeholder="Room Size"
            />
          </b-form-group>
          <b-form-group>
            <label for="bed_size">Bed Size :</label>
            <b-form-radio-group
              v-model="hotelRoomParams.bed_size"
              :options="bedSizeOptions"
              class="spacer"
            />
          </b-form-group>
        </b-form>
      </b-overlay>
    </b-modal>
    <b-modal
      ref="modal-hotel-room-pricing-input"
      centered
      :title="modalTitle"
      :no-close-on-backdrop="true"
    >
      <b-overlay :show="modalLoading" spinner-variant="primary" rounded="sm">
        <b-form>
          <b-form-group>
            <label for="type">Type :</label>
            <b-form-radio-group
              v-model="hotelRoomPricingParams.type"
              :options="pricingTypeOptions"
              class="spacer"
            />
          </b-form-group>
          <b-form-group>
            <label for="date">Date :</label>
            <b-form-input
              v-if="hotelRoomPricingParams.type == 'Weekday'"
              id="date"
              type="text"
              placeholder="date"
              value="Mon to Fri"
              :disabled="true"
            />
            <b-form-input
              v-if="hotelRoomPricingParams.type == 'Weekend'"
              id="date"
              type="text"
              placeholder="date"
              value="Sat and Sun"
              :disabled="true"
            />
            <b-form-datepicker
              v-if="hotelRoomPricingParams.type == 'Date'"
              id="date"
              v-model="hotelRoomPricingParams.date"
              class="mb-1"
            />
          </b-form-group>
          <b-form-group>
            <label for="price">Price :</label>
            <b-form-input
              id="price"
              v-model="hotelRoomPricingParams.price"
              type="number"
              placeholder="Price"
            />
          </b-form-group>
        </b-form>
      </b-overlay>
    </b-modal>
    <b-modal
      ref="modal-hotel-image-input"
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
              v-model="hotelImageParams.name"
              type="text"
              placeholder="Name"
            />
          </b-form-group>
          <b-form-group>
            <label for="room">Room :</label>
            <v-select
              v-model="hotelImageParams.hotel_room_id"
              :options="hotelData.rooms"
              :reduce="(room) => room.id"
              label="name"
              autocomplete="off"
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
import HotelHeader from "./HotelHeader.vue";

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
    HotelHeader,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      availableRegencies: [],
      availableHotelFacilityCategories: [],
      availableHotelRoomFacilityCategories: [],
      availableFacilities: [],
      dropzoneImageOptions: {
        url: "url",
        maxFilesize: 5.0,
        maxFiles: 1,
        autoProcessQueue: true,
        addRemoveLinks: false,
        acceptedFiles: "image/*",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          Accept: "application/json",
        },
      },
      modalTitle: "",
      dropzoneMainImageSelectedFile: null,
      dropzoneBannerImageSelectedFile: null,
      dropzoneCommonImageSelectedFile: null,
      hotelData: {},
      hotelRoomFacilities: [],
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
        postal_code: "",
        description: "",
        map_coordinate: "",
        map_center: "",
      },
      hotelParams: null,
      defaultHotelImageParams: {
        hotel_id: 0,
        hotel_room_id: null,
        name: "",
        type: "",
        file: null,
      },
      hotelImageParams: null,
      defaultHotelRoomParams: {
        hotel_id: 0,
        name: "",
        description: "",
        num_of_guest: 0,
        room_size: 0,
        bed_size: "",
      },
      hotelRoomParams: null,
      defaultHotelRoomPricingParams: {
        hotel_room_id: 0,
        type: "Weekday",
        date: null,
        price: 0,
      },
      hotelRoomPricingParams: null,
      bedSizeOptions: [
        { text: "Single", value: "single" },
        { text: "Double", value: "double" },
        { text: "Queen", value: "queen" },
        { text: "King", value: "king" },
        { text: "Twin", value: "twin" },
      ],
      pricingTypeOptions: [
        { text: "Weekday", value: "Weekday" },
        { text: "Weekend", value: "Weekend" },
        { text: "Custom Date", value: "Date" },
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
    this.hotelId = this.$route.params.id;
    this.initDefaultHotelParams();
    this.initDefaultHotelRoomParams();
    this.initDefaultHotelRoomPricingParams();
    this.initDefaultHotelImageParams();
    this.getAvailableRegencies();
    this.getAvailableFacilityCategories();
    this.getAvailableFacilities();
    this.getData();
  },
  methods: {
    setMapEditMode() {
      if (this.hotelData.map_coordinate == null) {
        this.marker = this.createGoogleMapMarker(
          "-5.466450019745824, 122.60788425767214",
          this.map
        );
      }
      this.marker.setDraggable(true);
      this.mapEditMode = true;
    },
    editHotelModal() {
      this.initDefaultHotelParams();
      for (const key in this.defaultHotelParams) {
        this.hotelParams[key] = this.hotelData[key];
      }
      this.modalTitle = "Edit Hotel";
      this.$refs["modal-hotel-input"].onOk = () =>
        this.editHotel(this.hotelParams);
      this.$refs["modal-hotel-input"].show();
    },
    editHotel(params) {
      this.modalLoading = true;
      params._method = "PUT";
      this.$http
        .post(`/hotel/${this.hotelData.id}`, params)
        .then((res) => {
          this.hotelData = res.data.data;
          this.drawMap();
          this.$refs["modal-hotel-input"].hide();
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
    addHotelRoomModal() {
      this.initDefaultHotelRoomParams();
      this.modalTitle = "Add Hotel Room";
      this.$refs["modal-hotel-room-input"].onOk = () =>
        this.addHotelRoom(this.hotelRoomParams);
      this.$refs["modal-hotel-room-input"].show();
    },
    addHotelRoom(params) {
      this.modalLoading = true;
      this.$http
        .post("/hotel_room", params)
        .then((res) => {
          this.getData();
          this.$refs["modal-hotel-room-input"].hide();
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
    editHotelRoomModal(params) {
      this.initDefaultHotelRoomParams();
      for (const key in this.defaultHotelRoomParams) {
        this.hotelRoomParams[key] = params[key];
      }
      this.modalTitle = `Edit Hotel Room : ${params.name}`;
      this.$refs["modal-hotel-room-input"].onOk = () =>
        this.editHotelRoom(params.id, this.hotelRoomParams);
      this.$refs["modal-hotel-room-input"].show();
    },
    editHotelRoom(id, params) {
      this.modalLoading = true;
      params._method = "PUT";
      this.$http
        .post(`/hotel_room/${id}`, params)
        .then((res) => {
          this.getData();
          this.$refs["modal-hotel-room-input"].hide();
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
    deleteHotelRoom(item) {
      this.$swal({
        title: "Are you sure?",
        text: `Room ${item.name} will be removed. All related data with this Hotel Room will also be removed.`,
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
            .delete(`/hotel_room/${item.id}`)
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Hotel Room has been deleted.",
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
    addHotelRoomPricingModal(room_id) {
      this.initDefaultHotelRoomPricingParams();
      this.hotelRoomPricingParams.hotel_room_id = room_id;
      this.modalTitle = "Add Hotel Room Pricing";
      this.$refs["modal-hotel-room-pricing-input"].onOk = () =>
        this.addHotelRoomPricing(this.hotelRoomPricingParams);
      this.$refs["modal-hotel-room-pricing-input"].show();
    },
    addHotelRoomPricing(params) {
      this.modalLoading = true;
      if (params.type == "Weekday" || params.type == "Weekend") {
        delete params.date;
      }
      this.$http
        .post("/hotel_room_pricing", params)
        .then((res) => {
          this.getData();
          this.$refs["modal-hotel-room-pricing-input"].hide();
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
    editHotelRoomPricingModal(room_id, params) {
      this.initDefaultHotelRoomPricingParams();
      for (const key in this.defaultHotelRoomPricingParams) {
        this.hotelRoomPricingParams[key] = params[key];
      }
      this.hotelRoomPricingParams.hotel_room_id = room_id;
      this.modalTitle = "Edit Hotel Room Pricing";
      this.$refs["modal-hotel-room-pricing-input"].onOk = () =>
        this.editHotelRoomPricing(params.id, this.hotelRoomPricingParams);
      this.$refs["modal-hotel-room-pricing-input"].show();
    },
    editHotelRoomPricing(id, params) {
      this.modalLoading = true;
      params._method = "PUT";
      if (params.type == "Weekday" || params.type == "Weekend") {
        delete params.date;
      }
      this.$http
        .post(`/hotel_room_pricing/${id}`, params)
        .then((res) => {
          this.getData();
          this.$refs["modal-hotel-room-pricing-input"].hide();
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
    deleteHotelRoomPricing(item) {
      this.$swal({
        title: "Are you sure?",
        text: "Room Pricing will be removed. All related data with this Hotel Room Pricing will also be removed.",
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
            .delete(`/hotel_room_pricing/${item.id}`)
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Hotel Room Pricing has been deleted.",
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
    editHotelImageModal() {
      this.initDefaultHotelImageParams();
      var currentImageId =
        this.swiperData[this.swiperCommonImageActiveIndex].id;
      var params = this.hotelData.images.find((image) => {
        return image.id === currentImageId;
      });
      for (const key in this.defaultHotelImageParams) {
        this.hotelImageParams[key] = params[key];
      }
      this.modalTitle = "Edit Hotel Image : " + params.name;
      this.$refs["modal-hotel-image-input"].onOk = () =>
        this.editHotelImage(params.id, this.hotelImageParams);
      this.$refs["modal-hotel-image-input"].show();
      this.$nextTick(() => {
        var currentImageId =
          this.swiperData[this.swiperCommonImageActiveIndex].id;
        var params = this.hotelData.images.find((image) => {
          return image.id === currentImageId;
        });
        this.$refs.dropzoneCommonImage.setOption("autoProcessQueue", false);
        const fileExt = params.image_filename.split(".").pop();
        const file = { size: 1, type: `image/${fileExt}` };
        const url = this.imagePath + params.image_filename;
        this.$refs.dropzoneCommonImage.manuallyAddFile(file, url);
      });
    },
    editHotelImage(id, params) {
      if (this.dropzoneCommonImageSelectedFile) {
        params.file = this.dropzoneCommonImageSelectedFile.dataURL;
      }
      params._method = "PUT";
      this.modalLoading = true;
      this.$http
        .post(`/hotel_image/${id}`, params)
        .then((res) => {
          this.modalLoading = false;
          this.$refs["modal-hotel-image-input"].hide();
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
    deleteHotelImage(item) {
      console.log(item)
      this.$swal({
        title: "Are you sure?",
        text: `Room Image : ${item.name} will be removed. All related data with this Hotel Image will also be removed.`,
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
            .delete(`/hotel_image/${item.id}`)
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Hotel Image has been deleted.",
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
    addHotelImageModal() {
      this.initDefaultHotelImageParams();
      this.hotelImageParams.hotel_id = this.hotelData.id;
      this.hotelImageParams.type = "common";
      this.modalTitle = "Add Hotel Image";
      this.$refs["modal-hotel-image-input"].onOk = () =>
        this.addHotelImage(this.hotelImageParams);
      this.$refs["modal-hotel-image-input"].show();
      this.$nextTick(() => {
        this.$refs.dropzoneCommonImage.setOption("autoProcessQueue", false);
      });
    },
    addHotelImage(params) {
      this.modalLoading = true;
      if (this.dropzoneCommonImageSelectedFile) {
        params.file = this.dropzoneCommonImageSelectedFile.dataURL;
      }
      if (params.hotel_room_id == null) {
        delete params.hotel_room_id;
      }
      let formData = new FormData();
      formData.append(
        "file",
        this.dropzoneCommonImageSelectedFile,
        this.dropzoneCommonImageSelectedFile.upload.filename
      );
      Object.keys(params).map((e) => {
        formData.append(e, params[e]);
      });
      this.$http
        .post("/hotel_image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.$refs["modal-hotel-image-input"].hide();
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
    saveHotelFacilitiesEdit() {
      const selectedFacilities = this.availableFacilities.filter(
        (facility) => facility.value == "Y"
      );
      const _facilities = [];
      for (let i = 0; i < selectedFacilities.length; i++) {
        _facilities.push(selectedFacilities[i].id);
      }
      this.tabLoading = true;
      this.$http
        .post(`/hotel/${this.hotelData.id}/syncFacilities`, {
          facilities: _facilities,
        })
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
    saveMapEdit() {
      this.mapEditMode = false;
      this.marker.setDraggable(false);
      const center = this.map.getCenter().toString().substr(1).slice(0, -1);
      const zoom = this.map.getZoom().toString();
      const coord = this.marker.getPosition().toString().substr(1).slice(0, -1);

      this.hotelData.map_coordinate = coord;
      this.hotelData.map_center = `${center}, ${zoom}`;

      this.initDefaultHotelParams();
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
      if (this.hotelData.map_coordinate !== null) {
        this.marker = this.createGoogleMapMarker(
          this.hotelData.map_coordinate,
          this.map
        );
      }
    },
    getAvailableHotelFacilityByCategoryId(id) {
      return this.availableFacilities.filter(
        (facility) => facility.category_id == id
      );
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
      var mainImage = this.getImageByType(this.hotelData.images, "main");
      if (mainImage.length !== 0) {
        formData.append("_method", "PUT");
      }
      formData.append("type", "main");
      formData.append("name", "Main Image");
      formData.append("hotel_id", this.hotelData.id);
    },
    dropzoneBannerImageSending(file, xhr, formData) {
      var bannerImage = this.getImageByType(this.hotelData.images, "banner");
      if (bannerImage.length !== 0) {
        formData.append("_method", "PUT");
      }
      formData.append("type", "banner");
      formData.append("name", "Banner Image");
      formData.append("hotel_id", this.hotelData.id);
    },
    dropzoneMainImageSuccess(file, response) {
      var mainImage = this.getImageByType(this.hotelData.images, "main");
      if (mainImage.length == 0) {
        this.hotelData.images.push(response.data);
      } else {
        mainImage.image_filename = response.data.image_filename;
      }
      this.setHeaderData();
      this.setDropzoneImages();
    },
    dropzoneBannerImageSuccess(file, response) {
      var bannerImage = this.getImageByType(this.hotelData.images, "banner");
      if (bannerImage.length == 0) {
        this.hotelData.images.push(response.data);
      } else {
        bannerImage.image_filename = response.data.image_filename;
      }
      this.setHeaderData();
      this.setDropzoneImages();
    },
    dropzoneMainImageError(file) {
      var error = JSON.parse(file.xhr.responseText);
      if (error !== null) {
        const errMsg = error.data;
        this.toastErrorMsg(errMsg);
      } else {
        this.toastErrorMsg(file.xhr.responseText);
      }
      this.setDropzoneImages();
    },
    dropzoneBannerImageError(file) {
      var error = JSON.parse(file.xhr.responseText);
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
      console.log(this.hotelData);
      if (this.hotelData.map_center == null) {
        this.hotelData.map_center =
          "-5.466090678870657, 122.60769753809814, 14";
      }

      this.map = this.createGoogleMap(
        this.hotelData.map_center,
        this.$refs.map
      );
      if (this.hotelData.map_coordinate !== null) {
        this.marker = this.createGoogleMapMarker(
          this.hotelData.map_coordinate,
          this.map
        );
      }
    },
    getAvailableRegencies() {
      this.$http
        .get("/hotel/getAvailableRegencies")
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
    getAvailableFacilityCategories() {
      this.$http
        .get("/facility/getAvailableCategoriesByType/hotel")
        .then((res) => {
          this.availableHotelFacilityCategories = res.data.data;
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
      this.$http
        .get("/facility/getAvailableCategoriesByType/hotel_room")
        .then((res) => {
          this.availableHotelRoomFacilityCategories = res.data.data;
          for (
            var i = 0;
            i < this.availableHotelRoomFacilityCategories.length;
            i++
          ) {
            this.availableHotelRoomFacilityCategories[i]["selected"] = [];
          }
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
      var mainImage = this.getImageByType(this.hotelData.images, "main");
      var bannerImage = this.getImageByType(this.hotelData.images, "banner");
      this.headerData.name = this.hotelData.name;
      this.headerData.address = this.hotelData.address;
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
      var mainImage = this.getImageByType(this.hotelData.images, "main");
      if (mainImage.length !== 0) {
        this.$refs.dropzoneMainImage.setOption(
          "url",
          `${this.$http.defaults.baseURL}hotel_image/${mainImage.id}`
        );
        this.$nextTick(() => {
          const mainImage = this.getImageByType(this.hotelData.images, "main");
          const fileExt = mainImage.image_filename.split(".").pop();
          const file = { size: 1, type: `image/${fileExt}` };
          const url = this.imagePath + mainImage.image_filename;
          this.$refs.dropzoneMainImage.manuallyAddFile(file, url);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.dropzoneMainImage.setOption(
            "url",
            `${this.$http.defaults.baseURL}hotel_image`
          );
        });
      }
      var bannerImage = this.getImageByType(this.hotelData.images, "banner");
      if (bannerImage.length !== 0) {
        this.$refs.dropzoneBannerImage.setOption(
          "url",
          `${this.$http.defaults.baseURL}hotel_image/${bannerImage.id}`
        );
        this.$nextTick(() => {
          const bannerImage = this.getImageByType(
            this.hotelData.images,
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
            `${this.$http.defaults.baseURL}hotel_image`
          );
        });
      }
    },
    setSwiperImage() {
      this.swiperData = [];
      const commonImage = this.getImageByType(this.hotelData.images, "common");
      if (Array.isArray(commonImage)) {
        for (let i = 0; i < commonImage.length; i++) {
          this.swiperData.push({
            img: this.imagePath + commonImage[i].image_filename,
            id: commonImage[i].id,
            name: commonImage[i].name,
            type: commonImage[i].type,
            hotelRoomId: commonImage[i].hotel_room_id,
          });
        }
      } else {
        this.swiperData.push({
          img: this.imagePath + commonImage.image_filename,
          id: commonImage.id,
          name: commonImage.name,
          type: commonImage.type,
          hotelRoomId: commonImage.hotel_room_id,
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
    setHotelRoomFacilities() {
      for (var i = 0; i < this.hotelData.rooms.length; i++) {
        this.hotelData.rooms[i]["facilityList"] = [];
        var currentRoom = this.hotelData.rooms[i];
        var facilityList = [];
        for (var j = 0; j < currentRoom.facilities.length; j++) {
          facilityList.push(currentRoom.facilities[j].id);
        }
        this.hotelData.rooms[i]["facilityList"] = facilityList;
      }
    },
    saveHotelRoomFacilitiesEdit(room_id) {
      var room = this.hotelData.rooms.find((room) => {
        return room.id === room_id;
      });
      var _facilities = room.facilityList;
      this.tabLoading = true;
      this.$http
        .post(`/hotel_room/${room_id}/syncFacilities`, {
          facilities: _facilities,
        })
        .then((res) => {
          this.tabLoading = false;
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
    getData() {
      this.loading = true;
      this.$http
        .get(`/hotel/${this.hotelId}`)
        .then((res) => {
          this.hotelData = res.data.data;
          this.setHeaderData();
          this.drawMap();
          this.setSwiperImage();
          this.setDropzoneImages();
          this.setHotelRoomFacilities();
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
    initDefaultHotelParams() {
      this.hotelParams = JSON.parse(JSON.stringify(this.defaultHotelParams));
    },
    initDefaultHotelRoomParams() {
      this.hotelRoomParams = JSON.parse(
        JSON.stringify(this.defaultHotelRoomParams)
      );
      this.hotelRoomParams.hotel_id = this.hotelId;
    },
    initDefaultHotelRoomPricingParams() {
      this.hotelRoomPricingParams = JSON.parse(
        JSON.stringify(this.defaultHotelRoomPricingParams)
      );
    },
    initDefaultHotelImageParams() {
      this.hotelImageParams = JSON.parse(
        JSON.stringify(this.defaultHotelImageParams)
      );
    },
    getImageByType,
    swiperSlideChange() {
      var currentSlide = this.$refs.swiperCommonImage.$swiper.activeIndex;
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
        this.setHotelRoomFacilities();
      } else if (tab == 3) {
        this.setFacilities();
      }
    },
    setCurrentTab(tab) {
      this.$refs.header.setCurrentTab(tab);
    },
  },
  filters: {
    printHotelImage(data, hotelData) {
      if (data.hotelRoomId !== null) {
        var room = hotelData.rooms.find((x) => {
          return x.id === data.hotelRoomId;
        });
        return `${room.name} - ${data.name}`;
      } else {
        return data.name;
      }
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
