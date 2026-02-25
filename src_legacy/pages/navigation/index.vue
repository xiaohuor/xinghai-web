<template>
  <div class="navigation">
    <div class="nav-group">
      <Button @click="handleBookmarks">个人书签</Button>
      <Button @click="handleNavTechnology">技术导航</Button>
    </div>    
  </div>
</template>

<script>
  export default {
    name: "navigation",
    methods: {
      handleBookmarks() {
        let routeData = this.$router.resolve({
          name: "bookmarks",
        });
        window.open(routeData.href, '_blank');
      },
      handleNavTechnology() {
        let routeData = this.$router.resolve({
          name: "nav-technology",
        });
        window.open(routeData.href, '_blank');
      }
    },
  }
</script>

<style lang="scss" scoped>
.navigation{
  min-height: 500px;
  .nav-group{
    button{
      margin-right: 15px;
    }
  }
}
</style>