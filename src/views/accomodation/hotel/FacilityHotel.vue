<template>
  <div>
    <b-card>
      <b-overlay
        :show="loading"
        spinner-variant="primary"
        rounded="sm"
      >
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
                    <b-button
                      variant="outline-primary"
                      @click="getData()"
                    >
                      <feather-icon icon="SearchIcon" />
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </b-form-group>
          </div>

          <!-- table -->
          <vue-good-table v-if="rows.length > 0"
            :columns="columns"
            :rows="rows"
            :select-options="{
              enabled: false,
            }"
            :pagination-options="{
              enabled: true,
              perPage:query.limit
            }"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
            <span v-if="props.column.field === 'no'">
                {{ meta.from + props.index }}
              </span>
              <span v-else-if="props.column.field === 'category'">
                {{ getFacilityCategoryById(props.row.category_id) }}
              </span>
              <!-- Column: Action -->
              <span v-else-if="props.column.field === 'action'">
                <div class="spacer">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    @click="editModal(props.row)"
                  >
                    <feather-icon
                      icon="Edit2Icon"
                      size="12"
                    />
                    Edit
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    variant="outline-danger"
                    @click="deleteData(props.row)"
                  >
                    <feather-icon
                      icon="TrashIcon"
                      size="12"
                    />
                    Delete
                  </b-button>
                </div>
              </span>

              <!-- Column: Common -->
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>

            <!-- pagination -->
            <template
              slot="pagination-bottom"
            >
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0 mt-1">
                  <span class="text-nowrap ">
                    Showing 1 to
                  </span>
                  <b-form-select
                    v-model="query.limit"
                    :options="['5','15']"
                    class="mx-1"
                    @input="perPageChanged"
                  />
                  <span class="text-nowrap"> of {{ meta.total }} entries </span>
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
                      <feather-icon
                        icon="ChevronLeftIcon"
                        size="18"
                      />
                    </template>
                    <template #next-text>
                      <feather-icon
                        icon="ChevronRightIcon"
                        size="18"
                      />
                    </template>
                  </b-pagination>
                </div>
              </div>
            </template>
          </vue-good-table>
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
          <label for="facilityName">Facility Name :</label>
          <b-form-input
            id="facilityName"
            v-model="params.name"
            type="text"
            placeholder="Facility name"
          />
        </b-form-group>
        <b-form-group>
          <label for="kategori">Kategori</label>
          <v-select
            v-model="params.category_id"
            :options="availableFacilityCategories"
            :reduce="category => category.id"
            label="name"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BOverlay, BForm, BRow, BCol, BInputGroup, BInputGroupAppend, BButton, BSpinner, BCard, BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import VSelect from 'vue-select'
import { toastErrorMsg } from '@/libs/helpers'

export default {
  components: {
    BOverlay,
    VSelect,
    BForm,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BSpinner,
    BCard,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
  },
  directives: {
    Ripple,
  },
  filters: {
    uppercase(v) {
      return v.toUpperCase()
    },
  },
  data() {
    return {
      query: {
        keyword: '',
        limit: 15,
        page: 1,
        type: 'hotel',
      },
      modalTitle: '',
      availableFacilityCategories: [],
      params: null,
      defaultParams: {
        name: '',
        category_id: null,
      },
      loading: true,
      columns: [
        {
          label: 'No.',
          field: 'no',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Category',
          field: 'category',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      meta: {},
    }
  },
  created() {
    this.initDefaultParams()
    this.getData()
    this.getAvailableFacilityCategories()
  },
  methods: {
    getFacilityCategoryById(id){
      var result = this.availableFacilityCategories.find(facility => {return facility.id === id})
      if(result){
        return result.name
      }
      return ""
    },
    toastErrorMsg,
    perPageChanged(limit){
      console.log(limit)
      this.query.limit = limit
      this.getData()
    },
    pageChanged(page){
      this.query.page = page
      this.getData()
    },
    getData() {
      this.loading = true
      this.$http.get('/facility', { params: this.query }).then(res => {
        const _data = res.data.data
        if (_data.length > 0) {
          this.rows = _data
          this.meta = res.data.meta
        } else if (this.query.keyword) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'AlertCircleIcon',
              text: 'No data found with specified keyword',
              variant: 'danger',
            },
          },
          {
            position: 'top-center',
            timeout: 6000,
          })
        }
        this.$nextTick(() => {
          this.loading = false
        })
      }).catch(err => {
        if (err.response) {
          const errMsg = err.response.data.data
          if (errMsg) {
            return this.toastErrorMsg(errMsg)
          }
        }
        return this.toastErrorMsg(err.message)
      })
    },
    getAvailableFacilityCategories () {
      this.$http.get('/facility/getAvailableCategoriesByType/hotel').then(res => {
        this.availableFacilityCategories = res.data.data
      }).catch(err => {
        if (err.response) {
          const errMsg = err.response.data.data
          if (errMsg) {
            return this.toastErrorMsg(errMsg)
          }
        }
        return this.toastErrorMsg(err.message)
      })
    },
    initDefaultParams() {
      this.params = JSON.parse(JSON.stringify(this.defaultParams))
    },
    addModal() {
      this.initDefaultParams()
      this.modalTitle = 'Add Facility'
      this.$refs['modal-input'].onOk = () => this.addData(this.params)
      this.$refs['modal-input'].show()
    },
    addData(params) {
      this.$http.post('/facility', params)
        .then(res => {
          this.$refs['modal-input'].hide()
          this.getData()
        }).catch(err => {
          const errMsg = err.response.data.data
          this.toastErrorMsg(errMsg)
        })
    },
    editModal(item) {
      this.initDefaultParams()
      this.modalTitle = `Edit Facility : ${item.name}`
      this.params.name = item.name
      this.params.category_id = item.category_id
      this.$refs['modal-input'].onOk = () => this.editData(item.id, this.params)
      this.$refs['modal-input'].show()
    },
    editData(id, params) {
      params._method = 'PUT'
      this.$http.post(`/facility/${id}`, params)
        .then(res => {
          this.$refs['modal-input'].hide()
          this.getData()
        }).catch(err => {
          const errMsg = err.response.data.data
          this.toastErrorMsg(errMsg)
        })
    },
    deleteData(item) {
      this.$swal({
        title: 'Are you sure?',
        text: `Facility ${item.name} will be removed. All related data with this Facility will be deleted.`,
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
          this.$http.delete(`/facility/${item.id}`).then(res => {
            this.$swal({
              icon: 'success',
              title: 'Deleted!',
              text: 'Facility has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            this.getData()
          }).catch(err => {
            const errMsg = err.response.data.data
            this.toastErrorMsg(errMsg)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
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
</style>
