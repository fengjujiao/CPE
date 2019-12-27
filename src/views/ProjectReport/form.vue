<template>
  <div>
    <p class="mainTitle">工程项目定制报表-表格</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目工作状态统计" name="0">
        <topStatistics :otherTop="1"></topStatistics>
        <tableData :tableDataTr="tableDataTr0" ></tableData>
      </el-tab-pane>
      <el-tab-pane label="区域工作状态统计" name="1">
        <el-tabs v-model="activeNameSub">
          <el-tab-pane label="片区/语言片区" name="0">
            <topStatistics :otherTop="2"></topStatistics>
            <tableData :tableDataTr="tableDataTr1_YP" ></tableData>
          </el-tab-pane>
          <el-tab-pane label="片区" name="1">
            <topStatistics :otherTop="2"></topStatistics>
            <tableData :tableDataTr="tableDataTr1_P" ></tableData>
          </el-tab-pane>
          <el-tab-pane label="语言片区" name="2">
            <topStatistics :otherTop="2"></topStatistics>
            <tableData :tableDataTr="tableDataTr1_Y" ></tableData>
          </el-tab-pane>
        </el-tabs>
        
      </el-tab-pane>
      <el-tab-pane label="专业工作状态统计" name="2">
        <topStatistics :otherTop="3"></topStatistics>
        <tableData :tableDataTr="tableDataTr2" ></tableData>
      </el-tab-pane>
      <el-tab-pane label="科室工作状态统计" name="3">
        <topStatistics :otherTop="4"></topStatistics>
        <tableData :tableDataTr="tableDataTr3" ></tableData>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    Vname: "",
    components:{
      tableData: () => import('../../components/tableData.vue'),
      topStatistics: () => import('../../components/topStatistics.vue'),
    },
    data(){
      return{
        name:'0',
        activeName:'0',
        activeNameSub:'0',
        tableData:[],
        tableDataTr0:[
          {
            name:'工程项目',
            val:''
          },
          {
            name:'项目编号',
            val:''
          },
          {
            name:'项目阶段',
            val:''
          },
          {
            name:'片区',
            val:''
          },
          {
            name:'语言区',
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
          },
          {
            name:'平均人工时',
            val:''
          }
        ],
        tableDataTr1_YP:[
          {
            name:'片区',
            val:''
          },
          {
            name:'语言区',
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
          },
          {
            name:'平均人工时',
            val:''
          },
          {
            name:'项目数量',
            val:''
          },
          {
            name:'项目平均工时',
            val:''
          }
        ],
        tableDataTr1_P:[
          {
            name:'片区',
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
          },
          {
            name:'平均人工时',
            val:''
          },
          {
            name:'项目数量',
            val:''
          },
          {
            name:'项目平均工时',
            val:''
          }
        ],
        tableDataTr1_Y:[
          {
            name:'语言区',
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
          },
          {
            name:'平均人工时',
            val:''
          },
          {
            name:'项目数量',
            val:''
          },
          {
            name:'项目平均工时',
            val:''
          }
        ],
        tableDataTr2:[
          {
            name:'部室',
            val:''
          },
          {
            name:'专业名称',
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
          },
          {
            name:'平均人工时',
            val:''
          }
        ],
        tableDataTr3:[
          {
            name:'部室',
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
          },
          {
            name:'平均人工时',
            val:''
          }
        ],
      }
    },
    methods:{
      handleClick(val){
        if(val){this.Vname=val.name}
      },
      async tabledataFn(satrt, end, employees){
        let _name=this.Vname
        if(_name=='0'){}
        else if(_name=='1'){}
        else if(_name=='2'){}
        else if(_name=='3'){}
      }
    },
    mounted(){
      this.tabledataFn()
    }
  }
</script>
