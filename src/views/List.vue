<template>
  <div class="list" style="min-height: 100vh; background: white;">
    <van-nav-bar
        title="歌单分类"
        left-arrow
        placeholder
        fixed
        @click-left="$router.back()"
    />

    <div class="cate">
      <div>{{categories[0]}}</div>
      <div>{{categories[1]}}</div>
      <div>{{categories[2]}}</div>
      <div>{{categories[3]}}</div>
    </div>
    <div class="allwrap">
      <div v-for="(item, index) in recommendLists" :key="index" class="all">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
      categories: {},
      recommendLists: [],
    })
    const getdata = () => {
      proxy.$axios.get(`${proxy.$apiBaseUrl}/playlist/catlist`).then(res => {
        data.categories = res.data.categories;
        data.recommendLists = res.data.sub;
      });
    }
    onMounted(getdata)
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style lang="less" scoped>
.cate {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  div {
    width: 60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: cornflowerblue;
    border-radius: 25px;
    border: 1px solid cornflowerblue;
  }
}
.allwrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  .all {
    padding: 4px 16px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #000;
    border-radius: 20px;
    background: cornflowerblue;
    margin: 10px;
    font-size: 14px;
  }
}
</style>