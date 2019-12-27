<template>
  <div>
    <div>API设置</div>
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
        { name: "系统名称", val: "" },
        { name: "备注", val: "" },
        { name: "ApiToken", val: "" },
        { name: "操作", val: "" }
      ]
    };
  }
};
</script>

<style scoped>
</style>