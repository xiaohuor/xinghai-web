<template>
  <el-container style="height: 100vh;">
    <el-header class="header">
      <page-header/>
    </el-header>
    <el-container style="padding: 25px; overflow: hidden;">
      <el-row :gutter="25" style="width: 100%; height: 100%;">
        <el-col :span="4">
          <el-card shadow="never" style="text-align:center;">
            <img :src="avator" alt="avator" class="avator">
            <h3 class="username">星海</h3>
            <p class="introduction">
              爱骑行，爱美剧<br>
              搬最方的砖，做最靓的仔
            </p>
          </el-card>
        </el-col>
        <el-col :span="20" style="height: 100%; overflow: auto;">
          <el-card shadow="never" style="min-height: 100%;">
            <router-view/>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
    <el-footer style="text-align:center; height: auto; padding: 10px;">星辰大海四季，人间至味清欢。</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import PageHeader from "./page-header.vue";
import avator from "@/assets/image/avator.jpg";
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
  /* height is handled by element plus default (60px) */
}
.avator{
  width: 150px;
}
.username{
  margin: 15px;
}
.introduction{
  line-height: 2;
  margin-bottom: 5px;
}
</style>
