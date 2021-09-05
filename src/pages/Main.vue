<template>
  <q-page class="flex flex-center">
      <div> 
        안녕하세요 {{userName}} 님
        <p>{{userEmail}}</p>
          <div>
          <q-btn @click="logout()" outline color="secondary" label="logout" />
          </div>
      </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { auth } from 'src/boot/firebase'
import {useStore} from 'vuex'
import {mapActions,mapGetters} from 'vuex'
export default {
  
  setup(){
    var userName=ref('');
    var userEmail=ref('');
      auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        userName.value = user.displayName;
        userEmail.value=user.email;
        
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    console.log(userName);
    return{
      userName,
      userEmail
    }
  },
  computed:{
    ...mapGetters(["getFireUser","isUserAuth"])
  },
  methods:{
    ...mapActions(["signOutAction","authAction"]),
    
    logout(){
      auth.signOut().then(() => {
        // Sign-out successful.
        console.log("logout success");
        location.href='/#/';
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
       
    }
  },
  data(){
    return{
      
    }
  },
}
</script>
<style>

</style>
