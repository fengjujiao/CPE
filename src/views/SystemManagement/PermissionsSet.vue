<template>
  <div id="asdsa">
    <p class="mainTitle">用户权限设置</p>
    <!-- <div style="display:flex,width:600px">
     
      <el-input v-model="youhu11.key" placeholder="部门名称/职位名称/角色名称"></el-input>
      <el-button type="primary" round @click="staffNameBtn">确认</el-button>
    </div>
    <div style="margin:20px 0" v-show="tableData1.length!=0">
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column label="序号" type="index" width="200"></el-table-column>
        <el-table-column prop="displayName" label="用户名称" width="auto"></el-table-column>
        <el-table-column prop="roleNameAry" label="用户角色" width="auto"></el-table-column>
        <el-table-column label="操作" width="auto">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :current-page="youhu11.currentPage"
        :page-size="youhu11.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>-->
    <div style="display:flex">
      <div>
        <el-table
          height='390'
          ref="singleTable"
          border
          :data="selectAllDepsj"
          highlight-current-row
          @current-change="selectAllDepChange"
          style="width: 100%"
        >
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column property="deptName" label="部室" width="200"></el-table-column>
        </el-table>
      </div>
      <div class="myshyk" style="margin: 0 30px"><img src="../../assets/img/jiano.png" alt=""></div>
      <div>
        <el-table :data="tableData1" @current-change="mydetails" height='390' border style="width: 100%">
          <el-table-column label="序号" type="index" width="60"></el-table-column>
          <el-table-column prop="displayName" label="用户名称" width="120"></el-table-column>
          <el-table-column prop="roleNameAry" label="用户角色" width="300"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.stop="modify(scope.row,$event)">修改</el-button>
              <el-button @click.stop="deleteRow(scope.row.id)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div></div>
    <!-- 用户权限管理 -->
    <el-dialog class="waad" title="用户权限管理" :visible.sync="dialogTableVisible">
      <div style="display:flex">
        <div>
          <p>角色:</p>
          <el-table
            height="350"
            border
            ref="multipleTable1"
            :data="userManagement"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
            <el-table-column type="selection"></el-table-column>
          </el-table>
        </div>
        <div style="margin:0 16px">
          <p>部门数据查看权限:</p>
          <el-table
            height="350"
            border
            :cell-style="{padding:'0px'}"
            ref="multipleTable2"
            :data="depManagement"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="deptName" label="部门名称" width="120"></el-table-column>
            <el-table-column type="selection"></el-table-column>
          </el-table>
        </div>
        <div>
          <p>项目数据查看权限:</p>
          <el-radio-group v-model="radio" @change="CGprojectM">
            <el-radio :label="1">工程项目</el-radio>
            <el-radio :label="2">科研项目</el-radio>
          </el-radio-group>
          <el-table
            height="334"
            border
            ref="multipleTable3"
            :data="projectM"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column class="ljl" prop="pjMarketName" label="项目名称" width="120"></el-table-column>
            <el-table-column label="授权" type="selection"></el-table-column>
          </el-table>
          <el-pagination
            @current-change="selHandleCurrentChange"
            :pager-count="5"
            layout="prev, pager, next"
            :total="total1"
          ></el-pagination>
        </div>
      </div>
      <el-button type="primary" round @click="goSet">确认</el-button>
    </el-dialog>

    <!-- 用户详细消息 -->
    <el-dialog
  :title="userDet.displayName"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <p><span>用户角色</span> : <span>{{userDet.roleNameAry}}</span></p>
  <p><span>用户页面权限</span> : <span v-for="(item,index) in userDet.functions" :key="index"> {{index+1 +" : "+ item.funcName}} &ensp; </span></p>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
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
      centerDialogVisible:false,
      userDet:{},
      selectAllDepsj:[],
      total: 0,
      total1: 0,
      radio: 1,
      departmentidinde: [],
      userManagement: [], //角色
      depManagement: [], //部门数据查看权限
      projectM: [], //项目数据查看权限
      dialogTableVisible: false,
      tableData1: [],
      value: [],
      label: [],
      input: "",
      options: [],
      //确认修改提交数据
      quern: {
        id: 2086,
        roleIds: [4]
      },
      youhu: {
        currentPage: 1,
        pageSize: 10
      },
      youhu11: {
        currentPage: 1,
        pageSize: 10,
        key: ""
      },
      ngSelectNoLi: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.quern.roleIds = [];
      val.forEach(item => {
        this.quern.roleIds.push(item.roleId);
      });
      console.log(this.quern.roleIds);
    },
    handleSizeChange(val) {
      this.youhu11.pageSize = val;
      this.youhu.pageSize = val;
      this.selectAllEmpPage();
    //  this.checkRoleName();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.youhu11.currentPage = val;
    //  this.checkRoleName();

      this.youhu.currentPage = val;
      this.selectAllEmpPage();
      // console.log(`当前页: ${val}`);
    },
    //获取全部部室
    selectAllDept( val){
      console.log(val)
    },
    //所有名称
    async selectAllEmpPage() {
      let params = this.youhu;
      let { data } = await this.axios.post("/api/selectAllEmpPage", params);
      let _data = data.rows;
      _data.forEach(item => {
        let roleNameAry = [];
        item.roles.forEach(item2 => {
          roleNameAry.push(item2.roleName);
        });
        roleNameAry = roleNameAry.join(",");
        item.roleNameAry = roleNameAry;
      });
      // data.rloe.toString()
      this.tableData1 = _data;
      this.total = data.total;
    },
    // 通过部门查询名称
  async selectAllDepChange(val){
    console.log()
    let params={deptCode:val.deptCode} 
     let { data } = await this.axios.get("/api/employee/findEmpsByDeptCode", {params});
       let _data = data;
      _data.forEach(item => {
        let roleNameAry = [];
        item.roles.forEach(item2 => {
          roleNameAry.push(item2.roleName);
        });
        roleNameAry = roleNameAry.join(",");
        item.roleNameAry = roleNameAry;
      });
     this.tableData1=_data
  },
    // async checkRoleName() {
    //   let params = this.youhu11;

    //   let { data } = await this.axios.post("/api/findEmpByDeptKeyWord", params);
    //   let _data = data.rows;
    //   _data.forEach(item => {
    //     let roleNameAry = [];
    //     item.roles.forEach(item2 => {
    //       roleNameAry.push(item2.roleName);
    //     });
    //     roleNameAry = roleNameAry.join(",");
    //     item.roleNameAry = roleNameAry;
    //   });
    //   // data.rloe.toString()
    //   this.tableData1 = _data;
    //   this.total = data.total;
    // },
    //确认修改
    async updateRoleFunsByEmpId() {
      let params = this.quern;
      let { data } = await this.axios.post(
        "/api/updateRoleFunsByEmpId",
        params
      );
      this.tableData1 = data;
    },
    //树形选取姓名
    // staffNameBtn() {
    //   this.checkRoleName();
    // },
    //  async handleChange(value) {
    //    let { data } = await this.axios.get(
    //     "/api/dept/findAllDept"
    //   );
    //   console.log(data)
    //},
    //弹框
    //用户权限修改
    modify(data,event) {
      let _this = this;
      let jsid = data.roles;
      if(event) event.preventDefault();
      this.dialogTableVisible = true;
      this.selectAllRole().then(()=>{
        _this.qqq(jsid)
      });
      this.selectAllDept();
      this.engineeringSelectNoLikeAll();
    },
    // 所有角色
    async selectAllRole() {
      let that = this;
      let { data } = await this.axios.get("/api/selectAllRole.do");
      that.userManagement = data;
      data.forEach(item => {
        that.departmentidinde.push(item.roleId);
      });
    },
    qqq(id) {
       console.log(id)
      id.forEach(item => {
        let row = item.roleId;
        if (this.departmentidinde.indexOf(row) >= 0) {
          // console.log(this.departmentidinde.indexOf(row),11111)
          this.$refs.multipleTable1.toggleRowSelection(
            this.userManagement[this.departmentidinde.indexOf(row)]
          );
        }
      });
    },
    //部门名称
    async selectAllDept() {
      let { data } = await this.axios.get("/api/dept/selectAllDept");
      this.dialogTableVisible
      if(this.dialogTableVisible){
        this.depManagement = data;
      }else{
        this.selectAllDepsj=data
      }
    },
    //项目数据权限分页
    selHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.ngSelectNoLi.currentPage = val;
      this.engineeringSelectNoLikeAll();
      this.scientificResearchFindAllNoLike();
    },
    //  删除
    async deleteRow(id) {
      this.$confirm("此操作将永久删除该条内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let url = "/api/delByRoleId";
          let params = {
            roleId: id
          };
          let { data } = await this.$axios.get(url, { params });
          if (data == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
           // this.checkRoleName();
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //项目数据查看权限
    async engineeringSelectNoLikeAll() {
      let params = this.ngSelectNoLi;

      let { data } = await this.axios.post(
        "/api/engineering/selectNoLikeAll",
        params
      );
      this.projectM = data.rows;
      this.total1 = data.total;
    },
    async scientificResearchFindAllNoLike() {
      let params = this.ngSelectNoLi;

      let { data } = await this.axios.post(
        "/api/scientificResearch/findAllNoLike",
        params
      );
      data.rows.forEach(item => {
        item.pjMarketName = item.techname;
      });
      this.projectM = data.rows;
      this.total1 = data.total;
    },
    CGprojectM(val) {
      if (val == 1) {
        this.engineeringSelectNoLikeAll();
      } else if (val == 2) {
        this.scientificResearchFindAllNoLike();
      }
    },
    //提交
    goSet() {
      this.updateRoleFunsByEmpId();
      this.dialogTableVisible = false;
    },
    setCurrent() {
        this.$refs.singleTable.setCurrentRow(this.selectAllDepsj[0]);
      },
      mydetails(val){
        console.log(val)
        this.userDet=val
        this.centerDialogVisible=true
      }
  },
  mounted() {
    this.selectAllDept().then(()=>{
      this.setCurrent()
    })
  },
};
</script>
<style scoped>
.el-input {
  width: 220px;
}
.el-cascader {
  width: 100px;
}
.myshyk{
  display: flex;
  align-items: center
}
</style>