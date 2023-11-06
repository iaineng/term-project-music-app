<template>
  <div class="allsongs" style="min-height: 100vh; background: white;">
    <van-nav-bar
        left-arrow
        placeholder
        fixed
        @click-left="$router.back()"
    />

    <div v-for="(item,index) in songs" :key="index" class="song">
      <span>{{ index + 1 }}</span>
      {{ item.name }}
    </div>
  </div>

</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    let { proxy } = getCurrentInstance()
    const route = useRoute()

    // 获取所传参数
    const id = route.query.id
    const data = reactive({
      songs: [],
      recommendSongs: [],
      recommendLists: [],
      recommendPics: [],
      curSongUrl: '',
      curItemId: ''
    })

    const getdata = () => {
      proxy.$axios.get(`${proxy.$apiBaseUrl}/artist/songs?id=${id}`).then(res => {
        data.songs = res.data.songs
      })
    }
    onMounted(getdata)
    return {
      ...toRefs(data)
    }
    const playsong = (id) => {
      proxy.$axios.get(`${proxy.$apiBaseUrl}/song/url?id=${id}`).then(res => {
        if (data.curSongUrl === res.data.data[0].url) {
          data.curSongUrl = ''
        }
        data.curSongUrl = res.data.data[0].url
        data.curItemId = res.data.data[0].id
      })
    }
    onMounted(getdata)
    return {
      value,
      onSearch,
      onCancel,
      ...toRefs(data),
      playsong,
      gotoSinger,
      gotoList,
      gotoPlay
    }
  },
}
</script>
<style lang="less" scoped>
.song {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  line-height: 50px;

  span {
    margin: 0 20px 0 10px;
  }
}
</style>