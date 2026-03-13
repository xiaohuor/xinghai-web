<template>
  <div class="task_list_max">
    <div class="qiangdan_box">
      <div class="bg_box">
        <div class="font">专家核验，助力户内隐患智能识别能力提升</div>
        <!-- <div class="btn" @click="goToAuditEcej">
          <span class="font">抢单审核</span>
          <img src="https://res.ennew.com/image/png/8f38a42af8fe4bdd90b22458631ddca8.png" alt="" />
        </div> -->
      </div>
    </div>
    <div class="paidai_box">
      <div class="pai_title">
        <span class="bar"></span>
        <span class="font">任务派单</span>
      </div>
      <div class="pai_content">
        <ec-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <ec-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
            style="padding-bottom: 20px;">
            <div class="kaishi" v-for="item in list" :key="item.id">
              <div class="top">{{ item.taskName }}</div>
              <div class="center">
                <div class="task_info">
                  <div>
                    <div class="font">已审核(张)</div>
                    <div class="num">{{ item.reviewedNum }}</div>
                  </div>
                </div>
                <div class="task_info">
                  <div class="bar"></div>
                  <div>
                    <div class="font">剩余(张)</div>
                    <div class="num">{{ item.allNum - item.reviewedNum }}</div>
                  </div>
                </div>
                <div class="task_info">
                  <div class="bar"></div>
                  <div>
                    <div class="font">总数(张)</div>
                    <div class="num">{{ item.allNum }}</div>
                  </div>
                </div>
              </div>
              <div class="btm">
                <div class="tag_1" v-if="item.globalStatus == 0">待审核</div>
                <div class="tag_2" v-if="item.globalStatus == 1">审核中</div>
                <div class="tag_3" v-if="item.globalStatus == 2">审核完成</div>
                <div class="price_box">
                  <img src="https://res.ennew.com/image/png/6de0b7f990c5d686a0748e16d8538a70.png" alt="" />
                  <span class="font">{{ item.abilityPrice }}元一张</span>
                </div>
                <div class="shenhe" @click="goToAudit(item)">
                  <span class="font" v-if="item.globalStatus == 0">开始审核</span>
                  <span class="font" v-else-if="item.globalStatus == 1">继续审核</span>
                  <span class="font" v-else-if="item.globalStatus == 2">查看详情</span>
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
// import { getTaskList } from '@/api/audit-binary.js'
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
  // 设置加载状态
  if (isRefresh) {
    refreshing.value = true
  } else {
    loading.value = true
  }

  try {
    const currentPage = isRefresh ? 1 : pageNum.value
    const queryDTO = {
      pageNum: currentPage,
      pageSize: pageSize.value
    }

    console.log('请求数据:', { pageNum: currentPage, pageSize: pageSize.value })
    // const res = await getTaskList(queryDTO)
    const res = tasksRes
    const newData = res?.data || []
    console.log('返回数据:', newData.length, '条')

    if (isRefresh) {
      // 刷新时替换数据
      list.value = newData
      pageNum.value = 2 // 下一页从2开始
    } else {
      // 加载更多时追加数据
      list.value = [...list.value, ...newData]
      pageNum.value++
    }

    // 判断是否还有更多数据
    if (newData.length < pageSize.value || !newData.length) {
      finished.value = true
    } else {
      finished.value = false
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    // 结束加载状态
    loading.value = false
    refreshing.value = false
  }
}

// 初始加载
onMounted(() => {
  loadData()
})

// 上拉加载更多
const onLoad = () => {
  console.log('触发上拉加载', { loading: loading.value, finished: finished.value, pageNum: pageNum.value })
  // 如果还有更多数据，直接加载
  if (!finished.value) {
    loadData()
  } else {
    // 没有更多数据时，结束加载状态
    loading.value = false
  }
}

// 下拉刷新
const onRefresh = () => {
  console.log('触发下拉刷新')
  // 重置状态
  finished.value = false
  // 重新加载数据
  loadData(true)
}

const router = useRouter()

// 跳转到派单页面并传递参数（使用query参数更可靠）
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

// 跳转到专家审核页面
const goToAuditEcej = () => {
  router.push('/audit-ecej')
}
</script>

<style lang="scss" scoped>
.pai_content {
  width: 100%;
  height: 74vh;
  overflow: auto;
}

.task_list_max {
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  // width: 100vw;
  padding: 10px;
  background: #f4f6fa;

  .qiangdan_box {
    width: 100%;
    height: auto;

    .bg_box {
      margin-top: 6px;
      // width: 100%;
      height: 101px;
      background: url('https://res.ennew.com/image/png/b7561a6e3eb2d5564e2b6a70f4d08bc9.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 10px;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .font {
        font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
        font-weight: normal;
        font-size: 16px;
        color: #ffffff;
        width: 60%;
      }

      .btn {
        width: 105px;
        height: 29px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50px 50px 50px 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;

        img {
          width: 4px;
          height: 7px;
        }

        .font {
          font-family: PingFang SC, PingFang SC;
          font-weight: 500;
          font-size: 14px;
          color: #007777;
          margin: 0;
        }
      }
    }
  }

  .paidai_box {
    width: 100%;
    height: 80vh;
    overflow: auto;
    margin-top: 21px;

    .pai_title {
      padding-bottom: 10px;
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;

      .bar {
        width: 4px;
        height: 12px;
        background: #0d7e7f;
        border-radius: 2px 2px 2px 2px;
        display: block;
      }

      .font {
        font-family: PingFang SC, PingFang SC;
        font-weight: 600;
        font-size: 16px;
        color: #1c1c1e;
        margin-left: 6px;
      }
    }
  }

  .kaishi {
    width: 100%;
    height: 150px;
    background: linear-gradient(180deg, #ffffff 62%, #f7f8fc 100%);
    border-radius: 16px 16px 16px 16px;
    border: 2px solid #ffffff;
    margin-top: 12px;
    padding: 13px 16px;

    .top {
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #1c1c1e;
    }

    .center {
      width: 100%;
      height: auto;
      margin-top: 8px;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(28, 28, 30, 0.08);

      .task_info {
        display: flex;
        align-items: center;

        .font {
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 12px;
          color: rgba(28, 28, 30, 0.6);
        }

        .num {
          font-family: D-DIN-PRO, D-DIN-PRO;
          font-weight: 600;
          font-size: 18px;
          color: rgba(28, 28, 30, 0.8);
        }
      }

      .bar {
        width: 1px;
        height: 26px;
        background: rgba(28, 28, 30, 0.08);
        margin: 0 33px;
      }
    }

    .btm {
      width: 100%;
      margin-top: 10px;
      height: auto;
      position: relative;

      .tag_1 {
        float: left;
        display: inline-block;
        padding: 4px 8px;
        background: rgba(255, 140, 0, 0.12);
        border-radius: 2px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #ff8c00;
        line-height: 1;
      }

      .tag_2 {
        float: left;
        display: inline-block;
        padding: 4px 8px;
        background: #dfe5ff;
        border-radius: 2px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #356bfd;
        line-height: 1;
      }

      .tag_3 {
        float: left;
        display: inline-block;
        padding: 4px 8px;
        background: rgba(1, 194, 195, 0.12);
        border-radius: 2px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #01c2c3;
        line-height: 1;
      }

      .price_box {
        float: left;
        display: inline-block;
        padding: 0px 8px;
        margin-left: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 140, 0, 0.12);
        border-radius: 2px 2px 2px 2px;

        img {
          width: 16px;
          height: 16px;
        }

        .font {
          font-family: PingFang SC, PingFang SC;
          font-weight: 600;
          font-size: 12px;
          color: #ff8c00;
        }
      }

      .shenhe {
        position: absolute;
        top: 0px;
        right: 16px;
        width: 82px;
        height: 25px;
        margin-left: 93px;
        background: rgba(13, 126, 127, 0.12);
        border-radius: 50px 50px 50px 50px;
        border: 1px solid rgba(13, 126, 127, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;

        img {
          width: 4px;
          height: 7px;
        }

        .font {
          font-family: PingFang SC, PingFang SC;
          font-weight: 500;
          font-size: 13px;
          color: #0d7e7f;
        }
      }
    }
  }
}
</style>