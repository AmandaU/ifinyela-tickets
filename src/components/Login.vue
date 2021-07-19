
<template>
  <div>
     <div class="container" >
       <!-- <cube-spin v-if="busy"></cube-spin> -->
        <div v-if="!showForgotPassword" class="infoblock">
          <h4>{{signinmessage}}</h4>
          <input type="text" v-model="email" placeholder="Email"  class="infoblockitem"><br>
          <input type="password" v-model="password" placeholder="Password"  class="infoblockitem"><br>
          <button @click="login" class="buttonstyle">LOGIN</button>
           <br>
          <p>You don't have an account ? You can 
            <span @click="goToSignup()" style="color:blue;cursor:pointer">create one</span>
           </p>
           <p>Forgot your password? 
            <span @click="showForgotPassword = true" style="color:blue;cursor:pointer">Send a reset email</span>
          </p>
        </div>
         <div v-if="showForgotPassword" class="infoblock">
          <h2>Send recovery email to:</h2>
          <input type="text" v-model="forgotEmail" placeholder="Recovery email"  class="infoblockitem"><br>
          <button @click="forgotPassword" class="buttonstyle">Send recovery email</button>
        </div>
     </div>
  </div>
</template>

<script>
/* eslint-disable  vue/require-prop-type-constructor */
/* eslint-disable  no-debugger */
  import firebase from '../firebase-config';
  import {  db } from '../firebase-config';
  
 export default {
    name: 'login',
    data() {
      return {
         busy: true,
        email: "",
        password: "",
        users: []
      }
    },
     props: {
       eventid: '',
       ticketref: '',
       isPromoter: false
   },

 created() {
    if(localStorage.getItem(this.$props.ticketref))
     {
        this.shoppingcart = JSON.parse(localStorage.getItem(this.$props.ticketref));
      }
    let img = this.shoppingcart? this.shoppingcart.event? this.shoppingcart.event.imageurl:'' : '';
    this.$eventHub.$emit('eventimageurl', img);
    },

   
 methods: {

   forgotPassword() {
        var auth = firebase.auth();
        let self = this
        auth.sendPasswordResetEmail(this.forgotEmail).then(function() {
               this.$swal('Success', 'Email was sent successfully. Check your email for steps to reset your password', 'success')    
           
              self.$router.replace({ name: 'Home'});
           
             }).catch(function() {
             this.$swal('O no...', 'We could not send the email. Please check your email address and internet connectivity', 'error')    
        });
    },

      goToSignup ()
      {
         
       this.$router.replace({ name: 'Signup', params: {ticketref: this.shoppingcart.reference, isPromoter: this.$props.isPromoter}});
      },
    
    login: function() {
      
     this.busy = true;
       let self = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          let uid = user.user.uid;
          alert('Successful login');
          self.$eventHub.$emit('loggedin', '');
          self.$bindAsArray(
                  "users",
                 db.ref('users').orderByChild("uid").equalTo(uid).limitToFirst(1),
                  null,
                  () => {
                    debugger;
                    self.$eventHub.$emit('isAdmin', self.users[0].isAdmin);
                    if(self.users[0].isPromoter)
                    {
                      self.$router.replace({ name: 'Promoter'});
                    }
                    else
                    if(self.shoppingcart)
                    {
                      self.shoppingcart.userid = uid;
                      localStorage.setItem(self.shoppingcart.reference, JSON.stringify(self.shoppingcart));
                      self.$router.replace({ name: 'Checkout', query: {ticketref: self.$props.ticketref}});
                      self.busy = false;
                    }
                    else if(self.$props.eventid)
                    {
                      self.$router.replace({ name: 'Event', params: {eventid: self.shoppingcart}});
                    }
                    else
                    {
                      self.$router.replace({ name: 'Home'});
                    }
                  }
                );
           
        },
        (err) => {
           alert('Oops. ' + err.message);
          self.busy = false;
        }
      );
      }
    }
  }
</script>


<style lang="scss" scoped>
 @import "~@/styles/commonstyle.scss";
  @import "~@/styles/loginstyle.scss";
 
</style>