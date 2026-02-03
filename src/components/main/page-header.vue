<template>
  <Row>
    <i-Col span="4">
      <img :src="welcome" alt="welcome" class="welcome">
      星海的空间
    </i-Col>
    <i-Col span="14">
      <Menu mode="horizontal" :active-name="activeName" @on-select="selectHandle">
        <template v-for="(item, index) in menu">
          <menu-item :name="item.name" :key="index">
            <Icon :type="item.meta.icon" size="18"/>{{item.meta.title}}
          </menu-item>
        </template>
      </Menu>
    </i-Col>
  </Row>
</template>

<script>
import welcome from "@/assets/image/welcome.gif";
import routes from "@/router/routes"

export default {
  name: "page-header",
  data() {
    return {
      welcome,
      menu: routes[routes.length-1].children,
    }
  },
  computed: {
    activeName() {
      return this.$route.name
    }
  },
  methods: {
    selectHandle(e) {
      this.$router.push({
        name: e,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.welcome{
  width: 60px;
  vertical-align: bottom;
}
.ivu-menu-item{
  margin: 0 30px;
}
.ivu-menu-horizontal{
  height: 64px;
  line-height: 64px;
}
.ivu-menu-horizontal.ivu-menu-light:after{
  background: #fff;
}
</style>