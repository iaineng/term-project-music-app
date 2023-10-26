<template>
  <div class="singer">
    <div class="flex selectbtn">
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
        <img :src="item.picUrl" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
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
      proxy.$axios.get(`http://198.44.187.171:3000/artist/list?type=${type}&area=-1`).then(res => {
        console.log(res)
        data.singers = res.data.artists;
      });
    }

    // 切换歌手类别
    const setType = (type) => {
      proxy.$axios.get(`http://198.44.187.171:3000/artist/list?type=${type}&area=-1`).then(res => {
        console.log(res)
        data.singers = res.data.artists;
      });
    }

    // 跳转到歌手全部歌曲页面
    const gotoAllsongs = (id) => {
      router.push(`/allsongs?id=${id}`)
    }

    onMounted(getdata)
    return {
      ...toRefs(data),
      setType,
      gotoAllsongs
    };
  },
}
</script>

<style lang="less" scoped>
.flex {
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