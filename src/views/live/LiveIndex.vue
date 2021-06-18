<template>
    <div>
        <b-row class="mb-1">
          <b-col md="6" lg="4">
            <b-input-group>
              <b-input-group-prepend>
                <b-button variant="outline-primary">
                  <feather-icon icon="SearchIcon" />
                </b-button>
              </b-input-group-prepend>
              <b-form-input placeholder="Enter Keyword..." v-model="query.keyword" />
              <b-input-group-append>
                <b-button variant="outline-primary" @click="this.getLive">
                  Search
                </b-button>
                
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col md="6" lg="4">
            <b-button-group class="mb-1">
              <b-button variant="flat-success" v-b-modal.new-live v-ripple.400="'rgba(113, 102, 240, 0.15)'">
                  <feather-icon icon="PlusIcon" />
                  Create new live
                </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-primary"
                @click="changeQueryStatus('')"
                :class="{ active: filterButtonStatus == '' }"
              >
                All
              </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-secondary"
                @click="changeQueryStatus('WAITING')"
                :class="{ active: filterButtonStatus == 'WAITING' }"
              >
                Waiting
              </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-success"
                @click="changeQueryStatus('LIVE')"
                :class="{ active: filterButtonStatus == 'LIVE' }"
              >
                Live
              </b-button>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="flat-danger"
                @click="changeQueryStatus('ENDED')"
                :class="{ active: filterButtonStatus == 'ENDED' }"
              >
                Ended
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>
        <b-row v-for="(lives, idx) in groupedLives" :key="idx" class="match-height">
            <b-col md="6" lg="4" v-for="live in lives" v-bind:key="live.id">
            <b-card
                :img-src="live.image"
                :img-alt="live.name"
                img-top
                :title="live.name"
                img-height="auto"
                img-width="640"
            >

                <b-card-text>{{ live.location }}</b-card-text>
                <b-row class="match-height">
                  <b-col sm="4" md="4" lg="4">
                    <b-button
                      :variant="'flat-' + getLiveBadgeStatus(live.status)"
                      :disabled="true"
                    >
                      {{ live.status }}
                    </b-button>
                  </b-col>
                  <b-col sm="8" md="8" lg="8">
                      <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" >
                          <router-link :to="{ name: 'live-studio', params: { liveId: live.id }}">Live Studio</router-link>
                      </b-button>
                  </b-col>
                </b-row>
            </b-card>
            </b-col>
        </b-row>
        <!-- modal vertical center -->
        <b-modal
          id="new-live"
          centered
          title="Create new live"
          ok-title="Create"
          cancel-title="Cancel"
          size="lg"
          @ok="createLive"
          @show="resetModal()"
        >
          <b-card-text>
            <validation-observer ref="createEvent">
              <b-form>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Event Name"
                      label-for="v-event-name">
                      <validation-provider
                        #default="{ errors }"
                        name="Event Name"
                        rules="required"
                        vid="name"
                      >
                        <b-form-input
                          id="v-event-name"
                          v-model="newLive.name"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Your Event Name"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Event Location"
                      label-for="v-event-location">
                      <validation-provider
                        #default="{ errors }"
                        name="Event Location"
                        rules="required"
                        vid="location"
                      >
                        <b-form-input
                          id="v-event-location"
                          v-model="newLive.location"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Your Event Location"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Input Layout"
                    label-for="v-input-layout">
                      <validation-provider
                        #default="{ errors }"
                        name="Input Layout"
                        rules="required"
                        vid="input_layout"
                      >
                        <div class="demo-inline-spacing" id="v-input-layout">
                          <b-form-radio
                            v-model="newLive.input_layout"
                            name="input-layout"
                            value="wide"
                            class="custom-control-primary"
                          >
                            Wide (Default)
                          </b-form-radio>
                          <b-form-radio
                            v-model="newLive.input_layout"
                            name="input-layout"
                            value="potrait"
                            class="custom-control-primary"
                          >
                            Potrait
                          </b-form-radio>
                        </div>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Event Image"
                    label-for="v-event-image">
                      <validation-provider
                        #default="{ errors }"
                        name="Event Image"
                        rules="required"
                        vid="image"
                      >
                        <b-form-file
                          id="v-event-image"
                          v-model="newLive.image"
                          :state="errors.length > 0 ? false:null"
                          accept="image/jpeg, image/png, image/gif"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </b-card-text>
        </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required, email, confirmed, password,
} from '@validations'
import {
   BModal, VBModal, BAlert, BInputGroup, BFormGroup, BFormRadio, BFormInput, BFormFile, BForm, BInputGroupPrepend, BInputGroupAppend, BButtonGroup, BBadge, BCard, BCardText, BButton, BRow, BCol, BImg, BCardBody, BCardTitle, BCardSubTitle, BLink,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
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
        query : {
            status: '',
            keyword: '',
            limit: 15,
        },
        newLive: {
          name: '',
          location: '',
          input_layout: 'wide',
          image: null,
        },
        lives: {},
        filterButtonStatus: '',
        required,
        password,
        email,
        confirmed,
    }
  },
  methods: {
    getLive() {
        this.$http.get('/api/live', { 
            params : {
                status: this.query.status,
                keyword: this.query.keyword,
                limit: this.query.limit
            }
        })
        .then(response => {
            const resp = response.data;
            this.lives = resp.data;
            for (var key in this.lives){
              if(this.lives[key].image == null){
                this.lives[key].image = require('@/assets/images/live/live-placeholder.png');
              }
            }
            
        }).catch(error => {
        });
    },
    getLiveBadgeStatus(status){
      let className = 'secondary';
      if(status == 'LIVE'){
        className = 'success';
      }
      if(status == 'ENDED'){
        className = 'danger';
      }
      return className;
    },
    changeQueryStatus(status){
      this.query.status = status;
      this.filterButtonStatus = status;
      return this.getLive();
    },
    resetModal(){
      this.newLive = {
          name: '',
          location: '',
          input_layout: 'wide',
          image: null,
        };
    },
    createLive(evt) {
      evt.preventDefault();
      this.$refs.createEvent.validate().then(success => {
        if (success) {
          let formData = new FormData();
          for ( var key in this.newLive ) {
            formData.append(key, this.newLive[key]);
          }
          this.$http.post( '/api/live',formData,{ headers: { 'Content-Type': 'multipart/form-data'}}).then(response => {
            if(response.data.error){
              for(var errorKey in response.data.error){
                if(response.data.error[errorKey]){
                  for(var errorMsgKey in response.data.error[errorKey]){
                    this.$refs.createEvent.errors[errorKey].push(response.data.error[errorKey][errorMsgKey]);
                  }
                }
              }
            }
            else {
              this.$nextTick(() => {
                this.$bvModal.hide('new-live');
                this.$router.push({ name: 'live-studio', params: { liveId: response.data.data.id } });
              });
            }
          })
          .catch(function(){
            console.log('FAILURE!!');
          });
        }
      });
    },
  },
  computed:{
    groupedLives() {
        return _.chunk(this.lives, 3)
    },
  },
  created() {
      this.getLive();
  },
}
</script>
