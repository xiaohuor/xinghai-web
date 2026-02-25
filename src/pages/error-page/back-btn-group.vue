<template>
  <div>
    <el-button size="large" text @click="backHome">返回首页</el-button>
    <el-button size="large" text @click="backPrev">返回上一页({{ second }}s)</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const second = ref(5)
let timer: any = null

const backHome = () => {
  router.replace({
    name: 'home'
  })
}

const backPrev = () => {
  router.go(-1)
}

onMounted(() => {
  timer = setInterval(() => {
    if (second.value === 0) backPrev()
    else second.value--
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
