<template>
  <div>
    <div>页面导航管理</div>
    <el-button type="success" size="small" style="margin-top:10px">
      <i class="el-icon-plus el-icon--left">添加</i>
    </el-button>
    <tableData :tableDataTr="tableDataTr" />
  </div>
</template>

<script>
  export default {
    name: "",
    components: {
      tableData: () => import("../../components/tableData")
    },
    data() {
      return {
        tableDataTr: [
          { name: "导航名称", val: "" },
          { name: "是否为菜单", val: "" },
          { name: "是否为系统参", val: "" },
          { name: "状态", val: "" },
          { name: "地址", val: "" },
          { name: "操作", val: "" }
        ]
      };
    }
  }
</script>

<style scoped>

</style>