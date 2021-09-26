<template>
    <div id="app" align="center">

        <q-card-section class="q-qt-none">
            성명 :
            {{ name }}
            <p></p>
            아이디 :
            {{ email }}
            <p></p>
            가입일 :
            {{ creationTime}}
            <p></p>
            마지막 로그인 날짜 :
            {{ lastSignInTime}}
            <p></p>
        </q-card-section>
         <q-btn outline color="secondary" label="return"  @click.prevent="moveMain"/>
        <q-btn
            outline="outline"
            label="계정삭제"
            color="primary"
            @click="confirm()" ></q-btn>
    </div>
</template>
<script>
    import {auth, g_auth, db} from 'src/boot/firebase'
    import { useQuasar, Dialog } from 'quasar'
    export default {
        setup(){
            let moveMain = () => {
                location.href='/#/main';
            }
            return{
                moveMain
            }
        },
        data() {
            
            return {name: '', email: '', creationTime: '', lastSignInTime: ''}
        },
        created() {
            auth.onAuthStateChanged((user) => {
                console.log("user>>>>", user)
                if (user) {
                    this.email = user.email
                    this.creationTime = user.metadata.creationTime
                    this.lastSignInTime = user.metadata.lastSignInTime
                    this.name = user.displayName
                } else {
                    console.log("user singed out")
                }
            })
        },
        methods: {
            
            deleteUserInfo(user) {
                // then 호출을 위해 promise 객체가 필요하다 function(성공resolve->res, 실패catch)
                return new Promise(function (resolve, reject) {
                    // 조건이 있다면(get) then으로
                    db
                        .collection("users")
                        .where("id", "==", user.email)
                        .get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) => {
                                db
                                    .collection("users")
                                    .doc(doc.id)
                                    .delete()
                                    .then(() => {
                                        console.log("doc deleted")
                                        resolve('success')
                                    })
                                    .catch((error) => {
                                        console.log("delete error", error)
                                        reject(error)
                                    })
                                })
                        })
                })
            },
            confirm() {
               
                const user = auth.currentUser
                    console.log("current user>>>", user)
                // creadential로 계정정보 호출. email과 password 넘겨줘야한다. $q는 quasar.conf.js로 설정
                
                    this.$q.dialog({
                        title: '확인',
                        message: '비번 재입력',
                        prompt: { // 변수맵핑
                            model: '',
                            type: 'password'
                        },
                        cancel: true,
                        persistent: true
                    })
                    .onOk(data => {
                        // auth 정보 삭제시에는 재인증 해야한다.
                        var credentials = g_auth
                            .EmailAuthProvider
                            .credential(user.email, data)
                        user
                            .reauthenticateWithCredential(credentials)
                            .then(() => {
                                console.log("reauth ok")
                                // db 지우고 auth정보 지워야 한다.. db 삭제 코드가 먼저 진행이 되어야 한다. 둘다 비동기 작업이기때문에.. 이를 순차 작업으로
                                // 처리해주는 과정이 필요하다. 이를 위해 deleteUserInfo에 promise 객체를 이용해야 한다 users collection ->
                                // delete info
                                this
                                    .deleteUserInfo(user)
                                    .then((res) => {
                                        // db지우기
                                        console.log(res)
                                        user
                                            .delete()
                                            .then(() => {
                                                // auth지우기
                                                console.log("firebase auth account deleted")
                                                // 위에서 계정 삭제 시 로그아웃 되니까 밑에 정보에 데이터를 넣을 수 없다.
                                                // db.collection("users").where("id","==",user.email).get().then((snapshot) =>
                                                // {})
                                                $router.push({ path: '/'}) 
                                            })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                })
                    })
            },
            updated() {
                if (this.getFireUser != null && this.userName == '') {
                    console.log(this.getFireUser)
                    db
                        .collection("users")
                        .where("id", "==", this.getFireUser.email)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());
                                this.userName = doc
                                    .data()
                                    .name
                            });
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
            },
        }
    }
</script>

<style></style>
