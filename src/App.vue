<script>
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
  <Suspense>
    <router-view/>
  </Suspense>
</template>

<style lang="less">

</style>
