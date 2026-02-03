<template>
  <Row class="nav-technology">
    <i-Col :xs="8" :sm="5" :md="4" :lg="3" :xl="3" :xxl="2">
      <Anchor show-ink>
        <h3 style="margin: 10px">
          网址导航
        </h3>
        <AnchorLink v-for="(item, index) in website" :key="index" :href="'#nav'+index" :title="item.title" />
    </Anchor>
    <Tooltip
      class="about-nav"
      content="本站吸收了他人网站的经验（https://nav.imaring.com/），增加了自己的整理。"
      max-width="200"
      placement="top-start">
        <p style="padding-left:5px;">关于</p>
    </Tooltip>
    </i-Col>
    <i-Col :xs="16" :sm="19" :md="20" :lg="21" :xl="21" :xxl="22">
      <section v-for="(item, index) in website" :key="index">
        <h4 class="nav-title" :id="'nav'+index"># {{item.title}}</h4>
        <Row>
          <i-Col v-for="(child, i) in item.children" :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :xxl="4" :key="i" class="website">
            <Tooltip :content="child.comment" theme="light"  max-width="300">
              <div class="website-card" @click="window.open(child.url)">
                <img :src="publicPath+child.icon" alt="website" class="website-icon">
                <div>
                  <h5 class="website-title">{{child.title}}</h5>
                  <p class="website-comment">{{child.comment}}</p>
                </div>
              </div>
            </Tooltip>
          </i-Col>
        </Row>
      </section>
    </i-Col>
    <BackTop/>
  </Row>
</template>

<script>
import website from "./website";

export default {
  name: "nav-technology",
  data() {
    return {
      website,
      window,
      publicPath: process.env.BASE_URL,
    }
  },
}
</script>

<style lang="scss" scoped>
.about-nav{
  cursor: pointer;
  position: fixed;
  z-index: 1;
  left: 15px;
  bottom: 15px;
}
.nav{
  &-title{
    // 
  }
  &-technology{
    padding: 15px;
    background-color: #f9f9f9;
    .ivu-tooltip{
      width: 100%;
      margin: 15px 0;
    }
    .website{
      &-card{
        position: relative;
        cursor: pointer;
        margin: 0 15px;
        border-radius: 4px;
        height: 100px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #e4ecf3;
        transition: transform 200ms ease-in;
        &:hover{
          transform: translateY(-6px);
          box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
        }
      }
      &-icon{
        float: left;
        width: 40px;
        border-radius: 50%;
        margin: 10px;
      }
      &-title,
      &-comment{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      &-title{
        font-size: 14px;
        margin: 5px 0;
        -webkit-line-clamp: 1;
      }
      &-comment{
        -webkit-line-clamp: 2;
        color: #979898;
      }
    }
  }
}
</style>