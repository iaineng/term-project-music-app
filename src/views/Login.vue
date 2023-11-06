<script setup>
import router from '@/router'
import { getCurrentInstance, ref } from 'vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'
import Page from '@/components/page/index.vue'

const { proxy } = getCurrentInstance()
const phone = ref('')
const password = ref('')
const mode = ref('login')

const login = async () => {
  const response = await axios.get(`${proxy.$apiBaseUrl}/login/cellphone`, {
    params: {
      phone: phone.value,
      password: password.value,
    },
  })
  localStorage.setItem(
      'userInfo', JSON.stringify(response.data)
  )

  await router.back()
}
</script>

<template>
  <page>
    <div class="area">
      <ul class="circles">
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-80px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-20px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-20px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-60px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-20px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-110px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-150px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-25px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-15px color-blue text-opacity-20"/>
        </li>
        <li>
          <icon icon="mingcute:disc-fill" class="font-size-150px color-blue text-opacity-20"/>
        </li>
      </ul>
    </div>

    <van-nav-bar
        left-arrow
        :border="false"
        placeholder
        fixed
        @click-left="$router.back()"
    />

    <div class="pos-relative z-1">
      <transition>
        <div v-if="mode === 'login'">
          <div class="flex items-center mt-32px ml-16px font-bold font-size-26px">
            <icon class="font-size-28px" icon="fluent-emoji:waving-hand"/>
            你好！欢迎来到
          </div>
          <div class="mt-8px flex flex-col items-center">
            <div class="font-size-38px font-bold">
              <span class="mr-16px color-blue">Music</span>
              <span>App</span>
            </div>

            <div class="mt-16px px-16px w-full box-border pos-relative">
              <icon icon="mdi:user" class="pos-absolute font-size-28px color-gray-400 top-8.5px left-27.25px"/>
              <input
                  placeholder="请输入账号"
                  type="text"
                  class="placeholder-color-gray-400 block h-45px box-border border-none px-22.5px pl-45px py-12px m-0 w-full b-rd-45px font-size-16px bg-gray-100"
              />
            </div>
            <div class="mt-16px px-16px w-full box-border pos-relative">
              <icon icon="mdi:password" class="pos-absolute font-size-28px color-gray-400 top-8.5px left-27.25px"/>
              <input
                  placeholder="请输入密码"
                  type="password"
                  class="placeholder-color-gray-400 block h-45px box-border border-none px-22.5px pl-45px py-12px m-0 w-full b-rd-45px font-size-16px bg-gray-100"
              />
            </div>
            <div class="box-border mt-24px flex justify-end w-full pr-16px">
              <div class="font-size-14px color-gray-400">没有账号？</div>
              <div class="font-size-14px color-gray-400 font-bold">注册</div>
            </div>
            <div class="mt-8px px-16px w-full box-border">
              <van-button
                  round
                  block
              >登录
              </van-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div>

          </div>
        </div>
      </transition>
    </div>
  </page>
</template>

<style scoped lang="less">
:deep(.van-nav-bar) {
  background: transparent;
}

:deep(.van-button) {
  border: none;
  background: black;
  color: white;
}

:deep(.van-button__text) {
  font-size: 16px;
}

.area {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 0;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  //background: rgba(96, 165, 250, .5);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}


@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>