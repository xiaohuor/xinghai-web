<template>
  <div class="app-list-container">
    <div class="content-wrapper">
      <div class="flex-row">
        <!-- Section 1: Common Sites -->
        <div class="flex-col">
          <div class="section-header">
            <el-icon class="section-icon" color="#409eff"><Collection /></el-icon>
            <span class="section-title">常用网站</span>
          </div>
          <el-card shadow="hover" class="link-card">
            <ul class="link-list">
              <li
                v-for="(item, index) in list1"
                :key="index"
                @click="openWindow(item.url)"
                class="list-item"
              >
                <div class="item-content">
                  <el-icon class="item-icon" :size="20" color="#67C23A"><ChromeFilled /></el-icon>
                  <span class="item-title">{{item.title}}</span>
                </div>
                <el-icon class="arrow-icon"><ArrowRight /></el-icon>
              </li>
            </ul>
          </el-card>
        </div>

        <!-- Section 2: H5 Apps -->
        <div class="flex-col">
          <div class="section-header">
            <el-icon class="section-icon" color="#e6a23c"><Iphone /></el-icon>
            <span class="section-title">应用列表</span>
          </div>
          <el-card shadow="hover" class="link-card">
            <ul class="link-list">
              <li
                v-for="(item, index) in list2"
                :key="index"
                @click="openWindow(item.url)"
                class="list-item"
              >
                <div class="item-content">
                  <el-icon class="item-icon" :size="20" color="#409EFF"><Platform /></el-icon>
                  <span class="item-title">{{item.title}}</span>
                </div>
                <el-icon class="arrow-icon"><ArrowRight /></el-icon>
              </li>
            </ul>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Collection, Iphone, ChromeFilled, Platform, ArrowRight } from '@element-plus/icons-vue'

const baseUrl = import.meta.env.VITE_BASE_URL;

const list1 = ref([
  {
    title: "星海的小站",
    url: baseUrl
  },
  {
    title: "个人书签",
    url: baseUrl + "#/bookmarks"
  },
  {
    title: "技术导航",
    url: baseUrl + "#/nav-technology"
  },
]);

const list2 = ref([
  {
    title: "医药知识小站",
    url: baseUrl + "/health"
  },
  {
    title: "生日祝福",
    url: baseUrl + "/h5/birthday/"
  },
  {
    title: "2020倒计时",
    url: baseUrl + "/h5/countdown/"
  },
  {
    title: "6%",
    url: baseUrl + "/h5/6-percents/"
  },{
    title: "思睿康药量变化和网购行为关系",
    url: baseUrl + "/h5/charts-heyue/"
  },{
    title: "个人简历",
    url: baseUrl + "/h5/resume/"
  },
]);

const openWindow = (url: string) => {
  window.open(url, '_blank');
}
</script>

<style lang="scss" scoped>
.app-list-container {
  width: 100%;
  height: 100%;
  /* Use flex to handle inner scrolling if needed, or just let content flow */
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  /* Remove overflow from container, let content wrapper handle it or fit within */
  overflow: hidden; 
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  flex: 1;
  overflow-y: auto; /* Scroll here if content overflows */
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.flex-col {
  flex: 1;
  min-width: 300px; /* Responsive behavior */
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 10px;
  
  .section-icon {
    margin-right: 10px;
    font-size: 24px;
  }
  
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
  }
}

.link-card {
  border-radius: 12px;
  border: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  :deep(.el-card__body) {
    padding: 0;
  }
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 18px 24px;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #ecf5ff;
    padding-left: 30px; // Subtle shift effect
    
    .item-title {
      color: #409eff;
    }
    
    .arrow-icon {
      opacity: 1;
      transform: translateX(5px);
    }
  }
}

.item-content {
  display: flex;
  align-items: center;
}

.item-icon {
  margin-right: 15px;
}

.item-title {
  font-size: 15px;
  color: #606266;
  transition: color 0.2s;
}

.arrow-icon {
  color: #909399;
  opacity: 0.5;
  transition: all 0.2s;
}
</style>
