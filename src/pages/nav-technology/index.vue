<template>
  <el-row class="nav-technology">
    <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3" :xxl="2" class="nav-menu-col">
      <el-anchor :offset="70" container=".el-main">
        <h3 style="margin: 10px">
          网址导航
        </h3>
        <el-anchor-link v-for="(item, index) in website" :key="index" :href="'#nav'+index" :title="item.title" />
      </el-anchor>
      <el-tooltip
        class="about-nav"
        content="本站吸收了他人网站的经验（https://nav.imaring.com/），增加了自己的整理。"
        placement="top-start"
        effect="light"
      >
        <p style="padding-left:5px; cursor: pointer; margin-top: 20px; color: #909399;">关于</p>
      </el-tooltip>
    </el-col>
    <el-col :xs="16" :sm="19" :md="20" :lg="21" :xl="21" :xxl="22" class="nav-content-col">
      <section v-for="(item, index) in website" :key="index" :id="'nav'+index">
        <h4 class="nav-title"># {{item.title}}</h4>
        <el-row>
          <el-col v-for="(child, i) in item.children" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :xxl="4" :key="i" class="website">
            <el-tooltip :content="child.comment" effect="light" placement="top" :show-after="500">
              <el-card shadow="hover" class="website-card" @click="openWindow(child.url)">
                <div class="card-content">
                  <img :src="getIconUrl(child.icon)" alt="website" class="website-icon">
                  <div class="text-content">
                    <h5 class="website-title">{{child.title}}</h5>
                    <p class="website-comment">{{child.comment}}</p>
                  </div>
                </div>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
      </section>
    </el-col>
    <el-backtop target=".el-main" :right="40" :bottom="40" />
  </el-row>
</template>

<script setup lang="ts">
import websiteData from "./website"

// Define interfaces if needed, but websiteData is JS, so we can use any
const website = websiteData

const openWindow = (url: string) => {
  window.open(url)
}

const getIconUrl = (icon: string) => {
  if (!icon) return ''
  if (icon.startsWith('http') || icon.startsWith('//')) {
    return icon
  }
  // Remove leading slash if present to avoid double slash, then add it back
  const cleanPath = icon.startsWith('/') ? icon.slice(1) : icon
  return `/${cleanPath}`
}
</script>

<style lang="scss" scoped>
.nav-technology {
  padding: 15px;
  background-color: #f9f9f9;
  min-height: 100%;
}

.nav-menu-col {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.nav-title {
  margin: 20px 0 10px;
  font-size: 18px;
  color: #303133;
}

.website {
  padding: 10px;
}

.website-card {
  cursor: pointer;
  border-radius: 4px;
  height: 100px;
  :deep(.el-card__body) {
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
  }
}

.card-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.website-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: contain;
}

.text-content {
  flex: 1;
  overflow: hidden;
}

.website-title {
  font-size: 14px;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #303133;
}

.website-comment {
  font-size: 12px;
  color: #909399;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0;
  line-height: 1.5;
}
</style>
