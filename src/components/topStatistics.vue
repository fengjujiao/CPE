<template>
  <div class="AreaD topStcsD">
    <div v-if="otherTop == 1">
      <i>项目名称</i>
      全部
      <i style="color:#d00" class="el-icon-circle-plus-outline" @click="chaProject"></i>
    </div>
    <div v-else-if="otherTop == 2">
      <i>区域</i>
      全部
      <i style="color:#d00" class="el-icon-circle-plus-outline" @click="chaxunArea"></i>
    </div>
    <div v-else-if="otherTop == 3">
      <i>专业名称</i>
      全部
      <i style="color:#d00" class="el-icon-circle-plus-outline" @click="chaxunMajor"></i>
    </div>
    <div v-else-if="otherTop == 4">
      <i>科室名称</i>
      全部
      <i style="color:#d00" class="el-icon-circle-plus-outline" @click="chaxunAdmin"></i>
    </div>
    <div v-else-if="otherTop == 5">
      <i>课题名称</i>
      全部
      <i style="color:#d00" class="el-icon-circle-plus-outline" @click="chaxunTask"></i>
    </div>
    <div v-else-if="otherTop == 6">
      <i>部室名称</i>
      全部
      <i style="color:#d00" class="el-icon-circle-plus-outline" @click="chaxunDepar"></i>
    </div>
    <div v-else-if="otherTop == 7">
  <div>
    <i>部室</i>
    {{personName1}}
  </div>
  <div>
    <i>员工</i>
    {{personName}}
  </div>
</div>
    <div v-else>
      <div v-if="!mainTopHide">
        <div>
          <i>员工</i>
          CPECC西南分公司
          <span @click="yuangong">
              <i style="color:#d00" class="el-icon-circle-plus-outline"></i>
            </span>
        </div>
      </div>
    </div>
    <div>
      <span>
        <i>时间</i>
      </span>
      <el-radio
        v-for="(val,key) in dateSearchArr"
        :key="key"
        v-model="dateSearchArrIndex"
        :label="key"
        @change="searcharrFn"
      >{{val}}</el-radio>
      <span>
        <el-date-picker
          v-model="value1"
          size="mini"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          @change="timeFn"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <span class="mlf10 topStcsBtnD">
          <el-button size="mini" type="primary" @click="toTime">查询</el-button>
          <el-button size="mini" type="primary" @click="getExcel">导出EXCEL</el-button>
        </span>
      </span>
    </div>
    <!--<div class="mtb20">
      <el-button size="mini" type="primary">查询</el-button>
      <el-button size="mini" type="primary">导出EXCEL</el-button>
    </div>-->
    <!--员工-->
    <el-dialog class="das" :visible.sync="dialogTableVisible">
      <div class="staffNamebox" style="display:flex;justify-content: space-around">
        <div>
          <el-table
            height="300"
            border
            style="width: 100%"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="部室" width="200"></el-table-column>
          </el-table>
        </div>
        <div style="margin:0 0 0 20px">
          <el-table
            height="300"
            border
            style="width: 100%"
            ref="multipleTable"
            :data="cpestaffName"
            tooltip-effect="dark"
            @selection-change="staffName"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="empCode" label="工号"></el-table-column>
          </el-table>
        </div>
      </div>
      <el-button type="primary" round @click="staffNameBtn">确认</el-button>
    </el-dialog>
    <!--项目名称-->
    <el-dialog class="das" :visible.sync="dialogTableBox">
      <div class="staffNamebox" style="display:flex;justify-content: space-around">
        <div style="width: 100%">
          <!--搜索框-->
          <div v-if="otherTop !== 6">
            <el-input v-model="pageParams.key" class="input-with-select">
              <el-button @click="searchFn" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table
            height="300"
            border
            style="width: 100%"
            ref="multipleTable"
            :data="engineeringData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChangeProject"
          >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column
              :prop=" pageParabox"
              :label="mylabel"
              width="400"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
          <div v-if="otherTop !== 6">
            <el-pagination
              @current-change="handleCurrentChange1"
              :current-page="pageParams.currentPage"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-button type="primary" round @click="staffNameBtn1">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["otherTop", "mainTopHide", "otherTop1"],
  data() {
    return {
      //工程项目科研项目名称
      pageParams: {
        currentPage: 1,
        pageSize: 10,
        key: ""
      },
      total: 0,
      personName:JSON.parse(sessionStorage.getItem('user')).name,
      personName1:JSON.parse(sessionStorage.getItem('user')).parentName,
      addname: "全部",
      pageParabox: "",
      Top1: this.otherTop1,
      engineeringData: [{ name: "信息管理部" }],
      tableDataBox: [],
      cpestaffName: [],
      employees: [], //查询的员工
      dateSearchArrIndex: "1",
      dateSearchArr: {
        0: "本周",
        1: "本月",
        2: "本季度",
        3: "本年"
      },
      value1: [this.$main.getMonth("s", 0), this.$main.getMonth("e", 0)],
      startime: "",
      endtime: "",
      dialogTableVisible: false,
      project: false,
      dialogTableBox: false,
      multipleSelection: [],
      departmentid: [],
      CPEempCode: [],
      tableData:[],
      reportArr: [], //报表筛选数据
      czempCode: {
        empCode: ""
      },
      mylabel: "",
      beginDate: "",
      endDate: ""
    };
  },
  methods: {
    searcharrFn(val) {
      let _this = this;
      console.log(this.otherTop1);
      if (this.otherTop1 == 2) {
        if (val == 0) {
          //本周
          this.value1 = [
            this.$main.getMonday("s", 0),
            this.$main.getMonday("e", 0)
          ];
          console.log(this.$main.getMonday("s", 0));
          this.$parent.tabledataFn(
            this.$main.getMonday("s", 0),
            this.$main.getMonday("e", 0)
          );
          // this.$emit('find',this.$main.getMonday('s',0),this.$main.getMonday('e',0))
        } else if (val == 1) {
          //本月
          this.value1 = [
            this.$main.getMonth("s", 0),
            this.$main.getMonth("e", 0)
          ];
          this.$parent.tabledataFn(
            this.$main.getMonth("s", 0),
            this.$main.getMonth("e", 0)
          );
        } else if (val == 2) {
          //本季度
          this.value1 = [
            this.$main.getquarter("s", 0),
            this.$main.getquarter("e", 0)
          ];
          this.$parent.tabledataFn(
            this.$main.getquarter("s", 0),
            this.$main.getquarter("e", 0)
          );
        } else if (val == 3) {
          //本年
          this.value1 = [
            this.$main.getYear("s", 0),
            this.$main.getYear("e", 0)
          ];
          this.$parent.tabledataFn(
            this.$main.getYear("s", 0),
            this.$main.getYear("e", 0)
          );
        }
        // this.otherTop1=1
      } else {
        if (val == 0) {
          //本周
          console.log(this.CPEempCode, 88);
          console.log(this.$main.getMonday("s", 0), 88);
          this.value1 = [
            this.$main.getMonday("s", 0),
            this.$main.getMonday("e", 0)
          ];
          this.$parent.$parent.$parent.tabledataFn(
            this.$main.getMonday("s", 0),
            this.$main.getMonday("e", 0)
          );
        }
        // this.$emit('find',this.$main.getMonday('s',0),this.$main.getMonday('e',0))
        else if (val == 1) {
          //本月
          this.value1 = [
            this.$main.getMonth("s", 0),
            this.$main.getMonth("e", 0)
          ];
          this.$parent.$parent.$parent.tabledataFn(
            this.$main.getMonth("s", 0),
            this.$main.getMonth("e", 0)
          );
        } else if (val == 2) {
          console.log(this.CPEempCode, 99);
          //本季度
          this.value1 = [
            this.$main.getquarter("s", 0),
            this.$main.getquarter("e", 0)
          ];
          this.$parent.$parent.$parent.tabledataFn(
            this.$main.getquarter("s"),
            this.$main.getquarter("e")
          );
        } else if (val == 3) {
          //本年
          this.value1 = [
            this.$main.getYear("s", 0),
            this.$main.getYear("e", 0)
          ];
          this.$parent.$parent.$parent.tabledataFn(
            this.$main.getYear("s", 0),
            this.$main.getYear("e", 0)
          );
        }
      }
    },
    //时间选择
    timeFn() {
      console.log(this.value1, 88111);
      this.startime = this.value1[0];
      this.endtime = this.value1[1];
    },
    //todo 查询
    toTime() {
      // this.dateSearchArrIndex = "";
      if (this.otherTop1 == 2) {
        this.$parent.tabledataFn(this.startime, this.endtime, this.CPEempCode);
      }
      else if(this.otherTop==1,2,3,4,5,6){
        if (this.departmentid.length != 0) {
          this.$parent.$parent.$parent.tabledataFn(
            this.startime,
            this.endtime,
            this.departmentid
          )
          this.departmentid=[]
        } else {
          this.$parent.$parent.$parent.tabledataFn(this.startime, this.endtime);
        }
      }else {
        if (this.CPEempCode.length != 0) {
          this.$parent.$parent.$parent.tabledataFn(
            this.startime,
            this.endtime,
            this.CPEempCode
          );
        } else {
          this.$parent.$parent.$parent.tabledataFn(this.startime, this.endtime);
        }
      }
      // this.$emit("func", this.value1, this.dateSearchArrIndex, this.CPEempCode);
    },
    //工程名称选择
    handleSelectionChangeProject(val) {
      this.departmentid = [];
      val.forEach(item => {
        if (this.otherTop == 1) {this.departmentid.push(item.maketSid)} 
        else if (this.otherTop == 2) {this.departmentid.push(item.maketSid)} 
        else if (this.otherTop == 3) {this.departmentid.push(item.maketSid)} 
        else if (this.otherTop == 4) {this.departmentid.push(item.maketSid)} 
        else if (this.otherTop == 5) {this.departmentid.push(item.techcode)} //课题名称
        else if (this.otherTop == 6) {this.departmentid.push(item.code)} //部室
      });
    },

    //导出Excel
    // 导出Excel公用方法
    getExcel() {
      if (this.otherTop1 == 2) {
        this.$parent.deptFX();
      } else {
        this.$parent.$parent.$parent.deptFX();
      }
      // this.$emit("func", this.value1, this.dateSearchArrIndex, this.CPEempCode);
    },
    staffNameBtn() {
      this.addname = "部分员工";
      this.dialogTableVisible = false;
    },
    staffNameBtn1() {
      this.dialogTableBox = false;
    },
    // 部门查询
    async deptFindAllDept() {
      let { data } = await this.axios.get("/api/dept/findAllDept");
      this.tableData = data[0].children;
      this.engineeringData = data[0].children;
    },
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
      this.engineeringData = data.rows;
      this.total = data.total;
    },
    //员工查询
    async employeeFindByDept() {
      let params = {
        ids: this.departmentid
      };
      let { data } = await this.axios.post("/api/employee/findByDept", params);

      this.cpestaffName = data.data;
      //console.log(data,111111111)
    },
    yuangong() {
      this.dialogTableVisible = true;
      this.deptFindAllDept();
    },
    handleSelectionChange(val) {
      this.departmentid = [];
      val.forEach(item => {
        this.departmentid.push(item.code);
      });
      this.employeeFindByDept();
    },
    //分页
    handleCurrentChange1(val) {
      this.pageParams.currentPage = val;
      if (this.otherTop == 1) {this.engineeringFindAll()} //项目名称
      else if (this.otherTop == 2) {} 
      else if (this.otherTop == 3) {} 
      else if (this.otherTop == 4) {} 
      else if (this.otherTop == 5) {this.scientificResearchFindAll()} //课题名称
      //else if(this.otherTop==6){this.deptFindAllDept()}    //部室
    },
    //模糊查询
    searchFn() {
      if (this.otherTop == 1) {this.engineeringFindAll()} //项目名称
      else if (this.otherTop == 2) {} 
      else if (this.otherTop == 3) {} 
      else if (this.otherTop == 4) {} 
      else if (this.otherTop == 5) {this.scientificResearchFindAll()} //课题名称
    },
    staffName(val) {
      console.log(val, 99);
      // this.employees = val;
      this.CPEempCode = [];
      let that = this;
      val.forEach(item => {
        let _czempCode = JSON.parse(JSON.stringify(that.czempCode));
        _czempCode.empCode = item.empCode;
        that.CPEempCode.push(_czempCode);
      });
      console.log(that.CPEempCode);
    },
    //项目名称
    chaProject() {
      this.dialogTableBox = true;
      this.mylabel = "项目名称";
      this.pageParabox = "pjMarketName";
      this.engineeringFindAll();
    },
    //区域
    chaxunArea() {
      this.dialogTableBox = true;
      this.mylabel = "区域";
    },
    //专业名称
    chaxunMajor() {
      this.dialogTableBox = true;
      this.mylabel = "专业名称";
    },
    //科室名称
    chaxunAdmin() {
      this.dialogTableBox = true;
      this.mylabel = "科室名称";
    },
    //课题名称
    chaxunTask() {
      this.dialogTableBox = true;
      this.mylabel = "课题名称";
      this.pageParabox = "techname";
      this.scientificResearchFindAll();
    },
    //部室名称
    chaxunDepar() {
      this.dialogTableBox = true;
      this.mylabel = "部室名称";
      this.pageParabox = "name";
      this.deptFindAllDept();
    }
  },
  mounted() {
    // this.$parent.
    // console.log(this.otherTop,'888$parent.otherTop');
  }
};
</script>
<style scoped>
.staffNamebox {
  border: 1px solid #ddd;
  display: flex;
  margin: 10px 0;
}
.namebox {
  border: 1px solid #ddd;
}
.dasbox {
  padding: 0 464px;
}
</style>
