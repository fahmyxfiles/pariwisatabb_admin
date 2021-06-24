<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12">
          <!-- search input -->
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
        </b-col>
        <b-col cols="12">
          <b-card-group class="mb-0">
            <!-- card 1 -->
            <b-card
              :img-src="require('@/assets/images/slider/01.jpg')"
              img-alt="Card image cap"
              img-top
              no-body
            >
              <b-card-body>
                <b-card-title>Zenith Hotel</b-card-title>
                <b-card-text>
                  Zenith Hotel baubau merupakan hotel yang sangat bagus di
                  baubau saat ini, namun di kenal dengan harganya yang terlalu
                  mahal (too expensive).
                </b-card-text>
              </b-card-body>
              <b-card-footer>
                <small class="text-muted">Last updated 3 mins ago</small>
              </b-card-footer>
            </b-card>

            <!-- card 2 -->
            <b-card
              :img-src="require('@/assets/images/slider/05.jpg')"
              img-alt="Card image cap"
              img-top
              no-body
            >
              <b-card-body>
                <b-card-title>Calista Hotel</b-card-title>
                <b-card-text>
                  Hotel ini adalah hotel yang berlokasi di blabla, dan saat ini
                  menjadi hotel yang sangat hits karena biaya kamarnya yang
                  tidak terlalu mahal.
                </b-card-text>
              </b-card-body>
              <b-card-footer>
                <small class="text-muted">Last updated 3 mins ago</small>
              </b-card-footer>
            </b-card>

            <!-- card 3 -->
            <b-card
              :img-src="require('@/assets/images/slider/03.jpg')"
              img-alt="Card image cap"
              img-top
              no-body
            >
              <b-card-body>
                <b-card-title>Galaxy Inn</b-card-title>
                <b-card-text>
                  Hotel .
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

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
    };
  },
  computed: {},
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
