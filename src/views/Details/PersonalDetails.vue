<template>
  <div>
    <p class="mainTitle">个人总工作状态明细</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="明细查询" name="0">
        <topStatistics :otherTop="7"></topStatistics>
        <!-- 明细查询表格 -->
        <div class="txtAcenter">
          <el-table :data="tableData1" style="margin:0 auto" width="100%">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column prop="date" label="部室" width="150"></el-table-column>
            <el-table-column prop="employee.name" label="姓名" width="150"></el-table-column>
            <el-table-column prop="mhDate" label="填报日期" width="150"></el-table-column>

            <!-- 上班时间 -->
            <el-table-column label="上班时间">
              <el-table-column width="100" label="工程项目" prop="workhours">
                <template slot-scope="scope" v-if="scope.row.workhours!=0">
                  <p>{{scope.row.workhours}}</p>
                </template>
              </el-table-column>
              <el-table-column width="130" label="科研技术基础工作" prop="tpworkhours">
                <template slot-scope="scope" v-if="scope.row.tpworkhours!=0">
                  <p>{{scope.row.tpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column width="130" label="管理、服务及其他" prop="mpworkhours">
                <template slot-scope="scope" v-if="scope.row.mpworkhours!=0">
                  <p>{{scope.row.mpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column width="100" label="小计" prop="totals1">
              </el-table-column>
            </el-table-column>

            <el-table-column label="出差时间">
              <el-table-column label="工程项目">
                <el-table-column prop="inworkhours" label="市内出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.inworkhours!=0">
                    <p>{{scope.row.inworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="outworkhours" label="市外出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.outworkhours!=0">
                    <p>{{scope.row.outworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="eptotal1" label="小计" width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column label="科研技术基础工作">
                <el-table-column prop="intpworkhours" label="市内出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.intpworkhours!=0">
                    <p>{{scope.row.intpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="outtpworkhours" label="市外出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.outtpworkhours!=0">
                    <p>{{scope.row.outtpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="eptotal2" label="小计" width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column label="管理、服务及其他">
                <el-table-column prop="inmpworkhours" label="市内出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.inmpworkhours!=0">
                    <p>{{scope.row.inmpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="outmpworkhours" label="市外出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.outmpworkhours!=0">
                    <p>{{scope.row.outmpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="eptotal3" label="小计" width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="totals2" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="休假时间">
              <el-table-column label="工程项目">
                <el-table-column prop="inleaveworkhours" label="市内出差" width="100">
                </el-table-column>
                <el-table-column prop="outleaveworkhours" label="市外出差" width="100">
                </el-table-column>
                <el-table-column prop="offleaveworkhours" label="办公大楼" width="100">
                </el-table-column>
                <el-table-column prop="tptotal1" label="小计" width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column label="科研技术基础工作">
                <el-table-column prop="intpleaveworkhours" label="市内出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.intpworkhours!=0">
                    <p>{{scope.row.intpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="outptleaveworkhours" label="市外出差" width="100">
                </el-table-column>
                <el-table-column prop="offtpleaveworkhours" label="办公大楼" width="100">
                  <template slot-scope="scope" v-if="scope.row.outtpworkhours!=0">
                    <p>{{scope.row.outtpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="tptotal2" label="小计" width="100">
                </el-table-column>
              </el-table-column>
              <el-table-column label="管理、服务及其他">
                <el-table-column prop="inmpleaveworkhours" label="市内出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.inmpworkhours!=0">
                    <p>{{scope.row.inmpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="oumptleaveworkhours" label="市外出差" width="100">
                  <template slot-scope="scope" v-if="scope.row.outmpworkhours!=0">
                    <p>{{scope.row.outmpworkhours}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="offmpleaveworkhours" label="办公大楼" width="100">
                </el-table-column>
                <el-table-column prop="tptotal3" label="小计" width="100">

                </el-table-column>
              </el-table-column>
              <el-table-column prop="totals3" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="alltotal" label="合计" width="150"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :current-page="mxcx.currentPage"
                :page-size="mxcx.pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="人员视角" name="1">
        <topStatistics :otherTop="7"></topStatistics>
        <!--  人员视角表格-->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="150"></el-table-column>
          <el-table-column prop="employee.name" label="姓名" width="150"></el-table-column>

          <!-- 上班时间 -->
          <el-table-column label="上班时间">
            <el-table-column width="100" label="工程项目" prop="workhours">
              <template slot-scope="scope" v-if="scope.row.workhours!=0">
                <p>{{scope.row.workhours}}</p>
              </template>
            </el-table-column>
            <el-table-column width="100" label="科研技术基础工作" prop="tpworkhours">
              <template slot-scope="scope" v-if="scope.row.tpworkhours!=0">
                <p>{{scope.row.tpworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column width="100" label="管理、服务及其他" prop="mpworkhours">
              <template slot-scope="scope" v-if="scope.row.mpworkhours!=0">
                <p>{{scope.row.mpworkhours}}</p>
              </template>
            </el-table-column>
            <el-table-column width="100" label="小计" prop="totals1">
            </el-table-column>
          </el-table-column>

          <el-table-column label="出差时间">
            <el-table-column label="工程项目">
              <el-table-column prop="inworkhours" label="市内出差" width="100">
                <template slot-scope="scope" v-if="scope.row.inworkhours!=0">
                  <p>{{scope.row.inworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="outworkhours" label="市外出差" width="100">
                <template slot-scope="scope" v-if="scope.row.outworkhours!=0">
                  <p>{{scope.row.outworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="eptotal1" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="科研技术基础工作">
              <el-table-column prop="intpworkhours" label="市内出差" width="100">
                <template slot-scope="scope" v-if="scope.row.intpworkhours!=0">
                  <p>{{scope.row.intpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="outtpworkhours" label="市外出差" width="100">
                <template slot-scope="scope" v-if="scope.row.outtpworkhours!=0">
                  <p>{{scope.row.outtpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="eptotal2" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="管理、服务及其他">
              <el-table-column prop="inmpworkhours" label="市内出差" width="100">
                <template slot-scope="scope" v-if="scope.row.inmpworkhours!=0">
                  <p>{{scope.row.inmpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="outmpworkhours" label="市外出差" width="100">
                <template slot-scope="scope" v-if="scope.row.outmpworkhours!=0">
                  <p>{{scope.row.outmpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="eptotal3" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="totals2" label="小计" width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column label="休假时间">
            <el-table-column label="工程项目">
              <el-table-column prop="inleaveworkhours" label="市内出差" width="100">
              </el-table-column>
              <el-table-column prop="outleaveworkhours" label="市外出差" width="100">
              </el-table-column>
              <el-table-column prop="offleaveworkhours" label="办公大楼" width="100">
              </el-table-column>
              <el-table-column prop="tptotal1" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="科研技术基础工作">
              <el-table-column prop="intpleaveworkhours" label="市内出差" width="100">
                <template slot-scope="scope" v-if="scope.row.intpworkhours!=0">
                  <p>{{scope.row.intpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="outleaveworkhours" label="市外出差" width="100">
              </el-table-column>
              <el-table-column prop="offleaveworkhours" label="办公大楼" width="100">
                <template slot-scope="scope" v-if="scope.row.outtpworkhours!=0">
                  <p>{{scope.row.outtpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="tptotal2" label="小计" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="管理、服务及其他">
              <el-table-column prop="inmpleaveworkhours" label="市内出差" width="100">
                <template slot-scope="scope" v-if="scope.row.inmpworkhours!=0">
                  <p>{{scope.row.inmpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="oumptleaveworkhours" label="市外出差" width="100">
                <template slot-scope="scope" v-if="scope.row.outmpworkhours!=0">
                  <p>{{scope.row.outmpworkhours}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="offmpleaveworkhours" label="办公大楼" width="100">
              </el-table-column>
              <el-table-column prop="tptotal1" label="小计" width="100">

              </el-table-column>
            </el-table-column>
            <el-table-column prop="totals3" label="小计" width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="alltotal" label="合计" width="150"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :current-page="mxcx.currentPage"
                :page-size="mxcx.pageSizes"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
    tableData: () => import('../../components/tableData.vue'),
    topStatistics: () => import('../../components/topStatistics.vue'),
  },
  data() {
    return {
      total: 0,
      activeName: '0',
      tableData1: [],
      tableData2: [],
      tableDataTr0: [],
      tableDataTr1: [
        {
          name: '部室',
          val: '',
        },
        {
          name: '上班时间（小时）',
          child: [
            {
              name: '工程项目',
              child: [
                {
                  name: '姓名',
                  val: '',
                },
                {
                  name: '打卡',
                  val: '',
                },
                {
                  name: '未打卡',
                  val: '',
                },
              ],
            },
            {
              name: '科研技术基础工作',
              child: [
                {
                  name: '打卡',
                  val: '',
                },
                {
                  name: '未打卡',
                  val: '',
                },
              ],
            },
            {
              name: '管理、服务及其他',
              child: [
                {
                  name: '打卡',
                  val: '',
                },
                {
                  name: '未打卡',
                  val: '',
                },
              ],
            },
          ],
        },
        {
          name: '出差时间（小时）',
          child: [
            {
              name: '工程项目',
              child: [
                {
                  name: '有手续费',
                  val: '',
                },
                {
                  name: '无手续费',
                  val: '',
                },
              ],
            },
            {
              name: '科研技术基础工作',
              child: [
                {
                  name: '有手续费',
                  val: '',
                },
                {
                  name: '无手续费',
                  val: '',
                },
              ],
            },
            {
              name: '管理、服务及其他',
              child: [
                {
                  name: '有手续费',
                  val: '',
                },
                {
                  name: '无手续费',
                  val: '',
                },
              ],
            },
          ],
        },
        {
          name: '休假时间工作（小时）',
          child: [
            {
              name: '工程项目',
              child: [
                {
                  name: '打卡',
                  val: '',
                },
                {
                  name: '未打卡',
                  val: '',
                },
              ],
            },
            {
              name: '科研技术基础工作',
              child: [
                {
                  name: '打卡',
                  val: '',
                },
                {
                  name: '未打卡',
                  val: '',
                },
              ],
            },
            {
              name: '管理、服务及其他',
              child: [
                {
                  name: '打卡',
                  val: '',
                },
                {
                  name: '未打卡',
                  val: '',
                },
              ],
            },
          ],
        },
        {
          name: '合计',
          val: '',
        },
        {
          name: '占比',
          val: '',
        },
      ],
      //上班时间
      workhours:'',
      // 明细查询请求需要的参数
      mxcx: {
        val: '',
        beginDate: '',
        endDate: '',
        ePCode: '',
        ePName: '', // 工程项目名称
        ePArea: '', // 工程项目区域
        ePLanguageArea: '', // 工程项目语言区
        ePLevel: '', // 项目级别
        ePStage: '', // 项目阶段
        employees: [], // 查询的的员工
        ePMangerName: '', // 项目经理
        pageSize: 10,
        currentPage: 1, // 当前页
        workAttribute: 10,
      },
    };
  },
  methods: {
    findAll(satrt,end){
      console.log(satrt,end)
    },
    async tabledataFn(satrt,end,employees) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      let empCode=user.empCode
      this.tableData1=[]
      this.mxcx.beginDate=satrt
      this.mxcx.endDate=end
      let mxcx={
                val: '',
                beginDate: satrt?satrt:this.$main.getMonth('s',0),
                endDate: end?end:this.$main.getMonth('e',0),
                empCode:empCode,
                employees: employees?employees:[
                  {
                    empCode:empCode
                  }
                ], // 查询的的员工
                ePCode: '',
                ePName: '', // 工程项目名称
                ePArea: '', // 工程项目区域
                ePLanguageArea: '', // 工程项目语言区
                ePLevel: '', // 项目级别
                ePStage: '', // 项目阶段
                ePMangerName: '', // 项目经理
                pageSize: this.mxcx.pageSize,
                currentPage:  this.mxcx.currentPage, //当前页
                workAttribute: 10,
              }
      let _this=this
      const param = mxcx;
      let {data} = await this.axios.post(
        '/api/mh/findAllByQueryPageDeptDetail',
        param,
      );
      this.tableData1 = data.data.rows;
      this.total = data.data.total;
      this.tableData1.forEach((item,index) =>{
        //上班时间
        item.workhours=0
        item.tpworkhours=0
        item.mpworkhours=0
        item.totals1=0
         //出差时间
        item.inworkhours=0
        item.outworkhours=0
        item.intpworkhours=0
        item.outtpworkhours=0
        item.inmpworkhours=0
        item.outtpworkhours=0
        item.totals2=0
        item.eptotal1=0 //工程出差小计
        item.eptotal2=0 //科研出差小计
        item.eptotal3=0 //管理服务出差小计
         //请假时间
        item.inleaveworkhours=0
        item.outleaveworkhours=0
        item.offleaveworkhours=0
        item.intpleaveworkhours=0
        item.outptleaveworkhours=0
        item.offtpleaveworkhours=0
        item.inmpleaveworkhours=0
        item.oumptleaveworkhours=0
        item.offmpleaveworkhours=0
        item.totals3=0
        item.tptotal1=0 //请假工程小计
        item.tptotal2=0 //请假科研小计
        item.tptotal3=0 //请假管理服务小计
         //总计
        item.alltotal=0

         if(!item.travelStrat && !item.leaveStart){ //上班时间

           item.mhWorkTimes.forEach((val,index) =>{
             if(val.epname){ //工程
               item.workhours+=val.workhours
             }else if(val.tpname){ //科研
               item.tpworkhours+=val.workhours
             }else if(val.mpworktypename){ //服务
               item.mpworkhours+=val.workhours
             }
           })
           item.totals1=item.workhours+item.tpworkhours+item.mpworkhours
         }else if(item.travelStrat && !item.leaveStart){ //出差时间

           item.mhWorkTimes.forEach((val,index) =>{
             if(val.epname){ //工程项目
               if(val.workspace=='市内出差'){
                 item.inworkhours+=val.workhours
               }else if(val.workspace=='市外出差'){
                 item.outworkhours+=val.workhours
               }
               item.eptotal1=item.inworkhours+ item.outworkhours
             }else if(val.tpname){//科研服务
               if(val.workspace=='市内出差'){
                 item.intpworkhours+=val.workhours
               }else if(val.workspace=='市外出差'){
                 item.outtpworkhours+=val.workhours
               }
               item.eptotal2=item.intpworkhours+ item.outtpworkhours
             }else if(val.mpworktypename){//管理服务
               if(val.workspace=='市内出差'){
                 item.inmpworkhours+=val.workhours
               }else if(val.workspace=='市外出差'){
                 item.outmpworkhours+=val.workhours
               }
               item.eptotal3=item.inmpworkhours+ item.outmpworkhours
             }
           })
           item.totals2=item.inworkhours+item.outworkhours
         }else if(!item.travelStrat && item.leaveStart){ //请假时间

           item.mhWorkTimes.forEach((val,index) =>{
             if(val.epname){ //工程项目
               if(val.workspace=='市内出差'){
                 item.inleaveworkhours+=val.workhours
               }else if(val.workspace=='市外出差'){
                 item.outleaveworkhours+=val.workhours
               }else if(val.workspace=='办公大楼'){
                 item.offleaveworkhours+=val.workhours
               }
               item.tptotal1=item.inleaveworkhours+ item.outleaveworkhours+item.offleaveworkhours
             }else if(val.tpname){ //科研项目
               if(val.workspace=='市内出差'){
                 item.intpleaveworkhours+=val.workhours
               }else if(val.workspace=='市外出差'){
                 item.outptleaveworkhours+=val.workhours
               }else if(val.workspace=='办公大楼'){
                 item.offtpleaveworkhours+=val.workhours
               }
               item.tptotal2=item.intpleaveworkhours+ item.outptleaveworkhours+item.offtpleaveworkhours
             }
             else if(val.mpworktypename){ //管理服务项目
               if(val.workspace=='市内出差'){
                 item.inmpleaveworkhours+=val.workhours
               }else if(val.workspace=='市外出差'){
                 item.oumptleaveworkhours+=val.workhours
               }else if(val.workspace=='办公大楼'){
                 item.offmpleaveworkhours+=val.workhours
               }
               item.tptotal3=item.inmpleaveworkhours+ item.oumptleaveworkhours+item.offmpleaveworkhours
             }
           })
           item.totals3=item.inleaveworkhours+item.outleaveworkhours+item.offleaveworkhours

         }
         item.alltotal=item.totals1+item.totals2+item.totals3
      })
      // this.tableData1.forEach((item,index) =>{
      //
      // })
      console.log(_this.workhours,88);
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
      this.mxcx.pageSize = val;
      this.tabledataFn(this.mxcx.beginDate,this.mxcx.endDate);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.mxcx.currentPage = val;
      this.tabledataFn(this.mxcx.beginDate,this.mxcx.endDate);
      console.log(`当前页: ${val}`);
    },
    handleClick() {
      this.mxcx.currentPage = 1;
      this.tabledataFn(this.mxcx.beginDate,this.mxcx.endDate);
    },
  },
  mounted() {
    this.tabledataFn();
  },
};
</script>
