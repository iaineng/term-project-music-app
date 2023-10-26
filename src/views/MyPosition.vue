<script setup>
import { loadJs } from '@/utils/utils'
import { onMounted, ref } from 'vue'

const elMap = ref(null)

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
    'AMap.ToolBar',
    'AMap.Scale',
    'AMap.Geolocation',
    'AMap.ControlBar',
  ], () => {
    map.addControl(new AMap.ToolBar({
      position: {
        top: '110px',
        right: '40px',
      }
    }))
    map.addControl(new AMap.Scale())

    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      zoomToAccuracy: true,
    })
    geolocation.getCurrentPosition()
    map.addControl(geolocation)

    map.addControl(new AMap.ControlBar({
      position: {
        top: '10px',
        right: '10px',
      }
    }))
  })
})
</script>

<template>
  <div class="my-position-page">
    <div class="my-position-page_map" id="my-position-page_map" ref="elMap"></div>
  </div>
</template>

<style scoped>
.my-position-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.my-position-page_map {
  width: 100%;
  height: 100%;
}
</style>