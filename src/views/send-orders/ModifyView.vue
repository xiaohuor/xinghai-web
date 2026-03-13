<template>
  <div class="modify-page" :class="{ 'hidden': !props.visible }" @touchstart="touchstart">
    <div class="image-list">
      <div v-for="(item, index) in imgList" :key="item.id" class="image-card"
        :class="{ 'active': currentIndex === index }">
        <div class="image-wrapper" @click="handlePreview(item.imgUrl)">
          <img alt="" :src="item.imgUrl" class="base-img"></img>
        </div>

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
              <div class="edit-action" @click="handleEdit('suggestion')">
                <img src="@/assets/img-ecej/icon-edit.png" alt="" class="edit-icon">
                标准优化建议
              </div>
            </div>
            <div class="sub-title">

              <div>请根据<span class="highlight">本标准</span>进行审核</div>
              <img src="@/assets/img-ecej/icon-info.png" alt="" class="info-icon" @click="tipVisible = true;">
            </div>
            <div class="desc-content">
              {{ item.field3 }}
            </div>
          </div>
        </div>

        <div class="danger-desc" v-if="item.reviewDesc" @click="inputVisible1 = true;" style="margin-bottom: 12px;">
          <div class="desc-label">
            <div class="label-text">其他隐患</div>
            <div class="edit-action" @click="handleEdit('danger')">
              <img src="@/assets/img-ecej/icon-edit.png" alt="" class="edit-icon">
              编辑
            </div>
          </div>
          <div class="desc-content">
            {{ item.reviewDesc }}
          </div>
        </div>
        <!-- <div style="height: 12px;width: 100%;"></div> -->
      </div>
    </div>
    <ec-action-bar class="bottom-bar" v-if="disabled">
      <div class="action-bar-content" style="justify-content: flex-start;">
        <span>审核结果:</span>
        <ec-filter-cell clearable :list="statusList.filter(item => item.value == currentData.reviewResult)"
          v-model="reviewResult"></ec-filter-cell>
      </div>
      <div class="action-bar-btn">
        <ec-button type="primary" class="submit-button" text="关闭" @click="emit('close')" />
      </div>
    </ec-action-bar>
    <ec-action-bar class="bottom-bar" v-else>
      <div class="action-bar-content">
        <span>图片中是否存在上述隐患</span>
        <i class="ec-text-input__label--required" style="margin-left: -8px;"></i>
        <!-- <ec-filter-cell clearable :list="statusList" v-model="reviewResult" @change="handleChange"></ec-filter-cell> -->
        <van-radio-group v-model="reviewResult" @change="handleChange">
          <!-- <van-radio name="1">单选框 1</van-radio> -->
          <!-- <van-radio name="2">单选框 2</van-radio> -->
          <van-radio v-for="item in statusList" :key="item.value" :name="item.value" :label="item.value">{{ item.text
            }}</van-radio>

        </van-radio-group>
      </div>
      <div class="action-bar-btn">
        <ec-button :type="editing ? 'text' : 'primary'" text="关闭" :class="editing ? 'next-button' : 'submit-button'"
          @click="emit('close')" />
        <ec-button v-if="editing" type="primary" :text="loading ? '提交中...' : '提交修改'" class="submit-button"
          :disabled="loading || !reviewResult" @click="handleSubmit" />
      </div>
    </ec-action-bar>
    <InputPopup :visible="inputVisible1" :inputVal="currentData.reviewDesc" localStorageKey="danger_input"
      @close="inputVisible1 = false" @update="currentData.reviewDesc = $event" @clear="() => { }" />
    <InputPopup :visible="inputVisible2" :inputVal="currentData.standardSuggest" localStorageKey="suggestion_input"
      @close="inputVisible2 = false" @update="currentData.standardSuggest = $event" @clear="() => { }" />
  </div>
</template>
<script setup>
import dayjs from 'dayjs';
import { ActionBar as EcActionBar, Button as EcButton, ImagePreview } from 'vant';
import { Toast as MsgToast, RadioGroup, Radio } from 'vant';
import { ref, watch, reactive, computed } from 'vue';
// import { updateImageReview } from '@/api/audit-binary.js'
import { defineEmits } from 'vue';
import InputPopup from './InputPopupPlus.vue';
import { useRoute } from 'vue-router'
const emit = defineEmits(['close']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },

  imgList: {
    type: Array,
    default: () => [],
  },
  enterIndex: {
    type: Number,
    default: -1,
  },
  accountId: {
    type: String,
    default: '',
  }
})

let once = true;


const inputVisible1 = ref(false);
const inputVisible2 = ref(false);
const suggestion = ref('');
const editing = ref(false);
const currentIndex = ref(-1);
const route = useRoute()
const currentData = computed(() => props.imgList[currentIndex.value] || {});
console.log(currentData.value, '???');

watch(() => props.visible, (visible) => {
  if (!visible) {
    reviewResult.value = '';
    currentIndex.value = -1;
  } else {
    once = true;
    currentIndex.value = props.enterIndex;
  }
})
const disabled = ref(false);
watch(() => currentIndex.value, (val) => {
  if (val < 0) return;
  editing.value = false;
  reviewResult.value = currentData.value.reviewResult + '';
  const updateTime = currentData.value.updateTime;
  const date1 = new Date(dayjs().format('YYYY-MM-DD'));
  const date2 = new Date(updateTime);
  // 当globalStatus=2时，状态不可修改
  disabled.value = route.query.globalStatus === '2' ? true : false;
})

const handleEdit = (type) => {
  if (type == 'danger') {
    inputVisible1.value = true;
  } else if (type == 'suggestion') {
    let obj4 = currentData.value._busContentObj.find(item => item.type == 4);
    if (!obj4) {
      obj4 = {
        "type": 4,
        "mark_name": "",
        "coordinates": []
      }
      currentData.value._busContentObj.push(obj4)
    }
    suggestion.value = obj4.mark_name || '';
    inputVisible2.value = true;
  }
}
const handleUpdate = (type, val) => {
  console.log(type, val);
  if (type == 'danger') {
    // reviewDesc.value = val;
  } else if (type == 'suggestion') {
    // suggestion.value = val;
    // let obj4 = currentData.value._busContentObj.find(item => item.type == 4);
    // obj4.mark_name = val;
    // currentData.value.field4 = val;
  }
}

const statusList = ref([
  // { text: '正确', value: '1' },
  // { text: '错误', value: '2' },
  { text: '有隐患', value: '1' },
  { text: '无隐患', value: '2' },
  { text: '图片模糊，无法判断', value: '3' },
  { text: '其他', value: '4' },
]);
const reviewResult = ref('');
const loading = ref(false);
const handleSubmit = async () => {
  loading.value = true;
  console.log('InputPopup输入框内容:', currentData.value.reviewDesc);
  reviewResult.value
  console.log(props.imgList[currentIndex.value], 'props.imgList');
  const { code, message } = await updateImageReview({
    id: currentData.value.id,
    demandId: route.query.demandId,
    reviewerId: props.accountId,
    reviewResult: reviewResult.value,
    reviewDesc: currentData.value.reviewDesc,
    standardSuggest: currentData.value.standardSuggest,
    reviewTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    //  busContentObj: JSON.stringify(data._busContentObj),
  }).catch(() => ({}));

  loading.value = false;
  if (code !== '0') return MsgToast.fail(message || '审核修改失败');
  MsgToast.success(message || '审核修改成功');
  currentData.value.reviewResult = reviewResult.value;
  emit('close');
};
let historyText = '';
const handleChange = (val) => {
  // 如果是globalStatus=2的情况，不允许修改
  if (route.query.globalStatus === '2') {
    reviewResult.value = currentData.value.reviewResult + '';
    return;
  }

  if (currentData.value.reviewResult == val) {
    editing.value = false;
  } else {
    editing.value = true;
  }
  if (val != 4) {
    historyText = currentData.value.reviewDesc || historyText;
    currentData.value.reviewDesc = '';
  } else {
    currentData.value.reviewDesc = historyText || currentData.value.reviewDesc;
    // 选择"其他"时不需要弹出输入框
    if (!once) {
      inputVisible1.value = true;
    }
  }
  once = false;
}
const state = reactive({
  startX: 0,
  distanceX: 0,
});
const touchstart = (e) => {
  state.startX = e.changedTouches[0].clientX
};
const touchmove = (e) => {
  state.distanceX = e.changedTouches[0].clientX - state.startX;
};
const touchend = (e) => {
  if (state.distanceX < -150 && currentIndex.value < props.imgList.length - 1) {
    currentIndex.value = currentIndex.value + 1;
  } else if (state.distanceX > 150 && currentIndex.value > 0) {
    currentIndex.value = currentIndex.value - 1;
  }
  state.distanceX = 0;
};
const handlePreview = (imgUrl) => {
  ImagePreview({
    images: [imgUrl],
    showIndex: false,
    className: 'custom-image-preview'
  });
}

</script>
<style lang="scss" scoped>
.modify-page {
  padding-top: 12px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 999;
  transition: all 0.3s ease-in;
  opacity: 1;
  transform: scale(1);
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 67px);
  max-width: 600px;

  .image-list {
    flex: 1;
    position: relative;
    overflow: auto;
  }

  &.hidden {
    opacity: 0;
    transform: scale(0.01);
    pointer-events: none;
  }

  .image-card {
    // margin-bottom: 12px;
    padding: 0 16px;
    position: absolute;
    left: 0;
    top: 0;
    // height: calc(100vh - 177px); // 底部留白145px + 顶部留白12px = 157px
    overflow: auto;
    z-index: 1;
    pointer-events: none;
    // background-color: #fff;
    // transform:perspective(500px) translateZ(-100px);
    transform: rotateY(90deg);
    transform-origin: center;
    opacity: 0;

    &.active {
      transition: transform 0.5s ease-in, opacity 0.5s ease-in;
      z-index: 2;
      opacity: 1;
      // transform:perspective(500px) translateZ(0);
      transform: rotateY(0deg);
      pointer-events: all;
    }

    .image-wrapper {
      width: calc(100vw - 32px);
      // height: calc(100vh - 325px);
      height: 350px;
      display: block;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(#01C2C3, 0.12);
      display: flex;
      justify-content: center;
      align-items: center;

      .base-img {
        // height: 100%;
        max-height: 100%;
        max-width: 100%;
      }
    }

    .mark-item {
      $size: 22px;
      position: absolute;
      width: $size;
      height: $size;
      transform: translate(-50%, -50%);
      border-radius: $size;
      line-height: $size;
      text-align: center;
      background: #01C2C3;
      font-size: 17px;
    }
  }

  .bottom-bar {
    position: relative;
    // z-index: 10;
    background-color: #fff;
    padding: 0 16px;
    // padding-bottom: 0;
    flex-direction: column;
    height: fit-content;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.04);

    .action-bar-content {
      color: #1C1C1E;
      width: 100%;
      margin: 16px 0;
      // margin-bottom: 16px;
      font-size: 15px;
      gap: 12px;

      :deep(.ec-filter-cell) {
        // width: 170px;
        gap: 8px;
        margin-top: 8px;

        .ec-filter-cell__item {
          margin: 0;
          padding: 5px 8px;
          line-height: 24px;
          width: fit-content;
          color: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.12);
          background-color: #fff;
          border-radius: 8px;
          font-size: 12px;

          // @media screen and (max-width: 345px) {
          //   padding: 3px 5px;
          // }
          &.ec-filter-cell__item--checked {
            background: rgba(1, 194, 195, 0.12);
            border: 1px solid #01C2C3;
            color: #01C2C3;
          }
        }
      }
    }

    .action-bar-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 9px;
      margin-bottom: 33px;
      // padding-left: 7px;
    }

    .next-button {
      width: 62px;
      border-radius: 8px;
      font-size: 15px;
      line-height: 44px;
      height: 44px;
      color: #01C2C3;
      font-weight: 500;
    }

    .submit-button {
      flex: 1;
      border-radius: 8px;
      font-size: 15px;
      line-height: 44px;
      height: 44px;
      background-color: #01C2C3;
      border: none;
      // width: 100%;
    }

  }
}

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
    // gap: 6px;
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