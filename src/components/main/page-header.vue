<template>
  <el-row align="middle" class="page-header">
    <el-col :span="4" class="logo-col">
      <img :src="welcome" alt="welcome" class="welcome">
      <span class="title">星海的空间</span>
    </el-col>
    <el-col :span="14">
      <el-menu mode="horizontal" :default-active="activeName" @select="selectHandle" :ellipsis="false" class="custom-menu">
        <template v-for="(item, index) in menu" :key="index">
          <el-menu-item :index="item.name as string">
            <el-icon v-if="item.meta && item.meta.icon">
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import welcome from "@/assets/image/welcome.gif"

const route = useRoute()
const router = useRouter()

const activeName = computed(() => route.name as string)

const selectHandle = (key: string) => {
  router.push({ name: key })
}

const mainRoute = router.options.routes.find(r => r.name === 'main')
const menu = mainRoute?.children || []

</script>

<style scoped lang="scss">
.page-header {
  height: 100%;
}
.welcome {
  width: 60px;
  vertical-align: middle;
  margin-right: 10px;
}
.logo-col {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  height: 100%;
}
.title {
  vertical-align: middle;
}
.custom-menu {
  border-bottom: none;
  height: 60px;
}
</style>
