<template>
  <div>
    <b-card title="Region">
      <!-- search input -->
      <div class="custom-search d-flex justify-content-between">
        <b-form-group>
          <div class="d-flex align-items-center">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="addModal()"
            >
              <feather-icon
                icon="PlusIcon"
                class="mr-50"
              />
              <span class="align-middle">Add</span>
            </b-button>
          </div>
        </b-form-group>
        <b-form-group>
          <div class="d-flex align-items-center">
            <b-input-group>
              <b-form-input
                v-model="query.keyword"
                placeholder="Search"
                type="text"
                class="d-inline-block"
              />
              <b-input-group-append>
                <b-button variant="outline-primary" @click="getData()">
                  <feather-icon icon="SearchIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-form-group>
      </div>
      <div class="d-flex justify-content-center mb-1" v-if="loading">
        <b-spinner variant="primary" label="Loading..." />
      </div>
    <!-- :key harus ada karena menggunakan vue 3, isi string dalam key harus sama dengan parameter kedua setelah v-for -->
    <b-row v-show="!loading" v-for="(row, index) in chunkedData" :key="index">
      <b-col cols="12">
        <b-card-group
          deck
          class="mb-0"
        >

          <!-- card 1 -->
          <b-card
            v-for="regency in row"
            :key="regency.id"
            :img-src="imagePath + regency.image_filename"
            :img-alt="regency.name"
            img-top
            no-body
          >
            <b-card-body>
              <b-card-title>{{ regency.name }}</b-card-title>
              <b-card-text>
                {{ regency.description }}
              </b-card-text>
            </b-card-body>
            <b-card-footer>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
                class="btn-icon rounded-circle"
              >
                <feather-icon icon="Edit2Icon" />
              </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-danger"
                class="btn-icon rounded-circle"
                style="margin-left: 5px;"
              >
                <feather-icon icon="TrashIcon" />
              </b-button>
                <small class="text-muted ml-1">Last updated {{ regency.updated_at | moment("from", "now") }}</small>
            </b-card-footer>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BAlert, BSpinner, BFormInput, BInputGroupAppend, BFormGroup, BInputGroup, BCardGroup, BCardFooter, BCard, BCardText, BButton, BRow, BCol, BImg, BCardBody, BCardTitle, BCardSubTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import _ from 'lodash'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    ToastificationContent,
    BAlert,
    BSpinner, 
    BFormInput, 
    BInputGroupAppend, 
    BFormGroup, 
    BInputGroup, 
    BCardGroup, 
    BCardFooter, 
    BCard,
    BCardText,
    BButton,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BRow,
    BCol,
    BLink,
    BImg,
  },
  directives: {
    Ripple,
  },
  // data apa saja yang akan di gunakan pada komponen
  data() {
    return {
      query : {
        keyword: '',
        limit: 15,
        page: 1,
      },
      modalTitle: '',
      availableProvinces: [],
      params: null,
      defaultParams: {
        'name' : '',
        'province_id' : 0,
        'description' : '',
        'image' : null,
        'timezone_offset' : null,
      },
      loading: true,
      data: [],
      // $imagepath adalah variabel global bawaan vue yang di definisikan di main.js, berfungsi untuk mendifinisikan lokasi backend laravel untuk import img dari backend laravel
      imagePath: this.$imagePath,
    }
  },
  methods: {
    getData(){
      this.loading = true;
      this.$http.get('/regency', { params: this.query }).then(res => { 
        this.loading = false;
        var _data = res.data.data;
        if(_data.length > 0){
          this.data = _data;
        }
        else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: "Tidak ada data ditemukan",
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
            timeout: 6000,
          });
        }
      });
    },
    getAvailableProvinces(){
      this.$http.get('/regency/getAvailableProvinces').then(res => { 
        this.availableProvinces = res.data.data;
      });
    },
    initDefaultParams(){
      this.params = JSON.parse(JSON.stringify(this.defaultParams));
    },
    addModal(){

    },
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  },
  computed: {
    // chunked berfungsi seperti slice untuk memilah data, this.data yaitu data yang di ambil dari API, kemudian angkanya di set sesuai kebutuhan (contoh card di view region)
    chunkedData() {
      return _.chunk(this.data, 3)
    },
  },
  // created adalah fungsi bawaan dari vue yang berfungsi saat halaman di load maka fungsi ini yang akan pertama kali di panggil
  created(){
    this.initDefaultParams();
    this.getData();
    this.getAvailableProvinces();
  },

}
</script>
