<script setup>
import { onMounted, ref } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'

const dbName = 'music_app'
const tableName = 'offline_message'
let db

const isSendActionSheetDisplaying = ref(false)
const message = ref('')
const photo = ref('')
const messages = ref([])

const initialIndexedDatabase = () => {
  const req = indexedDB.open(dbName, 1)

  req.onerror = ev => {
    console.error('Database error: ' + ev.target.errorCode)
  }
  req.onsuccess = ev => {
    db = ev.target.result
    loadData()
  }
  req.onupgradeneeded = ev => {
    db = ev.target.result
    let objectStore = db.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true })
    objectStore.createIndex('avatar', 'avatar', { unique: false })
    objectStore.createIndex('nickName', 'nickName', { unique: false })
    objectStore.createIndex('createdAt', 'createdAt', { unique: false })
    objectStore.createIndex('message', 'message', { unique: false })
    objectStore.createIndex('img', 'img', { unique: false })
  }
}

const loadData = () => {
  db.transaction(tableName).objectStore(tableName).openCursor().onsuccess = (ev) => {
    let cursor = ev.target.result
    if (!cursor) {
      return
    }
    messages.value.unshift(cursor.value)
    cursor.continue()
  }
}

const storeData = (data) => {
  let req = db.transaction(tableName, 'readwrite').objectStore(tableName).add(data)
  req.onsuccess = ev => {
    data.id = ev.target.result
    messages.value.unshift(data)
    message.value = ''
  }
  req.onerror = ev => {
    console.error('Error adding data: ', ev.target.error)
  }
}

const onOpenSendActionSheet = () => {
  isSendActionSheetDisplaying.value = true
}

const onSend = () => {
  let nickName = '陌生人' + (new Date().getTime()) % 5
  let avatar = ''

  let userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    userInfo = JSON.parse(userInfo)

    nickName = userInfo.profile?.nickname ?? nickName
    avatar = userInfo.profile?.avatarUrl ?? avatar
  }

  if (!(message.value.trim() || photo.value)) {
    showFailToast('留言为空')

    return
  }

  let data = {
    avatar,
    nickName,
    createdAt: new Date().toLocaleString(),
    message: message.value.trim(),
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png'
  }
  storeData(data)

  photo.value = ''
  message.value = ''

  isSendActionSheetDisplaying.value = false

  showSuccessToast('发送成功')
}

const onTakePhotoClick = () => {
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
  initialIndexedDatabase()
})
</script>

<template>
  <div>
    <van-nav-bar
        title="离线留言"
        left-arrow
        placeholder
        fixed
        @click-left="$router.back()"
    />

    <div class="flex flex-col items-center mx-16px mt-16px mb-16px gap-16px">
      <div class="bg-gray-50 p-16px mx-16px b-rd-16px w-full box-border shadow-sm flex flex-col"
           v-for="item in messages" :key="item.id">
        <div class="flex items-center">
          <img :src="item.avatar" class="block w-40px h-40px b-rd-50%"/>
          <div class="flex flex-col ml-8px">
            <div class="font-size-14px font-bold">{{ item.nickName }}</div>
            <div class="font-size-10px color-gray-400 mt-4px">{{ item.createdAt }}</div>
          </div>
        </div>
        <div class="flex mt-8px">
          <div class="font-size-14px">{{ item.message }}</div>
        </div>
        <div class="flex mt-8px" v-if="item.img">
          <img :src="item.img" class="block w-full"/>
        </div>
      </div>
    </div>

    <van-action-sheet v-model:show="isSendActionSheetDisplaying" title="发送消息">
      <div class="p-16px">
        <van-cell-group inset>
          <van-field
              v-model="message"
              rows="2"
              autosize
              label="留言"
              type="textarea"
              maxlength="1000"
              placeholder="请输入留言"
              show-word-limit
          />
        </van-cell-group>

        <div class="mt-8 flex" v-if="photo">
          <img :src="photo" class="block w-full"/>
        </div>

        <div class="mt-16px flex gap-8px">
          <van-button
              round
              block
              @click="onSend"
          >发送
          </van-button>
          <van-button
              round
              block
              @click="onTakePhotoClick"
          >拍照
          </van-button>
        </div>
      </div>
    </van-action-sheet>
    <van-floating-bubble icon="chat" @click="onOpenSendActionSheet"/>
  </div>
</template>

<style scoped lang="less">
:deep(.van-button) {
  border: none;
  background: black;
  color: white;
}

:deep(.van-button__text) {
  font-size: 16px;
}
</style>