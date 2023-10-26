<template>
  <div>
    <div id="musicImage">
      <div class="song-img" style="background-image:url(../assets/play.png)" ref="rotate"></div>
    </div>

    <audio :src="curSongUrl" autoplay controls></audio>

  </div>
</template>
 
<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup () {
    let { proxy } = getCurrentInstance();
    const route = useRoute();
    // 获取参数
    const id = route.query.id;
    const data = reactive({
      curSongUrl: '',
      curItemId: ''
    })
    const getdata = () => {
      proxy.$axios.get(`http://198.44.187.171:3000/song/url?id=${id}`).then(res => {
        console.log(res)
        if (data.curSongUrl === res.data.data[0].url) {
          data.curSongUrl = ''
        }
        data.curSongUrl = res.data.data[0].url;
        data.curItemId = res.data.data[0].id;
      });
    }
    onMounted(getdata)
    return {
      ...toRefs(data),
    }
  },
}
</script>
 
<style lang="less">
#musicImage {
  margin: 0 auto;
  margin-top: 30%;
  width: 15em;
  height: 15em;
  border-radius: 240px;
  transform: rotate(45deg);
  background-image: radial-gradient(3.5em 30em ellipse, #fff, #000);
  border: 2px solid #131313;
  box-shadow: 0 0 0 10px #343935;
  opacity: 0.7;
}

.song-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(0deg);
  width: 160px;
  height: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid #000;
  border-radius: 200px;
  animation: animations1 10s linear infinite forwards;
  animation-play-state: paused;
}
audio{
    position: fixed;
    bottom: 4px;
    width: 100%;
}
</style>