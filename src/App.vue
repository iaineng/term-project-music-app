<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cacheViews = reactive(new Set())

router.beforeEach((to, from, next) => {
  if (from.name) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    if (toDepth > fromDepth) {
      cacheViews.add(from.name)
    } else {
      cacheViews.delete(from.name)
    }
  }
  next()
})

const onPlusReady = () => {
  let backTime = null
  const webview = plus.webview.currentWebview()

  window.navigator.geolocation.getCurrentPosition = plus.geolocation.getCurrentPosition

  plus.key.addEventListener('backbutton', () => {
    webview.canBack((e) => {
      if (e.canBack) {
        webview.back()
        return
      }

      if (!backTime) {
        backTime = new Date().getTime()
        plus.nativeUI.toast('再按一次退出应用', { duration: 'short' })
        setTimeout(() => {
          backTime = null
        }, 1000)
        return
      }

      if (new Date().getTime() - backTime < 1000) {
        plus.runtime.quit()
        webview.close()
      }
    })
  })
}

document.addEventListener('plusready', onPlusReady)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition" mode="out-in">
      <keep-alive :include="Array.from(cacheViews)">
        <component :is="Component" :key="route.path"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
:root {
  --van-nav-bar-icon-color: black !important;
  --van-nav-bar-arrow-size: 20px !important;
}

.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all .2s ease;
}

.slide-right-enter-active {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50%);
}

.slide-right-enter-to {
  transform: translateX(0);
}

.slide-right-leave-to {
  z-index: 100;
  transform: translateX(100%);
}

.slide-left-enter-active {
  transform: translateX(100%);
}

.slide-left-enter-from {
  z-index: 100;
  transform: translateX(100%);
}

.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave-to {
  opacity: 0.4;
}
</style>
