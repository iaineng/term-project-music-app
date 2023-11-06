<script setup>
import { loadJs } from '@/utils/utils'
import { onMounted, ref } from 'vue'

onMounted(async () => {
  if (!window.AMapLoader) {
    window._AMapSecurityConfig = {
      securityJsCode: '452460c41cf1455d2dc63dc2638049ac',
    }

    await loadJs('https://webapi.amap.com/loader.js')

    window.AMap = await AMapLoader.load({
      key: 'f4e6c8877002bd2979a27c58ca2b1d85',
      version: '2.0',
    })
  }

  const map = new AMap.Map('my-position-page_map', {
    viewMode: '2D',
    zoom: 10,
    center: [116.397428, 39.90923],
  })

  AMap.plugin([
    'AMap.Scale',
    'AMap.Geolocation',
  ], () => {
    map.addControl(new AMap.Scale())

    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      zoomToAccuracy: true,
      position: {
        top: '10px',
        right: '10px',
      }
    })
    geolocation.getCurrentPosition()
    map.addControl(geolocation)
  })
})
</script>

<template>
  <div class="flex flex-col w-screen min-h-screen">
    <van-nav-bar
        title="我的位置"
        left-arrow
        placeholder
        fixed
        @click-left="$router.back()"
    />

    <div class="w-full flex-1" id="my-position-page_map"></div>
  </div>
</template>

<style scoped>
</style>