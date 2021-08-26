<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >

    <div class="q-gutter-md" style="max-width: 300px">
     <q-input rounded outlined v-model="id" label="ID"></q-input>
     <q-input rounded outlined v-model="pw" label="PW" type="password"></q-input>
     <div class="q-pa-md q-gutter-sm">
       <q-btn outline color="primary" label="LogIn" />
       <q-btn @click="moveSignUp()" outline color="secondary" label="SignUp" />
      <q-btn v-on:mouseenter="modalOpen" v-on:mouseleave="modalClose" outline color="amber" label="" icon="lightbulb_outline"/>
       <span v-if="modal == true">비밀번호를 모르겠으면 이걸 눌러요</span>
       </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default {
  name: 'PageIndex',
  setup(){
    return{
      id:ref(''),
      pw:ref(''),
    };
  },
  data(){
    return{
      message:"",
      modal : false,
    };
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
    }
  }
}
</script>

<style>
.q-pa-md {
    display:inline-block; 
    white-space: nowrap
}
</style>