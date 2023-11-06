<template>
  <div class="min-h-screen bg-white">
    <div class="flex justify-between items-center pos-sticky top-0 bg-white z-1">
      <div class="ml-16px font-size-14px" @click="onLoginClick">
        <div v-if="userInfo">
          <img :src="userInfo.profile.avatarUrl" class="w-34px h-34px b-rd-50%"/>
        </div>
        <div v-else>登录</div>
      </div>
      <form action="/" class="flex-1 mr-8px">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
      </form>
    </div>
    <div class="home">
      <div class="mx-16px b-rd-16px overflow-hidden">
        <van-swipe class="my-swipe w-full" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in recommendPics" :key="index">
            <img :src="item" class="w-full h-full"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="flex mx-16px py-16px justify-between">
        <div class="flex flex-col items-center justify-center" @click="gotoSinger">
          <Icon class="font-size-40px color-blue" icon="solar:microphone-bold"/>
          <div class="font-size-12px color-black mt-6px">歌手分类</div>
        </div>
        <div class="flex flex-col items-center justify-center" @click="gotoList">
          <Icon class="font-size-40px color-blue" icon="icon-park-solid:record"/>
          <div class="font-size-12px color-black mt-6px">歌单分类</div>
        </div>
        <div class="flex flex-col items-center justify-center" @click="gotoMyPosition">
          <Icon class="font-size-40px color-blue" icon="ri:road-map-fill"/>
          <div class="font-size-12px color-black mt-6px">我的位置</div>
        </div>
        <div class="flex flex-col items-center justify-center" @click="gotoOfflineMessage">
          <Icon class="font-size-40px color-blue" icon="mdi:envelope"/>
          <div class="font-size-12px color-black mt-6px">离线留言</div>
        </div>
      </div>
      <div class="song-wrap">
        <div class="song" v-for="(item,index) in recommendSongs" :key="item.id">
          <div class="flex-center idx">{{ index + 1 }}</div>
          <div class="song-item">
            <div class="name">{{ item.name }}</div>
            <div class="artists" v-if="item.song" @click="gotoPlay(item.id)">
            <span v-for="(item1,index1) in item.song.artists" :key="item1.id">
              {{ item1.name }}
              <span v-if="index1!==item.song.artists.length-1">-</span>
            </span>
            </div>
          </div>
          <div class="flex-center imgwrap" @click="playsong(item.id)">
            <img src="../assets/pause.png" v-if="curItemId===item.id"/>
            <img src="../assets/play.png" v-else/>
          </div>
        </div>
      </div>
      <div class="footer">
        <audio :src="curSongUrl" autoplay loop controls></audio>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, getCurrentInstance, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { showConfirmDialog } from 'vant'

export default {
  name: 'Home',
  components: {
    Icon,
  },
  setup() {
    let { proxy } = getCurrentInstance()
    const router = useRouter()
    const value = ref('')
    const data = reactive({
      recommendSongs: [],
      recommendLists: [],
      recommendPics: [],
      curSongUrl: '',
      curItemId: '',
      userInfo: null
    })

    const onSearch = (val) => {
      if (val === '') return
      proxy.$axios.get(`${proxy.$apiBaseUrl}/cloudsearch?keywords=` + val).then(res => {
        data.recommendSongs = res.data.result.songs
      })
    }
    const onCancel = () => {
      data.recommendSongs = JSON.parse(localStorage.getItem('recommend'))
    }
    // 推荐歌单
    const getdata = () => {
      if (localStorage.getItem('recommend')) {
        data.recommendSongs = JSON.parse(localStorage.getItem('recommend'))
      }
      if (localStorage.getItem('banners')) {
        data.recommendPics = JSON.parse(localStorage.getItem('banners'))
      }

      proxy.$axios.get(`${proxy.$apiBaseUrl}/personalized?limit=10`).then(res => {
        data.recommendLists = res.data.result
      })
      // 推荐音乐
      proxy.$axios.get(`${proxy.$apiBaseUrl}/personalized/newsong`).then(res => {
        data.recommendSongs = res.data.result
        localStorage.setItem('recommend', JSON.stringify(data.recommendSongs))
      })
      // 获取banner
      proxy.$axios.get(`${proxy.$apiBaseUrl}/banner?type=1`).then(res => {
        const temp = res.data.banners.map(item => item.pic)
        const banners = temp.length > 5 ? temp.slice(0, 5) : temp
        localStorage.setItem('banners', banners)
        data.recommendPics = banners
      })
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
    // 跳转到歌手分类页面
    const gotoSinger = () => {
      router.push({ path: '/home/singer' })
    }
    // 跳转到歌单分类页面
    const gotoList = (id) => {
      router.push({ path: '/home/list' })
    }
    // 跳转至歌曲播放页面
    const gotoPlay = (id) => {
      router.push(`/home/play?id=${id}`)
    }

    const onLoginClick = () => {
      if (localStorage.getItem('userInfo')) {
        showConfirmDialog({
          title: '是否要退出登录',
        }).then(() => {
          localStorage.removeItem('userInfo')
          router.push('/home/login')
        }).catch(() => {
        })

        return
      }

      router.push('/home/login')
    }

    const gotoMyPosition = () => {
      router.push('/home/myPosition')
    }

    const gotoOfflineMessage = () => {
      router.push('/home/offlineMessage')
    }

    onMounted(() => {
      getdata()
    })

    onActivated(() => {
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        data.userInfo = userInfo
      } else {
        data.userInfo = null
      }
    })
    return {
      value,
      onSearch,
      onCancel,
      ...toRefs(data),
      playsong,
      gotoSinger,
      gotoList,
      gotoPlay,
      onLoginClick,
      gotoMyPosition,
      gotoOfflineMessage,
    }
  },
}
</script>
<style lang="less" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-swipe .van-swipe-item {
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: 100%;
  }
}

.cate {
  margin-top: 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  width: 90%;
  border: 1px solid #eee;
  box-shadow: 10px 10px 10px cornflowerblue;
  margin-left: 20px;

  .singer,
  .list {
    width: 70px;
    height: 70px;
    background: cornflowerblue;
    border-radius: 50%;
  }
}

.song {
  display: flex;
  padding: 12px 20px;
  border-bottom: 1px solid rgb(111, 188, 207);

  .idx {
    width: 30px;
    color: rgb(124, 44, 230);
  }

  .song-item {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;

    .name {
      font-size: 16px;
      font-weight: 600;
    }

    .artists {
      font-size: 12px;
      color: rgb(138, 135, 135);
      margin-top: 6px;
    }
  }

  .imgwrap {
    width: 30px;
    height: 30px;
    margin-top: 15px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;

  audio {
    width: 100%;
  }
}
</style>