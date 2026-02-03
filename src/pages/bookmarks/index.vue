<template>
  <div>
    <div class="page-header">
      书签
      <Button type="primary" ghost style="margin-left:50px;" @click="handleUpdate">更新</Button>
    </div>
    <Row>
      <i-Col v-for="i in columns" :key="i" :span="24/columns.length">
        <List>
          <template v-for="(item, index) in bookmarks">
            <ListItem v-if="index>length*i-1 && index<length*(i+1)" :key="index">
              <Dropdown placement="bottom-start" @on-click="(name)=>handleDropdown(name, index)">
                <img v-if="item.icon" :src="item.icon" class="href-icon"/>
                <Icon v-if="!item.icon" type="ios-link" size="18" style="margin-right:3px;color:#57a3f3;"/>
                <DropdownMenu slot="list">
                    <DropdownItem name="modify">修改</DropdownItem>
                    <DropdownItem name="delete">删除</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button type="text" @click="()=>handleClick(item.url)">{{item.name}}</Button>
            </ListItem>
          </template>
        </List>
      </i-Col>
    </Row>
    <Modal
      v-model="modifyModal"
      title="修改书签"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="currentMark" label-position="top">
        <FormItem label="名称">
          <Input v-model="currentMark.name"/>
        </FormItem>
        <FormItem label="图标">
          <Input v-model="currentMark.icon"/>
        </FormItem>
        <FormItem label="网址">
          <Input v-model="currentMark.url"/>
        </FormItem>
      </Form>
    </Modal>
    <BackTop/>
  </div>
</template>

<script>
import bookmarks from "@/assets/marks";

export default {
  name: "bookmarks",
  data() {
    return {
      bookmarks,
      columns: [0, 1, 2, 3, 4, 5],
      modifyModal: false,
      currentIndex: 0,
      currentMark: {},
    }
  },
  computed: {
    length() {
      return Math.ceil(this.bookmarks.length/this.columns.length);
    }
  },
  methods: {
    handleClick(url) {
      window.open(url)
    },
    handleDropdown(name, index) {
      this.currentIndex = index;
      switch (name) {
        case 'delete':
          this.bookmarks.splice(index, 1);
          break;
        case 'modify':
          this.modifyModal = true;
          this.currentMark = JSON.parse(JSON.stringify(this.bookmarks[index]));
          break;
      }
    },
    ok () {
      this.bookmarks[this.currentIndex] = this.currentMark;
      this.$Message.success('修改成功');
    },
    cancel () {
      // this.currentMark = {};
    },
    handleUpdate() {
      console.log(this.bookmarks)
      console.log(JSON.stringify(this.bookmarks))
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header{
  border-bottom: 1px solid #e8eaec;
  padding: 9px 16px;
  line-height: 1;
  font-size: 16px;
  line-height: 20px;
}
.ivu-row{
  width: 100%;
  height: calc(100% - 51px);
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: absolute;
  overflow: auto;
}
.href-icon{
  width: 16px;
  margin-right: 5px;
}
.ivu-btn-text{
  padding: 0;
  text-align: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.ivu-list-item {
  padding-right: 24px;
  padding-left: 24px;
  border-bottom: 1px solid #e8eaec;
}
</style>