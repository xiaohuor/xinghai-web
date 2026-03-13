<template>
  <div class="page-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="banner-box">
        <div class="banner-text">专家核验，助力户内隐患智能识别能力提升</div>
      </div>
    </div>

    <!-- Task List Section -->
    <div class="list-section">
      <div class="section-title">
        <span class="bar"></span>
        <span class="title-text">任务派单</span>
      </div>
      
      <div class="list-content">
        <ec-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <ec-list 
            v-model:loading="loading" 
            :finished="finished" 
            finished-text="没有更多了" 
            @load="onLoad"
          >
            <div class="task-card" v-for="item in list" :key="item.id">
              <div class="card-header">{{ item.taskName }}</div>
              
              <div class="card-body">
                <div class="info-item">
                  <div class="label">已审核(张)</div>
                  <div class="value">{{ item.reviewedNum }}</div>
                </div>
                <div class="divider"></div>
                <div class="info-item">
                  <div class="label">剩余(张)</div>
                  <div class="value">{{ item.allNum - item.reviewedNum }}</div>
                </div>
                <div class="divider"></div>
                <div class="info-item">
                  <div class="label">总数(张)</div>
                  <div class="value">{{ item.allNum }}</div>
                </div>
              </div>

              <div class="card-footer">
                <div class="status-tags">
                  <span class="tag tag-pending" v-if="item.globalStatus == 0">待审核</span>
                  <span class="tag tag-processing" v-if="item.globalStatus == 1">审核中</span>
                  <span class="tag tag-completed" v-if="item.globalStatus == 2">审核完成</span>
                  
                  <div class="price-tag">
                    <img src="https://res.ennew.com/image/png/6de0b7f990c5d686a0748e16d8538a70.png" alt="" />
                    <span>{{ item.abilityPrice }}元一张</span>
                  </div>
                </div>

                <div class="action-btn" @click="goToAudit(item)">
                  <span v-if="item.globalStatus == 0">开始审核</span>
                  <span v-else-if="item.globalStatus == 1">继续审核</span>
                  <span v-else-if="item.globalStatus == 2">查看详情</span>
                  <img src="https://res.ennew.com/image/png/8f38a42af8fe4bdd90b22458631ddca8.png" alt="" />
                </div>
              </div>
            </div>
          </ec-list>
        </ec-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script setup>
import tasksRes from '@/mock/task-list.json'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  PullRefresh as EcPullRefresh,
  List as EcList
} from 'vant'

const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const pageNum = ref(1)
const pageSize = ref(5)

// 加载数据函数
const loadData = async (isRefresh = false) => {
  if (isRefresh) {
    refreshing.value = true
  } else {
    loading.value = true
  }

  try {
    // 模拟接口请求延迟
    // await new Promise(resolve => setTimeout(resolve, 500))

    const currentPage = isRefresh ? 1 : pageNum.value
    const res = tasksRes
    const newData = res?.data || []

    if (isRefresh) {
      list.value = newData
      pageNum.value = 2
    } else {
      list.value = [...list.value, ...newData]
      pageNum.value++
    }

    if (newData.length < pageSize.value || !newData.length) {
      finished.value = true
    } else {
      finished.value = false
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

onMounted(() => {
  loadData()
})

const onLoad = () => {
  if (!finished.value) {
    loadData()
  } else {
    loading.value = false
  }
}

const onRefresh = () => {
  finished.value = false
  loadData(true)
}

const router = useRouter()

const goToAudit = ({ demandId, globalStatus, allNum, abilityPrice, reviewedNum }) => {
  router.push({
    name: 'send-orders',
    query: { 
      demandId, globalStatus, allNum, abilityPrice, reviewedNum,
      authCode: localStorage.getItem('originGrantCode'),
      authTenantId: localStorage.getItem('originTenantId'),
     }
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #f4f6fa;
  box-sizing: border-box;
}

.header-section {
  flex-shrink: 0;
  
  .banner-box {
    margin-top: 6px;
    height: 101px;
    background: url('https://res.ennew.com/image/png/b7561a6e3eb2d5564e2b6a70f4d08bc9.png') no-repeat center/cover;
    border-radius: 10px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .banner-text {
      font-family: Alibaba PuHuiTi 2, sans-serif;
      font-size: 16px;
      color: #ffffff;
      width: 60%;
    }
  }
}

.list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
  margin-top: 20px;

  .section-title {
    flex-shrink: 0;
    padding-bottom: 10px;
    display: flex;
    align-items: center;

    .bar {
      width: 4px;
      height: 12px;
      background: #0d7e7f;
      border-radius: 2px;
    }

    .title-text {
      font-family: PingFang SC, sans-serif;
      font-weight: 600;
      font-size: 16px;
      color: #1c1c1e;
      margin-left: 6px;
    }
  }

  .list-content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.task-card {
  background: linear-gradient(180deg, #ffffff 62%, #f7f8fc 100%);
  border-radius: 16px;
  border: 2px solid #ffffff;
  margin-bottom: 12px;
  padding: 13px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);

  .card-header {
    font-family: PingFang SC, sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #1c1c1e;
    margin-bottom: 12px;
  }

  .card-body {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(28, 28, 30, 0.08);

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      
      .label {
        font-family: PingFang SC, sans-serif;
        font-size: 12px;
        color: rgba(28, 28, 30, 0.6);
        margin-bottom: 4px;
      }

      .value {
        font-family: D-DIN-PRO, sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: rgba(28, 28, 30, 0.8);
      }
    }

    .divider {
      width: 1px;
      height: 26px;
      background: rgba(28, 28, 30, 0.08);
      margin: 0 24px;
    }
  }

  .card-footer {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .status-tags {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;

      .tag {
        padding: 4px 8px;
        border-radius: 2px;
        font-family: PingFang SC, sans-serif;
        font-size: 12px;
        line-height: 1;
      }

      .tag-pending {
        background: rgba(255, 140, 0, 0.12);
        color: #ff8c00;
      }

      .tag-processing {
        background: #dfe5ff;
        color: #356bfd;
      }

      .tag-completed {
        background: rgba(1, 194, 195, 0.12);
        color: #01c2c3;
      }

      .price-tag {
        padding: 4px 8px;
        background: rgba(255, 140, 0, 0.12);
        border-radius: 2px;
        display: flex;
        align-items: center;
        gap: 4px;

        img {
          width: 16px;
          height: 16px;
        }

        span {
          font-family: PingFang SC, sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #ff8c00;
        }
      }
    }

    .action-btn {
      padding: 4px 12px;
      background: rgba(13, 126, 127, 0.12);
      border-radius: 50px;
      border: 1px solid rgba(13, 126, 127, 0.4);
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      flex-shrink: 0;

      span {
        font-family: PingFang SC, sans-serif;
        font-weight: 500;
        font-size: 13px;
        color: #0d7e7f;
      }

      img {
        width: 4px;
        height: 7px;
      }
    }
  }
}
</style>