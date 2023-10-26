<script>
if (plus) {
  document.addEventListener('plusready', () => {
    let first = null
    const webview = plus.webview.currentWebview()
    plus.key.addEventListener('backbutton', () => {
      webview.canBack((e) => {
        if (e.canBack) {
          webview.back()
          return
        }

        if (!first) {
          first = new Date().getTime()
          plus.nativeUI.toast('再按一次退出应用', { duration: 'short' })
          setTimeout(() => {
            first = null
          }, 1000)
          return
        }

        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit()
          webview.close()
        }
      })
    })
  })
}
</script>

<template>
  <router-view/>
</template>

<style lang="less">

</style>
