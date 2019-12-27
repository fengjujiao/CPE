<template>
<div>
  <el-tree
    ref="tree"
    :data="data"
    show-checkbox
    node-key="areaId"
    @check-change="handleNodeClick"
    default-expand-all
    :check-strictly="true"
    :props="defaultProps">
  </el-tree>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
</div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
          areaId: 2,
          areaName: '一级 2',
          children: [{
            areaId: 5,
            areaName: '二级 2-1',
            throughAreaId: '2,5'//途径区域id
          }, {
            areaId: 6,
            areaName: '二级 2-2',
            throughAreaId: '2,6'//途径区域id
          }, {
            areaId: 7,
            areaName: '二级 2-3',
            throughAreaId: '7'//途径区域id
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'areaName'
        }
      };
    },
    methods: {
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([2]);
      },
      handleNodeClick2(a,b,c){
        console.log(a, b,c,'777');
      },
      handleNodeClick(data,checked){
        let _index = this.$refs.tree.getCheckedNodes()
        if (!data.throughAreaId) {
          /*if (data.children) {
            data.children.forEach(subItem=>{
              this.$refs.tree.setChecked(subItem.areaId,false);
            })
          }*/
          return
        }
        let arr = data.throughAreaId.split(',')
        if (checked) {
          arr.forEach(item=>{
            let has = _index.find(value => {
              return value.areaId == item
            })
            if (!has) {
              this.$refs.tree.setChecked(item,true);
            }
          })
        } else {
          arr.forEach(item=>{
            let has = _index.find(value => {
              return value.areaId == item
            })
            if (has) {
              this.$refs.tree.setChecked(item,false);

              if (has.throughAreaId) {
                let throughAreaIdArr = has.throughAreaId.split(',')
                throughAreaIdArr.forEach(subItem=>{
                  this.$refs.tree.setChecked(subItem,false);
                })
              }
            }
          })
        }
        console.log(this.$refs.tree.getCheckedNodes(),'000');
      }
    }
  };
</script>