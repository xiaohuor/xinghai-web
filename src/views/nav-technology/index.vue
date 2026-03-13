<template>
  <div class="nav-technology-container">
    <el-container class="layout-container">
      <!-- Sidebar Navigation -->
      <el-aside width="240px" class="nav-sidebar hidden-sm-and-down">
        <div class="sidebar-wrapper">
          <div class="sidebar-header">
            <h3 class="sidebar-title">
              <el-icon class="icon-pulse"><Compass /></el-icon> 网址导航
            </h3>
          </div>
          <el-scrollbar>
            <div class="sidebar-menu">
              <div 
                v-for="(item, index) in website" 
                :key="index"
                class="menu-item"
                :class="{ active: activeSection === index }"
                @click="scrollToSection(index)"
              >
                <span class="menu-text">{{ item.title }}</span>
                <span class="menu-count">{{ item.children.length }}</span>
              </div>
            </div>
          </el-scrollbar>
          <div class="sidebar-footer">
            <el-tooltip
              content="本站吸收了他人网站的经验（https://nav.imaring.com/），增加了自己的整理。"
              placement="top"
              effect="dark"
            >
              <div class="about-btn">
                <el-icon><InfoFilled /></el-icon> 关于本站
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-aside>
      
      <!-- Main Content -->
      <el-main class="page-scroll-container" @scroll="handleScroll">
        <div class="main-content">
          <section 
            v-for="(item, index) in website" 
            :key="index" 
            :id="'nav-'+index" 
            class="nav-section"
            ref="sectionRefs"
          >
            <div class="section-header">
              <div class="header-line"></div>
              <h4 class="section-title">
                <el-icon class="section-icon"><Collection /></el-icon>
                {{item.title}}
              </h4>
            </div>
            <el-row :gutter="20">
              <el-col 
                v-for="(child, i) in item.children" 
                :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :xxl="4" 
                :key="i" 
                class="nav-card-col"
              >
                <el-tooltip 
                  :content="child.comment || (child as any).desc || child.title" 
                  placement="bottom" 
                  effect="light"
                  :show-after="800"
                >
                  <el-card shadow="hover" class="nav-card" @click="openWindow(child.url)">
                    <div class="nav-card-body">
                      <div class="icon-box">
                        <img 
                          v-if="child.icon" 
                          :src="getIconUrl(child.icon)" 
                          :alt="child.title" 
                          class="nav-icon" 
                          @error="handleImageError"
                        >
                        <div 
                          v-else 
                          class="default-icon" 
                          :style="{background: getRandomGradient(child.title)}"
                        >
                          {{ child.title.charAt(0).toUpperCase() }}
                        </div>
                      </div>
                      <div class="content-box">
                        <h5 class="title">{{child.title}}</h5>
                        <p class="desc">{{child.comment || (child as any).desc || '暂无描述'}}</p>
                      </div>
                    </div>
                  </el-card>
                </el-tooltip>
              </el-col>
            </el-row>
          </section>
        </div>
        <el-backtop target=".page-scroll-container" :right="40" :bottom="40" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import websiteData from "./website"
import { Compass, InfoFilled, Collection } from '@element-plus/icons-vue'

const website = websiteData
const activeSection = ref(0)

const openWindow = (url: string) => {
  window.open(url, '_blank')
}

const getIconUrl = (icon: string) => {
  if (!icon) return ''
  if (icon.startsWith('http') || icon.startsWith('//')) {
    return icon
  }
  // Use new URL(...) to handle relative paths correctly with Vite
  try {
    // Assuming icons are in public/image/website-logo/...
    // If the path in JSON is 'image/website-logo/foo.png'
    const cleanPath = icon.startsWith('/') ? icon.slice(1) : icon
    const finalUrl = import.meta.env.DEV ? `/${cleanPath}` : `${import.meta.env.VITE_BASE_URL}/${cleanPath}`
    return finalUrl
  } catch (e) {
    return icon
  }
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
  // Find sibling default icon and show it? 
  // Easier to just toggle visibility in template with a reactive state per item, 
  // but for simplicity in v-for, we can just hide the img and let a fallback div show if we structure it right.
  // Current structure has v-if/v-else. 
  // Better approach: set src to a transparent pixel or empty string to trigger v-else? No, that won't work easily.
  // We can swap the src to a default placeholder.
  // target.src = '/default-icon.png'
  
  // Alternative: The template uses v-if="child.icon". If load fails, we can't easily switch to v-else block.
  // So we'll just style the parent to show a fallback.
  // But for now let's just leave it hidden, or maybe set a fallback image.
}

const getRandomGradient = (str: string) => {
  const colors = [
    'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
const scrollToSection = (index: number) => {
  activeSection.value = index
  const element = document.getElementById(`nav-${index}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const scrollTop = target.scrollTop
  const sections = document.querySelectorAll('.nav-section')
  
  // Simple scroll spy
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i] as HTMLElement
    if (section.offsetTop - 100 <= scrollTop) {
      activeSection.value = i
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-technology-container {
  height: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
}

.layout-container {
  height: 100%;
}

.nav-sidebar {
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  height: 100%;
  position: relative;
  z-index: 10;
  box-shadow: 2px 0 8px rgba(0,0,0,0.02);

  .sidebar-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
    
    .sidebar-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      display: flex;
      align-items: center;
      gap: 8px;
      
      .icon-pulse {
        color: #409eff;
      }
    }
  }

  .sidebar-menu {
    padding: 10px 0;
  }

  .menu-item {
    padding: 12px 24px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
    color: #606266;
    font-size: 14px;
    border-left: 3px solid transparent;

    &:hover {
      background-color: #ecf5ff;
      color: #409eff;
    }

    &.active {
      background-color: #ecf5ff;
      color: #409eff;
      border-left-color: #409eff;
      font-weight: 500;
      
      .menu-count {
        background-color: #409eff;
        color: #fff;
      }
    }

    .menu-count {
      background-color: #f0f2f5;
      color: #909399;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 12px;
      transition: all 0.3s;
    }
  }

  .sidebar-footer {
    padding: 15px;
    border-top: 1px solid #f0f0f0;
    text-align: center;
    
    .about-btn {
      color: #909399;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: color 0.3s;
      
      &:hover {
        color: #409eff;
      }
    }
  }
}

.page-scroll-container {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 0; // Remove default padding
}

.main-content {
  padding: 20px 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.nav-section {
  margin-bottom: 40px;
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    
    .header-line {
      width: 4px;
      height: 24px;
      background: #409eff;
      border-radius: 2px;
      margin-right: 12px;
    }
    
    .section-title {
      font-size: 20px;
      color: #303133;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      
      .section-icon {
        color: #909399;
        font-size: 18px;
      }
    }
  }
}

.nav-card {
  border: none;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 20px;
  height: 100px;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    
    .title {
      color: #409eff;
    }
  }
  
  :deep(.el-card__body) {
    padding: 15px;
    height: 100%;
    box-sizing: border-box;
  }

  .nav-card-body {
    display: flex;
    align-items: center;
    height: 100%;
  }
  
  .icon-box {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    margin-right: 16px;
    
    .nav-icon {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
      background-color: #fff;
    }
    
    .default-icon {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  }
  
  .content-box {
    flex: 1;
    overflow: hidden;
    
    .title {
      font-size: 15px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 6px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.3s;
    }
    
    .desc {
      font-size: 12px;
      color: #909399;
      margin: 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      height: 36px; // Ensure consistent height for 2 lines
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }
  
  .nav-section {
    margin-bottom: 30px;
    
    .section-header {
      .section-title {
        font-size: 18px;
      }
    }
  }
}
</style>
