<template>
  <div class="audit-page">
    <div class="image-list">
      <div v-for="(item, index) in imgList" :key="item.id" class="image-card"
        :class="{ 'active': currentIndex === index }">
        <div class="image-wrapper" @click="handlePreview(item.imgUrl)">
          <img alt="" :src="item.imgUrl" class="base-img"
            :class="{ 'full': item.aspectRatio > 0 && item.aspectRatio < 0.5 }" />
        </div>

        <AuditCardContent
          :item="item"
          :reviewDesc="reviewDesc"
          @edit="handleEdit"
          @showTip="tipVisible = true"
        />

        <div style="height: 12px;width: 100%;"></div>
      </div>
    </div>
    <ec-action-bar class="bottom-bar">
      <div class="action-bar-content">
        <span v-if="!wancheng">
          图片中是否存在上述隐患
          <i class="ec-text-input__label--required" style="margin-left: -8px;"></i>
        </span>

        <van-radio-group v-model="reviewResult1" @change="handleChange">
          <van-radio v-for="item in statusList" :key="item.value" :name="item.value" :label="item.value">{{ item.text
            }}</van-radio>
        </van-radio-group>
      </div>

      <div class="action-bar-btn">
        <ec-button v-if="!wancheng" type="primary" :text="loading ? '切换中...' : '提交并切换下一张'" class="submit-button"
          :disabled="loading || !reviewResult" @click="handleSubmit" />
        <ec-button v-else type="primary" text="完成任务" class="submit-button1" @click="onClickConfirm" />
      </div>

    </ec-action-bar>

    <InputPopup :visible="inputVisible1" :inputVal="reviewDesc" localStorageKey="danger_input"
      @close="inputVisible1 = false" @update="val => handleUpdate('danger', val)" @clear="reviewResult1 = []" />
    <InputPopup :visible="inputVisible2" :inputVal="suggestion" localStorageKey="suggestion_input"
      @close="inputVisible2 = false" @update="val => handleUpdate('suggestion', val)" @clear="() => { }" />
    <TipPopup :visible="tipVisible" @close="tipVisible = false" />

  </div>
</template>
<script setup>
import dayjs from 'dayjs';
import { Cell as EcEntryCell, showDialog, ActionBar as EcActionBar, Button as EcButton, ImagePreview } from 'vant';
import { showToast, RadioGroup, Radio } from 'vant';
import { ref, watch, onMounted } from 'vue';
import { defineEmits } from 'vue';
import InputPopup from './InputPopupPlus.vue';
import TipPopup from './TipPopup.vue';
import AuditCardContent from './AuditCardContent.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const emit = defineEmits(['updateCount', 'initCount']);
let first_sub = ref(0);
let accountId = '';
const tipVisible = ref(false);

const onClickConfirm = async () => {
  try {
    const item = await showDialog({
      title: '提示',
      message: '完成任务后无法修改审核记录,是否完成?',
    });

    if (item.action == 'confirm') {

      const res = await updateImageReviewTaskStatus({
        demandId: route.query.demandId,
        reviewerId: accountId,
        taskStatus: 2,
      }).catch(() => ({}));

      console.log(res);
      if (res.data == true) {
        emit('type2');
        showToast.success('完成任务成功');
      }
    }
  } catch (error) {
    // 取消时什么都不做，避免报错
  }
};



// reviewResult 审核结果，0-待审核 1-通过 2-驳回 3-超时未审核 4-待派单
const statusList = ref([
  { text: '有隐患', value: '1' },
  { text: '无隐患', value: '2' },
  { text: '无法判断', value: '3' },
  { text: '其他', value: '4' },
]);
const inputVisible1 = ref(false);
const inputVisible2 = ref(false);
const reviewDesc = ref('');
const suggestion = ref('');

const reviewResult = ref('');
const reviewResult1 = ref([]);
const loading = ref(false);
const imgList = ref([]);
const currentIndex = ref(0);
watch(reviewResult1, (val, oldVal) => {
  if (val.length > 1) {
    reviewResult.value = val[1];
    reviewResult1.value = [val[1]];
  } else {
    reviewResult.value = val[0] || '';
  }
});

const handleEdit = (type) => {
  if (type == 'danger') {
    inputVisible1.value = true;
  } else if (type == 'suggestion') {
    inputVisible2.value = true;
  }
}
const handleUpdate = (type, val) => {
  console.log(type, val);
  const data = imgList.value[currentIndex.value];
  if (type == 'danger') {
    reviewDesc.value = val;
  } else if (type == 'suggestion') {
    suggestion.value = val;
    // data.standardSuggest = val;
  }
}
const handleChange = async (val) => {
  if (val.includes('4')) {
    inputVisible1.value = true;
  } else {
    reviewDesc.value = '';
  }
}
let wancheng = ref(false)

const showFinished = ref(false)
let status = ref(1)
let currentNum = ref(1)
let bei_list = ref([]) // 将bei_list移到外部，使handleSubmit函数可以访问

const getImageList = async () => {
  currentIndex.value = 0;
  console.log('路由查询参数:', route.query);
  if (first_sub.value == 0 && route.query.globalStatus == '0') {
    status.value = 0
  } else {
    status.value = 1
  }
  // const { data, success, totalCount } = await getImageReviewPage({
  //   pageNum: 1,
  //   pageSize: 5,
  //   demandId: route.query.demandId,
  //   taskStatus: Number(localStorage.getItem('lastGuideDate')),
  //   reviewerId: accountId,
  //   reviewResult: 0,
  // }).catch(() => ({}))

  import('@/mock/send-orders.json').then((module) => {
    const res = module.default
    // 模拟根据条件返回不同数据
    let result = res.d1 // 默认返回 d1

    // 这里可以根据 route.query.demandId 或其他条件来选择返回 d1, d2, d3
    // 例如：
    if (route.query.demandId === '2005446229298294784') {
      result = res.d2
    } else if (route.query.demandId === '2002972241637789696') {
      result = res.d3
    }

    const { data, success, totalCount } = result

    if (!success) {
      showToast.fail('查询图片审核分页列表失败');
      return
    }

    emit('initCount', totalCount);
    const arr = data || [];
    arr.forEach((item, index) => {
      item._busContentObj = JSON.parse(item.busContentObj);
      item.field2 = item._busContentObj.find(item => item.type == 2)?.mark_name || '';
      item.field3 = item._busContentObj.find(item => item.type == 3)?.mark_name || '';
    })
    imgList.value = arr;

    currentNum.value++;
    if (arr.length == 0) {
      wancheng.value = true
    }
  })
}

// 带缓存的版本
const imageDimensionsCache = new Map();

const getImageDimensionsWithCache = (imageUrl) => {
  // 检查缓存
  if (imageDimensionsCache.has(imageUrl)) {
    return Promise.resolve(imageDimensionsCache.get(imageUrl));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const dimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      };
      // 存入缓存
      imageDimensionsCache.set(imageUrl, dimensions);
      resolve(dimensions);
    };

    img.onerror = () => reject(new Error(`无法加载图片: ${imageUrl}`));
    img.onabort = () => reject(new Error(`图片加载被中止: ${imageUrl}`));

    setTimeout(() => {
      img.src = '';
      reject(new Error(`图片加载超时: ${imageUrl}`));
    }, 10000);

    img.src = imageUrl;
  });
}
const handleSubmit = async () => {
  localStorage.setItem('lastGuideDate', 1)

  // 检查imgList和currentIndex是否有效
  if (!imgList.value || imgList.value.length === 0 || currentIndex.value < 0 || currentIndex.value >= imgList.value.length) {
    console.error('无效的图片列表或索引');
    return;
  }

  loading.value = true;
  const data = imgList.value[currentIndex.value];

  const { code, message } = await updateImageReview({
    id: data.id,
    demandId: route.query.demandId,
    reviewerId: accountId,
    reviewResult: reviewResult.value,
    reviewDesc: reviewDesc.value,
    reviewTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    standardSuggest: suggestion.value,
  }).catch(() => ({}));

  loading.value = false;
  if (code !== '0') return showToast.fail(message || '提交审核失败');
  currentIndex.value++;
  suggestion.value = '';
  if (first_sub.value == 0 && route.query.globalStatus == '0') {
    first_sub.value = 1;
    const kaishi = await updateImageReviewTaskStatus({
      demandId: route.query.demandId,
      reviewerId: accountId,
      taskStatus: 1,
    }).catch(() => ({}));
    console.log('更新图片审核任务状态成功', kaishi);

  }
  reviewResult1.value = [];
  console.log('当前索引:', currentIndex.value, imgList.value.length);
  emit('updateCount');
  if (currentIndex.value >= imgList.value.length) {
    console.log('当前索引:', currentIndex.value, imgList.value.length);
    getImageList();
  }
};
const handlePreview = (imgUrl) => {
  ImagePreview({
    images: [imgUrl],
    showIndex: false,
    className: 'custom-image-preview'
  });
}
onMounted(async () => {
  getImageList();
})
</script>
<style lang="scss" scoped>
.audit-page {
  position: relative;
  top: 0;

  display: flex;
  flex-direction: column;
  height: calc(100vh - 67px);
  max-width: 600px;

  .image-list {
    flex: 1;
    position: relative;
    overflow: auto;
  }

  .image-card {
    margin-bottom: 12px;
    padding: 0 16px;
    position: absolute;
    left: 0;
    top: 0;
    // height: calc(100vh - 224px); // 底部留白145px + 顶部按钮栏43px + 顶部按钮栏边距24px + 顶部留白12px = 224px
    overflow: auto;
    z-index: 1;
    opacity: 0;
    transform: rotateY(90deg);
    pointer-events: none;

    &.active {
      transition: transform 0.5s ease-in, opacity 0.5s ease-in;
      z-index: 2;
      opacity: 1;
      transform: rotateY(0deg);
      pointer-events: all;
    }

    .image-wrapper {
      width: calc(100vw - 32px);
      // max-height: calc(100vh - 325px);
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

        // &.full {
        //   height: calc(100vh - 325px);
        // }
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
      color: #fff;
      font-size: 17px;
    }
  }

  .bottom-bar {
    position: relative;
    // height: 158px !important;
    padding: 0 16px;
    flex-direction: column;
    height: fit-content;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.04);

    .action-bar-content {
      color: #1C1C1E;
      width: 100%;
      margin: 16px 0;
      font-size: 15px;

      :deep(.van-radio-group) {
        // width: fit-content;
        display: flex;
        gap: 10px;
        margin-top: 8px;
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
      // width: 62px;
      border-radius: 8px;
      font-size: 15px;
      line-height: 44px;
      height: 44px;
      color: #01C2C3;
      font-weight: 500;
      background-color: transparent;
      border: none;
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

    .submit-button1 {
      flex: 1;
      border-radius: 8px;
      font-size: 20px;
      line-height: 44px;
      height: 44px;
      background-color: #01C2C3;
      border: none;
      // width: 100%;
    }

  }
}
</style>
<style lang="scss">
.custom-image-preview {
  background-color: #e0f8f8;
}
</style>