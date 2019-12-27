<template>
  <div>
    <div>科研技术基础工作数据导入</div>
    <el-form :inline="true" :model="form" ref="form" style="margin-top:10px">
      <el-form-item>
        <el-input
          style="width: 316px;"
          size="medium"
          v-model="form.key"
          placeholder="课题编号/课题名称/课题长/类型/主办办公室"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="searchSub">查询</el-button>
        <el-button type="primary" size="small" @click="reset(form)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="success" size="small">
      <i class="el-icon-plus el-icon--left">导入</i>
    </el-button>
    <div class="card-div">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="科研技术" name="first">
          <tableData :tableDataTr="tableDataTr" />
        </el-tab-pane>
        <el-tab-pane label="基础工作项目" name="second">
          <tableData :tableDataTr="tableDataTr" />
        </el-tab-pane>
        <el-tab-pane label="标准规范" name="third">
          <tableData :tableDataTr="tableDataTr" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScientificDataImport",
  components: {
    tableData: () => import("../../components/tableData")
  },
  data() {
    return {
      form: {},
      activeName: "first",
      tableDataTr: [
        { name: "课题编号", val: "" },
        { name: "课题名称", val: "" },
        { name: "课题长", val: "" },
        { name: "类型", val: "" },
        { name: "主办办公室", val: "" },
        { name: "状态", val: "" },
        { name: "操作", val: "" }
      ]
    };
  },
  methods: {
    searchSub() {
      console.log(111);
    },
    reset(form) {
      // console.log(wqqwqw)
      this.$refs[form].resetFields();
    }
  }
};
</script>

<style scoped>
.card-div {
  margin-top: 10px;
}
</style>