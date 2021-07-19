<template>
  <div class="centralcontainer">
    <br> <br>
      <div class="centreblock">
        <cube-spin v-if="busy"></cube-spin>
       
            <div  v-for="event in events" :key="event.key">
               <div class="eventrow">
               
                  <div class="eventimagebox">

                     <div  class="eventbackimage" v-bind:style="{ 'background-image': 'url(' + event.imageurl + ')'}"></div>
                     <img class="eventfrontimage" v-bind:src="event.imageurl"  alt=""  /> 
                   
                  </div>

                  <div class="eventinfobox"> 
                       <strong>{{event.name}}</strong><br>
                      <small>The party is at {{event.venuename}}</small><br>
                      <small>from {{event.from}} to {{event.to}}</small><br>
                      <small>{{event.venueaddress}}</small><br>
                  </div>
                      
                  <div class="eventbuttonbox">
                      <router-link :to="{ name: 'Event', params: { eventid: event.id}}">
                         <img src="../assets/rightarrow.jpg"  alt="About" /><br>
                      </router-link>
                  </div> 
               </div>
               <div class="thinline"></div>
            </div>
       </div>
  </div>
</template>

<script>
   /* eslint-disable  no-undef */
/* eslint-disable  no-debugger */ 
/* eslint-disable  no-empty-pattern */ 
/* eslint-disable  no-unused-vars */

import {  db } from '../firebase-config';
import CubeSpin from 'vue-loading-spinner/src/components/ScaleOut'

export default {
  name: 'home',
  components: {
      CubeSpin
    },
  data() {
      return {
         busy: false,
        position: 'relative',
        events: []
      }
    },

created() {
  this.$eventHub.$emit('eventimageurl', '');
  var eventsRef = db.ref("/events");

  eventsRef.once('value', (snapshot) => {
    let exists = snapshot.exists()
    const data = snapshot.val();
    if (data) {
     this.events = data
    }
  });
 },

}
</script>

<style lang="scss" scoped>
  @import "~@/styles/styles.scss";
</style>
