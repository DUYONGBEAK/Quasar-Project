<template>
<q-page class="flex flex-center">
    
    <div>
         <q-input v-model="email" label="E-mail" placeholder="Your email" hint="E-mail조회"/>
        <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" label="본인 E-mail로 본인인증" />
        <p><a href='/'> Return Login Page</a></p>
    </div>
      </div>
     </q-page>
</template>
<script>
import { ref } from 'vue';


export default {
    
    setup() {
        return{
            email:ref(''),
        }
    },
}
</script>
<style>

</style>
