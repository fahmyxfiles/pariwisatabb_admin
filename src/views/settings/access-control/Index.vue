<template>
  <b-card title="Access Control">
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-button
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant="outline-primary"
          >
            <feather-icon
              icon="PlusIcon"
              class="mr-50"
            />
            <span class="align-middle">New Role</span>
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
      :rtl="direction"
      :select-options="{
        enabled: false,
      }"
      :pagination-options="{
        enabled: true,
        perPage:query.limit
      }"
      :isLoading="loading" 
    >
      <template slot="loadingContent">
        <div class="d-flex justify-content-center mb-1">
          <b-spinner variant="primary" label="Loading..." />
        </div>
      </template>
      <template
        slot="table-row"
        slot-scope="props"
      >
        <span v-if="props.column.field === 'permissions'">
          <b-row v-for="permission in props.row.permissions" :key="permission.id">
            <span class="permission-badge" >
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
          <div class="actions-button">
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
    <b-modal
      ref="modal-input"
      centered
    >
      Bonbon caramels muffin.
      Chocolate bar oat cake cookie pastry dragée pastry.
      Carrot cake chocolate tootsie roll chocolate bar candy canes biscuit.
      Gummies bonbon apple pie fruitcake icing biscuit apple pie jelly-o sweet roll.
      Toffee sugar plum sugar plum jelly-o jujubes bonbon dessert carrot cake.
      Cookie dessert tart muffin topping donut icing fruitcake. Sweet roll cotton candy dragée danish Candy canes chocolate bar cookie.
      Gingerbread apple pie oat cake. Carrot cake fruitcake bear claw. Pastry gummi bears marshmallow jelly-o.
    </b-modal>
  </b-card>
</template>

<script>
import {
  BRow, BInputGroup, BInputGroupAppend, BButton, BSpinner, BCard, BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    BRow, 
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
      fillableKey: ['name', 'permissions'],
      params: null,
      loading: true,
      dir: false,
      columns: [
        {
          label: 'Role',
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
        this.rows = res.data.data;
        this.loading = false;
      });
    },
    editModal(item){
      this.params = {};
      this.fillableKey.forEach(key => this.params[key] = item[key]);
      this.$refs['modal-input'].onOk = () => this.editData(this.params);
      this.$refs['modal-input'].show();
    },
    editData(item){
      console.log("editData(item)", item);
      this.$refs['modal-input'].hide();
    },
    deleteData(item) {
      this.$swal({
        title: 'Are you sure?',
        text: "Access Control " + item.name + " will be removed. All user with this Access Control need to be updated with new Access Control.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: 'Deleted!',
            text: 'Access Control has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.getData();
  },
}
</script>


<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
.permission-badge {
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
.actions-button {
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
