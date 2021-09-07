<template>
  <q-page class="flex flex-center">
      
    <div class="q-gutter-md" style="max-width: 300px">
     <q-form @submit="onSubmit" @reset="onReset" class="q-gutter">  
        
     <q-input v-model="name" label="Name" placeholder="Name and surname" hint="한글 또는 영어이름" lazy-rules :rules="nameRule"/>
      <q-input v-model="email" label="ID" placeholder="Your ID" hint="아이디는 영문+숫자만 입력 가능합니다." lazy-rules :rules="idRule"/>
       <q-input type="password" v-model="password" label="Password" placeholder="Password" hint="숫자 문자를 포함한 6~12자리" lazy-rules :rules="pwRule"/>
        <q-input type="password" v-model="chkpw" label="Password check" placeholder="Password check" hint="패스워드 확인" lazy-rules :rules="pwCheck"/>
         <q-input type="number" v-model="age" label="Your age" hint="만18세 이상만 가입 가능" lazy-rules :rules="ageRule"/>
      <div class="q-pa-md q-gutter-sm">
        <q-toggle v-model="accept" label="I accept the license and terms" />
        <q-btn label="terms" color="primary" size="10px" @click="dialog = true" />
      
      <q-dialog v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">약관</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          약관입니다.
        </q-card-section>
      </q-card>
    </q-dialog>
      
      
      </div>
     <div>
       <q-btn type="submit" outline color="primary" label="Create Account" @click="signUp"/>
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
import { auth, db } from 'src/boot/firebase'

export default {
  name: 'PageIndex',
  setup(){
    const $q = useQuasar()

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const email = ref(null);
    const password = ref(null);
    const chkpw = ref(null);
    const displayName = ref(null);
    const persistent = ref(false);
     return {
       name,
       age,
       email,
       password,
       chkpw,
       accept,
       displayName,
       persistent,
       dialog: ref(false),
       maximizedToggle: ref(true),    

      onReset () {
        email.value = null
        password.value = null
        chkpw.value = null
        name.value = null
        age.value = null
        accept.value = false
      },

      onSubmit(){
        
      if(accept.value !== false){
        
        auth.createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
          displayName : name.value
        })
        console.log("success",user);
        // Add a new document with a generated id.
        db.collection("users").add({
            id: email.value,
            name: name.value,
            age: age.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $q.notify({
                    position : "center",
                    message : errorMessage,
                    color : "grey"
                        })
        
        // ..
      });
      }else{
        // Nothing
       
      }
    },
    signUp(){
      console.log('여기 들어옴?');
      if(email.value !== null && password.value !== null && chkpw.value !== null &&
        displayName.value !== null && age.value !== null && accept.value !== false){
        console.log('22222222222');
        persistent.value = true;

      }else{
        console.log('33333333');
        persistent.value = true;

      }
    },
    }
  },
  data(){
    return{
      modal : false,
      nameRule:[
         val => val && val.length > 0 || '이름을 입력해주세요.'
      ],
      idRule:[
        val => val !== '' && val !== null || '아이디는 필수 입니다.',
        val => /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(val) || '이메일 형식을 지켜주세요.',
        val => !( val && val.length >= 30) || '아이디는 30자리 이하로 만들어 주세요.'
      ],
      pwRule:[
        val => val !== '' && val !== null || '비밀번호는 필수 입니다.',
        val => /^[A-Za-z0-9]{6,12}$/.test(val) || '비밀번호 형식을 지켜주세요.'
      ],
      pwCheck:[
          val => val === this.password || 'check your password' 
      ],
      ageRule:[
        val => val !== null && val !== '' || 'Please type your age',
        val => val > 19 || '미성년자 가입 불가',
        val => (val > 0 && val < 100) || 'Please type a real age'
      ],
      
    };
  },
  methods:{
    moveMain(){
       location.href='/';
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