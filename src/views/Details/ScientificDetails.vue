<template>
  <div>
    <p class="mainTitle">科研技术基础工作工作状态明细</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="明细查询" name="0">
        <topStatistics ></topStatistics>
        <div style="margin:0 0 20px">
          <div class="seniorboxTOP">
            <p>高级查询</p>
            <p class="seniorBtn" @click="seniorBtn">{{seniorBtnz}}</p>
          </div>
          <div v-show="flge" class="seniorbox">
            <el-row :gutter="10">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题编号：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techcode"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题名称：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techname"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题长：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techleader"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techtype"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
<!--            <el-button size="mini" type="primary" @click="Detailfunc">查询</el-button>-->
          </div>
        </div>
        <!-- 明细查询表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="mhDate" label="填报日期" width="100"></el-table-column>
          <el-table-column prop="tpcode" label="课题编号" width="100"></el-table-column>
          <el-table-column prop="tpname" label="课题名称" width="100"></el-table-column>
          <el-table-column prop="date" label="类别" width="100"></el-table-column>
          <el-table-column prop="tPTeachType" label="级别" width="100"></el-table-column>
          <el-table-column prop="tpstage" label="状态" width="100"></el-table-column>
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
            <el-table-column prop="eptotal2" label="小计" width="84">

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
              <template slot-scope="scope" v-if="scope.row.outleaveworkhours!=0">
                <p>{{scope.row.outleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="tptotal2" label="小计" width="84">
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
            <el-row :gutter="10">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题编号：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techcode"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题名称：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techname"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题长：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techleader"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techtype"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 人员视角表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="tpcode" label="课题编号" width="100"></el-table-column>
          <el-table-column prop="tpname" label="课题名称" width="100"></el-table-column>
          <el-table-column prop="date" label="类别" width="100"></el-table-column>
          <el-table-column prop="tPTeachType" label="级别" width="100"></el-table-column>
          <el-table-column prop="tpstage" label="状态" width="100"></el-table-column>
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
            <el-table-column prop="eptotal2" label="小计" width="84">

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
              <template slot-scope="scope" v-if="scope.row.outleaveworkhours!=0">
                <p>{{scope.row.outleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="tptotal2" label="小计" width="84">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="alltotal" label="合计" width="100"></el-table-column>
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
            <el-row :gutter="10">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题编号：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techcode"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题名称：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techname"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">课题长：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techleader"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.techtype"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 项目视角表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="tpcode" label="课题编号" width="100"></el-table-column>
          <el-table-column prop="tpname" label="课题名称" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <<el-table-column prop="date" label="类别" width="100"></el-table-column>
          <el-table-column prop="tPTeachType" label="级别" width="100"></el-table-column>
          <el-table-column prop="tpstage" label="状态" width="100"></el-table-column>
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
            <el-table-column prop="eptotal2" label="小计" width="84">

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
              <template slot-scope="scope" v-if="scope.row.outleaveworkhours!=0">
                <p>{{scope.row.outleaveworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="tptotal2" label="小计" width="84">
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
      :page-size="condition.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    topStatistics: () => import("../../components/topStatistics.vue")
  },
  data() {
    return {
      flge: false,
      seniorBtnz: "展开",
      total:0,
      activeName: "0",
      tableDataTr0: [],
      tableDataTr1: [],
      tableDataTr2: [],
      tableData1: [],
      total: 0,
      condition: {
        val: "",
        beginDate: "",
        endDate:"",
        employees:[],
        techcode:"", //课题编号
        techname:"",//课题名称
        techtype:"",//项目类别
        techleader:"",//课题长
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
      this.tableData1=[]
      this.condition.beginDate=satrt
      this.condition.endDate=end
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
        tPCode:this.condition.techcode, //课题编号
        tPName:this.condition.techname,//课题名称
        tPTeachType:this.condition.techtype,//项目类别
        tPLeaderName:this.condition.techleader,//课题长
        tPMasterDept:null,//部室
        pageSize: this.condition.pageSize,
        currentPage:  this.condition.currentPage, //当前页
        // workAttribute: 10
      }
      let param = condition;
      let { data } = await this.axios.post(
        "/api/mh/findAllByQueryScientificResearchPageDetail",
        param
      );
      this.tableData1 = data.rows;
      this.total = data.total;
      // this.tableData1 = data.rows;
      // this.total = data.total;
      this.tableData1.forEach((item,index) =>{
        item.workhours=0
        item.totals=0
        //出差时间
        item.inworkhours=0
        item.outworkhours=0
        //休假
        item.inleaveworkhours=0
        item.outleaveworkhours=0
        item.offleaveworkhours=0

        item.eptotal2=0 //科研出差小计

        item.tptotal2=0 //科研休假小计
        //总计
        item.alltotal=0
        if(item.mhWorkTimes.length!=0){
          item.tpcode=item.mhWorkTimes[0].tpcode
          item.tpname=item.mhWorkTimes[0].tpname
          // item.epstage=item.mhWorkTimes[0].pro
          item.tPTeachType=item.mhWorkTimes[0].tPTeachType
          item.tpstage=item.mhWorkTimes[0].tpstage
        }
        if(!item.travelStrat && !item.leaveStart){ //上班时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.tpname){ //科研项目
              item.workhours+=val.workhours
            }
          })
        }else if(item.travelStrat && !item.leaveStart){ //出差时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.tpname){ //科研项目
              if(val.workspace=='市内出差'){
                item.intpworkhours+=val.workhours
              }else if(val.workspace=='市外出差'){
                item.outtpworkhours+=val.workhours
              }
            }
          })
          item.eptotal2=item.inworkhours+ item.outworkhours
        }else if(!item.travelStrat && item.leaveStart){ //休假时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.tpname){ //科研项目
              if(val.workspace=='市内出差'){
                item.inleaveworkhours+=val.workhours
              }else if(val.workspace=='市外出差'){
                item.outleaveworkhours+=val.workhours
              }else if(val.workspace=='办公大楼'){
                item.offleaveworkhours+=val.workhours
              }
            }
          })
          item.tptotal2=item.inleaveworkhours+item.outleaveworkhours+item.offleaveworkhours
        }
        item.alltotal=item.workhours+item.eptotal2+item.tptotal2
      })
     console.log(this.tableData1, 99);
    },
    //导出报表


//员工姓名
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
            tpCode:item.tpcode,
            tpName:item.tpname,
            type:item,
            level:item.tPTeachType,
            status:item.tpstage,
            workTime:item.workhours,
            travel_in:item.inworkhours,
            travel_out:item.outworkhours,
            travel_total:item.eptotal2,
            holiday_office:item.offleaveworkhours,
            holiday_in:item.inleaveworkhours,
            holiday_out:item.outleaveworkhours,
            holiday_total:item.tptotal2,
            total:item.alltotal
          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/ScientificResearchMX',
          fileName: '科研技术基础工作工作状态明细查询',
          data:pageParams
        }
      }else if(this.activeName==1){
        this.tableData1.forEach((item, index) => {
          let mypageParams = {
            id:index + 1,
            deptName:item.deptName,
            empName:item.employee.name,
            tpCode:item.tpcode,
            tpName:item.tpname,
            type:item,
            level:item.tPTeachType,
            status:item.tpstage,
            workTime:item.workhours,
            travel_in:item.inworkhours,
            travel_out:item.outworkhours,
            travel_total:item.eptotal2,
            holiday_office:item.offleaveworkhours,
            holiday_in:item.inleaveworkhours,
            holiday_out:item.outleaveworkhours,
            holiday_total:item.tptotal2,
            total:item.alltotal
          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/deptMX_renyuan',
          fileName: '科研技术基础工作人工时项目视角',
          data:pageParams
        }
      }else if(this.activeName==2){
        this.tableData1.forEach((item, index) => {
          let mypageParams = {
            id:index + 1,
            deptName:item.deptName,
            tpCode:item.tpcode,
            tpName:item.tpname,
            empName:item.employee.name,
            type:item,
            level:item.tPTeachType,
            status:item.tpstage,
            workTime:item.workhours,
            travel_in:item.inworkhours,
            travel_out:item.outworkhours,
            travel_total:item.eptotal2,
            holiday_office:item.offleaveworkhours,
            holiday_in:item.inleaveworkhours,
            holiday_out:item.outleaveworkhours,
            holiday_total:item.tptotal2,
            total:item.alltotal
          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/deptMX_renyuan',
          fileName: '科研技术基础工作人工时人员视角',
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
    seniorBtn() {
      if (this.flge == false) {
        this.seniorBtnz = "收起";
        this.flge = true;
      } else {
        this.seniorBtnz = "展开";
        this.flge = false;
      }
    }
  },
  mounted() {
  //  const user = JSON.parse(sessionStorage.getItem("user"));
   // console.log(user.empCode)
    this.tabledataFn();
  }
};
</script>
<style scoped>
.seniorboxTOP {
  display: flex;
  /*justify-content: space-between;*/
}
.seniorbox {
  border: 1px solid #ddd;
  box-shadow: 0px 4px 10px 1px #ddd;
  padding: 20px 10px;
  margin-top: 10px;
}
.seniorBtn {
  text-align: end;
  width: 100px;
  color: blue;
}
</style>
