<template>
  <div id="jiaose">
    <p class="mainTitle">角色设置</p>
    <el-button type="success" size="small" @click="addMain" style="margin-top:10px">
      <i class="el-icon-plus el-icon--left">添加</i>
    </el-button>
    <div style="margin:40px 0">
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column label="角色序号" type="index" width="200"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="auto"></el-table-column>
        <el-table-column prop="note" label="角色描述" width="auto"></el-table-column>
        <el-table-column fixed="right" label="操作" width="auto">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.roleId)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加角色 -->
    <el-dialog class="waad" title="角色权限管理" :visible.sync="dialogTableVisible">
      <div>
        <p style="margin:10px 0">
          <span>角色名称 :</span>
          <span v-show="num==1" class="youname">*角色名称已经存在</span>
          <el-input v-model="Juris.roleName" clearable @blur="ccroleName" placeholder="角色名称"></el-input>
        </p>
        <p>
          <span>角色描述 :</span>
          <el-input type="textarea" autosize v-model="Juris.note" clearable placeholder="角色描述"></el-input>
        </p>
        <p>功能权限:</p>
        <el-table
          height="300"
          border
          ref="multipleTable1"
          :data="Jurisdiction"
          tooltip-effect="dark"
          style="width:100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="funcName" label="功能" width="180"></el-table-column>
          <el-table-column type="selection"></el-table-column>
        </el-table>
      </div>
      <el-button type="primary" round @click="staffNameBtn" :disabled="num==1">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      num: 0,
      //添加角色的所需的值
      Juris: {},
      isdelete: true, //判断是添加还是修改
      departmentid: [],
      departmentidinde: [],
      tableData1: [
        { roleName: "个人", roleId: 0 },
        { roleName: "项目经理", roleId: 2 },
        { roleName: "部门经理", roleId: 3 }
      ],
      Jurisdiction: [{ funcName: "工时填报" }],
      tableDataTr: [{ name: "角色名称", val: "" }, { name: "操作", val: "" }],
      dialogTableVisible: false,
      dialogTabmodifybox: false
    };
  },
  methods: {
    // 角色设置
    async selectAllFunction() {
      let { data } = await this.axios.get("/api/selectAllFunction.do");

      this.Jurisdiction = data;
      data.forEach(item => {
        this.departmentidinde.push(item.funcId);
      });
    },
    // 所有角色
    async selectAllRole() {
      let { data } = await this.axios.get("/api/selectAllRole.do");

      this.tableData1 = data;
      // console.log(this.tableData,111111111)
    },
    // 角色名称去重
    async checkRoleName() {
      let params = {
        roleName: this.Juris.roleName
      };
      let { data } = await this.axios.post("/api/checkRoleName.do", params);
      this.num = data;
    },
    // 修改时的权限
    async findFunIdsByRoleId(id) {
      let _this=this
      let params = {
        roleId: id
      };
      let { data } = await this.axios.get("/api/findFunIdsByRoleId", {
        params
      });
      console.log(data,881)
      let funcIds=[]
      funcIds = data;
      funcIds.forEach(row => {
        console.log(row,77)
         if (this.departmentidinde.indexOf(row) >= 0) {
        this.$refs.multipleTable1.toggleRowSelection(this.Jurisdiction[this.departmentidinde.indexOf(row)]);
         }
        // console.log, 111);
      });
    },
    // 角色提交//修改
    async staffNameBtn() {
      let url = "";
      if (this.isdelete) {
        url = "/api/addRoleFuncs.do";
      } else {
        url = "/api/updateRoleById";
      }
      let params = this.Juris;

      let { data } = await this.axios.post(url, params);
      if (data == 0) {
        this.$message({
          showClose: true,
          message: "提交成功",
          type: "success"
        });

        this.dialogTableVisible = false;
        this.selectAllRole();
      } else {
        this.$message.error("提交失败");
      }
    },
    //  删除角色
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
            this.selectAllRole();
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
    //角色修改
    modify(data) {
      this.isdelete = false;
      this.dialogTableVisible = true;
      //   console.log(data)
      let id = data.roleId;
      this.Juris = data;
      this.selectAllFunction().then(() => {
        this.findFunIdsByRoleId(id);
      });
    },
    addMain() {
      this.Juris={}
      this.isdelete = true;
      this.dialogTableVisible = true;
      this.selectAllFunction();
    },
    ccroleName() {
      if(this.isdelete)this.checkRoleName();
    },
    handleSelectionChange(val) {
      this.Juris.funcIds = [];
      console.log(val,88344);
      val.forEach(item => {
        this.Juris.funcIds.push(item.funcId);
      });
    }
  },
  mounted() {
    this.selectAllRole();
  }
};
</script>

<style scoped>
.youname {
  font-size: 12px;
  color: red;
  text-indent: 2em;
}
</style>
