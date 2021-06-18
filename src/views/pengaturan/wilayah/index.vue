<template>
  <b-row class="match-height">
    <b-col
      md="6"
      lg="4"
    >
      <b-card
        :img-src="require('@/assets/images/slider/04.jpg')"
        img-alt="Card image cap"
        img-top
        title="Card title"
      >

        <b-card-text>
          Kota ini adalah blablabla
        </b-card-text>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
        >
          Go Somewhere
        </b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCard, BCardText, BButton, BRow, BCol, BImg, BCardBody, BCardTitle, BCardSubTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
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
}
</script>
