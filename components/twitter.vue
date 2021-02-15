<template>
  <div>
    <button @click="loginTwitter">PUSH</button>
    <button @click="check">CHECK</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import Vue from 'vue'
export default Vue.extend({
  methods: {
    loginTwitter() {
      let provider = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential

          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = credential.accessToken
          var secret = credential.secret

          // The signed-in user info.
          var user = result.user
          console.log('-------------debug----------------')
            console.log(credential)
        //   console.log(result.additionalUserInfo)
            console.log(user)
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
        })
    },
    check() {
      firebase
        .auth()
        .getRedirectResult()
        .then((result)=>{
            console.log('----debug-------')
            console.log(result.additionalUserInfo.username)
            this.$store.commit('twitterInfo/LOGIN',result.additionalUserInfo.username)
        })
    },
  },
})
</script>

<style></style>
