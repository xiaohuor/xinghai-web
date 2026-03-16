<template>
  <div class="app-list-container">
    <div class="flex-row">
      <!-- Section 1: Common Sites -->
      <div class="flex-col">
        <div class="section-header">
          <el-icon class="section-icon" color="#409eff">
            <Collection />
          </el-icon>
          <span class="section-title">常用网站</span>
        </div>
        <el-card shadow="hover" class="link-card">
          <ul class="link-list">
            <li v-for="(item, index) in list1" :key="index" @click="openWindow(item.url)" class="list-item">
              <div class="item-content">
                <el-icon class="item-icon" :size="20" color="#67C23A">
                  <ChromeFilled />
                </el-icon>
                <span class="item-title">{{ item.title }}</span>
              </div>
              <el-icon class="arrow-icon">
                <ArrowRight />
              </el-icon>
            </li>
          </ul>
        </el-card>
      </div>

      <!-- Section 2: H5 Apps -->
      <div class="flex-col">
        <div class="section-header">
          <el-icon class="section-icon" color="#e6a23c">
            <Iphone />
          </el-icon>
          <span class="section-title">应用列表</span>
        </div>
        <el-card shadow="hover" class="link-card">
          <ul class="link-list">
            <li v-for="(item, index) in list2" :key="index" @click="openWindow(item.url)" class="list-item">
              <div class="item-content">
                <el-icon class="item-icon" :size="20" color="#409EFF">
                  <Platform />
                </el-icon>
                <span class="item-title">{{ item.title }}</span>
              </div>
              <el-icon class="arrow-icon">
                <ArrowRight />
              </el-icon>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Collection, Iphone, ChromeFilled, Platform, ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()
const baseUrl = import.meta.env.VITE_BASE_URL;

const list1 = ref([
  {
    title: "星海的小站",
    url: '#/'
  },
  {
    title: "个人书签",
    url: "#/bookmarks"
  },
  {
    title: "技术导航",
    url: "#/nav-technology"
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
  },
  {
    title: "思睿康药量变化和网购行为关系",
    url: baseUrl + "/h5/charts-heyue/"
  },
  {
    title: "个人简历",
    url: baseUrl + "/h5/resume/"
  },
  {
    title: "二分类专家审核-ecej",
    url: "#/task-list"
  },
]);

const openWindow = async (url: string) => {
  try {
    if (url.startsWith('#/')) {
      await router.push(url.replace(/^#/, ''))
      return
    }

    const parsed = new URL(url, window.location.href)
    if (parsed.hash?.startsWith('#/')) {
      await router.push(parsed.hash.replace(/^#/, ''))
      return
    }

    if (parsed.origin === window.location.origin && parsed.pathname === '/' && !parsed.hash) {
      await router.push('/')
      return
    }
  } catch {}

  window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.app-list-container {
  padding: 15px;
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 20px;
}

.flex-col {
  flex: 1;
  min-width: 250px;
  max-width: 500px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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
