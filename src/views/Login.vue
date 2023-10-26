<template>
  <div id="app">
    <div class="login-page">
      <div class="form">
        <h1>登录</h1>
        <form @submit.prevent="login">
          <input type="text" id="phone" v-model="phone" placeholder="手机号" required/>
          <input type="password" id="password" v-model="password" placeholder="密码" required/>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from '@/router'
import { ref } from 'vue'
import axios from 'axios'

const phone = ref('')
const password = ref('')

const login = async () => {
  const response = await axios.get('http://198.44.187.171:3000/login/cellphone', {
    params: {
      phone: phone.value,
      password: password.value,
    },
  })
  console.log(response.data)
  localStorage.setItem(
      'userInfo', JSON.stringify(response.data)
  )

  await router.back()
}
</script>
<style scoped>
.login-page {
  padding: 8% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  margin: 0 auto 100px;
  padding: 65px 45px 45px 45px;
  text-align: center;
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
}

.form button:hover, .form button:active, .form button:focus {
  background: #43A047;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message a {
  color: #4CAF50;
  text-decoration: none;
}

.form .register-form {
  display: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}

.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}

.container .info {
  margin: 50px auto;
  text-align: center;
}

.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}

.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}

.container .info span a {
  color: #000000;
  text-decoration: none;
}

.container .info span .fa {
  color: #EF3B3A;
}

body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141, 194, 111);
  background: linear-gradient(90deg, rgba(141, 194, 111, 1) 0%, rgba(118, 184, 82, 1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>