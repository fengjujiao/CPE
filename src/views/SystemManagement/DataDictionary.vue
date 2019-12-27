<template>
  <div>
    <p class="mainTitle">数据字典管理</p>
    <el-button type="success" size="small" @click="addMain" style="margin-top:10px">
      <i class="el-icon-plus el-icon--left">添加</i>
    </el-button>
    <!--<_topStatistics></_topStatistics>-->
    <tableData :tableDataTr="tableDataTr" :tableData="tableData">
      <el-table-column fixed="right" label="是否启用" width="auto" slot="other">
        <template slot-scope="scope">
          <span>{{scope.row.isdelete==1?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="auto" slot="other">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="modify(scope.row)" >修改</el-button>
          <el-button
                  @click="deleteRow(scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.nodelete==0"
          >移除</el-button>
        </template>
      </el-table-column>
    </tableData>
    <!-- 分页 -->
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 50]"
            :current-page="condition.currentPage"
            :page-size="condition.pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
    ></el-pagination>

    <!-- 添加/修改角色 -->
    <el-dialog class="waad" title="数据字典管理" :visible.sync="dialogTableVisible">
      <div>
        <p style="margin:10px 0">
          <span>编码 :</span>
          <el-input v-model="dictionary.code" clearable  placeholder="角色名称"></el-input>
        </p>
        <p>
          <span>名称 :</span>
          <el-input v-model="dictionary.name" clearable placeholder="名称"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>分类编码 :</span>
          <el-input v-model="dictionary.typecode" clearable  placeholder="分类编码"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>分类名称 :</span>
          <el-input v-model="dictionary.typename" clearable  placeholder="分类名称"></el-input>
        </p>
        <p style="margin:10px 0">
          <span>描述 :</span>
          <el-input type="textarea" autosize v-model="dictionary.desc" clearable placeholder="描述"></el-input>
        </p>
        <p style="margin:10px 0">
          <span class="dele">是否启用</span>
          <el-switch v-model="dictionary.isdelete" :active-value='1' :inactive-value='0'></el-switch>
        </p>
        <p style="margin:10px 0">
          <span class="dele">禁止删除</span>
          <el-switch v-model="dictionary.nodelete" :active-value='1' :inactive-value='0'></el-switch>
        </p>

      </div>
      <el-button type="primary" round @click="staffNameBtn">确认</el-button>
    </el-dialog>

<!--    删除-->

  </div>
</template>

<script>
  export default {
    name: "",
    components:{
      tableData: () => import('../../components/tableData.vue'),
      topStatistics: () => import('../../components/topStatistics.vue'),
    },
    data(){
      return{
        tableData:[],
        dialogTableVisible:false,
        isdelete:true, //判断是添加还是修改
        item:{},
        dictionary:{
          pid:null,
          children:[],
          isdelete:0,
          nodelete:0
          // code:'',
          // name:'',
          // typecode:'',
          // typename:'',
          // desc:'',
        },
        condition:{
          currentPage:1,
          pageSizes:10
        },
        currentPage:1,
        pageSize:10,
        total: 0,
        tableDataTr:[
          {
            name: '编码',
            val:'code'
          },
          {
            name:'名称',
            val:'name'
          },
          {
            name:'分类编码',
            val:''
          },
          {
            name:'分类名称',
            val:'typecode'
          },
          {
            name:'描述',
            val:'desc'
          }
        ],
      }
    },
    methods:{
      async tabledata(){
        let url='/api/dictionary/findAll'
        let params={
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
        let {data}=await this.$axios.get(url,{params:params})
        if(data.code==0){
          this.tableData=data.data.rows
          this.total=data.data.total
        }
      },
      handleSizeChange(val){
        this.currentPage=val
        this.tabledata()
      },
      handleCurrentChange(val){
        this.currentPage=val
        this.tabledata()
      },
      //添加
      addMain(){
        this.dictionary={
          pid:null,
          children:[],
          isdelete:0,
          nodelete:0
        }
        this.dialogTableVisible=true
      },
      //todo 确认添加/修改
      async staffNameBtn(){
        console.log(this.dictionary);
        let url='/api/dictionary/save'
        let params=this.dictionary
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
      //todo 修改
      async modify(item){
        console.log(item,88)
        this.dictionary=item
        this.dialogTableVisible=true
      },
    //  todo 删除
      async deleteRow(item){
        this.$confirm('此操作将永久删除该条内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let url = '/api/dictionary/remove'
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
      }
    },
    mounted(){
      this.tabledata()
    }
  }
</script>
<style scoped>
  .dele{
    margin-right: 15px;
  }
</style>
