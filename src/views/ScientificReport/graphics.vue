<template>
  <div>
    <p class="mainTitle">科研技术基础工作定制报表-图形</p>
    <el-tabs v-model="activeName" @tab-click="">
      <el-tab-pane label="年度科研人工时分布图" name="0">
         <el-date-picker
      v-model="value3"
      type="year"
      placeholder="选择年">
    </el-date-picker>
        <el-tabs v-model="activeNameSub" @tab-click="">
          <el-tab-pane label="图表" name="0">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
          </el-tab-pane>
          <el-tab-pane label="表格" name="1">
            <tableData :tableDataTr="tableDataTr0"></tableData>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="科研分类工时分布图" name="1">
        <topStatistics :mainTopHide="true"></topStatistics>
        <el-tabs v-model="activeNameSub" @tab-click="">
          <el-tab-pane label="图表" name="0">
            <ve-pie v-if="activeName==1 && activeNameSub==0" :data="chartDataPie"></ve-pie>
          </el-tab-pane>
          <el-tab-pane label="表格" name="1">
            <tableData :tableDataTr="tableDataTr1"></tableData>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="科研管理岗位工时分布图" name="2">
        <topStatistics :mainTopHide="true"></topStatistics>
        <el-tabs v-model="activeNameSub" @tab-click="">
          <el-tab-pane label="图表" name="0">
            <ve-pie v-if="activeName==2 && activeNameSub==0" :data="chartDataPie"></ve-pie>
          </el-tab-pane>
          <el-tab-pane label="表格" name="1">
            <tableData :tableDataTr="tableDataTr2"></tableData>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="科研阶段工时分布图" name="3">
        <topStatistics :mainTopHide="true"></topStatistics>
        <el-tabs v-model="activeNameSub" @tab-click="">
          <el-tab-pane label="图表" name="0">
            <ve-pie v-if="activeName==3 && activeNameSub==0" :data="chartDataPie"></ve-pie>
          </el-tab-pane>
          <el-tab-pane label="表格" name="1">
            <tableData :tableDataTr="tableDataTr3"></tableData>
          </el-tab-pane>
        </el-tabs>
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
        activeNameSub:'0',
        value3:'',
        tableDataTr0:[
          {
            name:'月份',
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
        ],
        tableDataTr1:[
          {
            name:'科研基础工作名称',
            val:''
          },
          {
            name:'科研基础工作编号',
            val:''
          },
          {
            name:'类别',
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
        ],
        tableDataTr2:[
          {
            name:'科研基础工作名称',
            val:''
          },
          {
            name:'科研基础工作编号',
            val:''
          },
          {
            name:'类别',
            val:''
          },
          {
            name:'管理岗位',
            val:''
          },
          {
            name:'累计人工时',
            val:''
          },
          {
            name:'百分比',
            val:''
          },
        ],
        tableDataTr3:[
          {
            name:'项目阶段',
            val:''
          },
          {
            name:'累计人工时',
            val:''
          },
          {
            name:'百分比',
            val:''
          },
        ],
        chartSettings:{
          stack: { '用户': ['访问用户', '下单用户'] }
        },
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartDataPie: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    },
    methods:{},
    mounted(){}
  }
</script>
