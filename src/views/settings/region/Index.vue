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
    <b-row v-for="(row, index) in chunkedData" :key="index">
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
              <small class="text-muted">Last updated 3 mins ago</small>
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
  BSpinner, BFormInput, BInputGroupAppend, BFormGroup, BInputGroup, BCardGroup, BCardFooter, BCard, BCardText, BButton, BRow, BCol, BImg, BCardBody, BCardTitle, BCardSubTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import _ from 'lodash'

export default {
  components: {
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
        'permissions' : [],
      },
      loading: true,
      data: [],
      imagePath: this.$imagePath,
    }
  },
  methods: {
    getData(){
      this.loading = true;
      this.$http.get('/regency').then(res => { 
        this.data = res.data.data;
        this.loading = false;
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
    chunkedData() {
      return _.chunk(this.data, 4)
    },
  },
  created(){
    this.initDefaultParams();
    this.getData();
    this.getAvailableProvinces();
  },

}
</script>
