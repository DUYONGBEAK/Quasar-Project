import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import { auth } from 'src/boot/firebase'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },
    state : {
      fireUser:null
    },
    actions: {
      signOutAction({commit}) {
        auth.signOut().then(() => {
          commit("setFireUser", null) //동기function 바로 반응함
        })
      },
        authAction({commit}) {
          auth.onAuthStateChanged(user => {
            if(user) {
              commit("setFireUser", user)
            }
          })
        }
    },
    mutations: { //세터
      setFireUser(state, firebaseUser) {
        state.fireUser = firebaseUser
      }
    },
    getters: {
      getFireUser(state) {
        return state.fireUser
      },
      isUserAuth (state) {
        return !!state.fireUser
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
