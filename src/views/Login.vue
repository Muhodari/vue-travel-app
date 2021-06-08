<template>
  <div class="login">
      <h1>Login</h1>
      <div class="form">
          <label for="username" >Username</label>
          <input type="text" v-model="username" name="username" class="input">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="input">
          <button @click="login" class="btn">Login</button>
      </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {

data(){
    return{
        username:null,
        password:null
    }
},
methods:{
   login(){
        // authenticate against API
        store.user=this.username;
        const redirectPath=this.$route.query.redirect || '/';
        this.$router.push(redirectPath)
    }
}
}
</script>

<style scoped>
.form{
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
}
</style>