<template>
  <b-card>
    <!-- about -->
    <div>
      <h5 class="text-capitalize mb-75">
        About
      </h5>
      <b-card-text>
        Alamat di sini
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import { BCard, BCardText } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardText,
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
