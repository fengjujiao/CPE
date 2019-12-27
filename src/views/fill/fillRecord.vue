<template>
  <div>
    <p class="mainTitle">填报记录</p>
    <!-- <_tableData
      :tableDataTr="tableDataTr" :tableData='tableData'>

    </_tableData>-->
    <el-table :data="tableData" border header-align="center"
          align="center">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="employee.name" label="员工姓名" width="120"></el-table-column>
      <el-table-column prop="mhDate" label="填报日期" width="120"></el-table-column>
      <el-table-column prop="totalHour" label="打卡合计" width="120"></el-table-column>
      <el-table-column label="打卡记录" width="400">
        <template slot-scope="scope">
          <p v-show="scope.row.checkIn!=null">{{scope.row.checkIn +' 至 ' + scope.row.checkOut}}</p>
          <p v-show="scope.row.checkIn==null">无</p>
        </template>
      </el-table-column>
      <el-table-column label="出差记录" max-width="300">
        <template slot-scope="scope">
          <p>{{scope.row.travelStrat||'无'}}</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row.id) , dialogTableVisible = true"
            type="text"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="员工当天工作详情" width="65%" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" align="center">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column property="workattributename" label="工作属性" width="200"></el-table-column>
        <el-table-column label="工作内容" width="200">
          <template slot-scope="scope">
            <p v-show="scope.row.workattributename==='工程项目'">{{scope.row.epname||'无'}}</p>
            <p v-show="scope.row.workattributename==='科研技术基础工作'">{{scope.row.tpname||'无'}}</p>
            <p v-show="scope.row.workattributename==='管理、服务及其它'">{{scope.row.mpworktypename||'无'}}</p>
          </template>
        </el-table-column>
        <el-table-column property="workhours" label="工作时间" width="200"></el-table-column>
        <el-table-column label="工作岗位" width="200">
          <template slot-scope="scope">
            <p v-show="scope.row.workattributename==='工程项目'">{{scope.row.epjobpost||'无'}}</p>
            <p v-show="scope.row.workattributename==='科研技术基础工作'">{{scope.row.tppost||'无'}}</p>
            <p v-show="scope.row.workattributename==='管理、服务及其它'">
              <!-- {{scope.row.mpworktypename||'无'}} -->
              无
            </p>
          </template>
        </el-table-column>
        <el-table-column label="工作角色" width="200">
          <template slot-scope="scope">
            <p v-show="scope.row.workattributename==='工程项目'">{{scope.row.epjobrole||'无'}}</p>
            <p v-show="scope.row.workattributename==='科研技术基础工作'">{{scope.row.tpmajorrole||'无'}}</p>
            <p v-show="scope.row.workattributename==='管理、服务及其它'">
              <!-- {{scope.row.mpworktypename||'无'}} -->
              无
            </p>
          </template>
        </el-table-column>
        <el-table-column label="工作阶段" width="200">
          <template slot-scope="scope">
            <p v-show="scope.row.workattributename==='工程项目'">{{scope.row.epstage||'无'}}</p>
            <p v-show="scope.row.workattributename==='科研技术基础工作'">{{scope.row.tpstage||'无'}}</p>
            <p v-show="scope.row.workattributename==='管理、服务及其它'">
              <!-- {{scope.row.mpworktypename||'无'}} -->
              无
            </p>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>


<script>
export default {
  // name: "",
  // components:{
  //   _tableData: () => import('../../components/tableData1.vue'),
  // },
  data() {
    return {
      tableDataArr: [],
      tableData: [],
      gridData: [],
      dialogTableVisible: false,
      saveData: {
        empCode: "",
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    // todo 提交填报数据
    async findAllByUser() {
      let param = this.saveData;
      let { data } = await this.axios.post("/api/mh/findAllByUser", param);
      this.tableData = data.rows;
      //console.log(data,this.tableData,99)
    },
    async findAllByUser1(req) {
      let { data } = await this.axios.get("/api/mHWorkTime/findByMhId", {
        params: { mhId: req }
      });
      //  console.log(mydata,222222222222)
      this.gridData = data;
      console.log(this.gridData, 111111);
    },
    handleClick(id) {
      this.findAllByUser1(id);
    }
  },
  mounted() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.saveData.empCode = user.empCode;
    this.findAllByUser();
  }
};
</script>
<style scoped>
</style>
