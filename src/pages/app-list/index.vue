<template>
  <div class="applist">
    <el-row :gutter="50">
      <el-col :span="12">
        <strong>常用网站:</strong>
        <br />
        <br />
        <ul class="link-list">
          <li
            v-for="(item, index) in list1"
            :key="index"
            @click="openWindow(item.url)"
            class="list-item"
          >
            <el-icon class="icon" :size="18" color="#19be6b"><Link /></el-icon>
            {{item.title}}
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <strong>应用列表:</strong>
        <br />
        <br />
        <ul class="link-list">
          <li
            v-for="(item, index) in list2"
            :key="index"
            @click="openWindow(item.url)"
            class="list-item"
          >
            <el-icon class="icon" :size="18" color="#2db7f5"><Link /></el-icon>
            {{item.title}}
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const baseUrl = "https://xiaohuor.github.io/xinghai-web";

const list1 = ref([
  {
    title: "星海的小站",
    url: baseUrl
  },
  {
    title: "个人书签",
    url: baseUrl + "#/bookmarks"
  },
  {
    title: "技术导航",
    url: baseUrl + "#/nav-technology"
  },
]);

const list2 = ref([
  {
    title: "医药知识小站",
    url: baseUrl + "/health"
  },
  {
    title: "生日祝福",
    url: baseUrl + "/h5/birthday/"
  },
  {
    title: "2020倒计时",
    url: baseUrl + "/h5/countdown/"
  },
  {
    title: "6%",
    url: baseUrl + "/h5/6-percents/"
  },{
    title: "思睿康药量变化和网购行为关系",
    url: baseUrl + "/h5/charts-heyue/"
  },{
    title: "个人简历",
    url: baseUrl + "/h5/resume/"
  },
]);

const openWindow = (url: string) => {
  window.open(url);
}
</script>

<style lang="scss" scoped>
.applist {
  width: 800px;
  margin: 20px auto;
}
.link-list {
  list-style: none;
  padding: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.list-item {
  padding: 10px 20px;
  border-bottom: 1px solid #dcdfe6;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f5f7fa;
  }
}
.icon {
  margin-right: 10px;
}
</style>
