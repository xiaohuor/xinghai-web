<template>
  <Layout style="height:100%;">
    <Header>
      <page-header/>
    </Header>
    <Layout style="padding: 25px;">
      <Row>
        <i-Col span="4">
          <Card dis-hover style="text-align:center;">
            <img :src="avator" alt="avator" class="avator">
            <h3 class="username">星海</h3>
            <p class="introduction">
              爱骑行，爱美剧<br>
              搬最方的砖，做最靓的仔
            </p>
          </Card>
        </i-Col>
        <i-Col span="20">
          <Card dis-hover style="margin-left: 25px;">
            <router-view/>
          </Card>
        </i-Col>
      </Row>
    </Layout>
    <Footer style="text-align:center;">星辰大海四季，人间至味清欢。</Footer>
  </Layout>
</template>

<script>
import PageHeader from "./page-header";
import avator from "@/assets/image/avator.jpg";

export default {
  name: "Main",
  components: {
    PageHeader,
  },
  data() {
    return {
      avator,
    }
  },
};
</script>

<style lang="scss" scoped>
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