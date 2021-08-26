<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    
    <div class="q-gutter-md" style="max-width: 300px">
     <q-form @submit="onSubmit" @reset="onReset" class="q-gutter">  
        
     <q-input v-model="name" label="Name" placeholder="Name and surname" hint="한글 또는 영어이름" lazy-rules :rules="nameRule"/>
      <q-input v-model="id" label="ID" placeholder="Your E-mail" hint="아이디는 영문+숫자만 입력 가능합니다." lazy-rules :rules="idRule"/>
       <q-input type="password" v-model="pw" label="Password" placeholder="Password" hint="숫자 문자를 포함한 6~12자리" lazy-rules :rules="pwRule"/>
        <q-input type="password" v-model="chkpw" label="Password check" placeholder="Password check" hint="패스워드 확인" lazy-rules :rules="pwCheck"/>
         <q-input type="number" v-model="age" label="Your age" hint="만18세 이상만 가입 가능" lazy-rules :rules="ageRule"/>

        <q-toggle v-model="accept" label="I accept the license and terms" />

     <div>
       <q-btn type="submit" outline color="primary" label="Create Account" />
       <q-btn type="reset" outline color="green" label="Reset" flat class="q-ml-sm" />
       <p>Already have an account?<a href='/'> Sign in</a></p>

        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
          
      <q-card class="bg-teal text-white" style="width: 300px" v-if="accept === true">
        <q-card-section>
          <div class="text-h6">회원가입 완료</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the OK.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="moveMain()" />
        </q-card-actions>
      </q-card>

      <q-card class="bg-red text-white" style="width: 300px" v-if="accept === false">
        <q-card-section>
          <div class="text-h6">약관 동의 필요</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the OK.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
       </div>

       </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Notify } from 'quasar';

export default {
  name: 'PageIndex',
  setup(){
    const $q = useQuasar()

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const id = ref(null);
    const pw = ref(null);
    const chkpw = ref(null);
     return {
       name,
       age,
       id,
       pw,
       chkpw,
       accept,
       persistent: ref(false),    

      onReset () {
        id.value = null
        pw.value = null
        chkpw.value = null
        name.value = null
        age.value = null
        accept.value = false
      },
    }
  },
  data(){
    return{
      modal : false,
      pwRule:[
        val => /^[A-Za-z0-9]{6,12}$/.test(val) || '비밀번호 형식을 지켜주세요.'
      ],
      pwCheck:[
          val => val === this.pw || 'check your password' 
        ],
      idRule:[
        val => val !== '' && val !== null || '아이디는 필수 입니다.',
        val => /^[a-zA-A0-9]*$/.test(val) || '아이디 형식을 지켜주세요.',
        val => !( val && val.length >= 11) || '아이디는 11자리 이하로 만들어 주세요.'
      ],
      ageRule:[
        val => val !== null && val !== '' || 'Please type your age',
        val => val > 18 && val < 101 || 'Please type a real age'
      ],
      nameRule:[
         val => val && val.length > 0 || '이름을 입력해주세요.'
      ]
    };
  },
  methods:{
    moveMain(){
      location.href='/';
    },
    onSubmit(){
        this.persistent = true;
      },
  }
}
</script>

<style>
.q-pa-md {
    display:inline-block; 
    white-space: nowrap
}
</style>