<template>
  <div>
    <p class="mainTitle">工程出差系统映射管理</p>
    <el-form :inline="true" :model="form" ref="form" style="margin-top:10px">
      <el-form-item prop="name">
        <el-input size="medium" v-model="form.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="searchSub">查询</el-button>
        <el-button type="primary" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="success" size="small">
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
      form: {
        name:""
      },
      tableDataTr: [
        { name: "门禁卡ID", val: "" },
        { name: "员工编码", val: "" },
        { name: "员工姓名", val: "" },
        { name: "开启门禁卡系统", val: "" },
        { name: "操作", val: "" }
      ]
    };
  },
  methods: {
    searchSub() {
      console.log(111);
    },
    reset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
</style>