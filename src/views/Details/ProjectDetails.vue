<template>
  <div>
    <p class="mainTitle">工程项目工作状态明细</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="明细查询" name="0">
        <topStatistics></topStatistics>
        <div style="margin:0 0 20px">
          <div class="seniorboxTOP">
            <p>高级查询</p>
            <p class="seniorBtn" @click="seniorBtn">{{seniorBtnz}}</p>
          </div>
          <div v-show="flge" class="seniorbox">
            <el-row :gutter="10" style="margin:0px 0 10px 0">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">工程编号：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePCode"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">工程名称：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePName"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePArea"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">语言区：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePLanguageArea"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="margin:0px 0 10px 0">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目级别：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePLevel"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目阶段：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePStage"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目经理：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePMangerName"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
<!--            <el-button size="mini" type="primary" @click="Detailfunc">查询</el-button>-->
          </div>
        </div>
        <!-- 明细查询表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="mhDate" label="填报日期" width="120"></el-table-column>
          <el-table-column prop="procode" label="工程编号" width="100">
          </el-table-column>
          <el-table-column prop="proname" label="工程名称" width="100"></el-table-column>
          <el-table-column prop="epstage" label="项目阶段" width="100"></el-table-column>
          <el-table-column prop="EPArea" label="片区" width="100"></el-table-column>
          <el-table-column prop="EPLanguageArea" label="语言区" width="100"></el-table-column>
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
            <el-table-column prop="eptotal1" label="小计" width="84">
            </el-table-column>
          </el-table-column>
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
            <el-table-column prop="tptotal1" label="小计" width="84">
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
            <el-row :gutter="10" style="margin:0px 0 10px 0">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">工程编号：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePCode"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">工程名称：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePName"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePArea"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">语言区：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePLanguageArea"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="margin:0px 0 10px 0">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目级别：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePLevel"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目阶段：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePStage"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目经理：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePMangerName"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </div>
        <!-- 人员视角表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="procode" label="工程编号" width="100">
          </el-table-column>
          <el-table-column prop="proname" label="工程名称" width="100"></el-table-column>
          <el-table-column prop="epstage" label="项目阶段" width="100"></el-table-column>
          <el-table-column prop="EPArea" label="片区" width="100"></el-table-column>
          <el-table-column prop="EPLanguageArea" label="语言区" width="100"></el-table-column>
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
            <el-table-column prop="eptotal1" label="小计" width="84">
            </el-table-column>
          </el-table-column>
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
            <el-table-column prop="eptotal1" label="小计" width="84">
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
            <el-row :gutter="10" style="margin:0px 0 10px 0">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">工程编号：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePCode"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">工程名称：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePName"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePArea"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">语言区：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePLanguageArea"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="margin:0px 0 10px 0">
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目级别：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePLevel"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目阶段：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePStage"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="display:flex">
                  <p style="lineHeight: 40px">项目经理：</p>
                  <el-input
                    style="width: 200px"
                    placeholder="请输入内容"
                    v-model="condition.ePMangerName"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </div>
        <!-- 项目视角表格 -->
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部室" width="100"></el-table-column>
          <el-table-column prop="procode" label="工程编号" width="100">
          </el-table-column>
          <el-table-column prop="proname" label="工程名称" width="100"></el-table-column>
          <el-table-column prop="employee.name" label="员工" width="100"></el-table-column>
          <el-table-column prop="epstage" label="项目阶段" width="100"></el-table-column>
          <el-table-column prop="EPArea" label="片区" width="100"></el-table-column>
          <el-table-column prop="EPLanguageArea" label="语言区" width="100"></el-table-column>
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
            <el-table-column prop="eptotal1" label="小计" width="84">
            </el-table-column>
          </el-table-column>
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
            <el-table-column prop="eptotal1" label="小计" width="84">
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
      total: 0,
      activeName: "0",
      tableDataTr0: [
        {
          name: "部室",
          val: ""
        },
        {
          name: "姓名",
          val: ""
        },
        {
          name: "填报日期",
          val: ""
        },
        {
          name: "工程编号",
          val: ""
        },
        {
          name: "工程名称",
          val: ""
        },
        {
          name: "项目阶段",
          val: ""
        },
        {
          name: "片区",
          val: ""
        },
        {
          name: "语言区",
          val: ""
        },
        {
          name: "上班时间（小时）",
          child: [
            {
              name: "打卡",
              val: ""
            },
            {
              name: "未打卡",
              val: ""
            }
          ]
        },
        {
          name: "出差时间（小时）",
          child: [
            {
              name: "有手续费",
              val: ""
            },
            {
              name: "无手续费",
              val: ""
            }
          ]
        },
        {
          name: "休假时间工作（小时）",
          child: [
            {
              name: "打卡",
              val: ""
            },
            {
              name: "未打卡",
              val: ""
            }
          ]
        },
        {
          name: "合计",
          val: ""
        }
      ],
      tableDataTr1: [
        {
          name: "部室",
          val: ""
        },
        {
          name: "姓名",
          val: ""
        },
        {
          name: "工程编号",
          val: ""
        },
        {
          name: "工程名称",
          val: ""
        },
        {
          name: "项目阶段",
          val: ""
        },
        {
          name: "片区",
          val: ""
        },
        {
          name: "语言区",
          val: ""
        },
        {
          name: "上班时间（小时）",
          child: [
            {
              name: "打卡",
              val: ""
            },
            {
              name: "未打卡",
              val: ""
            }
          ]
        },
        {
          name: "出差时间（小时）",
          child: [
            {
              name: "有手续费",
              val: ""
            },
            {
              name: "无手续费",
              val: ""
            }
          ]
        },
        {
          name: "休假时间工作（小时）",
          child: [
            {
              name: "打卡",
              val: ""
            },
            {
              name: "未打卡",
              val: ""
            }
          ]
        },
        {
          name: "合计",
          val: ""
        }
      ],
      tableDataTr2: [
        {
          name: "部室",
          val: ""
        },
        {
          name: "工程编号",
          val: ""
        },
        {
          name: "工程名称",
          val: ""
        },
        {
          name: "姓名",
          val: ""
        },
        {
          name: "项目阶段",
          val: ""
        },
        {
          name: "片区",
          val: ""
        },
        {
          name: "语言区",
          val: ""
        },
        {
          name: "上班时间（小时）",
          child: [
            {
              name: "打卡",
              val: ""
            },
            {
              name: "未打卡",
              val: ""
            }
          ]
        },
        {
          name: "出差时间（小时）",
          child: [
            {
              name: "有手续费",
              val: ""
            },
            {
              name: "无手续费",
              val: ""
            }
          ]
        },
        {
          name: "休假时间工作（小时）",
          child: [
            {
              name: "打卡",
              val: ""
            },
            {
              name: "未打卡",
              val: ""
            }
          ]
        },
        {
          name: "合计",
          val: ""
        }
      ],
      tableData1: [],
      //请求条件
      total: 0,
      condition: {
        val: "",
        beginDate: "",
        endDate: "",
        ePCode: "",
        employees: [], //筛选员工的工号
        ePName: "", //工程项目名称
        ePArea: "", //工程项目区域
        ePLanguageArea: "", //工程项目语言区
        ePLevel: "", //项目级别
        ePStage: "", //项目阶段
        ePMangerName: "", //项目经理
        pageSize: 10,
        currentPage: 1, //当前页
        workAttribute: 10
      },
      proname:''
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
      let condition= {
        val: "",
        beginDate: satrt?satrt:this.$main.getMonth('s',0),
        endDate: end?end:this.$main.getMonth('e',0),
        empCode:empCode,
        employees: employees?employees:[
          {
            empCode:empCode
          }
        ], // 查询的的员工
        ePCode: this.condition.ePCode,
        ePName: this.condition.ePName, //工程项目名称
        ePArea: this.condition.ePArea, //工程项目区域
        ePLanguageArea: this.condition.ePLanguageArea, //工程项目语言区
        ePLevel: this.condition.ePLevel, //项目级别
        ePStage: this.condition.ePStage, //项目阶段
        ePMangerName: this.condition.ePMangerName, //项目经理
        pageSize: this.condition.pageSize,
        currentPage:  this.condition.currentPage, //当前页
        // workAttribute: 10
      }
      let param = condition;
      let { data } = await this.axios.post(
        "/api/mh/findAllByQueryEngineeringPageDetail",
        param
      );
      this.tableData1 = data.rows;
      this.total = data.total;
      this.tableData1.forEach((item,index) =>{
        //上班
        item.workhours=0
        item.totals=0
        //出差
        item.inworkhours=0
        item.outworkhours=0
        //请假
        item.inleaveworkhours=0
        item.outleaveworkhours=0
        item.offleaveworkhours=0

        item.eptotal1=0 //工程出差小计

        item.tptotal1=0 //请假工程小计
        //总计
        item.alltotal=0
       if(item.mhWorkTimes.length!=0){
         item.procode=item.mhWorkTimes[0].epcode
         item.proname=item.mhWorkTimes[0].epname
         item.epstage=item.mhWorkTimes[0].epstage
         item.EPArea=item.mhWorkTimes[0].eparea
         item.EPLanguageArea=item.mhWorkTimes[0].eplanguageArea
       }
        if(!item.travelStrat && !item.leaveStart){ //上班时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.epname){ //工程
              item.workhours+=val.workhours
            }
          })
        }else if(item.travelStrat && !item.leaveStart){ //出差时间
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.epname){ //工程项目
              if(val.workspace=='市内出差'){
                item.inworkhours+=val.workhours
              }else if(val.workspace=='市外出差'){
                item.outworkhours+=val.workhours
              }
            }
          })
          item.eptotal1=item.inworkhours+ item.outworkhours
        }else if(!item.travelStrat && item.leaveStart){ //请假
          item.mhWorkTimes.forEach((val,index) =>{
            if(val.epname){ //工程项目
              if(val.workspace=='市内出差'){
                item.inleaveworkhours+=val.workhours
              }else if(val.workspace=='市外出差'){
                item.outleaveworkhours+=val.workhours
              }else if(val.workspace=='办公大楼'){
                item.offleaveworkhours+=val.workhours
              }
            }
          })
          item.tptotal1=item.inleaveworkhours+item.outleaveworkhours+item.offleaveworkhours
        }
        item.alltotal=item.workhours+item.eptotal1+item.tptotal1
      })
      console.log(this.tableData1,99)
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
            date:item.mhDate,
            epCode:item.procode,
            epName:item.proname,
            epStage:item.epstage,
            area:item.EPArea,
            languageArea:item.EPLanguageArea,
            workTime:item.workhours,
            travel_in:item.inworkhours,
            travel_out:item.outworkhours,
            travel_total:item.eptotal1,
            holiday_office:item.offleaveworkhours,
            holiday_in:item.inleaveworkhours,
            holiday_out:item.outleaveworkhours,
            holiday_total:item.tptotal1,
            total:item.alltotal
          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/engineeringMX',
          fileName: '工程项目工作状态明细查询',
          data:pageParams
        }
      }else if(this.activeName==1){
        this.tableData1.forEach((item, index) => {
          let mypageParams = {
            id:index + 1,
            deptName:item.deptName,
            empName:item.employee.name,
            epCode:item.procode,
            epName:item.proname,
            epStage:item.epstage,
            area:item.EPArea,
            languageArea:item.EPLanguageArea,
            workTime:item.workhours,
            travel_in:item.inworkhours,
            travel_out:item.outworkhours,
            travel_total:item.eptotal1,
            holiday_office:item.offleaveworkhours,
            holiday_in:item.inleaveworkhours,
            holiday_out:item.outleaveworkhours,
            holiday_total:item.tptotal1,
            total:item.alltotal
          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/engineeringMXrenyuan',
          fileName: '工程项目工作状态人员视角',
          data:pageParams
        }
      }else if(this.activeName==2){
        this.tableData1.forEach((item, index) => {
          let mypageParams = {
            id:index + 1,
            deptName:item.deptName,
            epCode:item.procode,
            epName:item.proname,
            empName:item.employee.name,
            epStage:item.epstage,
            area:item.EPArea,
            languageArea:item.EPLanguageArea,
            workTime:item.workhours,
            travel_in:item.inworkhours,
            travel_out:item.outworkhours,
            travel_total:item.eptotal1,
            holiday_office:item.offleaveworkhours,
            holiday_in:item.inleaveworkhours,
            holiday_out:item.outleaveworkhours,
            holiday_total:item.tptotal1,
            total:item.alltotal
          };
          pageParams.push(mypageParams);
        });
        datas = {
          method: 'post',
          url:'/api/easypoi/engineeringMXxiangmu',
          fileName: '工程项目工作状态项目视角',
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
      console.log(`当前页: ${val}`);
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
