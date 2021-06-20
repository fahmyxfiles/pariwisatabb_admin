<template>
  <div>
    <b-card title="Access Control">
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
                  <b-button variant="outline-primary" @click="getData()">
                    <feather-icon icon="SearchIcon" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </b-form-group>
        </div>

        <!-- table -->
        <vue-good-table
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
            <span v-if="props.column.field === 'permissions'">
              <b-row v-for="permission in props.row.permissions" :key="permission.id">
                <span class="spacer" >
                  <b-badge variant="light-primary">
                    {{ permission.action | uppercase}}
                  </b-badge>
                  <b-badge variant="light-success">
                    {{ permission.subject | uppercase}}
                  </b-badge>
                </span>
              </b-row>
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
            slot-scope="props"
          >
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap ">
                  Showing 1 to
                </span>
                <b-form-select
                  v-model="query.limit"
                  :options="['5','15','30']"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage:value})"
                />
                <span class="text-nowrap"> of {{ props.total }} entries </span>
              </div>
              <div>
                <b-pagination
                  :value="1"
                  :total-rows="props.total"
                  :per-page="query.limit"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1 mb-0"
                  @input="(value)=>props.pageChanged({currentPage:value})"
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
          <label for="roleName">Role Name :</label>
          <b-form-input
            id="roleName"
            type="text"
            placeholder="Role Name"
            v-model="params.name"
          />
        </b-form-group>
        <b-form-group>
          <label for="permissions">Permissions</label>
          <v-select
            v-model="params.permissions"
            multiple
            :options="availablePermissions" 
            :reduce="permissions => permissions.id" 
            label="name"
            :close-on-select="false"
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
import store from '@/store/index'
import VSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BOverlay,
    ToastificationContent,
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
  data() {
    return {
      query : {
        keyword: '',
        limit: 15,
        page: 1,
      },
      modalTitle: '',
      availablePermissions: [],
      params: null,
      defaultParams: {
        'name' : '',
        'permissions' : [],
      },
      loading: true,
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Permissions',
          field: 'permissions',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http.get('/role',{ params: this.query }).then(res => { 
        var _data = res.data.data;
        if(_data.length > 0){
          this.rows = _data;
        }
        else {
          if(this.query.keyword){
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                text: "No data found",
                variant: 'danger',
              },
            },
            {
              position: 'top-center',
              timeout: 6000,
            });
          }
        }
        this.$nextTick(() => {
          this.loading = false;
        });
      }).catch(err => {
        if(err.response){
          var errMsg = err.response.data.data;
          if(errMsg){
            return this.toastErrorMsg(errMsg);
          }
        }
        return this.toastErrorMsg(err.message);
      });
    },
    getAvailablePermissions(){
      this.$http.get('/role/getAvailablePermissions').then(res => { 
        this.availablePermissions = res.data.data;
      }).catch(err => {
        if(err.response){
          var errMsg = err.response.data.data;
          if(errMsg){
            return this.toastErrorMsg(errMsg);
          }
        }
        return this.toastErrorMsg(err.message);
      });
    },
    initDefaultParams(){
      this.params = JSON.parse(JSON.stringify(this.defaultParams));
    },
    toastErrorMsg(errMsg){
      if(typeof errMsg === 'object' && errMsg !== null){
        const keys = Object.keys(errMsg);
        // iterate over object
        keys.forEach((key, index) => {
            console.log(`${key}: ${errMsg[key]}`);
            var errArray = errMsg[key];
            errArray.forEach(_text => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Error',
                  icon: 'AlertCircleIcon',
                  text: _text,
                  variant: 'danger',
                },
              },
              {
                position: 'top-center',
                timeout: 6000,
              });
            });
        });
      }
      else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Error',
            icon: 'AlertCircleIcon',
            text: errMsg,
            variant: 'danger',
          },
        },
        {
          position: 'top-center',
          timeout: 6000,
        });
      }
    },
    addModal(){
      this.initDefaultParams();
      this.modalTitle = "Add Access Control";
      this.$refs['modal-input'].onOk = () => this.addData(this.params);
      this.$refs['modal-input'].show();
    },
    addData(params){
      this.$http.post('/role', params)
      .then(res => {
        this.$refs['modal-input'].hide();
        this.getData();
      }).catch(err => {
        var errMsg = err.response.data.data;
        this.toastErrorMsg(errMsg);
      });
    },
    editModal(item){
      this.initDefaultParams();
      this.modalTitle = "Edit Access Control : " + item.name;
      var _permissions = [];
      for(var i = 0; i < item.permissions.length; i++){
        _permissions.push(item.permissions[i].id);
      }
      this.params.name = item.name;
      this.params.permissions = _permissions
      this.$refs['modal-input'].onOk = () => this.editData(item.id, this.params);
      this.$refs['modal-input'].show();
    },
    editData(id, params){
      params["_method"] = "PUT";
      this.$http.post('/role/' + id, params)
      .then(res => {
        this.$refs['modal-input'].hide();
        this.getData();
      }).catch(err => {
        var errMsg = err.response.data.data;
        this.toastErrorMsg(errMsg);
      });
    },
    deleteData(item) {
      this.$swal({
        title: 'Are you sure?',
        text: "Access Control " + item.name + " will be removed. All user with this Access Control need to be updated with new Access Control.",
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
          this.$http.delete('/role/' + item.id).then(res => {
            this.$swal({
              icon: 'success',
              title: 'Deleted!',
              text: 'Access Control has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            });
            this.getData();
          }).catch(err => {
            var errMsg = err.response.data.data;
            this.toastErrorMsg(errMsg);
          });
        }
      })
    },
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  },
  created() {
    this.initDefaultParams();
    this.getData();
    this.getAvailablePermissions();
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
