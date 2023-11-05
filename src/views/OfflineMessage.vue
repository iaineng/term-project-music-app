<script>
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const DB_NAME = 'html5_storage_form_comment'
    const content = ref('')
    const comments = ref([])
    const photo = ref('')
    const showError = ref(false)
    const avatarUrl = ref('data:image/gif;base64,R0lGODlhMgAyAOYAAOnt9Ojs8+ns9Ojr8+jr8ujq8ufr8+fr8ufq8+fq8ubq8+bq8ubp8uXp8uXp8eXo8eTp8ebp8eTo8eTn8ePo8eLn8OPn8eLm8ODl7+Hl7+Dk79/k79/k7t7j7t3j7d/j7t7i7d3i7t3i7dzi7dzg7Nvh7dvh7Nzh7dvg7drg7Nrg69nf69rf69je69ne7Njd69fd6tbc6tPb6NXb6dPa6NLZ59LY59HY59DY5tDX59DX5tHX58/W5s/W5c7W5s7W5c3V5czU5czU5M3U5czT5MvT5MrS48nS48rS5MnR4sjR4sfQ4sjQ4sfP4cbP4cfP4sbO4cXO4MTN4MPN4MXN4MTM38PM4MPM38LM4MLM38LL3sHL38HL3sLL38HK3sDK3sHK377I3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAyADIAAAf/gFKCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5yQW5+gW52NSDczpzNAo4s+HAyvsAwXPF5eq4UvAwMSvL29LEaft1IrAb7HvAYGMMM4u8jQAildqyEJ0NgGQNScPwrY4CRZnSLX4NhOV5wUFOfYT+qaRgzu0BudRPT1xyNWnEUN9h27x+mIPoG8TvjjhCECQl4wRHHysOChBBbcNm2o+PAGl040DFhsspBThoD7BqSQyMlLDQEIt90C4WCfk4yrMBzEZkLLMEExzIHbwfJWEaHYZP6U0kIkOB84h+kElyPqLRQckRmwEabksA5ZkanwcfPWjBQd6gEo0aUtpyAfeQjIFaiBBhMwYCrVWnJDxIKwApWtUFIrkhclMzhYPAejyZcvjbwcUeGg8mJ3MxzV+Ht5n4ELQ4oaknHgQGeEBm7YOsTD6emHQkQLmjDh9eInWXLrdoHA9mIRV4IHRwLYt8AeoVL0Nm5x5acklplbZJL7RgHpi3V8CQQAOw==')
    let db

    const loadData = () => {
      let objectStore = db.transaction(DB_NAME).objectStore(DB_NAME)
      objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result
        if (cursor) {
          comments.value.unshift(cursor.value)
          cursor.continue()
        }
      }
    }

    const openDatabase = () => {
      let request = indexedDB.open(DB_NAME, 1)
      request.onerror = function (event) {
        console.error('Database error: ' + event.target.errorCode)
      }
      request.onsuccess = function (event) {
        db = event.target.result
        loadData()
      }
      request.onupgradeneeded = function (event) {
        db = event.target.result
        let objectStore = db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true })
        objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('date', 'date', { unique: false })
        objectStore.createIndex('content', 'content', { unique: false })
        objectStore.createIndex('img', 'img', { unique: false })
      }
    }

    const submitComment = () => {
      let name = '陌生人' + (new Date().getTime()) % 5
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        name = userInfo.profile.nickname
      }

      if (!(content.value.trim() || photo.value)) {
        showError.value = true
        setTimeout(() => {
          showError.value = false
        }, 1500)

        return
      }

      let data = {
        img: avatarUrl.value,
        name,
        date: new Date().toLocaleString(),
        content: content.value.trim(),
        photo: photo.value
      }
      storeData(data)

      photo.value = ''
    }

    const storeData = (data) => {
      let transaction = db.transaction([DB_NAME], 'readwrite')
      let objectStore = transaction.objectStore(DB_NAME)
      let request = objectStore.add(data)
      request.onsuccess = function (event) {
        data.id = event.target.result
        comments.value.unshift(data)
        content.value = ''
      }
      request.onerror = function (event) {
        console.error('Error adding data: ', event.target.error)
      }
    }

    const takePhoto = () => {
      plus.camera.getCamera().captureImage(function (path) {
        plus.io.resolveLocalFileSystemURL(path, function (entry) {
          photo.value = entry.toRemoteURL()
        }, function (error) {
          console.error('Resolve file URL failed: ' + error.message)
        })
      }, function (error) {
        console.error('Capture image failed: ' + error.message)
      }, { filename: '_doc/camera/', index: '1' })
    }

    onMounted(() => {
      openDatabase()

      let userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)

        avatarUrl.value = userInfo.profile.avatarUrl
      }
    })

    return {
      content,
      comments,
      avatarUrl,
      submitComment,
      takePhoto,
      photo,
      showError,
    }
  }
}
</script>

<template>
  <div class="comment-box">
    <div class="comment-box_2 clearfix">
      <table>
        <tr>
          <td style="width: 60px;vertical-align: top;">
            <img height="50" width="50" :src="avatarUrl">
          </td>
          <td>
            <textarea v-model="content" placeholder="请输入留言"></textarea>
            <div>
              <span class="tip" v-if="showError">请填写留言内容</span>
              <img v-if="photo" :src="photo" class="photo"/>
              <input type="button" value="留  言" class="input-button" @click="submitComment">
              <input type="button" style="margin-right: 10px;" value="拍  照" class="input-button" @click="takePhoto">
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="content">
      <ul class="comment-list">
        <li class="clearfix" v-for="comment in comments" :key="comment.id">
          <img class="avatar" height="50" width="50" :src="comment.img">
          <a class="s_4" href="javascript:void(0);">举报</a>
          <div class="s_3">
            <p class="p_1"><a class="user" target="blank">{{ comment.name }}</a><span class="date">{{
                comment.date
              }}</span></p>
            <p class="comment">
              <img v-if="comment.photo" :src="comment.photo" class="photo"/>
              <span>{{ comment.content }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
body {
  color: #333;
  font-size: 12px;
  font-family: Tahoma, Verdana, sans-serif;
}

div,
tbody,
tr,
td,
input,
ul,
li,
p {
  margin: 0;
  padding: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-color: grey;
}

li {
  list-style: none;
}

a {
  color: #005eac;
  text-decoration: none;
}

img {
  border: none;
}

.clearfix {
  display: block;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.comment-box {
  border: 1px solid #3879D9;
  border-radius: 5px;
  padding: 2px;
  box-shadow: 0 0 5px #3879D9 inset;
}

.comment-box_2 {
  padding: 10px 10px 5px;
  background: #f0f5f8;
}

textarea {
  width: 98%;
  height: 23px;
  padding: 3px;
  border: 1px solid #bcc7d8;
  margin-bottom: 5px;
  overflow: auto;
  font-size: 12px;
}

.input-button,
.input-submit {
  background-color: #005eac;
  border-width: 1px;
  border-style: solid;
  border-color: #b8d4e8 #124680 #124680 #b8d4e8;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 15px;
  overflow: visible;
  float: right;
}

.comment-box .content {
  padding: 0 10px;
}

.comment-list .comment {
  word-wrap: break-word;
}

.comment-list .avatar {
  float: left;
}

.comment-list li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
}

.content .s_3 {
  margin: 0 40px 0 60px;
}

.comment-list .p_1 {
  margin-bottom: 5px;
}

.comment-list .date {
  color: #999;
  margin-left: 10px;
}

.content .s_4 {
  float: right;
  color: #999;
  margin-left: 10px;
}

span.tip {
  color: Red;
  display: none;
}

.photo {
  max-width: 100%;
  border: 1px solid #ddd;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>