<template>
  <div class="allsongs">
          <div v-for="(item,index) in songs" :key="index" class="song">
              <span>{{index+1}}</span>
                {{item.name}}
          </div>
  </div>

</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router';
export default {
  setup () {
    let { proxy } = getCurrentInstance();
    const route = useRoute();

    // 获取所传参数
    const id = route.query.id;
    const data = reactive({
      songs: [],
        recommendSongs: [],
        recommendLists: [],
        recommendPics: [],
        curSongUrl: '',
        curItemId: ''
    })

    const getdata = () => {
      proxy.$axios.get(`http://198.44.187.171:3000/artist/songs?id=${id}`).then(res => {
        console.log(res)
        data.songs = res.data.songs;
      });
    }
    onMounted(getdata)
    return {
      ...toRefs(data)
    };
    const playsong = (id) => {
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
          value,
          onSearch,
          onCancel,
          ...toRefs(data),
          playsong,
          gotoSinger,
          gotoList,
          gotoPlay
      };
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