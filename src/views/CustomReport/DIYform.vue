<template>
  <div id="DIY">
    <p>请选择报表所需要的参数</p>
    <div class="madd">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="报表名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="报表日期范围">
          <el-radio-group v-model="form.date">
            <el-radio label="本周"></el-radio>
            <el-radio label="本月"></el-radio>
            <el-radio label="本季度"></el-radio>
            <el-radio label="本年"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图形报表">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="报表属性">
          <el-radio-group v-model="form.resource">
            <el-radio label="工程项目报表"></el-radio>
            <el-radio label="科研项目基础工作报表"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报表区域">
          <el-select v-model="form.region" placeholder="请选择报表查询区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需要的字段">
          <el-checkbox-group v-model="form.type">
            <el-checkbox v-for="item in lede" :key="item.name" :label="item.name" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date:"",
        delivery: false,
        type: [],
        resource: "",
      },
      lede:[{name:'科研基础工作名称'},{name:'科研基础工作编号'},{name:'工作阶段'},{name:'人工时（小时）'},{name:'职称'},{name:'部室名称'},{name:'专业'},{name:'填报人数'},]
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form, "submit!");
    }
  }
};
</script>
<style scoped>
.madd {
  width: 500px;
  margin: 20px 0;
}
</style>