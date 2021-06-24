<template>
  <div>
    <b-card>
      <!-- search input -->
      <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
        <div>
          <div class="custom-search d-flex justify-content-between">
            <b-form-group>
              <div class="d-flex align-items-center">
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  @click="addModal()"
                >
                  <feather-icon icon="PlusIcon" class="mr-50" />
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
          <div class="text-center" v-if="data.length == 0">
            <p class="mb-2 pb-75">
              No data to show
            </p>
          </div>
          <div v-if="data.length > 0">
            <b-row v-for="(row, rowIndex) in chunkedData" :key="rowIndex">
              <b-col cols="12">
                <b-card-group class="mb-0" v-if="data.length > 0">
                  <!-- card 1 -->
                  <b-card
                    v-for="(hotel, hotelIndex) in row"
                    :key="hotelIndex"
                    :img-src="imagePath + getMainImage(hotel.images)"
                    :img-alt="hotel.name"
                    img-top
                    no-body
                  >
                    <b-card-body>
                      <b-card-title>{{ hotel.name }}</b-card-title>
                      <b-card-text
                        >{{ hotel.address }},
                        {{ hotel.regency.name }}</b-card-text
                      >
                    </b-card-body>
                    <b-card-footer>
                      <small class="text-muted ml-1"
                        >Last updated
                        {{ hotel.updated_at | moment("from", "now") }}
                      </small>
                    </b-card-footer>
                  </b-card>
                  <!-- mengisi sisa slot jika tidak ada, karena di set default 3 card -->
                  <b-card v-for="_idx in 3 - row.length" :key="_idx" no-body>
                  </b-card>
                </b-card-group>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-overlay>
    </b-card>
  </div>
</template>

<script>
import {
  BFormTextarea,
  BFormRadioGroup,
  BOverlay,
  BAlert,
  BSpinner,
  BForm,
  BFormInput,
  BInputGroupAppend,
  BFormGroup,
  BInputGroup,
  BCardSubTitle,
  BLink,
  BImg,
  BRow,
  BCol,
  BButton,
  BCardGroup,
  BCard,
  BCardText,
  BCardFooter,
  BCardBody,
  BCardTitle,
} from "bootstrap-vue";
import VSelect from "vue-select";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Ripple from "vue-ripple-directive";
import _ from "lodash";

export default {
  components: {
    BFormTextarea,
    VSelect,
    BFormRadioGroup,
    BOverlay,
    ToastificationContent,
    BAlert,
    BSpinner,
    BForm,
    BFormInput,
    BInputGroupAppend,
    BFormGroup,
    BInputGroup,
    BCardSubTitle,
    BLink,
    BImg,
    BRow,
    BCol,
    BButton,
    BCardGroup,
    BCard,
    BCardText,
    BCardFooter,
    BCardBody,
    BCardTitle,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      query: {
        keyword: "",
        limit: 6,
        page: 1,
      },
      loading: true,
      data: [],
      params: null,
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
      imagePath: this.$imagePath,
    };
  },
  computed: {
    chunkedData() {
      return _.chunk(this.data, 3);
    },
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http
        .get("/hotel", { params: this.query })
        .then((res) => {
          var _data = res.data.data;
          if (_data.length > 0) {
            this.data = _data;
          } else {
            // jika datanya kosong dan ada keyword yang di masukkan/mengetik maka jalankan toast
            if (this.query.keyword) {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: "Error",
                    icon: "AlertCircleIcon",
                    text: "No data found with specified keyword",
                    variant: "danger",
                  },
                },
                {
                  position: "top-center",
                  timeout: 6000,
                }
              );
            }
          }
          this.$nextTick(() => {
            this.loading = false;
          });
        })
        .catch((err) => {
          if (err.response) {
            var errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    getMainImage(images) {
      var image = images.find((x) => x.type === 'main');
      if (image) {
        return image.image_filename;
      }
      return "";
    },
    initDefaultParams() {
      this.params = JSON.parse(JSON.stringify(this.defaultParams));
    },
    toastErrorMsg(errMsg) {
      if (typeof errMsg === "object" && errMsg !== null) {
        const keys = Object.keys(errMsg);
        // iterate over object
        keys.forEach((key, index) => {
          var errArray = errMsg[key];
          errArray.forEach((_text) => {
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: "Error",
                  icon: "AlertCircleIcon",
                  text: _text,
                  variant: "danger",
                },
              },
              {
                position: "top-center",
                timeout: 6000,
              }
            );
          });
        });
      } else {
        this.$toast(
          {
            component: ToastificationContent,
            props: {
              title: "Error",
              icon: "AlertCircleIcon",
              text: errMsg,
              variant: "danger",
            },
          },
          {
            position: "top-center",
            timeout: 6000,
          }
        );
      }
    },
  },
  created() {
    this.initDefaultParams();
    this.getData();
  },
};
</script>
