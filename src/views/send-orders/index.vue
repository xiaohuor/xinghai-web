<template>
  <!-- 主页 -->
  <div class="page-container" v-if="!showFinished">

    <div class="audit-tabs">
      <div v-if="route.query.globalStatus != '2'" class="tab-item" :class="{ active: activeTab === 'today' }" @click="handleTabClick('today')">
        <div class="tab-item-text" >
          <img src="@/assets/img-ecej/icon-stamp.png" alt="" class="tab-item-icon">
          <span>待审核</span>
        </div>
        <span class="num">{{ todayCount }}</span>
      </div>

      <div class="tab-item" :class="{ active: activeTab === 'history' }" @click="handleTabClick('history')">
        <div class="tab-item-text">
          <img src="@/assets/img-ecej/icon-clock.png" alt="" class="tab-item-icon">
          <span>审核记录</span>
        </div>
        <span class="num">{{ historyCount }}</span>
      </div>
    </div>
    <TodayAudit
      @type2="showFinished = true"
      v-if="activeTab === 'today'"
      @updateCount="todayCount--"
      @initCount="val => todayCount = val"
    />
    <AlreadyAudited v-else-if="activeTab === 'history'" :list_img="wan_imgs" @update:count="handleCountUpdate" />
  </div>



  <div class="wancheng" v-if="showFinished">
      <img src="https://res.ennew.com/image/png/5f5077648c30541c1f2cee44bf39b6a4.png" alt="">
      <h4>审核完成</h4>
      <h5>感谢您的贡献</h5>
      <div class="price">
        <span class="num">+{{ +(route.query.abilityPrice*route.query.allNum).toFixed(2) }}</span>
        <span class="font">元</span>
      </div>
      <div class="price_font">预计获得创值激励</div>
      <div class="know_btn" @click="goToTaskList">
        我知道了
      </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
// 直接导入组件（使用正确的语法）
import TodayAudit from './TodayAudit.vue'
import AlreadyAudited from './AlreadyAudited.vue'
let showFinished = ref(false)
const router = useRouter()
const route = useRoute()
// 获取路由传递的参数
const item = ref(null)
let goToTaskList = () => {
  router.push({
    name: 'task-list',
  })
}
let wan_imgs = ref([])

onMounted( async () => {
  if(route.query.globalStatus == '2') {
    activeTab.value = 'history'
  }
  if(route.query.globalStatus == '0') {
   localStorage.setItem('lastGuideDate', '0')
  }else{
    localStorage.setItem('lastGuideDate', '1')
  }
  
})
const activeTab = ref('today')

const today = new Date().toLocaleDateString()
const lastGuideDate = localStorage.getItem('lastGuideDate')
const showGuide = ref(lastGuideDate !== today)
const todayCount = ref(0)
const historyCount = ref(0)

// 处理子组件传递的 count 值
const handleCountUpdate = (count) => {
  console.log('子组件传递的图片数量:', count);
  // 可以在这里使用 count 值，例如更新 historyCount
  historyCount.value = count;
}
const handleTabClick = (tab) => {
  activeTab.value = tab;
}

</script>
<style scoped lang="scss">
  .wancheng {
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   flex-direction: column;
   background: url('https://res.ennew.com/image/png/621fb6bf615e9bfad5fe4be00667b813.png') no-repeat;
   background-size: 100% 100%;
   img{
width: 203px;
height: 203px;
margin-top: 10px;
   }
   h4{
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
font-weight: 600;
font-size: 26px;
color: #1C1C1E;
margin-top: -37px;
   }
   h5{
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
font-weight: normal;
font-size: 18px;
color: #181F43;
margin-top: 6px;
   }
   .price{
    margin-top: 56px;
    .num{
      font-family: D-DIN-PRO, D-DIN-PRO;
font-weight: bold;
font-size: 49px;
color: #01C2C3;
    }
    .font{
      font-family: PingFang SC, PingFang SC;
font-weight: 600;
font-size: 12px;
color: #01C2C3;
    }
   }
   .price_font{
    margin-top: 8px;
font-family: PingFang SC, PingFang SC;
font-weight: 400;
font-size: 16px;
color: rgba(24,31,67,0.8);
   }
   .know_btn{
    width: 231px;
height: 44px;
background: #01C2C3;
border-radius: 6px 6px 6px 6px;
font-family: PingFang SC, PingFang SC;
font-weight: 600;
font-size: 16px;
color: #FFFFFF;
line-height: 22px;
display: flex;
align-items: center;
justify-content: center;
margin-top: 41px;
   }
  }


.page-container {
  height: 100vh;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 65%, #D1ECFF 100%);

  .audit-tabs {
    font-weight: 500;
    font-size: 18px;
    color: rgba(#181F43, 0.6);
    padding: 12px 16px;
    display: flex;
    gap: 10px;


    .tab-item {
      background-color: rgba(#0D7E7F, 0.1);
      padding-left: 12px;
      padding-right: 20px;
      border-radius: 8px;
      color: #000;
      height: 43px;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      // transition: color background-color flex 0.3s ease-in-out;
      transition:
        color 0.3s ease-in-out,
        background-color 0.3s ease-in-out,
        flex 0.3s ease-in-out,
        justify-content 0.3s ease-in-out;
      background-image: url('@/assets/img-ecej/tab-bg.png');
      background-size: contain;
      background-position: right center;
      background-repeat: no-repeat;

      &.active {
        justify-content: space-between;
        flex: 1.7;
        color: #fff;
        background-color: #0D7E7F;

        .tab-item-icon,
        .num {
          display: block;
          font-family: 'NumberFont';
        }
      }

      .tab-item-icon,
      .num {
        display: none;
        font-size: 16px;
        font-weight: 600;
      }

      .tab-item-text {
        display: flex;
        align-items: center;
        gap: 9px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .tab-item-icon {
          width: 18px;
        }
      }
    }
  }
}
</style>
