<template>
  <div>
    <p>员工工作状态填报表</p>
    <div class="">
      <ul class="baseMsgD">
        <li>姓名：{{saveData.empName}} 职工代码：{{saveData.empCode}} </li>
        <!--<p>职工代码：{{saveData.empCode}}</p>-->
        <li>
          填报日期：
          <el-date-picker
            v-model="saveData.mhDate"
            type="date"
            size="mini"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </li>
        <li>
          打卡时间：{{saveData.checkIn?saveData.checkIn +'至'+ saveData.checkOut:'无'}}
        </li>
        <li>
          请假时段：{{saveData.leaveStart?saveData.leaveStart +'至'+ saveData.leaveEnd:'无'}}
        </li>
        <li>
          出差时段：{{saveData.travelStrat?saveData.travelStrat +'至'+ saveData.travelEnd:'无'}}
        </li>
      </ul>
    </div>
    <table class="fillTable">
      <tr>
        <td>姓名：</td>
        <td>{{saveData.empName}}</td>
        <td>职工代码：</td>
        <td>{{saveData.empCode}}</td>
      </tr>
      <tr>
        <td>填报日期：</td>
        <td>
          <el-date-picker
            v-model="saveData.mhDate"
            type="date"
            size="mini"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
        <td>参照日期：</td>
        <td>
          <el-date-picker
            v-model="value2"
            type="date"
            size="mini"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
      </tr>
      <tr>
        <td>打卡时间：</td>
        <td colspan="3">{{saveData.checkIn?saveData.checkIn +'至'+ saveData.checkOut:'无'}}</td>
        <!--//打卡时间合计 totalHour;-->
      </tr>
      <tr>
        <td>请假时段：</td>
        <td>{{saveData.leaveStart?saveData.leaveStart +'至'+ saveData.leaveEnd:'无'}}</td>
        <!--//请假总时长 leaveTotalHour;-->
        <td>出差时段：</td>
        <td>{{saveData.travelStrat?saveData.travelStrat +'至'+ saveData.travelEnd:'无'}}</td>
        <!--//出差总计时 travelTotalHour-->
      </tr>
    </table>
    <el-table :data="saveData.mhWorkTimes" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="工作场景" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.workspace" size="mini" slot="prepend" placeholder="请选择">
            <el-option v-for="(item,index) in scope.row.workspaceArr" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="工作属性" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.workattribute" size="mini" slot="prepend" placeholder="请选择">
            <el-option v-for="(item,index) in scope.row.workattributeArr" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="工作名称">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.workname"
            placeholder="请选择工作名称"
            @focus="workNameFn(scope.row)"
            readonly
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="工作阶段">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.workstage"
            v-if="scope.row.workattribute != '管理、服务及其他'"
            size="mini"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option v-for="(val,key) in scope.row.workstageArr" :label="val" :value="val"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="工作岗位">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.post"
            v-if="scope.row.workattribute != '管理、服务及其他'"
            size="mini"
            slot="prepend"
            @change="findChildrenById(scope.row.post,scope.row)"
            placeholder="请选择"
          >
            <el-option v-for="(item,index) in scope.row.postArr" :label="item.name" :value="item.id+'-'+item.name"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="工作角色">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.workrole"
            v-if="scope.row.workattribute != '管理、服务及其他'"
            size="mini"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option v-for="(item,index) in scope.row.workroleArr"
                       :label="item.name" :value="item.name"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="工作时长（小时）">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.workhours"
            :precision="1"
            :min="0"
            :step="0.5"
            :max="10"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column width="80" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteTableData(scope.$index)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addTableData()" class="mt5" size="mini" type="success">添加</el-button>
    <div class="textC">
      <el-button type="primary">暂存</el-button>
      <el-button @click="save" type="primary">提交</el-button>
    </div>
    <!--工作名称弹框-->
    <el-dialog title="工作名称" width="80%" class="h70vh" :visible.sync="dialogTableVisible">
      <el-input
        :placeholder="searchPlaceholder[`${tableDataIndex.workattribute}`]"
        v-model="searchText"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div v-if="tableDataIndex.workattribute == '工程项目'">
        <el-table :data="engineeringData">
          <el-table-column property="pjBranchNum" label="工程编码" width="150"></el-table-column>
          <el-table-column property="pjMaeketName" label="工程编码名称" width="200"></el-table-column>
          <el-table-column property="pjStage" label="项目阶段"></el-table-column>
          <el-table-column property="fgsXmjb" label="项目级别"></el-table-column>
          <el-table-column property="pjRunStatus" label="运行状态"></el-table-column>
          <el-table-column property="pjMarketPq" label="片区"></el-table-column>
          <el-table-column property="pjMarketQy" label="语言区"></el-table-column>
          <el-table-column property="pjManagerName" label="项目经理/负责人"></el-table-column>
        </el-table>
      </div>
      <div v-if="tableDataIndex.workattribute == '科研技术基础工作'">
        <el-table :data="scientificResearchData">
          <el-table-column property="techcode" label="课题编号" width="150"></el-table-column>
          <el-table-column property="techname" label="课题名称" width="200"></el-table-column>
          <el-table-column property="techsattus" label="项目阶段"></el-table-column>
          <el-table-column property="techtype" label="项目类别"></el-table-column>
          <el-table-column property="techleader" label="项目经理/负责人"></el-table-column>
        </el-table>
      </div>
      <div v-if="tableDataIndex.workattribute == '管理、服务及其他'">
        <el-table :data="gridData">
          <el-table-column property="date" label="课题编号" width="150"></el-table-column>
          <el-table-column property="name" label="课题名称" width="200"></el-table-column>
          <el-table-column property="address" label="项目阶段"></el-table-column>
          <el-table-column property="address" label="项目类别"></el-table-column>
          <el-table-column property="address" label="项目经理/负责人"></el-table-column>
        </el-table>
      </div>
      <div class="textC mtb20">
        <el-button @click="dialogTableVisible=false" type="primary">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      engineeringData: [], // 工程项目 工作名称 数据
      scientificResearchData: [], // 科研技术基础工作 工作名称 数据
      gridData: [],
      value1: "",
      value2: "",
      dialogTableVisible: false, // 工作名称弹框标识
      searchText: "", // 搜索文字
      pickerOptions: {
        disabledDate(time) {
          let _now = Date.now(),
            seven = 7 * 24 * 60 * 60 * 1000,
            sevenDays = _now - seven;
          return time.getTime() > Date.now() || time.getTime() < sevenDays;
        }
      },
      searchPlaceholder: {
        "工程项目": "请输入工程编号或工程名称关键字",
        "科研技术基础工作": "请输入课题编号或课题名称关键字",
        "管理、服务及其他": ""
      },
      // 提交数据
      saveData: {
        mhDate: this.$main.showTime("ymd"),
        mhWorkTimes: [],
        empName:'张三',
        empCode:'001'
      },
      tableDataIndex: "",
      tableDataDefault: [
        {
          workhours: "",
          workname: "",
          workspace: "", // 工作场景
          workspaceArr: {
            0: "办公室",
            1: "市内出差",
            2: "市外出差"
          },
          workattribute: "工程项目", // 工作属性
          workattributeArr: {
            // 0: "工程项目",
            // 1: "科研技术基础工作",
            // 2: "管理、服务及其他"
          },
          workstage: "", // 工作阶段
          workstageArr: {
            0: "阶段1",
            1: "阶段2",
            2: "阶段3"
          },
          post: "", // 工作岗位
          postArr: {
            0: "岗位1",
            1: "岗位2",
            2: "岗位3"
          },
          workRoleIndex: "", // 工作角色
          workroleArr: {
            0: "角色1",
            1: "角色2",
            2: "角色3"
          }
        }
      ]
    };
  },
  methods: {
    // todo 选择工作名称弹窗
    workNameFn(item) {
      console.log("77");
      this.dialogTableVisible = true;
      this.tableDataIndex = item;
      this.engineeringFindAll()
      this.scientificResearchFindAll()
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
      let { data } = await this.axios.post("/api/mh/save", this.saveData);
    },
    // todo 查询工作名称  工程项目
    async engineeringFindAll() {
      let params={
        "currentPage": 1,
        "pageSize": "10",
        "key": ""
      }
      let { data } = await this.axios.post("/api/engineering/findAll", params);
      this.engineeringData = data.rows
    },
    // todo 查询工作名称 科研技术基础工作
    async scientificResearchFindAll() {
      let params={
        "currentPage": 1,
        "pageSize": "10",
        "key": ""
      }
      let { data } = await this.axios.post("/api/scientificResearch/findAll", params);
      this.scientificResearchData = data.rows
    },
    // todo 查询工作场景
    async dictionary() {
      let params={
        typeCode: "WorkSpace"
      }
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {params:params});
      this.tableDataDefault[0].workspaceArr = data
    },
    // todo 查询工作属性
    async getWorkattribute() {
      let params={
        typeCode: "WorkAttribute"
      }
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {params:params});
      this.tableDataDefault[0].workattributeArr = data
    },
    // todo 查询工作岗位
    async getPostArr() {
      let params={
        typeCode: "WorkPost"
      }
      let { data } = await this.axios.get("/api/dictionary/findAllByTypeCode", {params:params});
      this.tableDataDefault[0].postArr = data
    },
    // todo 查询工作角色 根据 工作岗位
    async findChildrenById(val,item) {
      console.log(val, item);
      let params={
        id: val.split('-')[0]
      }
      let { data } = await this.axios.get("/api/dictionary/findChildrenById", {params:params});
      item.workroleArr = data
      // this.tableDataDefault[0].postArr = data
    },

  },
  mounted() {
    this.findChildrenById()
    // this.getWorkattribute()
    this.dictionary().then(()=>{
      this.getWorkattribute().then(()=>{
        this.getPostArr().then(()=>{
          this.saveData.mhWorkTimes = JSON.parse(
            JSON.stringify(this.tableDataDefault)
          );
        })
      })
    })
  }
};
</script>
<style>
  .baseMsgD li{
    min-height: 28px;
    margin: 10px 0;
  }
</style>