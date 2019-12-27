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
<!--                <el-form-item label="图形报表">-->
<!--                    <el-switch v-model="form.delivery"></el-switch>-->
<!--                </el-form-item>-->
                <el-form-item label="报表区域">
                    <el-select v-model="form.region" placeholder="请选择报表查询区域" @change="selectFn">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="需要的字段">
                    <el-checkbox-group v-model="form.type" @change="checkFn">
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        lede:[{name:'课题名称'},{name:'课题编号'},{name:'工作阶段'},{name:'项目阶段'},{name:'项目类别'}]
      };
    },
    methods: {
      //todo 选择报表区域
      selectFn(val){
        console.log(val,88);
      },
      //todo 字段选择
      checkFn(val){
        console.log(val)
      },
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
