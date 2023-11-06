<template>
  <div class="singer" style="min-height: 100vh; background: white;">
    <van-nav-bar
        title="歌手分类"
        left-arrow
        placeholder
        fixed
        @click-left="$router.back()"
    />

    <div class="flex-center selectbtn">
      <van-button type="primary" @click="setType(-1)">全部</van-button>
      <van-button type="success" @click="setType(1)">男歌手</van-button>
      <van-button type="warning" @click="setType(2)">女歌手</van-button>
      <van-button type="danger" @click="setType(3)">乐队</van-button>
    </div>
    <div class="singerlist">
      <div
        v-for="(item,index) in singers"
        :key="index"
        class="singeritem"
        @click="gotoAllsongs(item.id)"
      >
        <img :src="`${item.picUrl}?imageView=1&type=webp&thumbnail=512x0`" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Singer',
  components: {
  },
  setup () {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
      singers: []
    })

    // 全部歌手
    const getdata = (type = -1) => {
      proxy.$axios.get(`${proxy.$apiBaseUrl}/artist/list?type=${type}&area=-1`).then(res => {
        data.singers = res.data.artists;
      });
    }

    // 切换歌手类别
    const setType = (type) => {
      proxy.$axios.get(`${proxy.$apiBaseUrl}/artist/list?type=${type}&area=-1`).then(res => {
        data.singers = res.data.artists;
      });
    }

    // 跳转到歌手全部歌曲页面
    const gotoAllsongs = (id) => {
      router.push(`/home/singer/allsongs?id=${id}`)
    }

    onMounted(getdata)
    return {
      ...toRefs(data),
      setType,
      gotoAllsongs,
    };
  },
}
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.van-button {
  width: 80px;
}
.selectbtn {
  margin: 10px 0;
}
.singerlist {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  .singeritem {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100px;
    height: 80px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      font-size: 14px;
    }
  }
}
</style>