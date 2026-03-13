<template>
  <ec-popup :show="visible" @closed="handleClose" @opened="handleOpen" teleport="body" class="select-popup">

    <div class="popup-content">
      <!-- 关闭按钮 -->
      <img class="close-btn" src="https://res.ennew.com/image/png/de87291b708c1e8e647c94a5441f1215.png" alt=""
        @click="handleClose" />

      <!-- 内容区域 -->
      <div class="guide-content">
        <!-- 媒体展示区域 -->
        <div class="option-list">
          <div v-for="item in options" :key="item" class="option-item" @click="handleSelect(item)">
            <div class="option-text">{{ item }}</div>
          </div>
        </div>
        
      </div>
      
    </div>
  </ec-popup>
</template>
<script setup>
import { ref, defineEmits, } from 'vue';

// 组件属性和事件
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['close', 'update']);
const handleOpen = () => {
}
// 关闭弹窗
const handleClose = () => {
  emit('close');
};
// 选择选项
const handleSelect = (item) => {
  emit('update', item);
  emit('close');
}

</script>

<style lang="scss">
// 主容器样式
.select-popup {
  height: 100vh;
  width: 100vw;
  max-width: 600px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}
</style>
<style lang="scss" scoped>
// 样式变量定义
$primary-color: #01C2C3;


// 弹窗内容区域
.popup-content {
  width: 339px;
  height: fit-content;
  background: #fff;
  border-radius: 12px;
  padding: 28px 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // 关闭按钮
  .close-btn {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 0;
    top: -46px;
    cursor: pointer;
  }

}

// 底部内容区域
.guide-content {
  max-height: 450px;
  overflow: auto;
  padding: 0 16px;
  margin: 0 -16px;
  margin-bottom: 16px;
  .option-list { 
    display: flex;
    flex-direction: column;
    gap: 12px;
    .option-item {
      padding: 12px 16px;
      border-radius: 8px;
      background: #F7F8FA;
      cursor: pointer;
      color: #181F43;
      .option-text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      &:hover {
        background: rgba(1, 194, 195, 0.12);
      }
      &:active {
        background: rgba(1, 194, 195, 0.12);
      }
    }
  }

  
}

</style>
