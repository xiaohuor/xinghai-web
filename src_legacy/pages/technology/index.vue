<template>
  <div>
    <strong>文档列表:</strong>
    <br />
    <br />
    <List header="置顶文章" footer="Footer" border>
      <ListItem>This is a piece of text.</ListItem>
      <ListItem>This is a piece of text.</ListItem>
    </List>
    <br />
    <strong>Small Size:</strong>
    <br />
    <br />
    <List header="Header" footer="Footer" border size="small">
      <ListItem>This is a piece of text.</ListItem>
      <ListItem>This is a piece of text.</ListItem>
      <ListItem>This is a piece of text.</ListItem>
    </List>
  </div>
</template>

<script>

export default {
  name: "technology",
};
</script>

<style lang="scss" scoped>
.ivu-list-item{
  cursor: pointer;
  &:hover{
    color: #2d8cf0;
  }
}
</style>