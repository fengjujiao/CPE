<template>
  <div>
    <p class="mainTitle">科研技术基础工作工作状态统计</p>
    <topStatistics :otherTop1='2'></topStatistics>
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="tpCode" label="课题编号" width="150"></el-table-column>
      <el-table-column prop="tpName" label="课题名称" width="200"></el-table-column>
      <el-table-column prop="workTime" label="上班时间" width="150"></el-table-column>
      <el-table-column label="出差时间">
        <!-- <el-table-column label="办公室" >
          <template slot-scope="scope" v-if="scope.row.travelTime!=null">
            <p>{{scope.row.travelTime.officeTime}}</p>
          </template>
        </el-table-column> -->
        <el-table-column label="市内出差" >
          <template slot-scope="scope" v-if="scope.row.travelTime!=null">
            <p>{{scope.row.travelTime.innerCityTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="市外出差" >
          <template slot-scope="scope" v-if="scope.row.travelTime!=null">
            <p>{{scope.row.travelTime.outOfCityTime||0}}</p>
          </template>
        </el-table-column>
        <el-table-column label="小计" >
          <template slot-scope="scope" v-if="scope.row.travelTime!=null">
            <p>{{scope.row.travelTime.officeTime + scope.row.travelTime.innerCityTime+scope.row.travelTime.outOfCityTime||0}}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="请/休假时间">
        <el-table-column label="办公大楼" >
          <template slot-scope="scope" v-if="scope.row.holidayWorkTime!=null">
            <p>{{scope.row.holidayWorkTime.officeTime||0}}</p>
          </template>
        </el-table-column>
        <el-table-column label="市内出差" >
          <template slot-scope="scope" v-if="scope.row.holidayWorkTime!=null">
            <p>{{scope.row.holidayWorkTime.innerCityTime||0}}</p>
          </template>
        </el-table-column>
        <el-table-column label="市外出差" >
          <template slot-scope="scope" v-if="scope.row.holidayWorkTime!=null">
            <p>{{scope.row.holidayWorkTime.outOfCityTime||0}}</p>
          </template>
        </el-table-column>
        <el-table-column label="小计" >
          <template slot-scope="scope" v-if="scope.row.holidayWorkTime!=null">
            <p>{{scope.row.holidayWorkTime.officeTime + scope.row.holidayWorkTime.innerCityTime+scope.row.holidayWorkTime.outOfCityTime||0}}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="合计" prop="addhm">
      </el-table-column>
      <el-table-column label="占比" prop="occupy"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "",
    components:{
      topStatistics: () => import('../../components/topStatistics.vue'),
    },
    data(){
      return{
        tableDataTr:[
          {
            name: '课题编号',
            val:''
          },
          {
            name: '课题名称',
            val:''
          },
          {
            name: '上班时间（小时）',
            child:[
              {
                name:'打卡',
                val:''
              },
              {
                name:'未打卡',
                val:''
              },
              {
                name:'小计',
                val:''
              }
            ]
          },
          {
            name: '出差时间（小时）',
            child:[
              {
                name:'有手续',
                val:''
              },
              {
                name:'无手续',
                val:''
              },
              {
                name:'小计',
                val:''
              }
            ]
          },
          {
            name: '休假时间工作（小时）',
            child:[
              {
                name:'打卡',
                val:''
              },
              {
                name:'未打卡',
                val:''
              },
              {
                name:'小计',
                val:''
              }
            ]
          },
          {
            name:'合计',
            val:''
          },
          {
            name:'占比',
            val:''
          }
        ],
        tableData1:[],
         pageParams: {
        employees: [
        ],
        beginDate: "2019-11-24",
        endDate: "2019-11-30"
      }
      }
    },
    methods:{
      async tabledataFn(satrt,end,employees) {
       const user = JSON.parse(sessionStorage.getItem("user"));
       let emPcode=user.empCode
      let pageParams={
                beginDate: satrt?satrt:this.$main.getMonth('s',0),
                endDate: end?end:this.$main.getMonth('e',0),
                employees: employees?employees:[], // 查询的的员工
                empCode:emPcode
      }
      console.log(satrt,end,employees)
      this.pageParams.beginDate=pageParams.beginDate
      this.pageParams.endDate=pageParams.endDate
      let { data } = await this.axios.post(
        "/api/mh/statisticalAnalysisScientific",
        this.pageParams
      );
      let _sum=0
      let _data=data.data.rows
      _data.forEach((item,index)=>{
        if(item.holidayWorkTime){
          item.holidayWorkTimes=item.holidayWorkTime.innerCityTime+item.holidayWorkTime.officeTime+item.holidayWorkTime.outOfCityTime||0
          item.holidayInnerCityTime=item.holidayWorkTime.innerCityTime
          item.holidayOfficeTime=item.holidayWorkTime.officeTime
          item.holidayOutOfCityTime=item.holidayWorkTime.outOfCityTime
        }else{
          item.holidayWorkTimes=0
        }
        if(item.travelTime){
          item.travelTimes=item.travelTime.innerCityTime+item.travelTime.officeTime+item.travelTime.outOfCityTime||0
          item.travelInnerCityTime=item.travelTime.innerCityTime
          item.travelOfficeTime=item.travelTime.officeTime
          item.travelOutOfCityTime=item.travelTime.outOfCityTime
        }else{
          item.travelTimes=0
        }
        item.addhm=item.holidayWorkTimes+item.travelTimes+item.workTime
        _sum+=item.addhm
      })
      _data.forEach(item=>{
        item.occupy=(item.addhm/_sum*100).toFixed(2)+'%'
      })
     console.log(_data);
     this.tableData1 = _data;
    },
     //导出报表
    async deptFX() {
      let pageParams = [];
      this.tableData1.forEach((item, index) => {
        let mypageParams = {
          id: index + 1,
          tpCode: item.tpCode,
          tpName: item.tpName,
          workTotalHour: item.workTime,
          travelInCity: item.travelInnerCityTime,
          travelOutCity: item.travelOutOfCityTime,
          travelTotal: item.travelTimes,
          holidayOffice: item.holidayOfficeTime,
          holidayInCity: item.holidayInnerCityTime,
          holidayOutCity: item.holidayOutOfCityTime,
          holidaytotal: item.holidayWorkTimes,
          total: item.addhm,
          proportion: item.occupy
        };
        pageParams.push(mypageParams);
      });
      let datas = {
                method: 'post',
                url:'/api/easypoi/ScientificResearchFX',
                fileName: '',
                data:pageParams
            }
      this.$main.exportMethod(datas)
    }
    },
    mounted(){
      this.tabledataFn()
    }
  }
</script>
