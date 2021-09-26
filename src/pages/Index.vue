<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-md" style="max-width: 300px">
       <q-form @submit="onSubmit" class="q-gutter-md">
     <q-input rounded outlined v-model="email" label="E-mail"></q-input>
     <q-input rounded outlined v-model="password" label="Password" type="password"></q-input>
     <!-- <q-checkbox v-model="remember" label="ID 기억하기" color="teal"/> -->
     <div class="q-pa-md q-gutter-sm">
       <q-btn type="submit" outline color="primary" label="LogIn" />
       <q-btn @click="moveSignUp()" outline color="secondary" label="SignUp" />

      <!-- <q-btn v-on:mouseenter="modalOpen" v-on:mouseleave="modalClose" outline color="amber" label="" icon="lightbulb_outline"/>
       <span v-if="modal == true">비밀번호를 모르겠으면 이걸 눌러요</span> -->
       <q-btn @click="moveFindPw()" class="bt-tooltip" data-title="find password" outline color="amber" label="" icon="lightbulb_outline"/>
       </div>
        <div class="q-gutter-md">
        <!-- none으로 해야 이미지 넣기 좋다 -->
        <q-btn padding="none" flat>
          <img src="../assets/google.png" style="width: 200px;" @click="googleLogin()">
        </q-btn>
        <q-btn padding="none" flat>
          <img src="../assets/github.png" style="width: 200px;" @click="githubLogin()">
        </q-btn>
      </div>
       </q-form>
    </div>
  </q-page>
</template>

<script>
  import {defineComponent, ref} from 'vue'
  import { auth,g_auth,db } from 'src/boot/firebase'
  import { useQuasar } from 'quasar'
  import { useRouter, useRoute } from 'vue-router'
  import {useStore, mapActions, mapGetters } from 'vuex'

export default {
  name: 'loginUser',
  setup(){
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter()
    const $route = useRoute()

    let email = ref('')
    let password = ref('')
    let isPwd = ref('true')
    let remember = ref('false')
    let validationErrors = ref('')
    let userName = ref('')
    return{
      email,
      password,
      isPwd,
      remember,
      validationErrors,
      userName,
      onSubmit(){
      auth.signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("success",user);
      $store.commit("setFireUser", user)
      // ...
      $q.notify({
              position:"top",
              message : "login success",
              color : "blue"
            });
      $router.push({ path: '/main'})     
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
         $q.notify({
              position:"top",
              message : "login failure",
              color : "red"
            })
      });
      },
       githubLogin(){
     var provider = new g_auth.GithubAuthProvider();
     auth.languageCode = 'kr_KR'
     auth.signInWithPopup(provider)
      .then((result) => {

        var user = result.user;
        console.log("git user >>>", user.email)
        $store.commit("setFireUser", user)
        db.collection("users").where("email","==",user.email).get()
        .then((snapshot) => {
           
          if(snapshot.empty == true ){
          // 처음 들어온 값인 경우
          db.collection("users").add({
            email: user.email,
            name : user.displayName
            })
          } else {
            // 있는 값인 경우 snapshot.forEach를 통해 docID(문서 id)를 가져온다
            console.log("git snapshot >>", snapshot)
            snapshot.forEach((doc) => {
              db.collection("users").doc(doc.id).set({
              email: user.email,
              name : user.displayName
             })
            })      
          }
        })
      $router.push({ path: "/main" })  
      }).catch((error) => {
        console.log(error)
      }); 
    },
    googleLogin(){
     var provider = new g_auth.GoogleAuthProvider();
     auth.languageCode = 'kr_KR'
     console.log("여기들어옴");
     auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log("user >>>", user.email)
        $store.commit("setFireUser", user)
        db.collection("users").where("email","==",user.email).get()
        .then((snapshot) => {
           
          if(snapshot.empty == true ){
          // 처음 들어온 값인 경우
          db.collection("users").add({
            email: user.email,
            name : user.displayName
            })
          } else {
            // 있는 값인 경우 snapshot.forEach를 통해 docID(문서 id)를 가져온다
            console.log("else snapshot >>", snapshot)
            snapshot.forEach((doc) => {
              db.collection("users").doc(doc.id).set({
              email: user.email,
              name : user.displayName
             })
            })      
          }
        })
      $router.push({ path: "/main" })  
      }).catch((error) => {
        console.log(error)
      });
    },
    };
  },
  data(){
    return{
      message:"",
      modal : false,
    };
  },
  computed: {
  ...mapGetters(["getFireUser", "isUserAuth"])
  // signOutActions() {} 라는애가 있는데, vuex.signOutAction(){}랑 똑같으니
  // 맵핑해줘!(예시임)
  },
  methods:{
    modalOpen(){
      this.modal = true;
    },
    modalClose(){
      this.modal = false;
    },
    moveSignUp(){
      location.href='/#/signUp';
    },
    moveFindPw(){
       location.href='/#/findPw';
    },
 
  }
}
</script>

<style>
.q-pa-md {
    display:inline-block; 
    white-space: nowrap
}

/* 말풍선 css 
https://uxicode.tistory.com/entry/tooltip-htmlcss?category=528975 
*/
.bt-tooltip { 
  position: relative; display:inline-block; 
  } 
.bt-tooltip:hover[data-title]:before, 
.bt-tooltip:hover[data-title]:after { 
  visibility: visible; pointer-events: auto 
  } 
.bt-tooltip[data-title]:before, 
.bt-tooltip[data-title]:after { 
  pointer-events: none; visibility: hidden; 
  } 
  .bt-tooltip[data-title]:before{ 
    content: ''; 
    position: absolute; 
    top: auto; 
    right: auto; 
    bottom: 100%; left: 50%; font-size: 1rem; width: .71428571em; height: .71428571em; background: #fff; 
    -webkit-transform: rotate(45deg) translateX(-50%); transform: rotate(45deg) translateX(-50%); z-index: 2; 
    -webkit-box-shadow: 1px 1px 0 0 #bababc; box-shadow: 1px 1px 0 0 #bababc; 
    } 
  .bt-tooltip[data-title]:after { 
    content: attr(data-title); position: absolute; 
    top: auto; right: auto; left: 50%; bottom: 100%; 
    -webkit-transform: translateX(-50%); transform: translateX(-50%); 
    margin-bottom: .5em; text-transform: none; text-align: left; white-space: nowrap; 
    font-size: 0.8rem; border: 1px solid #d4d4d5; line-height: 1.4285em; max-width: none; 
    background: #fff; padding: .633em 1em; font-weight: 400; font-style: normal; color: rgba(0,0,0,.87); 
    border-radius: .48571429rem; -webkit-box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15); 
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15); z-index: 1; 
    }
/*여기까지 말풍선 css */

</style>