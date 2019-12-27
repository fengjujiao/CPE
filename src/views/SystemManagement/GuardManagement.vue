<template>
  <div>
    <p class="mainTitle">系统映射管理</p>
    <el-form :inline="true"  ref="form" style="margin-top:10px">
      <el-form-item prop="name">
        <el-input size="medium" v-model="empName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="searchSub">查询</el-button>
        <el-button type="primary" size="small" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="success" size="small">
      <i class="el-icon-plus el-icon--left" @click="addFn">添加</i>
    </el-button>
    <div style="margin:40px 0">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="empName" label="员工姓名" width="200"></el-table-column>
        <el-table-column prop="empCode" label="员工编号" width="200"></el-table-column>
        <el-table-column prop="doorCode" label="门禁卡编号" width="200"></el-table-column>
        <el-table-column prop="phone" label="电话号码" width="200"></el-table-column>
        <el-table-column prop="carNum" label="车牌号" width="200"></el-table-column>
        <el-table-column prop="travel_gc_Code" label="工程项目出差编号" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify(scope.row)" >修改</el-button>
            <el-button
                    @click="deleteRow(scope.row)"
                    type="text"
                    size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 50]"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
    ></el-pagination>

    <!-- 添加/修改角色 -->
    <el-dialog class="waad" title="数据字典管理" :visible.sync="dialogTableVisible">
      <div>
        <p style="margin:10px 0">
          <span>姓名 :</span>
          <el-input v-model="guardManagement.empName" clearable  placeholder="姓名"></el-input>
        </p>
        <p>
          <span>员工编号 :</span>
          <el-input v-model="guardManagement.empCode" clearable placeholder="员工编号"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>门禁卡编号 :</span>
          <el-input v-model="guardManagement.doorCode" clearable  placeholder="门禁卡编号"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>电话号码 :</span>
          <el-input v-model="guardManagement.phone" clearable  placeholder="电话号码"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>车牌号 :</span>
          <el-input v-model="guardManagement.carNum" clearable  placeholder="车牌号"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>工程项目出差编号 :</span>
          <el-input v-model="guardManagement.travel_gc_Code" clearable  placeholder="工程项目出差编号"></el-input>
        </p>
      </div>
      <el-button type="primary" round @click="staffNameBtn">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
      dialogTableVisible:false,
      guardManagement:{

      },
      isdelete:true, //判断是添加还是修改
      currentPage:1,
      pageSize:10,
      total: 0,
      empName:''
    };
  },
  mounted(){
    this.tabledata()
  },
  methods: {
    async searchSub() {
      let url='/api/mapping/findByEmpName'
      let params={
        empName:this.empName
      }
      let {data}=await this.$axios.get(url,{params:params})
      if(data.code==0){
        this.tableData=data.data
      }
    },
    reset() {
      this.empName=''
      this.tabledata()
    },
    async tabledata(){
      let url='/api/mapping/findAll'
      let params={
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }
      let {data}=await this.$axios.post(url,params)
      if(data.code==0){
        this.tableData=data.data.rows
        this.total=data.data.total
      }
    },
    //todo 确认添加
    async staffNameBtn(){
      let url=''
      if(this.isdelete){
        url='/api/mapping/save'
      }else{
        url='/api/mapping/update'
      }
      let params=this.guardManagement
      let {data}=await this.$axios.post(url,params)
      if(data.code==0){
        this.$message({
          showClose: true,
          message: data.msg,
          type: 'success'
        });
        this.dialogTableVisible=false
        this.tabledata()
      }else{
        this.$message.error(data.msg);
      }
    },
    //todo 添加
    addFn(){
      this.isdelete=true
      this.guardManagement={}
      this.dialogTableVisible=true
    },
    //todo 修改
    async modify(item){
      console.log(item,88)
      this.isdelete=false
      this.guardManagement=item
      this.dialogTableVisible=true
    },
    //  todo 删除
    async deleteRow(item){
      this.$confirm('此操作将永久删除该条内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let url = '/api/mapping/remove'
        let params = {
          id: item.id
        }
        let { data } = await this.$axios.get(url, {params:params})
        if(data.code==0){
          this.tabledata()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message.error(data.msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val){
      this.currentPage=val
      this.tabledata()
    },
    handleCurrentChange(val){
      this.currentPage=val
      this.tabledata()
    },
  }
};
</script>
