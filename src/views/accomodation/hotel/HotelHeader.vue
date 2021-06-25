<template>
  <b-card
    class="profile-header mb-2"
    :img-src="headerData.headerImage"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-img
            :src="headerData.mainImage"
            rounded
            fluid
            :alt="headerData.name"
          />
        </div>
        <!-- profile title -->
        <div class="profile-title rounded">
          <h2 class="text-white">
            {{ headerData.name }}
          </h2>
          <p class="text-white mb-0">
            {{ headerData.address }}
          </p>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar toggleable="md" type="light">
        <!-- toggle button -->
        <b-navbar-toggle class="ml-auto" target="nav-text-collapse">
          <feather-icon icon="AlignJustifyIcon" size="21" />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse id="nav-text-collapse" is-nav>
          <b-tabs pills class="profile-tabs mt-1 mt-md-0" nav-class="mb-0">
            <template #tabs-start>
              <b-nav-item role="presentation" active class="font-weight-bold">
                <span class="d-none d-md-block">Main</span>
                <feather-icon icon="HomeIcon" class="d-block d-md-none" />
              </b-nav-item>
              <b-nav-item role="presentation" class="font-weight-bold">
                <span class="d-none d-md-block">Images</span>
                <feather-icon icon="ImageIcon" class="d-block d-md-none" />
              </b-nav-item>
              <b-nav-item role="presentation" class="font-weight-bold">
                <span class="d-none d-md-block">Rooms</span>
                <feather-icon icon="TvIcon" class="d-block d-md-none" />
              </b-nav-item>
              <b-nav-item role="presentation" class="font-weight-bold">
                <span class="d-none d-md-block">Facilities</span>
                <feather-icon icon="InfoIcon" class="d-block d-md-none" />
              </b-nav-item>
            </template>

            <!-- edit buttons -->
            <template #tabs-end>
              <b-button variant="primary" class="ml-auto">
                <feather-icon icon="EditIcon" class="d-block d-md-none" />
                <span class="font-weight-bold d-none d-md-block">Edit</span>
              </b-button>
            </template>
            <!-- edit buttons -->
          </b-tabs>
        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->
  </b-card>
</template>

<script>
import {
  BCard,
  BImg,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BTabs,
  BNavItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style>
.profile-title {
  background-color: #00000066;
  padding: 5px;
  margin-bottom: 15px;
}
</style>