<template>
  <el-container class="layout-wrapper">
    <el-header class="header">
      <page-header/>
    </el-header>
    <el-container class="main-container">
      <el-aside width="280px" class="sidebar-container hidden-sm-and-down">
        <el-card shadow="never" class="sidebar-card">
          <div class="profile-section">
            <div class="avator-wrapper">
              <img :src="avator" alt="avator" class="avator">
            </div>
            <h3 class="username">星海</h3>
            <p class="introduction">
              爱骑行，爱美剧<br>
              搬最方的砖，做最靓的仔
            </p>
            <div class="social-links">
              <!-- You can add social icons here later -->
            </div>
          </div>
        </el-card>
      </el-aside>
      <el-main class="content-container">
        <el-card shadow="never" class="content-card">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-card>
      </el-main>
    </el-container>
    <el-footer class="footer">星辰大海四季，人间至味清欢。</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import PageHeader from "./page-header.vue";
import avator from "@/assets/image/avator.jpg";
</script>

<style lang="scss" scoped>
.layout-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
  position: relative;
}

.main-container {
  flex: 1;
  overflow: hidden; /* Prevent outer scroll */
  background: #f5f7f9;
  padding: 15px;
  padding-bottom: 0;
  gap: 15px;
}

.sidebar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.sidebar-card {
  height: 100%;
  border: none;
  border-radius: 8px;
  border: 1px solid rgb(232, 234, 236);
  background: #fff;
  display: flex;
  flex-direction: column;
  
  :deep(.el-card__body) {
    padding: 30px 20px;
    height: 100%;
    box-sizing: border-box;
  }
}

.profile-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.avator-wrapper {
  width: 120px;
  height: 120px;
  // border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  // box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

.avator {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  margin: 10px 0;
  font-size: 24px;
  color: #303133;
  font-weight: 600;
}

.introduction {
  line-height: 1.8;
  color: #606266;
  font-size: 14px;
  margin-top: 10px;
  background: #f9fafe;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
}

.content-container {
  padding: 0; /* Remove default padding */
  height: 100%;
  overflow: hidden; /* Handle scroll inside router-view pages */
  display: flex;
  flex-direction: column;
}

.content-card {
  flex: 1;
  border: none;
  border-radius: 8px;
  border: 1px solid rgb(232, 234, 236);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  :deep(.el-card__body) {
    padding: 0;
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
}

.footer {
  text-align: center;
  padding: 15px;
  height: auto;
  color: #909399;
  font-size: 12px;
  background: #f5f7f9;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    padding: 10px;
  }
  
  /* Sidebar is hidden by hidden-sm-and-down class from Element Plus */
}
</style>
