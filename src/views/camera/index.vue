<template>
  <div class="camera-wrap">
    <button class="btn" @click="openCamera">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10L21 6V18L15 14V10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="3" y="6" width="12" height="12" rx="2" stroke="white" stroke-width="2"/>
      </svg>
      <span>开启摄像头</span>
    </button>
    <BaseCamera v-model:visible="visible" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BaseCamera from './BaseCamera.vue'
const visible = ref(false)
const openCamera = () => {
  console.log('openCamera')
  visible.value = true
}
</script>
<style scoped lang="scss">
.camera-wrap{
  padding: 15px;
}
.btn {
  width: 100%;
  justify-content: center;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>