<template>
  <div class="bookmarks-container">
    <div class="page-header">
      <div class="header-left">
        <span class="title">书签</span>
        <el-tag type="info" effect="plain" round class="count-tag">{{ filteredBookmarks.length }} items</el-tag>
      </div>
      <div class="header-right">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索书签..."
          :prefix-icon="Search"
          clearable
          class="search-input"
        />
        <el-button type="primary" :icon="Refresh" @click="handleUpdate">更新</el-button>
      </div>
    </div>

    <el-scrollbar height="calc(100vh - 140px)">
      <el-row :gutter="20" class="bookmark-list">
        <el-col
          v-for="(item, index) in filteredBookmarks"
          :key="index"
          :xs="24" :sm="12" :md="8" :lg="6" :xl="4"
        >
          <el-card shadow="hover" class="bookmark-card">
            <div class="card-content" @click="handleClick(item.url)">
              <div class="icon-wrapper">
                <img v-if="item.icon" :src="item.icon" class="bookmark-icon" @error="handleImageError"/>
                <el-avatar v-else :size="32" class="default-icon" style="background-color: #409eff;">
                  {{ item.name.charAt(0).toUpperCase() }}
                </el-avatar>
              </div>
              <div class="info-wrapper">
                <div class="bookmark-name" :title="item.name">{{ item.name }}</div>
                <div class="bookmark-url" :title="item.url">{{ item.url }}</div>
              </div>
            </div>
            <div class="card-actions">
              <el-dropdown trigger="click" @command="(command: any) => handleCommand(command, item)">
                <el-button link size="small" class="action-btn">
                  <el-icon><MoreFilled /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="modify" :icon="Edit">修改</el-dropdown-item>
                    <el-dropdown-item command="delete" :icon="Delete" divided style="color: #f56c6c;">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-card>
        </el-col>
        <el-empty v-if="filteredBookmarks.length === 0" description="未找到相关书签" />
      </el-row>
    </el-scrollbar>

    <el-dialog
      v-model="modifyModal"
      title="修改书签"
      width="500px"
      destroy-on-close
    >
      <el-form :model="currentMark" label-position="top" ref="formRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="currentMark.name" placeholder="请输入书签名称" />
        </el-form-item>
        <el-form-item label="图标 URL" prop="icon">
          <el-input v-model="currentMark.icon" placeholder="请输入图标 URL (可选)">
            <template #prefix>
              <el-icon><Picture /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="currentMark.url" placeholder="请输入网址">
            <template #prefix>
              <el-icon><Link /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyModal = false">取消</el-button>
          <el-button type="primary" @click="ok">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-backtop target=".el-scrollbar__wrap" :right="40" :bottom="40" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import bookmarksData from "@/assets/marks"
import { ElMessage } from 'element-plus'
import { Search, Refresh, MoreFilled, Edit, Delete, Picture, Link } from '@element-plus/icons-vue'

// Interface for bookmark item
interface Bookmark {
  name: string;
  url: string;
  icon?: string;
  originalIndex?: number; // Helper to track original index for modification
}

const bookmarks = ref<Bookmark[]>(bookmarksData.map((item, index) => ({ ...item, originalIndex: index })))
const searchKeyword = ref('')
const modifyModal = ref(false)
const currentMark = ref<Bookmark>({ name: '', url: '' })
const currentIndex = ref(-1) // Store the index in the original array

const filteredBookmarks = computed(() => {
  if (!searchKeyword.value) return bookmarks.value
  const keyword = searchKeyword.value.toLowerCase()
  return bookmarks.value.filter(item => 
    item.name.toLowerCase().includes(keyword) || 
    item.url.toLowerCase().includes(keyword)
  )
})

const handleClick = (url: string) => {
  window.open(url, '_blank')
}

const handleCommand = (command: string, item: Bookmark) => {
  if (item.originalIndex === undefined) return
  
  currentIndex.value = item.originalIndex
  
  switch (command) {
    case 'delete':
      bookmarks.value.splice(currentIndex.value, 1)
      // Re-index is not strictly necessary for display but good for data consistency if we were persisting
      // simpler to just remove from local state
      ElMessage.success('删除成功')
      break
    case 'modify':
      modifyModal.value = true
      currentMark.value = { ...bookmarks.value[currentIndex.value] }
      break
  }
}

const ok = () => {
  if (currentIndex.value > -1) {
    bookmarks.value[currentIndex.value] = { ...currentMark.value, originalIndex: currentIndex.value }
    ElMessage.success('修改成功')
    modifyModal.value = false
  }
}

const handleUpdate = () => {
  console.log(JSON.stringify(bookmarks.value.map(({ originalIndex, ...rest }) => rest)))
  ElMessage.info('数据已打印到控制台，暂不支持持久化保存')
}

const handleImageError = (e: Event) => {
  // Fallback if image fails to load
  (e.target as HTMLImageElement).style.display = 'none';
  // You might want to show the default avatar instead, logic could be more complex
}
</script>

<style lang="scss" scoped>
.bookmarks-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .search-input {
      width: 240px;
    }
  }
}

.bookmark-list {
  padding-bottom: 20px;
}

.bookmark-card {
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: visible; // Allow dropdown to overflow if needed, though usually it's in body

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    
    .card-actions {
      opacity: 1;
    }
  }

  :deep(.el-card__body) {
    padding: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.card-content {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
  min-width: 0; // Fix for flex child overflow
}

.icon-wrapper {
  margin-right: 15px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bookmark-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 4px;
  }
  
  .default-icon {
    font-size: 16px;
    font-weight: bold;
  }
}

.info-wrapper {
  flex: 1;
  min-width: 0; // Important for text-overflow to work

  .bookmark-name {
    font-size: 15px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bookmark-url {
    font-size: 12px;
    color: #909399;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.card-actions {
  opacity: 0; // Hidden by default
  transition: opacity 0.2s ease;
  margin-left: 10px;
  flex-shrink: 0;
}

.action-btn {
  padding: 4px;
  color: #909399;
  
  &:hover {
    color: #409eff;
    background-color: #ecf5ff;
  }
}
</style>
