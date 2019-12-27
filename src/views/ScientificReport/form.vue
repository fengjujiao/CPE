<template>
  <div>
    <p class="mainTitle">科研技术基础工作定制报表-表格</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="科研基础工作人工时统计" name="0">
        <topStatistics :otherTop="5"></topStatistics>
        <tableData :tableDataTr="tableDataTr0"></tableData>
      </el-tab-pane>
      <el-tab-pane label="专业人工时统计" name="1">
        <topStatistics :otherTop="3"></topStatistics>
        <tableData :tableDataTr="tableDataTr1"></tableData>
      </el-tab-pane>
      <el-tab-pane label="部室人工时统计" name="2">
        <topStatistics :otherTop="6"></topStatistics>
        <tableData :tableDataTr="tableDataTr2"></tableData>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "",
    components:{
      tableData: () => import('../../components/tableData.vue'),
      topStatistics: () => import('../../components/topStatistics.vue'),
    },
    data(){
      return{
        activeName:'0',
        tableDataTr0:[
          {
            name:'科研基础工作名称',
            val:''
          },
          {
            name:'科研基础工作编号',
            val:''
          },
          {
            name:'工作阶段',
            val:''
          },
          {
            name:'人工时（小时）',
            child:[
              {
                name:'上班时间',
                val:''
              },
              {
                name:'出差时间',
                val:''
              },
              {
                name:'小计',
                val:''
              }
            ]
          },
          {
            name:'填报人数',
            val:''
          }
        ],
        tableDataTr1:[
          {
            name:'部室名称',
            val:''
          },
          {
            name:'科研基础工作名称',
            val:''
          },
          {
            name:'科研基础工作编号',
            val:''
          },
          {
            name:'专业',
            val:''
          },
          {
            name:'职称',
            val:''
          },
          {
            name:'人工时（小时）',
            child:[
              {
                name:'上班时间',
                val:''
              },
              {
                name:'出差时间',
                val:''
              },
              {
                name:'小计',
                val:''
              }
            ]
          },
          {
            name:'填报人数',
            val:''
          }
        ],
        tableDataTr2:[
          {
            name:'部室名称',
            val:''
          },
          {
            name:'人工时（小时）',
            child:[
              {
                name:'上班时间',
                val:''
              },
              {
                name:'出差时间',
                val:''
              },
              {
                name:'小计',
                val:''
              }
            ]
          },
          {
            name:'填报人数',
            val:''
          }
        ],
      }
    },
    methods:{
      handleClick(){

      }
    },
    mounted(){}
  }
</script>
