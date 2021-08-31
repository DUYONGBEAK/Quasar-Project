<template>
  <q-page class="flex flex-center">
      <div>
          안녕하세요 {{name}} 님
          <div>
          <q-btn @click="logout()" outline color="secondary" label="logout" />
          </div>
      </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { auth } from 'src/boot/firebase';

export default {
  
  setup(){
    var userName;
      auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        userName = user.displayName;
        console.log(userName);
        
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    console.log(userName);
    return{
      name : ref(userName)
    }
  },
methods:{
    logout(){
       location.href='/#/';
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
