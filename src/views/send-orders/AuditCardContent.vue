<template>
  <div class="danger-desc" v-if="item.field2">
    <div class="desc-label">
      <div class="label-text">
        隐患类型
        <img src="@/assets/img-ecej/icon-danger.png" alt="" class="desc-icon">
      </div>
    </div>
    <div class="desc-content">
      {{ item.field2 }}
    </div>

    <div class="danger-standard">
      <div class="desc-label">
        <div class="label-text">隐患判断标准</div>
        <div class="edit-action" @click="emit('edit', 'suggestion')">
          <img src="@/assets/img-ecej/icon-edit.png" alt="" class="edit-icon">
          标准优化建议
        </div>
      </div>
      <div class="sub-title">
        <div>请根据<span class="highlight">本标准</span>进行审核</div>
        <img src="@/assets/img-ecej/icon-info.png" alt="" class="info-icon" @click="emit('showTip')">
      </div>
      <div class="desc-content">
        {{ item.field3 }}
      </div>
    </div>
  </div>

  <div class="danger-desc" v-if="reviewDesc" style="margin-bottom: 12px;">
    <div class="desc-label">
      <div class="label-text">其他隐患</div>
      <div class="edit-action" @click="emit('edit', 'danger')">
        <img src="@/assets/img-ecej/icon-edit.png" alt="" class="edit-icon">
        编辑
      </div>
    </div>
    <div class="desc-content">
      {{ reviewDesc }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({})
  },
  reviewDesc: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['edit', 'showTip'])
</script>

<style lang="scss" scoped>
.danger-desc {
  margin-top: 12px;
  padding: 10px 12px;
  background: rgba(1, 194, 195, 0.12);
  border-radius: 6px;

  .edit-action {
    font-weight: 400;
    font-size: 12px;
    color: #01C2C3;
    line-height: 20px;
    display: flex;
    align-items: center;

    .edit-icon {
      margin-right: 4px;
      height: 10px;
      width: 10px;
    }
  }

  .desc-label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label-text {
      font-weight: 500;
      font-size: 14px;
      color: rgba(24, 31, 67, 0.8);
      line-height: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .desc-icon {
      width: 18px;
      height: 18px;
    }
  }

  .desc-content {
    margin-top: 4px;
    font-weight: 500;
    font-size: 14px;
    color: #01C2C3;
    line-height: 20px;
  }

  .danger-standard {
    margin-top: 12px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;

    .desc-label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label-text {
        font-weight: 500;
        font-size: 12px;
        color: rgba(24, 31, 67, 0.8);
        line-height: 18px;
      }
    }

    .sub-title {
      font-weight: 400;
      font-size: 12px;
      color: rgba(24, 31, 67, 0.7);
      line-height: 18px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding-bottom: 8px;
      display: flex;
      align-items: center;

      .highlight {
        color: #01C2C3;
      }

      .info-icon {
        width: 10px;
        height: 10px;
        margin-left: 6px;
      }
    }

    .desc-content {
      margin-top: 6px;
      font-weight: 400;
      font-size: 12px;
      color: rgba(24, 31, 67, 0.7);
      line-height: 20px;
      white-space: pre-wrap;
    }
  }
}
</style>
