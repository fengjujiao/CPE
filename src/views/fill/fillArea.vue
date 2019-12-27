<template>
  <div>
    <div class="fillHeardD">
      <p class="mainTitle">员工工作状态填报</p>
      <div class>
        <ul class="baseMsgD">
          <li>
            <div>
              <i>姓名</i>
              <em>{{saveData.employee.name}}</em>
            </div>
            <div>
              <i>职工代码</i>
              <em>{{saveData.employee.empCode}}</em>
            </div>
            <div>
              <i>填报日期</i>
              <em>
                <el-date-picker
                  v-model="saveData.mhDate"
                  type="date"
                  size="mini"
                  :picker-options="pickerOptions"
                  @change="findAoneByempCodeAndDateNow(saveData.mhDate)"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </em>
            </div>
            <div>
              <i>参照日期</i>
              <em>
                <el-date-picker
                  v-model="dateValue"
                  type="date"
                  size="mini"
                  @change="referenceDate"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </em>
            </div>
          </li>
          <li>
            <div>
              <i>打卡时间</i>
              <em>{{checkIn?checkIn +'至'+ checkOut:'无'}}</em>
            </div>
            <div>
              <i>请假时段</i>
              <em>{{saveData.leaveStart?'请假中 ('+Qjday+')':'无'}}</em>
            </div>
            <div>
              <i>出差时段</i>
              <em>{{saveData.travelStrat?CCday:'无'}}</em>
            </div>
            <div></div>
            <!-- <div>
              <i>打卡时长</i>
              <em>{{saveData.totalHour?saveData.totalHour:'无'}}</em>
            </div>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="AreaD flexWrap">
      <div
        class="w400 mrb20"
        @click="elCardIndex = index"
        v-for="(item,index) in saveData.mhWorkTimes"
        :key="index"
      >
        <el-card class="box-card" shadow>
          <div slot="header" class="clearfix wbhc">
            <span>填报项{{index+1}}</span>
            <img
              src="../../assets/img/close.png"
              class="closeImg cuP"
              v-show="index!=0"
              @click="deleteTableData(index)"
              alt
            />
          </div>
          <el-form label-width="90px" class="demo-ruleForm">
            <el-form-item label="工作场景">
              <el-radio-group v-model="item.workspace">
                <el-radio v-for="subItem in item.workspaceArr" :label="subItem.name"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工作属性">
              <el-radio-group @change="workattributeChange(item)" v-model="item.workattributeIndex">
                <el-radio v-for="subItem in item.workattributeArr" :label="subItem.name"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="item.workattributeIndex=='管理、服务及其它'" label="工作名称">
              <el-select v-model="item.name" size="small" placeholder="请选择">
                <el-option
                  v-for="(subItem,index) in item.nameArr"
                  :label="subItem.name"
                  :value="subItem.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="item.workattributeIndex=='工程项目'" label="工程编码">
              <el-input
                v-model="item.workname"
                placeholder="请选择工作名称"
                size="small"
                @focus="workNameFn(item)"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item v-if="item.workattributeIndex=='工程项目'" label="工程名称">
              <el-input
                v-model="item.workdata"
                placeholder="请选择工作名称"
                size="small"
                @focus="workNameFn(item)"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item v-if="item.workattributeIndex=='科研技术基础工作'" label="课题编号">
              <el-input
                v-model="item.workname"
                placeholder="请选择工作名称"
                size="small"
                @focus="workNameFn(item)"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item v-if="item.workattributeIndex=='科研技术基础工作'" label="课题名称">
              <el-input
                v-model="item.workdata"
                placeholder="请选择工作名称"
                size="small"
                @focus="workNameFn(item)"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item v-show="item.workattributeIndex!=='管理、服务及其它'" label="工作阶段">
              <span>{{item.workstage || '无'}}</span>
            </el-form-item>
            <el-form-item v-show="item.workattributeIndex!=='管理、服务及其它'" label="工作岗位">
              <el-radio-group @change="findChildrenById(item.post,item)" v-model="item.post">
                <el-radio
                  v-for="subItem in item.postArr"
                  :label="subItem.id+'-'+subItem.name"
                >{{subItem.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="工作岗位">
              <el-radio-group @change="findChildrenById(item.tppost,item)" v-model="item.tppost">
                <el-radio
                  v-for="subItem in item.postArr"
                  :label="subItem.id+'-'+subItem.name"
                >{{subItem.name}}</el-radio>
              </el-radio-group>
            </el-form-item>-->
            <el-form-item v-show="item.workattributeIndex!=='管理、服务及其它'" label="工作角色">
              <el-select v-model="item.workrole" size="small" placeholder="请选择">
                <el-option
                  v-for="(subItem,index) in item.workroleArr"
                  :label="subItem.name"
                  :value="subItem.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作时长">
              <el-select v-model="item.workhours" size="small" placeholder="请选择">
                <el-option
                  v-for="(subItem,index) in item.workhoursArr"
                  :label="subItem"
                  :value="subItem"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div v-if="elCardIndex == index" class="btnD mt20">
            <el-button type="primary">暂存</el-button>
            <el-button :plain="true" @click="save" type="primary">提交</el-button>
          </div>
        </el-card>
      </div>
      <div class="fillAddD wchc">
        <img src="../../assets/img/fillAdd.png" @click="addTableData()" alt />
      </div>
    </div>

    <!--工作名称弹框-->
    <el-dialog title="工作名称" style="margin-top: -8vh" width="60%" class="h70vh" :visible.sync="dialogTableVisible">
      <!--搜索框-->
      <el-input
        :placeholder="searchPlaceholder[`${tableDataIndex.workattributeIndex}`]"
        v-model="pageParams.key"
        class="input-with-select"
        @change="mhquery"
      >
        <el-button @click="searchFn" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div v-show="tableDataIndex.workattributeIndex == '工程项目'">
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          :data="engineeringData"
          height="350"
          border
          style="width: 100%"
          header-align="center"
          align="center"
        >
          <el-table-column property="pjBranchNum" label="工程编码" width="150"></el-table-column>
          <el-table-column property="pjMarketName" label="工程名称" width="200" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column property="pjStage" label="项目阶段"></el-table-column>
          <el-table-column property="fgsXmjb" label="项目级别"></el-table-column>
          <el-table-column property="pjRunStatus" label="运行状态"></el-table-column>
          <el-table-column property="pjMarketPq" label="片区"></el-table-column>
          <el-table-column property="pjMarketQy" label="语言区"></el-table-column>
          <el-table-column property="pjManagerName" label="项目经理/负责人"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange1"
          :current-page="pageParams.currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div v-show="tableDataIndex.workattributeIndex == '科研技术基础工作'">
        <el-table
          height="350"
          border
          style="width: 100%"
          align="center"
          header-align="center"
          @current-change="handleCurrentChange"
          highlight-current-row
          :data="scientificResearchData"
        >
          <el-table-column property="techcode" label="课题编号" width="150"></el-table-column>
          <el-table-column property="techname" label="课题名称" width="200"></el-table-column>
          <el-table-column property="techstatus" label="项目阶段"></el-table-column>
          <el-table-column property="techtype" label="项目类别"></el-table-column>
          <el-table-column property="techleader" label="项目经理/负责人"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange1"
          :current-page="pageParams.currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="totals"
        ></el-pagination>
      </div>
      <div class="textC mtb20">
        <el-button @click="dialogTableVisible=false" type="primary" size="mini">取消</el-button>
        <el-button @click="worknameCurrentFn" type="primary" size="mini">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    let _that=this
    return {
      checkIn: "", // 打卡开始时间
      checkOut: "", // 打卡结束时间
      Qjday: "", //请假时间
      CCday: "", //出差shij
      getDataByQuery: "", //参照日期
      elCardIndex: 0, // 默认选中填报项
      dateValue: "",
      engineeringData: [], // 工程项目 工作名称 数据
      scientificResearchData: [], // 科研技术基础工作 工作名称 数据
      gridData: [],
      value1: "",
      value2: "",
      dialogTableVisible: false, // 工作名称弹框标识
      searchText: "", // 搜索文字
     pickerOptions: {
  disabledDate(time) {
    let time1=_that.$main.getMonday("s", 0)
    time1 = time1.replace(/-/g,'/')
    var date1 = new Date(time1)
    let _now = Date.now(),
      seven = 7 * 24 * 60 * 60 * 1000,
      sevenDays = _now - seven;
    return  time.getTime() >Date.now()  || time.getTime() < date1;
  }
},
      searchPlaceholder: {
        工程项目: "请输入工程编号或工程名称关键字",
        科研技术基础工作: "请输入课题编号或课题名称关键字",
        "管理、服务及其它": ""
      },
      // 分页参数
      total: 1,
      totals: 1,

      pageParams: {
        currentPage: 1,
        pageSize: 10,
        key: ""
      },

      // 提交数据
      saveData: {
        employee: {
          empCode: "",
          orgCode: null,
          name: "sad"
        },
        mhDate: this.$route.params.date
          ? this.$route.params.date
          : this.$main.showTime("ymd"), //判断填报日历是否传参
        empStatus: 1, // 员工状态
        checkIn: "", // 打卡开始时间
        checkOut: "", // 打卡结束时间
        totalHour: 22, // 合计打卡时间
        leaveStart: null, // 请假开始时间
        leaveEnd: null, // 请假结束时间
        leaveTotalHour: null, // 合计请假时间
        travelStrat: null, // 出差开始时间
        travelEnd: null, // 出差结束时间
        travelTotalHour: null, // 合计出差时间
        createUserCode: null, // 记录者编号

        mhWorkTimes: []
        //  mhDate: this.$main.showTime("ymd"), // 填报日期
        // mhWorkTimes: [], // 工时数据
        // empName:'张三', // 员工姓名
        // empCode:'001', // 员工编号
        // "empStatus": 1, // 员工状态
        // "checkIn": "2019-10-20 10-14-11", // 打卡开始时间
        // "checkOut": "2019-10-21 08-14-31", // 打卡结束时间
        // "totalHour": 22, // 合计打卡时间
        // "leaveStart": null, // 请假开始时间
        // "leaveEnd": null, // 请假结束时间
        // "leaveTotalHour": null, // 合计请假时间
        // "travelStrat": null, // 出差开始时间
        // "travelEnd": null, // 出差结束时间
        // "travelTotalHour": null, // 合计出差时间
        // "createUserCode": null, // 记录者编号
      },
      worknameCurrent: {}, // 当前选择的工作名称
      tableDataIndex: "", // 当前数据
      // 默认数据结构
      tableDataDefault: [
        {
          workspace: "办公室", //工作场景
          workattribute: 3, // 工作属性 id
          workattributename: "管理、服务及其它", // 工作属性 名称
          workhours: 5, // 工时
          workhoursArr: [
            0.5,
            1,
            1.5,
            2,
            2.5,
            3.5,
            4,
            4.5,
            5,
            5.5,
            6,
            6.5,
            7,
            7.5,
            8,
            8.5,
            9
          ],
          workstartTime: "", //工作开始时间
          workendTime: "", //工作结束时间
          // 工程项目

          epid: null, //  id  maketSid
          epcode: null, //  编码  pjBranchNum
          epname: null, // 名称 pjMarketName
          epstage: null, //  阶段 pjStage
          eplevel: null, // 级别 fgsXmjb
          eparea: null, // 片区 pjMarketPq
          eplanguageArea: null, // 语言区 pjMarketQy
          epjobpost: null, // 工作岗位
          epjobrole: null, // 工作角色

          // 科研技术基础工作
          tpid: null, // id
          tpcode: null, // 编码 techcode
          tpname: null, // 名称 techname
          tpstage: null, // 阶段 techstatus
          tppost: null, // 工作岗位
          tpmajorrole: null, // 工作角色
          // 管理、服务及其它
          mpworktype: null, //
          mpworktypename: null, //

          workspaceArr: [
            { name: "办公大楼" },
            { name: "市内出差" },
            { name: "市外出差" }
          ],
          workattribute: "工程项目", // 工作属性
          workattributeIndex: "", //
          workattributeArr: [
            { name: "工程项目" },
            { name: "科研技术基础工作" },
            { name: "管理、服务及其它" }
          ],
          workstage: "", // 工作阶段
          workstageIndex: "", // 工作阶段
          workstageArr: {
            0: "阶段1",
            1: "阶段2",
            2: "阶段3"
          },
          epjobpost: "", // 工作岗位 工程
          postArr: [
            { name: "设计工作" },
            { name: "管理工作" },
            { name: "SP工作" }
          ],
          tppost: "", // 工作岗位 科研
          postArr: [
            { name: "设计工作" },
            { name: "管理工作" },
            { name: "SP工作" }
          ],
          workrole: "", // 工作角色
          workroleArr: [
            { name: "角色1" },
            { name: "角色2" },
            { name: "角色3" }
          ],
          name: "",
          nameArr: [{ name: "工作1" }, { name: "工作2" }, { name: "工作3" }]
        }
      ]
    };
  },

  computed: {
    timeDefault() {
      var date = new Date();
      var s1 =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        (date.getDate() - 1);
      return s1;
    }
  },
  methods: {
    // todo 查询工作名称  工程项目
    async engineeringFindAll() {
      let { data } = await this.axios.post(
        "/api/engineering/findAll",
        this.pageParams
      );
      // console.log(data.rows)
      this.engineeringData = data.rows;
      this.total = data.total;
    },

    // todo 查询工作名称 科研技术基础工作
    async scientificResearchFindAll() {
      let { data } = await this.axios.post(
        "/api/scientificResearch/findAll",
        this.pageParams
      );
      this.scientificResearchData = data.rows;
      this.totals = data.total;
    },
    // 打卡时段 查询
    async checkTimeGetDataByQuery() {
      // eslint-disable-next-line no-unused-vars
      const user = JSON.parse(sessionStorage.getItem('user'));
      const pageParams1 = {
        // empCode: '20957',
        // loginName: 'liuyaqi',
        // checkTime: '2019-12-19 00:00:00.000',
        empCode: this.saveData.employee.empCode,
        loginName: user.loginName,
        checkTime: `${this.saveData.mhDate} 00:00:00.000`,
      };

      const { data } = await this.axios.post(
        '/api/checkTime/getDataByQuery',
        pageParams1,
      );
      if(data.data!=null){
      const satrt = data.data.satrt.split(' ');
      const end = data.data.end.split(' ');
      // eslint-disable-next-line prefer-destructuring
      this.saveData.checkIn = data.data.satrt;
      this.checkIn = satrt[1];
      // eslint-disable-next-line prefer-destructuring
      this.saveData.checkOut = data.data.end
      this.checkOut = end[1]
      }else{
        this.saveData.checkIn=null
      }
    },
    // 出差时段 查询
    async travelGetDataByQuery() {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const pageParams1 = {
        empCode: this.saveData.employee.empCode,
        leaveDate: this.saveData.mhDate,
        loginName: user.loginName,
      };
      const { data } = await this.axios.post(
        '/api/travel/getDataByQuery',
        pageParams1,
      );

      if (data.data !== null) {
        this.saveData.travelStrat = data.data.travelActualStartTime;
        this.saveData.travelEnd = data.data.travelActualEndTime;
        let ccday = this.$main.timeDifference(
          data.data.travelActualStartTime,
          data.data.travelActualEndTime,
          'dh',
        );
        if (ccday == "0天 00小时") {
          this.CCday = "无";
        } else {
          this.CCday = "出差中 (" + ccday + ")";
        }
      }else{
        this.saveData.travelStrat=null
      }
    },
    // 请假时段 查询
    async leaveGetDataByQuery() {
      let pageParams1 = {
        empCode: this.saveData.employee.empCode,
        leaveDate: this.saveData.mhDate
      };
      let { data } = await this.axios.post(
        "/api/leave/getDataByQuery",
        pageParams1
      );
      //console.log(data.data,11111111111);
      if (data.data !== null) {
        this.saveData.leaveStart = data.data.leaveScheduleStartTime;
        this.saveData.leaveEnd = data.data.leaveScheduleEndTime;
        let qjday = this.$main.timeDifference(
          data.data.leaveScheduleStartTime,
          data.data.leaveScheduleEndTime,
          "dh"
        );
        this.Qjday = qjday;
      }else{
        this.saveData.leaveStart=null
      }
    },

    //当前页
    handleCurrentChange1(val) {
      this.pageParams.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.engineeringFindAll();
      this.scientificResearchFindAll();
    },
    // todo 工作属性切换-清空关联信息
    workattributeChange(item) {
      //  console.log(item,8899);
      if (item.workattributeIndex == "工程项目") {
        //置空科研技术
        item.tpcode = null;
        item.tpmajorrole = null;
        item.tpid = null;
        item.tpname = null;
        item.tpcode = null;
        item.tppost = null;
        item.tpstage = null;
        //  置空管理服务
        item.mpworktypename = null;
        item.mpworktype = null;
        item.mhid = null;
        item.workdata = null;
      } else if (item.workattributeIndex == "科研技术基础工作") {
        //  置空工程项目
        item.eparea = null;
        item.epcode = null;
        item.epid = null;
        item.epjobpost = null;
        item.epjobrole = null;
        item.eplanguageArea = null;
        item.eplevel = null;
        item.epname = null;
        item.epstage = null;
        //  置空管理服务
        item.mpworktypename = null;
        item.mpworktype = null;
        item.mhid = null;
        item.workdata = null;
      } else if (item.workattributeIndex == "管理、服务及其它") {
        //  置空工程项目
        item.eparea = null;
        item.epcode = null;
        item.epid = null;
        item.epjobpost = null;
        item.epjobrole = null;
        item.eplanguageArea = null;
        item.eplevel = null;
        item.epname = null;
        item.epstage = null;
        //置空科研技术
        item.tpcode = null;
        item.tpmajorrole = null;
        item.tpid = null;
        item.tpname = null;
        item.tpcode = null;
        item.tppost = null;
        item.tpstage = null;
        item.workdata = null;
      }
      item.workname = "";
      item.workstage = "";
      let _item = JSON.parse(JSON.stringify(item));
      this.tableDataIndex = _item;
      this.getPostArrgl();
    },
    // todo 选择工作名称弹窗
    workNameFn(item) {
      console.log(item, 77);
      //  console.log(item.workattributeIndex)

      //   this.dialogTableVisible = true;
      //   this.tableDataIndex = item;
      //   this.engineeringFindAll();
      //   this.scientificResearchFindAll();
      if (item.workattributeIndex == "管理、服务及其它") {
        this.dialogTableVisible = false;
      } else {
        this.dialogTableVisible = true;
        this.tableDataIndex = item;
        this.engineeringFindAll();
        this.scientificResearchFindAll();
      }
    },
    // todo 添加填报项
    addTableData() {
      let val = JSON.parse(JSON.stringify(this.tableDataDefault[0]));
      this.saveData.mhWorkTimes.push(val);
    },
    // todo 删除填报项
    deleteTableData(index) {
      this.saveData.mhWorkTimes.splice(index, 1);
    },
    // todo 提交填报数据
    async save() {
      let _this = this;

      let postTest = {
        工程项目: {
          epjobpost: "post", // 工作岗位
          epjobrole: "workrole" // 工作角色
        },
        科研技术基础工作: {
          tppost: "post", // 工作岗位
          tpmajorrole: "workrole" // 工作角色
        },
        "管理、服务及其它": {
          mpworktype: "workattributeIndex", //
          mpworktypename: "name" //
        }
      };

      let text = {
        工程项目: {
          epid: "maketSid", //  id  maketSid
          epcode: "pjBranchNum", //  编码  pjBranchNum
          epname: "pjMarketName", // 名称 pjMarketName
          epstage: "pjStage", //  阶段 pjStage
          eplevel: "fgsXmjb", // 级别 fgsXmjb
          eparea: "pjMarketPq", // 片区 pjMarketPq
          eplanguageArea: "pjMarketQy", // 语言区 pjMarketQy
          ePMangerName: "pjManagerName"
        },
        科研技术基础工作: {
          tpid: "id", // id
          tpcode: "techcode", // 编码 techcode
          tpname: "techname", // 名称 techname
          tpstage: "techstatus", // 阶段 techstatus
          tPLeaderName: "techleader",
          tPMasterDept: "techorg",
          tPTeachType: "techtype"
        }
      };

      _this.saveData.mhWorkTimes.forEach(item => {
        // 清空id
        item.id = null;
        item.mhid = null;
        // 工作属性 字段转换
        let _workattribute = item.workattributeArr.find(val => {
          return val.name == item.workattributeIndex;
        });
        item.workattribute = _workattribute.id;
        item.workattributename = _workattribute.name;
        // 工作属性 对应字段
        let _worknameCurrentText = text[`${item.workattributename}`];
        if (item.worknameCurrent) {
          for (let key in _worknameCurrentText) {
            let _key = _worknameCurrentText[key];
            item[key] = item.worknameCurrent[_key];
          }
        }

        // 工作岗位/角色 对应字段
        let _postTest = postTest[`${item.workattributename}`];
        if (_postTest) {
          for (let key in _postTest) {
            let _key = _postTest[key];
            item[key] = _key == "post" ? item[_key].split("-")[1] : item[_key];
          }
        }
        item.workstartTime = item.workstartTime
          ? this.saveData.mhDate + " " + item.workstartTime
          : "";
        item.workendTime = item.workendTime
          ? this.saveData.mhDate + " " + item.workendTime
          : "";
      });
      // return
      let { data } = await this.axios.post("/api/mh/save", _this.saveData);
      if (data.code == 0) {
        // this.$message({
        //   message: '提交成功',
        //   type: 'success'
        // });
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.$router.go(0);
      } else {
        this.$message.error("提交失败");
      }
      console.log(this.saveData.mhWorkTimes[0], "this.saveData");
      // return
      // let { data } = await this.axios.post("/api/mh/save", param);
    },
    // todo 搜索方法
    //实时查询
    mhquery() {
      this.engineeringFindAll();
      this.scientificResearchFindAll();
    },
    searchFn() {
      console.log("777");
      let returnFn = {
        工程项目: "engineeringFindAll",
        科研技术基础工作: "scientificResearchFindAll",
        "管理、服务及其它": ""
      };
      let key = returnFn[this.tableDataIndex.workattributeIndex];
      this[key]();
      this.engineeringFindAll();
      this.scientificResearchFindAll();
    },

    // todo 查询工作场景
    async dictionary() {
      let params = {
        typeCode: "WorkSpace"
      };
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {
        params: params
      });
      this.tableDataDefault[0].workspaceArr = data;
    },
    // todo 查询工作属性
    async getWorkattribute() {
      let params = {
        typeCode: "WorkAttribute"
      };
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {
        params: params
      });
      this.tableDataDefault[0].workattributeArr = data;
    },
    // todo 查询工作岗位
    async getPostArr() {
      let params = {
        typeCode: "WorkPost" // workName - 查询工作名称  管理、服务及其它
      };
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {
        params: params
      });
      this.tableDataDefault[0].postArr = data;
    },
    // todo 管理、服务及其它
    async getPostArrgl() {
      let params = {
        typeCode: "workName" // workName - 查询工作名称  管理、服务及其它
      };
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {
        params: params
      });
      console.log(data);
      this.tableDataDefault[0].nameArr = data;
    },
    // todo 查询工作角色 根据 工作岗位
    async findChildrenById(val, item) {
      item.workrole = "";
      if (!val) {
        return;
      }
      let params = {
        id: val.split("-")[0]
      };
      let { data } = await this.axios.get("/api/dictionary/findChildrenById", {
        params: params
      });
      item.workroleArr = [];
      item.workroleArr = data;
      // console.log(item.workroleArr,99)
    },
    // todo 确定选择工作名称
    worknameCurrentFn() {
      this.dialogTableVisible = false;
      let _worknameCurrent = JSON.parse(JSON.stringify(this.worknameCurrent));
      console.log(_worknameCurrent, 88);
      // console.log(_worknameCurrent,2)
      this.tableDataIndex.worknameCurrent = JSON.parse(
        JSON.stringify(this.worknameCurrent)
      );

      this.tableDataIndex.workdata =
        _worknameCurrent.pjMarketName || _worknameCurrent.techname;

      this.tableDataIndex.workname =
        _worknameCurrent.pjBranchNum || _worknameCurrent.techcode;
      this.tableDataIndex.workstage =
        _worknameCurrent.pjStage || _worknameCurrent.techstatus;

      console.log(this.tableDataIndex, 775);
    },
    handleCurrentChange(val) {
      this.worknameCurrent = val;
      // console.log(this.worknameCurrent)
    },
    //参照时间
    async findAoneByempCodeAndDate(dateValue) {
      let { data } = await this.axios.get("/api/mh/findAoneByempCodeAndDate", {
        params: {
          empCode: this.saveData.employee.empCode, //this.saveData.employee.empCode,
          referenceDate: dateValue || this.dateValue //this.dateValue
        }
      });
      if (!data.data) {
        this.saveData.mhWorkTimes = JSON.parse(
          JSON.stringify(this.tableDataDefault)
        );
        return;
      }

      // workspaceArr workattributeArr workstageArr postArr workroleArr nameArr
      let _tableDataDefault = this.tableDataDefault[0];
      let _mhWorkTimes = data.data.mhWorkTimes;
      _mhWorkTimes.forEach(item => {
        item.workdata = item.epname || item.tpname;
        item.workspaceArr = _tableDataDefault.workspaceArr;
        item.workattributeArr = _tableDataDefault.workattributeArr;
        item.postArr = _tableDataDefault.postArr;
        item.workroleArr = _tableDataDefault.workroleArr;
        item.workhoursArr = _tableDataDefault.workhoursArr;
        item.nameArr = _tableDataDefault.nameArr;
        // item.post =
        // epjobpost tppost
        let _epjobpost = item.postArr.find(val => {
          return val.name == item.epjobpost;
        });

        let _tppost = item.postArr.find(val => {
          return val.name == item.tppost;
        });
        if (_epjobpost) {
          item.post = _epjobpost.id + "-" + _epjobpost.name;
        } else if (_tppost) {
          item.post = _tppost.id + "-" + _tppost.name;
        }
        this.findChildrenById(item.post, item);
        item.name = item.mpworktypename;
        item.workrole = item.epjobrole || item.tpmajorrole;
        item.workattributeIndex = item.workattributename;
        // item.name =
        item.workname = item.epcode || item.tpcode;
        item.workstage = item.epstage || item.tpstage;
      });

      this.saveData.mhWorkTimes = data.data.mhWorkTimes;
      return data.data;
      console.log(this.saveData.mhWorkTimes, 9);
    },
    referenceDate() {
      this.findAoneByempCodeAndDate();
    },
    // todo 填报回显
    findAoneByempCodeAndDateNow(mhDate) {
      this.travelGetDataByQuery();
      this.leaveGetDataByQuery();
      this.checkTimeGetDataByQuery();
      this.findAoneByempCodeAndDate(mhDate).then(reg => {
        this.saveData.id = null;
        if (reg) {
          this.saveData.id = reg.id;
        }
      });
    }
  },
  mounted() {
    /*this.saveData.mhWorkTimes = JSON.parse(
      JSON.stringify(this.tableDataDefault)
    );
    return*/
    const user = JSON.parse(sessionStorage.getItem("user")) || {};
    this.saveData.employee.name = user.name;
    this.saveData.employee.empCode = user.empCode;
    this.dateValue = this.timeDefault;

    // 查询当天的填报记录
    // this.findAoneByempCodeAndDate(this.saveData.mhDate)
    // this.findAoneByempCodeAndDate(this.saveData.mhDate).then(reg=>{
    //   if (reg){
    //     this.saveData.id = reg.id
    //   }
    // })

    this.dictionary().then(() => {
      this.getWorkattribute().then(() => {
        this.getPostArr().then(() => {
          // 设置页面默认状态
          let _tableDataDefault = this.tableDataDefault[0];
          _tableDataDefault.workspace = _tableDataDefault.workspaceArr[0].name;
          _tableDataDefault.workattributeIndex =
            _tableDataDefault.workattributeArr[0].name;
          _tableDataDefault.post =
            _tableDataDefault.postArr[0].id +
            "-" +
            _tableDataDefault.postArr[0].name;
          this.findChildrenById(_tableDataDefault.post, _tableDataDefault).then(
            () => {
              this.saveData.mhWorkTimes = JSON.parse(
                JSON.stringify(this.tableDataDefault)
              );
            }
          );
          this.getPostArrgl(_tableDataDefault.post, _tableDataDefault).then(
            () => {
              this.saveData.mhWorkTimes = JSON.parse(
                JSON.stringify(this.tableDataDefault)
              );
            }
          );
          // this.travelGetDataByQuery();
          // this.leaveGetDataByQuery();
          // this.checkTimeGetDataByQuery();
          // 查询当天的填报记录
          this.findAoneByempCodeAndDateNow(this.saveData.mhDate);
        });
      });
    });
  }
};
</script>
<style scoped>
.gzsj {
  display: flex;
}
.gzsj .el-time-select {
  width: 60px;
  height: 32px;
}
</style>
