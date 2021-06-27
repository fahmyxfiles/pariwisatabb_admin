<template>
  <div>
    <b-card>
      <b-overlay :show="loading" spinner-variant="primary" rounded="sm">
        <div>
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
          <div v-if="data.length == 0" class="text-center">
            <p class="mb-2 pb-75">
              No data to show
            </p>
          </div>
          <div v-if="data.length > 0">
            <!-- :key harus ada karena menggunakan vue 3, isi string dalam key harus sama dengan parameter kedua setelah v-for -->
            <b-row v-for="(row, rowIndex) in chunkedData" :key="rowIndex">
              <b-col cols="12">
                <b-card-group class="mb-0" deck>
                  <!-- card 1 -->
                  <b-card
                    v-for="(regency, regencyIndex) in row"
                    :key="regencyIndex"
                    :img-src="imagePath + regency.image_filename"
                    :img-alt="regency.name"
                    img-top
                    no-body
                  >
                    <b-card-body>
                      <small class="text-muted">{{
                        getProvince(regency.province_id)
                      }}</small>
                      <b-card-title style="margin-top: 5px;">{{
                        regency.name
                      }}</b-card-title>
                      <b-card-text>
                        {{ regency.description }}
                      </b-card-text>
                    </b-card-body>
                    <b-card-footer>
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-primary"
                        class="btn-icon rounded-circle"
                        @click="editModal(regency)"
                      >
                        <feather-icon icon="Edit2Icon" />
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        variant="outline-danger"
                        class="btn-icon rounded-circle"
                        style="margin-left: 5px;"
                        @click="deleteData(regency)"
                      >
                        <feather-icon icon="TrashIcon" />
                      </b-button>
                      <small class="text-muted ml-1"
                        >Last updated
                        {{ regency.updated_at | moment("from", "now") }}
                      </small>
                    </b-card-footer>
                  </b-card>
                  <b-card v-for="_idx in 3 - row.length" :key="_idx" no-body />
                </b-card-group>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-overlay>
    </b-card>
    <b-modal
      ref="modal-input"
      centered
      :title="modalTitle"
      :no-close-on-backdrop="true"
    >
      <b-form>
        <b-form-group>
          <label for="province">Province</label>
          <v-select
            v-model="params.province_id"
            :options="availableProvinces"
            :reduce="(province) => province.id"
            label="name"
          />
        </b-form-group>
        <b-form-group>
          <label for="regionName">Region Name :</label>
          <b-form-input
            id="regionName"
            v-model="params.name"
            type="text"
            placeholder="Region Name"
          />
        </b-form-group>
        <b-form-group>
          <label for="description">Description :</label>
          <b-form-textarea
            id="description"
            v-model="params.description"
            placeholder="Description"
            rows="3"
            no-resize
          />
        </b-form-group>
        <b-form-group>
          <label for="timezone">Timezone :</label>
          <b-form-radio-group
            v-model="params.timezone_offset"
            :options="timezoneOptions"
            class="spacer"
          />
        </b-form-group>
        <b-form-group>
          <label for="image">Image (Aspect Ratio 16:9):</label>
          <vue-dropzone
            id="dropzone"
            ref="dropzone"
            :options="dropzoneOptions"
            @vdropzone-file-added="dropzone_added"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BForm,
  BFormTextarea,
  BFormRadioGroup,
  BOverlay,
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
  BRow,
  BCol,
  BImg,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BLink,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import _ from "lodash";
import VSelect from "vue-select";
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { toastErrorMsg } from "@/libs/helpers";

export default {
  components: {
    vueDropzone,
    BFormTextarea,
    VSelect,
    BFormRadioGroup,
    BOverlay,
    BAlert,
    BSpinner,
    BForm,
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
  filters: {
    uppercase(v) {
      return v.toUpperCase();
    },
  },
  // data apa saja yang akan di gunakan pada komponen
  data() {
    return {
      dropzoneOptions: {
        url: "http://localhost",
        maxFilesize: 2.0,
        maxFiles: 1,
        autoProcessQueue: false,
        thumbnailWidth: 360,
        thumbnailHeight: 202,
        addRemoveLinks: false,
        acceptedFiles: "image/*",
      },
      dropzoneSelectedFile: null,
      query: {
        keyword: "",
        limit: 15,
        page: 1,
      },
      modalTitle: "",
      availableProvinces: [],
      params: null,
      defaultParams: {
        name: "",
        province_id: 0,
        description: "",
        image: null,
        timezone_offset: null,
      },
      timezoneOptions: [
        { text: "GMT+7", value: 25200 },
        { text: "GMT+8", value: 28800 },
        { text: "GMT+9", value: 32400 },
      ],
      loading: true,
      data: [],
      // $imagepath adalah variabel global bawaan vue yang di definisikan di main.js, berfungsi untuk mendifinisikan lokasi backend laravel untuk import img dari backend laravel
      imagePath: this.$imagePath,
    };
  },
  computed: {
    // chunked berfungsi seperti slice untuk memilah data, this.data yaitu data yang di ambil dari API, kemudian angkanya di set sesuai kebutuhan (contoh card di view region)
    chunkedData() {
      return _.chunk(this.data, 3);
    },
  },
  // created adalah fungsi bawaan dari vue yang berfungsi saat halaman di load maka fungsi ini yang akan pertama kali di panggil
  created() {
    this.initDefaultParams();
    this.getData();
    this.getAvailableProvinces();
  },
  methods: {
    toastErrorMsg,
    getData() {
      this.loading = true;
      this.$http
        .get("/regency", { params: this.query })
        .then((res) => {
          const _data = res.data.data;
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
            const errMsg = err.response.data.data;
            if (errMsg) {
              return this.toastErrorMsg(errMsg);
            }
          }
          return this.toastErrorMsg(err.message);
        });
    },
    getAvailableProvinces() {
      this.$http
        .get("/regency/getAvailableProvinces")
        .then((res) => {
          this.availableProvinces = res.data.data;
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
    getProvince(id) {
      const prov = this.availableProvinces.find((x) => x.id === id);
      if (prov) {
        return prov.name;
      }
      return "";
    },
    initDefaultParams() {
      this.params = JSON.parse(JSON.stringify(this.defaultParams));
    },
    addModal() {
      this.initDefaultParams();
      this.modalTitle = "Add Region";
      this.$refs["modal-input"].onOk = () => this.addData(this.params);
      this.$refs["modal-input"].show();
      this.$nextTick(() => {
        this.$refs.dropzone.removeAllFiles();
      });
    },
    addData(params) {
      if (this.dropzoneSelectedFile) {
        params.image = this.dropzoneSelectedFile.dataURL;
      }
      this.$http
        .post("/regency", params)
        .then((res) => {
          this.$refs["modal-input"].hide();
          this.getData();
        })
        .catch((err) => {
          const errMsg = err.response.data.data;
          this.toastErrorMsg(errMsg);
        });
    },
    editModal(item) {
      this.initDefaultParams();
      this.modalTitle = `Edit Region : ${item.name}`;
      this.params.province_id = item.province_id;
      this.params.name = item.name;
      this.params.description = item.description;
      this.params.timezone_offset = item.timezone_offset;
      this.$refs["modal-input"].onOk = () =>
        this.editData(item.id, this.params);
      this.$refs["modal-input"].show();
      this.$nextTick(() => {
        const fileExt = item.image_filename.split(".").pop();
        const file = { size: 1, type: `image/${fileExt}` };
        const url = this.imagePath + item.image_filename;
        this.$refs.dropzone.removeAllFiles();
        this.$refs.dropzone.manuallyAddFile(file, url);
        $(".dz-message").remove();
      });
    },
    editData(id, params) {
      params.image = this.dropzoneSelectedFile.dataURL;
      params._method = "PUT";
      this.$http
        .post(`/regency/${id}`, params)
        .then((res) => {
          this.$refs["modal-input"].hide();
          this.getData();
        })
        .catch((err) => {
          const errMsg = err.response.data.data;
          this.toastErrorMsg(errMsg);
        });
    },
    deleteData(item) {
      this.$swal({
        title: "Are you sure?",
        text: `Regency ${item.name} will be removed. All user with this Regency need to be updated with new Regency.`,
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
            .delete(`/regency/${item.id}`)
            .then((res) => {
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Regency has been deleted.",
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
    dropzone_added(file) {
      if (this.dropzoneSelectedFile !== null) {
        this.$refs.dropzone.removeFile(this.dropzoneSelectedFile);
      }
      this.dropzoneSelectedFile = file;
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
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
.dropzone .dz-preview .dz-image {
  width: 360px;
  height: 202px;
}
.vue-dropzone {
  padding-left: 30px;
  padding-right: 30px;
}
.dz-progress {
  display: none !important;
}
.dz-details {
  display: none !important;
}
</style>
