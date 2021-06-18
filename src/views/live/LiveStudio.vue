<template>
  <div>
    <b-card>
      <b-row>
        <b-col sm="12" md="12" lg="6" xl="5">
            <b-img v-if="live.status == 'WAITING'" :src="live.image" :alt="live.name" fluid />
            <video-player v-if="live.status == 'LIVE' || live.status == 'ENDED'" class="video-player-box"
                          ref="videoPlayer"
                          :options="playerOptions"
                          :playsinline="true"
                          >
            </video-player>
        </b-col>
        <b-col sm="12" md="12" lg="6" xl="7" class="mt-1">
            <h3>Live Name</h3>
            <p>{{ live.name }}</p>
            <h3>Location</h3>
            <p>{{ live.location }}</p>
            <h3>Stream Status</h3>
            <p>{{ live.status }}</p>
            <h3>Stream Key</h3>
            <b-form-group
                label="Stream URL"
                label-for="stream-url"
              >
              <div class="d-flex">
                <b-form-input class="mr-1"
                  id="stream-url"
                  :value="live.stream_url"
                />
                <b-button
                  v-clipboard:copy="live.stream_url"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  variant="primary"
                >
                      Copy
                </b-button>
              </div>
            </b-form-group>
            <b-form-group
                label="Stream Key"
                label-for="stream-key"
              >
              <div class="d-flex">
                <b-input-group
                  class="input-group-merge mr-1"
                >
                  <b-form-input
                    id="stream-key"
                    v-model="live.stream_key"
                    class="form-control-merge"
                    :type="streamKeyFieldType"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="streamKeyToggleIcon"
                      @click="toggleStreamKeyVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <b-button
                  v-clipboard:copy="live.stream_key"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  variant="primary"
                >
                      Copy
                </b-button>
              </div>
            </b-form-group>
        </b-col>          
      </b-row>
    </b-card>
    <b-card>
      <b-tabs>
        <b-tab active>
          <template #title>
            <feather-icon icon="HomeIcon" />
            <span>Overview</span>
          </template>

          <b-card-text>
            Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.
          </b-card-text>
          <b-card-text>
            Carrot cake tiramisu danish candy cake muffin croissant tart dessert. Tiramisu caramels candy canes chocolate cake sweet roll liquorice icing cupcake. Candy cookie sweet roll bear claw sweet roll
          </b-card-text>
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="ToolIcon" />
            <span>Social Media Settings</span>
          </template>

          <b-card-text>
            Muffin cupcake candy chocolate cake gummi bears fruitcake donut dessert pie. Wafer toffee bonbon dragée. Jujubes cotton candy gummies chupa chups. Sweet fruitcake cheesecake biscuit cotton candy. Cookie powder marshmallow donut. Candy cookie sweet roll bear claw sweet roll. Cake tiramisu cotton candy gingerbread cheesecake toffee cake. Cookie liquorice dessert candy canes jelly.
          </b-card-text>
          <b-card-text>
            Sweet chocolate muffin fruitcake gummies jujubes pie lollipop. Brownie marshmallow caramels gingerbread jelly beans chocolate bar oat cake wafer. Chocolate bar danish icing sweet apple pie jelly-o carrot cake cookie cake.
          </b-card-text>
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="EyeIcon" />
            <span>Analytics</span>
          </template>

          <b-card-text>
            Halvah dessert fruitcake toffee oat cake tart oat cake topping jelly beans. Pudding sweet pie pastry lemon drops jujubes danish pie gingerbread. Liquorice powder wafer.
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
   BTabs, BTab, BModal, VBModal, BAlert, BInputGroup, BFormGroup, BFormRadio, BFormInput, BFormFile, BForm, BInputGroupPrepend, BInputGroupAppend, BButtonGroup, BBadge, BCard, BCardText, BButton, BRow, BCol, BImg, BCardBody, BCardTitle, BCardSubTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

// videojs
  import videojs from 'video.js'
  window.videojs = videojs
// hls plugin for videojs6
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

require('flv.js/dist/flv.min.js')
require('videojs-flvjs/dist/videojs-flvjs.min.js')

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    ToastificationContent,
    videoPlayer,
    BTabs, 
    BTab, 
    ValidationProvider,
    ValidationObserver,
    BModal, 
    VBModal, 
    BAlert,
    BInputGroup, 
    BFormGroup,
    BFormRadio,
    BFormInput,
    BFormFile,  
    BForm,
    BInputGroupAppend,
    BInputGroupPrepend, 
    BButtonGroup,
    BBadge, 
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
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
        live: {},
        playerOptions: {
          autoplay: true,
          responsive: true,
          fluid: true,
          muted: true,
          height: '360',
          language: 'en',
          sources: null,
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            playbackRate: false,
          },
          html5: { hls: { withCredentials: false }},
          techOrder: ['flvjs', 'html5'],
          flvjs: {
            mediaDataSource: {
              isLive: false,
              cors: true,
              withCredentials: false,
            },
          },
        },
        timer: null,
        previousStatus: '',
        streamKeyFieldType: 'password',
    }
  },
  methods: {
    playerReadied(player) {
      var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      player.tech_.hls.xhr.beforeRequest = function(options) {
        // console.log(options)
        return options
      }
    },
    getLive() {
        this.$http.get('/api/live/' + this.$route.params.liveId)
        .then(response => {
            const resp = response.data;
            this.live = resp.data;
            
            if(this.live.image == null){
              this.live.image = require('@/assets/images/live/live-placeholder.png');
            }
            if(this.playerOptions.sources == null){
              this.playerOptions.sources = [{
                withCredentials: false,
                type: "application/x-mpegURL",
                src: "https://server.mymoments.web.id/live/hls/" + this.live.id + ".m3u8"
              }];
            }
            if(this.live.status !== this.previousStatus){
              if(this.previousStatus == 'WAITING' && this.live.status == 'LIVE'){
                this.$refs.videoPlayer.player.play();
              }
              if(this.previousStatus == 'LIVE' && this.live.status !== 'LIVE'){
                this.$refs.videoPlayer.player.stop();
              }
              if(this.live.status == 'ENDED'){
                this.playerOptions.sources = [{
                  type: "video/mp4",
                  src: "https://server.mymoments.web.id/live/record/" + this.live.id + ".mp4"
                }];
              }
              this.previousStatus = this.live.status;
            }
            
        }).catch(error => {
        });
    },
    onCopy() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Stream Information copied to clipboard',
          icon: 'BellIcon',
        },
      })
    },
    onError() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Failed to copy texts!',
          icon: 'BellIcon',
        },
      })
    },
    toggleStreamKeyVisibility() {
      this.streamKeyFieldType = this.streamKeyFieldType === 'password' ? 'text' : 'password'
    },
  },
  computed:{
    streamKeyToggleIcon() {
      return this.streamKeyFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  created() {
    this.getLive();
    this.timer = setInterval(this.getLive, 5000);
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
