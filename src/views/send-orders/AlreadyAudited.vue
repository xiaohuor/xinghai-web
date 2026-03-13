<template>
  <div class="page-wrapper" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
    <div class="card-wrapper">
      <div class="card-content" @scroll="handleScroll">
        <div class="calendar-wrapper">
          <div class="divider"></div>
        </div>
        <div class="img-list">
          <div class="img-item" v-for="(item, index) in imgList" :key="item.id" @click="handleClick(index)">
            <img :src="item.imgUrl" alt="" />
            <div class="img-item-status" :class="{
              'error': +item.reviewResult === 1,
              'correct': +item.reviewResult === 2,
              'unjudge': +item.reviewResult === 3,
              'other': +item.reviewResult === 4,
            }">
              <span v-if="+item.reviewResult === 1">有隐患</span>
              <span v-if="+item.reviewResult === 2">无隐患</span>
              <span v-if="+item.reviewResult === 3">无法判断</span>
              <span v-if="+item.reviewResult === 4">其他</span>

            </div>
          </div>
        </div>
        <!-- 加载更多提示 -->
        <div v-if="loading" class="loading-more">加载中...</div>
        <div v-else-if="!hasMore" class="no-more">没有更多数据了</div>
      </div>
      <ModifyView :visible="visible" :accountId="accountId" :imgList="imgList" :enterIndex="currentIndex" @close="handleClose" /> 
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineEmits } from 'vue';
import ModifyView from './ModifyView.vue'
import { showToast, RadioGroup, Radio } from 'vant';

import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const imgList = ref([]);
const pageNum = ref(1);
const pageSize = ref(30);
const loading = ref(false);
const hasMore = ref(true);
let allNum = ref(0)
let accountId = ref('');
// 定义向父组件传递数据的事件
const emit = defineEmits(['update:count']);

// 获取图片列表的函数
const getImageList = async (isLoadMore = false) => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;

  import('@/mock/send-orders.json').then((module) => {
    const res = module.default
    let result = res.d1_1 // 默认
    
     if (route.query.demandId === '2005446229298294784') {
        result = res.d2_1
    } else if (route.query.demandId === '2002972241637789696') {
        result = res.d3_1
    }

    const { data, success, totalCount } = result

    loading.value = false;
    if (!success) {
      showToast.fail('查询图片审核分页列表失败');
      return
    }

    const newData = data || [];
    allNum.value = totalCount || 0;
    newData.forEach((item, index) => {
      item._busContentObj = JSON.parse(item.busContentObj);
      item.field2 = item._busContentObj.find(item => item.type == 2)?.mark_name || '';
      item.field3 = item._busContentObj.find(item => item.type == 3)?.mark_name || '';
      item.field4 = item._busContentObj.find(item => item.type == 4)?.mark_name || '';
    })
    if (isLoadMore) {
      imgList.value = [...imgList.value, ...newData];
    } else {
      imgList.value = newData;
    }

    // 向父组件传递 imgList 的长度
    emit('update:count', allNum.value);

    // 判断是否还有更多数据
    hasMore.value = newData.length === pageSize.value;

    if (hasMore.value) {
      pageNum.value++;
    }
  })

};

// 页面加载时获取第一页数据
onMounted(async () => {
  getImageList();
});

// 上拉加载更多的函数
const handleLoadMore = () => {
  if (loading.value || !hasMore.value) return;
  getImageList(true);
};

const visible = ref(false);
const currentIndex = ref(-1);
const handleClose = (reviewResult) => {
  visible.value = false;
}
const handleClick = (index) => {
  visible.value = true;
  currentIndex.value = index;
}
const state = reactive({
  startY: 0,
  distanceY: 0,
});
const touchstart = (e) => {
  state.startY = e.changedTouches[0].clientY
};
const touchmove = (e) => {
  state.distanceY = e.changedTouches[0].clientY - state.startY;
};
const expandCommand = ref(true)
const touchend = (e) => {
  if (state.distanceY < -20) {
    expandCommand.value = false;
  }
  state.distanceY = 0;
};

// 滚动到底部检测
const handleScroll = (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  // 当滚动到底部附近（距离底部20px）时，加载更多数据
  if (scrollHeight - scrollTop - clientHeight < 20) {
    handleLoadMore();
  }
};
</script>
<style lang="scss" scoped>
.page-wrapper {
  // height: calc(100vh - 67px);
  // overflow: scroll;

  .card-wrapper {
    position: relative;
    padding: 2px 16px;
    // margin-bottom: 30px;

    &::before {
      content: '';
      position: absolute;
      left: 14px;
      right: 14px;
      top: 0;
      bottom: 0;
      border-radius: 8px;
      background: linear-gradient(180deg, #C3EEEF 0%, #A3E6FF 33%, #AEE5FF 66%, #A7C9FF 100%);
      box-shadow: 0px 4px 10px rgba(102, 142, 221, 0.15);
    }
  }
}

.card-content {
  // height: 100%;
  height: calc(100vh - 126px);
  position: relative;
  z-index: 1;
  // background-color: #fff;
  background: linear-gradient(180deg, #fff 50%, rgba(255, 255, 255, 0.8) 100%);
  border-radius: 8px;
  // padding-top: 8px;
  padding-bottom: 12px;
  // overflow: hidden;
  overflow: auto;
}

.calendar-wrapper {
  // padding: 0 10px;
  padding-top: 8px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;

  .divider {
    margin: 6px 9px;
    padding-bottom: 12px;
    margin-bottom: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
}

// 加载更多样式
.loading-more,
.no-more {
  text-align: center;
  padding: 10px 0;
  color: #999;
  font-size: 14px;
}


.img-list {
  position: relative;
  min-height: 145px;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 0 10px;
  // margin-top: 12px;

  .img-item {
    width: calc(100% / 3 - 6px);
    height: 145px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-item-status {
      height: 20px;
      // background: #01C2C3;
      width: 100%;
      text-align: center;
      font-size: 13px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      line-height: 20px;

      &.correct {
        background: #01C2C3;
      }

      &.error {
        background: #E8824B;
      }

      &.other {
        background: #B0B0B0;
      }

      &.unjudge {
        background: #EFAB36;
      }
    }
  }
}

.empty-item {
  width: 100%;
  text-align: center;
  margin-top: 60px;

  .empty-icon {
    width: 120px;
    height: 120px;
  }

  .empty-tips {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>