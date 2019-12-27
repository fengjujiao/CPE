<template>
  <div id="app">
    <p>请选择报表所需要的参数</p>

    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city.val">{{city.name}}</el-checkbox>
    </el-checkbox-group>
    <el-button type="success" round @click="diyok">确认</el-button>
    <v_tableData :tableDataTr="tableDataTr" :tableData='tableData'></v_tableData>
  </div>
</template>
<script>
//const cityOptions = ["项目进度", "员工填报工时", "日期", "部门/科室"];
const cityOptions = [{name:'项目进度',val:'jd'},{name:'工时',val:'gs'},{name:'时间',val:'sj'},{name:'部门/科室',val:'bs'},];
export default {
  components: {
    v_tableData: () => import("../../components/tableData")
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      tableDataTr: [{name:'项目进度',val:''}],
      tableData:[
        ]
    };
  },
  methods: {
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    diyok() {
      let _checkedCities = this.checkedCities;
      this.tableDataTr = [];
      _checkedCities.forEach(item => {
        //console.log(item)
        this.tableDataTr.push({ name: item.name, val:item.val});
      });
     // console.log(this.tableDataTr)
    }
  }
};
</script>
<style scoped lang="less">
</style>