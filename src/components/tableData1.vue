<template>
  <div>
    <el-table
      class="mtb20"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <!--todo 一级表头-->
      <el-table-column
        v-for="item in tableDataTr"
        :label="item.name">
        <template v-if="!item.child" slot-scope="scope">
          {{item.val | turnTd(scope.rows)}}
        </template>
        <!--todo 二级表头-->
        <el-table-column
          v-for="subItem in item.child"
          :label="subItem.name">
            <template v-if="!subItem.child" slot-scope="scope">
              {{subItem.val | turnTd(scope.row)}}
            </template>
            <!--todo 三级表头-->
            <el-table-column
              v-for="subItem2 in subItem.child"
              :label="subItem2.name">
              <template v-if="!subItem2.child" slot-scope="scope">
                {{subItem2.val | turnTd(scope.row)}}
              </template>
            </el-table-column>
        </el-table-column>
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
      </template>
    </el-table-column>
      <slot name="other"></slot>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "",
    props:['tableDataTr','tableData'],
    data(){
      return{
        // tableData:[]
      }
    },
    methods:{
      handleClick(){
        alert(111)
      }
    },
    mounted(){}
  }
</script>
