<template>
  <div class="home">
    <el-container class="dirColumn h100vh">
      <!--头部-->
      <el-header height="h80px" class="wbhc bg3489c9">
        <div>
          <img src="../assets/img/logo2.png" alt="">
        </div>
        <div class="disF">
          <el-avatar shape="square" size="large">
            <img src="../assets/img/avatar.png" alt="">
          </el-avatar>
          <div class="userInfoD">
            <p>欢迎您：张三</p>
            <p>注销账号</p>
          </div>
        </div>
      </el-header>
      <el-container>
        <!--左侧导航-->
        <el-aside width="260px" class="el-asideD">
          <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            router
            @open=""
            @close="">
            <el-submenu v-for="(item,index) in navArr" :key="index" :index="item.name">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="(subItem,subIndex) in item.child" :key="subIndex"
                            :index="subItem.path">{{subItem.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--内容区-->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      navArr:[
        {
          name:'填报区',
          icon:'el-icon-document',
          child:[
            {
              name:'填报',
              path:'/home/fillArea',
            },
            {
              name:'填报记录',
              path:'/home/fillRecord',
            }]
        },
        {
          name:'统计区',
          icon:'el-icon-pie-chart',
          child:[
            {
              name:'个人/部室总人工时统计',
              path:'/home/PersonalStatistics',
            },
            {
              name:'工程项目人工时统计',
              path:'/home/ProjectStatistics',
            },
            {
              name:'科研技术基础工作人工时统计',
              path:'/home/ScientificStatistics',
            },
            {
              name:'管理、服务及其他人工时统计',
              path:'/home/ManagementStatistical',
            },
          ]
        },
        {
          name:'明细查询',
          icon:'el-icon-s-data',
          child:[
            {
              name:'个人/部室总人工时明细',
              path:'/home/PersonalDetails',
            },
            {
              name:'工程项目人工时明细',
              path:'/home/ProjectDetails',
            },
            {
              name:'科研技术基础工作人工时明细',
              path:'/home/ScientificDetails',
            },
            {
              name:'管理、服务及其他人工时明细',
              path:'/home/ManagementDetails',
            },
          ]
        },
        {
          name:'工程项目定制报表',
          icon:'el-icon-s-cooperation',
          child:[
            {
              name:'表格报表',
              path:'/home/ProjectReport_form'
            },
            {
              name:'图形报表',
              path:'/home/ProjectReport_graphics'
            }
          ]
        },
        {
          name:'科研技术基础工作定制报表',
          icon:'el-icon-s-order',
          child:[
            {
              name:'表格报表',
              path:'/home/ScientificReport_form'
            },
            {
              name:'图形报表',
              path:'/home/ScientificReport_graphics'
            }
          ]
        },
        {
          name:'系统管理',
          icon:'el-icon-menu',
          child:[
            {
              name:'数据字典管理',
              path:'/home/DataDictionary'
            },
            {
              name:'查询权限设置',
              path:'/home/PermissionsSet'
            },
            {
              name:'科研技术基础工作数据导入',
              path:'/home/ScientificDataImport'
            },
            {
              name:'门禁系统映射管理',
              path:'/home/GuardManagement'
            },
            {
              name:'页面导航管理',
              path:'/home/PageManagement'
            },
            {
              name:'API设置',
              path:'/home/APISet'
            },
            {
              name:'角色设置',
              path:'/home/CharacterSet'
            },
            {
              name:'班休计划设置',
              path:'/home/PlanSet'
            }
          ]
        }
      ]
    }
  },
  components: {

    // HelloWorld
  }
}
</script>
<style scoped>
  .h80px{
    height: 80px;
  }
</style>
