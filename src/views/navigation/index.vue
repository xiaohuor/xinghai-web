<template>
  <div class="navigation-container">
    <div class="nav-group">
      <ElButton @click="handleBookmarks">个人书签</ElButton>
      <ElButton @click="handleNavTechnology">技术导航</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleBookmarks = () => {
  let routeData = router.resolve({
    name: "bookmarks",
  });
  window.open(routeData.href, '_blank');
}
const handleNavTechnology = () => {
  let routeData = router.resolve({
    name: "nav-technology",
  });
  window.open(routeData.href, '_blank');
}
</script>

<style scoped>
.navigation-container {
  padding: 20px;
  height: 100%;
  overflow: auto;
}
</style>
