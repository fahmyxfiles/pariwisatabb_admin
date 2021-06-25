<template>
  <b-overlay
    :show="loading"
    spinner-variant="primary"
    rounded="sm"
  >
    <div id="user-profile">
      <hotel-header
        :header-data="headerData"
        @tab-changed="tabChanged"
      />
      <!-- profile info  -->
      <section id="profile-info">
        <b-overlay
          :show="tabLoading"
          spinner-variant="primary"
          rounded="sm"
        >
          <b-row v-if="activeTab === 0">
            <!-- about suggested page and twitter feed -->
            <b-col
              lg="3"
              cols="12"
              order="2"
              order-lg="1"
            >
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
              <!--/ about suggested page and twitter feed -->
            </b-col>
            <!-- post -->
            <b-col
              lg="6"
              cols="12"
              order="1"
              order-lg="2"
            >
              <b-card title="Maps">
                <div 
                  id="map" 
                  ref="map" 
                />
              </b-card>
            </b-col>
            <!-- post -->

            <!-- latest photos suggestion and polls -->
            <b-col
              lg="3"
              cols="12"
              order="3"
            />
            <!--/ latest photos suggestion and polls -->
          </b-row>
        </b-overlay>
      </section>
      <!--/ profile info  -->
    </div>
  </b-overlay>
</template>

<script>
import {
  BCardText, BCard, BOverlay, BRow, BCol,
} from 'bootstrap-vue'

import { toastErrorMsg, getImageByType, createGoogleMap } from '@/libs/helpers'

import HotelHeader from './HotelHeader.vue'

export default {
  components: {
    BCardText,
    BCard,
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
        mainImage: require('@/assets/images/placeholders/16-9.png'),
      },
      hotelId: null,
      defaultParams: {
        regency_id: 0,
        name: '',
        address: '',
        postal_code: 0,
        description: '',
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
    }
  },
  created() {
    this.initDefaultParams()
    this.hotelId = this.$route.params.id
    // this.initDefaultParams();
    this.getData()
  },
  methods: {
    toastErrorMsg,
    createGoogleMap,
    drawMap(){
      return this.createGoogleMap(this.hotelData.map_coordinate, this.hotelData.map_center, this.$refs['map']);
    },
    getData() {
      this.loading = true
      this.$http
        .get(`/hotel/${this.hotelId}`)
        .then(res => {
          this.hotelData = res.data.data
          this.headerData = {
            name: this.hotelData.name,
            address: this.hotelData.address,
            headerImage: this.imagePath + getImageByType(this.hotelData.images, 'banner').image_filename,
            mainImage: this.imagePath + getImageByType(this.hotelData.images, 'main').image_filename,
          }
          this.drawMap();
          this.loading = false
        })
        .catch(err => {
          if (err.response) {
            const errMsg = err.response.data.message
            if (errMsg) {
              // Data not found
              this.$router.push({ path: 'error-404' })
              return this.toastErrorMsg(errMsg)
            }
          }
          this.$router.go(-1)
          return this.toastErrorMsg(err.message)
        })
    },
    initDefaultParams() {
      this.params = JSON.parse(JSON.stringify(this.defaultParams))
    },
    getImageByType,
    tabChanged(tab) {
      this.activeTab = tab
      this.tabLoading = true
      // Get Images
      if(tab === 0){
        this.$nextTick(() => {
          this.drawMap();
        });
      }
      setTimeout(() => {
        this.tabLoading = false
      }, 1000);
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-profile.scss";
#map {
  height: 600px;
  background: gray;
}
</style>
