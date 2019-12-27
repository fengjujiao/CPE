<template>
  <div>
    <p class="mainTitle">管理、服务及其他工作状态明细</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="明细查询" name="0">
        <topStatistics ></topStatistics>
        <div style="margin:0 0 20px">
          <div class="seniorboxTOP">
            <p>高级查询</p>
            <p class="seniorBtn" @click="seniorBtn">{{seniorBtnz}}</p>
          </div>
          <div v-show="flge" class="seniorbox">
            <div style="display:flex">
              <p style="lineHeight: 40px">工作名称：</p>
              <el-input style="width: 300px" placeholder="请输入内容" v-model="condition.mpworktypename"></el-input>
            </div>
<!--            <el-button size="mini" type="primary" @click="Detailfunc">查询</el-button>-->
          </div>
        </div>
        <!-- 明细查询表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="mhDate" label="填报日期" width="100"></el-table-column>
          <el-table-column prop="mpworktypename" label="工作名称" width="100"></el-table-column>
          <el-table-column prop="" label="上班时间" width="100">
            <template slot-scope="scope" v-if="scope.row.workhours!=0">
              <p>{{scope.row.workhours}}</p>
            </template>
          </el-table-column>
          <!-- 上班时间 -->
          <el-table-column label="出差时间">
            <el-table-column prop="date" label="市内出差" width="84">
              <template slot-scope="scope" v-if="scope.row.inworkhours!=0">
                <p>{{scope.row.inworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市外出差" width="84">
              <template slot-scope="scope" v-if="scope.row.outworkhours!=0">
                <p>{{scope.row.outworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="eptotal3" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <!-- 休假时间 -->
          <el-table-column label="休假时间">
            <el-table-column prop="date" label="办公大楼" width="84">
              <template slot-scope="scope" v-if="scope.row.offleaveworkhours!=0">
                <p>{{scope.row.offleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市内出差" width="84">
              <template slot-scope="scope" v-if="scope.row.inleaveworkhours!=0">
                <p>{{scope.row.inleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市外出差" width="84">
            </el-table-column>
            <el-table-column prop="tptotal3" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="alltotal" label="合计" width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="人员视角" name="1">
        <topStatistics ></topStatistics>
        <div style="margin:0 0 20px">
          <div class="seniorboxTOP">
            <p>高级查询</p>
            <p class="seniorBtn" @click="seniorBtn">{{seniorBtnz}}</p>
          </div>
          <div v-show="flge" class="seniorbox">
            <div style="display:flex">
              <p style="lineHeight: 40px">工作名称：</p>
              <el-input style="width: 300px" placeholder="请输入内容" v-model="condition.mpworktypename"></el-input>
            </div>
          </div>
        </div>
        <!-- 人员视角表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="mpworktypename" label="工作名称" width="100"></el-table-column>
          <el-table-column prop="" label="上班时间" width="100">
            <template slot-scope="scope" v-if="scope.row.workhours!=0">
              <p>{{scope.row.workhours}}</p>
            </template>
          </el-table-column>
          <!-- 上班时间 -->
          <el-table-column label="出差时间">
            <el-table-column prop="date" label="市内出差" width="84">
              <template slot-scope="scope" v-if="scope.row.inworkhours!=0">
                <p>{{scope.row.inworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市外出差" width="84">
              <template slot-scope="scope" v-if="scope.row.outworkhours!=0">
                <p>{{scope.row.outworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="eptotal3" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <!-- 休假时间 -->
          <el-table-column label="休假时间">
            <el-table-column prop="date" label="办公大楼" width="84">
              <template slot-scope="scope" v-if="scope.row.offleaveworkhours!=0">
                <p>{{scope.row.offleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市内出差" width="84">
              <template slot-scope="scope" v-if="scope.row.inleaveworkhours!=0">
                <p>{{scope.row.inleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市外出差" width="84">
            </el-table-column>
            <el-table-column prop="tptotal3" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="alltotal" label="合计" width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="项目视角" name="2">
        <topStatistics ></topStatistics>
        <div style="margin:0 0 20px">
          <div class="seniorboxTOP">
            <p>高级查询</p>
            <p class="seniorBtn" @click="seniorBtn">{{seniorBtnz}}</p>
          </div>
          <div v-show="flge" class="seniorbox">
            <div style="display:flex">
              <p style="lineHeight: 40px">工作名称：</p>
              <el-input style="width: 300px" placeholder="请输入内容" v-model="condition.mpworktypename"></el-input>
            </div>
          </div>
        </div>
        <!-- 项目视角表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="mpworktypename" label="工作名称" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="totalHour" label="上班时间" width="100">
            <template slot-scope="scope" v-if="scope.row.workhours!=0">
              <p>{{scope.row.workhours}}</p>
            </template>
          </el-table-column>
          <!-- 上班时间 -->
          <el-table-column label="出差时间">
            <el-table-column prop="date" label="市内出差" width="84">
              <template slot-scope="scope" v-if="scope.row.inworkhours!=0">
                <p>{{scope.row.inworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市外出差" width="84">
              <template slot-scope="scope" v-if="scope.row.outworkhours!=0">
                <p>{{scope.row.outworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="eptotal3" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <!-- 休假时间 -->
          <el-table-column label="休假时间">
            <el-table-column prop="date" label="办公大楼" width="84">
              <template slot-scope="scope" v-if="scope.row.offleaveworkhours!=0">
                <p>{{scope.row.offleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市内出差" width="84">
              <template slot-scope="scope" v-if="scope.row.inleaveworkhours!=0">
                <p>{{scope.row.inleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="市外出差" width="84">
            </el-table-column>
            <el-table-column prop="tptotal3" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="alltotal" label="合计" width="100">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 50]"
      :current-page="condition.currentPage"
      :page-size="condition.pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    tableData: () => import("../../components/tableData.vue"),
    topStatistics: () => import("../../components/topStatistics.vue")
  },
  data() {
    return {
      flge:false,
      seniorBtnz:'展开',
      activeName: "0",
      tableData1: [],
      total: 0,
      condition: {
        val: "",
        beginDate: "",
        endDate: "",
        employees: [],
        ePCode: "",
        mpworktypename: "", //工作名称
        pageSize: 10,
        currentPage: 1, //当前页
        workAttribute: 10
      }
    };
  },
  methods: {
    //接口
    async tabledataFn(satrt,end,employees) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      let empCode=user.empCode
      this.condition.beginDate=satrt
      this.condition.endDate=end
      this.tableData1=[]
      let condition={
                val: "",
                beginDate: satrt?satrt:this.$main.getMonth('s',0),
                endDate: end?end:this.$main.getMonth('e',0),
                empCode:empCode,
                employees: employees?employees:[
                  {
                    empCode:empCode
                  }
                ], // 查询的的员工
                mpworktypename: this.condition.mpworktypename, //工作名称
                pageSize: this.condition.pageSize,
                currentPage:  this.condition.currentPage, //当前页
                // workAttribute: 10
      }
      let param = condition;
      let { data } = await this.axios.post(
        "/api/mh/findAllByQueryManagementServicePageDetail",
        param
      );
      this.tableData1 = data.rows;
      this.total = data.total;
      this.tableData1.forEach((item,index) =>{
        item.workhours=0
        item.totals=0
        //出差时间
        item.inworkhours=0
        item.outworkhours=0
        //休假时间
        item.inleaveworkhours=0
        item.outleaveworkhours=0
        item.offleaveworkhours=0

        item.eptotal3=0 //管理服务出差小计

        item.tptotal3=0 //管理服务工程小计
        //总计
        item.alltotal=0
        if(item.mhWorkTimes.length!=0){
          item.mpworktypename=item.mhWorkTimes[0].mpworktypename
        }
        if(!item.travelStrat && !item.leaveStart){ //上班时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.mpworktypename){ //管理服务项目
              item.workhours+=val.workhours
            }
          })
        }else if(item.travelStrat && !item.leaveStart){ //出差时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.mpworktypename){ //管理服务项目
              if(val.workspace=='市内出差'){
                item.intpworkhours+=val.workhours
              }else if(val.workspace=='市外出差'){
                item.outtpworkhours+=val.workhours
              }
            }
          })
          item.eptotal3=item.intpworkhours+item.outtpworkhours
        }else if(!item.travelStrat && item.leaveStart){ //休假时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.mpworktypename){ //管理服务项目
              if(val.workspace=='市内出差'){
                item.inleaveworkhours+=val.workhours
              }else if(val.workspace=='市外出差'){
                item.outleaveworkhours+=val.workhours
              }else if(val.workspace=='办公大楼'){
                item.offleaveworkhours+=val.workhours
              }
            }
          })
          item.tptotal3=item.inleaveworkhours+item.outleaveworkhours+item.offleaveworkhours
        }
        item.alltotal=item.workhours+item.eptotal3+item.tptotal3
      })
      console.log(this.tableData1, 99);
    },
    //导出报表
    async deptFX() {
      let pageParams = [];
      let datas={}
      console.log(this.activeName,8899);
      if(this.activeName==0){
        this.tableData1.forEach((item, index) => {
          let mypageParams = {
            id:index + 1,
            deptName:item.deptName,
            empName:item.employee.name,
            mhDate:item.mhDate,
            work_mangement:item.mpworkhours,
            work_total:item.totals1,
            travel_mangement_in:item.inmpworkhours,
            travel_mangement_out:item.outmpworkhours,
            travel_mangement_total:item.eptotal3,
            travel_total:item.totals2,
            holiday_mangement_office:item.offmpleaveworkhours,
            holiday_mangement_in:item.inmpleaveworkhours,
            holiday_mangement_out:item.oumptleaveworkhours,
            holiday_mangement_total:item.tptotal3,
            total:item.alltotal

          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/deptMX',
          fileName: '个人/部室总工时明细',
          data:pageParams
        }
      }else if(this.activeName==1){
        this.tableData1.forEach((item, index) => {
          let mypageParams = {
            id:index + 1,
            deptName:item.deptName,
            empName:item.employee.name,
            work_engineering:item.workhours,
            work_scientfic:item.tpworkhours,
            work_mangement:item.mpworkhours,
            work_total:item.totals1,
            travel_engineering_in:item.inworkhours,
            travel_engineering_out:item.outworkhours,
            getTravel_engineering_tital:item.eptotal1,
            travel_scientfic_in:item.intpworkhours,
            travel_scientfic_out:item.outtpworkhours,
            travel_scientfic_total:item.eptotal2,
            travel_mangement_in:item.inmpworkhours,
            travel_mangement_out:item.outmpworkhours,
            travel_mangement_total:item.eptotal3,
            travel_total:item.totals2,
            holiday_engineering_office:item.offleaveworkhours,
            holiday_engineering_in:item.inleaveworkhours,
            holiday_engineering_out:item.outleaveworkhours,
            holiday_engineering_total:item.tptotal1,
            holiday_scientfic_office:item.offtpleaveworkhours,
            holiday_scientfic_in:item.intpleaveworkhours,
            holiday_scientfic_out:item.outptleaveworkhours,
            holiday_scientfic_total:item.tptotal2,
            holiday_mangement_office:item.offmpleaveworkhours,
            holiday_mangement_in:item.inmpleaveworkhours,
            holiday_mangement_out:item.oumptleaveworkhours,
            holiday_mangement_total:item.tptotal3,
            holidaa_total:item.totals3,
            total:item.alltotal

          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/deptMX_renyuan',
          fileName: '个人部室明细查询人员视角数据',
          data:pageParams
        }
      }
      console.log(pageParams)
      this.$main.exportMethod(datas)
    },
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.tabledataFn(this.condition.beginDate,this.condition.endDate);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.condition.currentPage = val;
      this.tabledataFn(this.condition.beginDate,this.condition.endDate);
    },
    handleClick() {
      this.condition.currentPage = 1;
      this.tabledataFn(this.condition.beginDate,this.condition.endDate);
    },
    seniorBtn(){
      if(this.flge==false){
        this.seniorBtnz='收起'
        this.flge=true
      }else{
        this.seniorBtnz='展开'
        this.flge=false
      }
    }
  },
  mounted() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.tabledataFn();
  }
};
</script>
<style scoped>
.seniorboxTOP {
  display: flex;
  /*justify-content: space-between;*/
}
.seniorbox{
  border: 1px solid #ddd;
  box-shadow: 0px 4px 10px 1px #ddd;
  padding: 40px 10px
}
.seniorBtn {
  text-align: end;
  width: 100px;
  color: blue
}
</style>
