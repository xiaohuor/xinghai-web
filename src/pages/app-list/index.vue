<!--
 * @Description: 
 * @Author: 星海
 * @Date: 2022-06-07 16:34:34
 * @LastEditors: 星海
 * @LastEditTime: 2022-07-13 17:47:43
-->
<template>
  <div class="applist">
    <Row :gutter="50">
      <i-col span="12">
        <strong>常用网站:</strong>
        <br />
        <br />
        <List border>
          <ListItem
            v-for="(item, index) in list1"
            :key="index"
            @click.native="window.open(item.url)"
            style="cursor:pointer;"
          ><Icon type="md-link" :size=18 style="margin-right:10px;color:#19be6b;"/>{{item.title}}</ListItem>
        </List>
      </i-col>
      <i-col span="12">
        <strong>应用列表:</strong>
        <br />
        <br />
        <List border>
          <ListItem
            v-for="(item, index) in list2"
            :key="index"
            @click.native="window.open(item.url)"
            style="cursor:pointer;"
          ><Icon type="md-link" :size=18 style="margin-right:10px;color:#2db7f5;"/>{{item.title}}</ListItem>
        </List>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "app-list",
  data() {
    return {
      window,
      list1: [
        {
          title: "星海的小站",
          url: "https://xiaohuoer.gitee.io/xinghai"
        },
        {
          title: "个人书签",
          url: "https://xiaohuoer.gitee.io/xinghai/#/bookmarks"
        },
        {
          title: "技术导航",
          url: "https://xiaohuoer.gitee.io/xinghai/#/nav-technology"
        },
      ],
      list2: [
        {
          title: "医药知识小站",
          url: "https://xiaohuoer.gitee.io/health"
        },
        {
          title: "生日祝福",
          url: "https://xiaohuoer.gitee.io/h5/birthday/"
        },
        {
          title: "2020倒计时",
          url: "https://xiaohuoer.gitee.io/h5/countdown/"
        },
        {
          title: "6%",
          url: "https://xiaohuoer.gitee.io/h5/6-percents/"
        },{
          title: "思睿康药量变化和网购行为关系",
          url: "https://xiaohuoer.gitee.io/h5/charts-heyue/"
        },{
          title: "个人简历",
          url: "https://xiaohuoer.gitee.io/h5/resume/"
        },
      ]
    };
  },
  methods: {
    clickApp(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.applist {
  width: 800px;
  margin: 20px auto;
}
</style>