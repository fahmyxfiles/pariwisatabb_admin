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
                  @click="addGuestHouseModal()"
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
                    <b-button variant="outline-primary" @click="search()">
                      <feather-icon icon="SearchIcon" />
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-form-group>
          </div>
          <div v-if="data.length == 0" class="text-center">
            <p class="mb-2 pb-75">No data to show</p>
          </div>
          <div v-if="data.length > 0">
            <b-row v-for="(row, rowIndex) in chunkedData" :key="rowIndex">
              <b-col cols="12">
                <b-card-group class="mb-0" deck>
                  <!-- card 1 -->
                  <b-card
                    v-for="(guestHouse, guestHouseIndex) in row"
                    :key="guestHouseIndex"
                    img-top
                    no-body
                  >
                    <router-link
                      :to="{
                        name: 'guest-house-view',
                        params: { id: guestHouse.id },
                      }"
                    >
                      <b-card-img
                        :src="
                          getImageByType(guestHouse.images, 'main')
                            .image_filename
                        "
                        :alt="guestHouse.name"
                      />
                    </router-link>
                    <b-card-body>
                      <b-card-title>
                        <router-link
                          :to="{
                            name: 'guest-house-view',
                            params: { id: guestHouse.id },
                          }"
                        >
                          {{ guestHouse.name }}
                        </router-link>
                      </b-card-title>
                      <b-card-text
                        >{{ guestHouse.address }},
                        {{ guestHouse.regency.name }}</b-card-text
                      >
                    </b-card-body>
                    <b-card-footer>
                      <router-link
                        :to="{
                          name: 'guest-house-view',
                          params: { id: guestHouse.id },
                        }"
                      >
                        <b-button
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-primary"
                          class="btn-icon rounded-circle"
                        >
                          <feather-icon icon="EyeIcon" />
                        </b-button>
                      </router-link>
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-danger"
                        class="btn-icon rounded-circle"
                        style="margin-left: 5px"
                        @click="deleteData(guestHouse)"
                      >
                        <feather-icon icon="TrashIcon" />
                      </b-button>
                      <small class="text-muted ml-1"
                        >Last updated
                        {{ guestHouse.updated_at | moment("from", "now") }}
                      </small>
                    </b-card-footer>
                  </b-card>
                  <!-- mengisi sisa slot jika tidak ada, karena di set default 3 card -->
                  <!-- eslint-disable-next-line -->
                  <b-card v-for="_idx in 3 - row.length" no-body />
                </b-card-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-center mb-0 mt-1">
                    <span class="text-nowrap"> Showing 1 to </span>
                    <b-form-select
                      v-model="query.limit"
                      :options="['6', '12']"
                      class="mx-1"
                      @input="perPageChanged"
                    />
                    <span class="text-nowrap">
                      of {{ meta.total }} entries
                    </span>
                  </div>
                  <div>
                    <b-pagination
                      :value="1"
                      :total-rows="meta.total"
                      :per-page="query.limit"
                      first-number
                      last-number
                      align="right"
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mt-1 mb-0"
                      @input="pageChanged"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-overlay>
      <b-modal
        ref="modal-guest-house-input"
        centered
        :title="modalTitle"
        :no-close-on-backdrop="true"
      >
        <b-overlay :show="modalLoading" spinner-variant="primary" rounded="sm">
          <b-form>
            <b-form-group>
              <label for="Regency">Regency :</label>
              <v-select
                v-model="guestHouseParams.regency_id"
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
                v-model="guestHouseParams.name"
                type="text"
                placeholder="Guest House Name"
                autocomplete="off"
              />
            </b-form-group>
            <b-form-group>
              <label for="address">Address :</label>
              <b-form-input
                id="address"
                v-model="guestHouseParams.address"
                type="text"
                placeholder="Guest House Address"
                autocomplete="off"
              />
            </b-form-group>
            <b-form-group>
              <label for="postalCode">Postal Code :</label>
              <b-form-input
                id="postalCode"
                v-model="guestHouseParams.postal_code"
                type="text"
                placeholder="Guest House Postal Code"
                autocomplete="off"
              />
            </b-form-group>
            <b-form-group>
              <label for="description">Description :</label>
              <b-form-textarea
                id="description"
                v-model="guestHouseParams.description"
                placeholder="Guest House Description"
                rows="3"
                no-resize
                autocomplete="off"
              />
            </b-form-group>
          </b-form>
        </b-overlay>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import {
  BCardImg,
  BFormTextarea,
  BFormSelect,
  BFormRadioGroup,
  BOverlay,
  BAlert,
  BSpinner,
  BForm,
  BModal,
  BFormInput,
  BInputGroupAppend,
  BPagination,
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
import { toastErrorMsg, getImageByType } from "@/libs/helpers";

export default {
  components: {
    BCardImg,
    BFormTextarea,
    BFormSelect,
    VSelect,
    BFormRadioGroup,
    BOverlay,
    ToastificationContent,
    BPagination,
    BAlert,
    BSpinner,
    BForm,
    BModal,
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
      availableRegencies: [],
      query: {
        keyword: "",
        limit: 6,
        page: 1,
      },
      meta: {},
      loading: true,
      data: [],
      imagePath: this.$imagePath,
      defaultGuestHouseParams: {
        regency_id: 0,
        name: "",
        address: "",
        postal_code: "",
        description: "",
        map_coordinate: "",
        map_center: "",
      },
      guestHouseParams: null,
      defaultGuestHouseImageParams: {
        guest_house_id: 0,
        guest_house_room_id: null,
        name: "",
        type: "",
        file: null,
      },
      modalTitle: "",
      modalLoading: false,
    };
  },
  computed: {
    chunkedData() {
      return _.chunk(this.data, 3);
    },
  },
  created() {
    this.initDefaultGuestHouseParams();
    this.getAvailableRegencies();
    this.getData();
  },
  methods: {
    search(){
      this.query.page = 1;
      this.query.limit = 6;
      this.getData();
    },
    perPageChanged(limit) {
      this.query.limit = limit;
      this.getData();
    },
    pageChanged(page) {
      this.query.page = page;
      this.getData();
    },
    getAvailableRegencies() {
      this.$http
        .get("/guest_house/getAvailableRegencies")
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
    toastErrorMsg,
    deleteData(item) {
      this.$swal({
        title: 'Are you sure?',
        text: `Guest House ${item.name} will be removed. All related data with this Guest House will be deleted.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$http
            .delete(`/guest_house/${item.id}`)
            .then(res => {
              this.$swal({
                icon: 'success',
                title: 'Deleted!',
                text: 'Guest House has been deleted.',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
              this.getData()
            })
            .catch(err => {
              const errMsg = err.response.data.data
              this.toastErrorMsg(errMsg)
            })
        }
      })
    },
    getData() {
      this.loading = true;
      this.$http
        .get("/guest_house", { params: this.query })
        .then((res) => {
          const _data = res.data.data;
          if (_data.length > 0) {
            this.data = _data;
            this.meta = res.data.meta;
            for (let i = 0; i < this.data.length; i++) {
              const mainImage = this.getImageByType(
                this.data[i].images,
                "main"
              );
              if (mainImage.length == 0) {
                this.data[i].images.push({
                  guest_house_id: this.data[i].id,
                  guest_house_room_id: null,
                  id: null,
                  image_filename: require("@/assets/images/placeholders/16-9.png"),
                  name: "Main Image",
                  type: "main",
                });
              } else {
                mainImage.image_filename =
                  this.imagePath + mainImage.image_filename;
              }
            }
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
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    addGuestHouseModal() {
      this.initDefaultGuestHouseParams();
      this.modalTitle = "Add Guest House";
      this.$refs["modal-guest-house-input"].onOk = () =>
        this.addGuestHouse(this.guestHouseParams);
      this.$refs["modal-guest-house-input"].show();
    },
    addGuestHouse(params) {
      this.modalLoading = true;
      this.$http
        .post("/guest_house", params)
        .then((res) => {
          this.getData();
          this.$refs["modal-guest-house-input"].hide();
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
    initDefaultGuestHouseParams() {
      this.guestHouseParams = JSON.parse(
        JSON.stringify(this.defaultGuestHouseParams)
      );
    },
    getImageByType,
  },
};
</script>
