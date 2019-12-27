<template>
  <div>
    <p class="mainTitle">我的报表-表格</p>
    <div v-show="asfxastin.length==0">
        <p class="addbaobiao"><router-link to='/home/CustomReport_DIYform'>+ 没有报表请去添加报表</router-link></p>
    </div>
    <el-tabs v-show="asfxastin.length!=0" v-model="activeName" @tab-click="handleClick(item.id)">
      <el-tab-pane v-for="(item,index) in asfxastin" :key="index" :label=item.formName>
        <p>{{index}}</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "",
    components:{
    },
    data(){
      return{
        activeName:0,
        asfxastin:[
          {formName:'项目人工时统计',id:1},
          {formName:'部门人工时统计',id:2},
        ]
       
       
      }
    },
    methods:{
      handleClick(id){
        console.log(id)
      }
    },
    mounted(){}
  }
</script>
<style scoped>
.addbaobiao{
  font-size: 30px;
  display: flex;
  justify-content: center;
  margin: 40px auto;
  color: blue
}
</style>