<template>
  <van-popup :show="visible" @closed="handleClose" teleport="body" class="select-popup">

    <div class="popup-content">
      <!-- 内容区域 -->
      <div class="guide-content">
        <!-- 媒体展示区域 -->
        <div class="title-text">说明</div>
        <div class="content-text">
          请根据隐患判断标准进行审核，如标准有误，请点击【标准优化建议】提出问题和相应的建议。
        </div>
        <div class="footer-text" @click="handleClose">
          知道了
        </div>

      </div>

    </div>
  </van-popup>
</template>
<script setup>
import { defineEmits, } from 'vue';

// 组件属性和事件
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['close']);

// 关闭弹窗
const handleClose = () => {
  emit('close');
};
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
// $primary-color: #4644e2;

// .select-popup {
//   background: linear-gradient(184deg, rgba(174, 206, 255, 0.7) 0%, rgba(255, 255, 255, 0) 50%);
// }

// 弹窗内容区域
.popup-content {
  width: 280px;
  height: fit-content;
  background-color: #fff;
  background-image: linear-gradient(180deg, #EDF5FF 0%, #FFFFFF 40%);
  border-radius: 12px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}

// 底部内容区域
.guide-content {

  .title-text {
    font-weight: 500;
    font-size: 18px;
    color: #3D3E42;
    text-align: center;
    margin: 16px 0 12px 0;
  }

  .content-text {
    font-weight: 400;
    font-size: 14px;
    color: #737782;
    text-align: center;
    padding: 0 26px;
  }

  .footer-text {
    margin-top: 16px;
    border-top: 0.5px solid #D0D4DC;
    padding: 16px 0 11px 0;
    font-weight: 400;
    font-size: 16px;
    color: #01C2C3;
    text-align: center;
  }

}
</style>
