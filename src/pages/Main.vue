<template>
  <q-page class="flex flex-center">
      <div> 
        안녕하세요 {{userName}} 님
        <p>{{userEmail}}</p>
          <div>
          <q-btn @click.prevent="logout" outline color="secondary" label="logout" />
           <q-btn @click="myinfo()" outline color="secondary"  label="mypage"/>
          </div>
      </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { auth, db } from 'src/boot/firebase'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import {useStore, mapActions, mapGetters } from 'vuex'
export default {
  
  setup(){
    const $q = useQuasar();
    var userName=ref('');
    var userEmail=ref('');
    const $router = useRouter()
    const $route = useRoute()

      auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        // userName.value = user.displayName;
        userEmail.value = user.email;
        
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
    let logout = () => {
       auth.signOut().then(() => {
        // Sign-out successful.
        console.log("logout success");
        //location.href='/#/';
        $router.push({ path: '/'}) 
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    }
    return{
      logout,
      userName,
      userEmail
    }
  },
  updated(){
    this.authAction()
    console.log("updated called");
    if(this.getFireUser != null && this.userName == ''){
         db.collection("users").where("id", "==", this.getFireUser.email)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.userName = doc.data().name
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

    }
    
  },
  mounted() {
      this.authAction()
      console.log("monted called");
      console.log(this.getFireUser);    

    if(this.getFireUser != null){
      db.collection("users").where("id", "==", this.getFireUser.email)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              this.userName = doc.data().name
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
  },
  computed:{
    ...mapGetters(["getFireUser","isUserAuth"])
  },
  methods:{
    ...mapActions(["signOutAction","authAction"]),
     myinfo(){
      location.href='/#/myinfo';
    },
  },
}
</script>
<style>

</style>
