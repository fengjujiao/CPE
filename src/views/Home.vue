<template>
  <div class="home">
    <el-container class="dirColumn h100vh">
      <!--头部-->
      <el-header height="80px" class="wbhc">
        <div style="display:flex">
          <img src="../assets/img/logo_02.png" class="logobox" alt /><p class="peccYg">&nbsp;| 员工工作状态管理平台</p>
        </div>
        <div class="disF">
          <el-avatar shape="square" size="large">
            <img src="../assets/img/avatar.png" alt />
          </el-avatar>
          <div class="userInfoD mlf10">
            <p class="textC userName">{{name}}</p>
            <p>欢迎您</p>
          </div>
          <p class="wchc cuP" @click="Cancellation">
            <img src="../assets/img/loginOut.png" alt />
          </p>
        </div>
      </el-header>
      <el-container>
        <!--左侧导航-->
        <el-aside width="80px" class="el-asideD">
          <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            router
            ref="menuRef"
            @open="openMenu"
            @close="closeMenu"
          >
            <el-submenu v-for="(item,index) in navArr" :key="index" :index="item.name">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                v-for="(subItem,subIndex) in item.child"
                :key="subIndex"
                :default-openeds="[1]"
                :index="subItem.path"
              >{{subItem.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--内容区-->
        <el-main class="homeMainD">
          <!--<router-view class="bg254" />-->
          <router-view :class="$route.name=='fillArea'?'':'bg254'" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      name: "",
      navArr: [
        {
          name: "填报区",
          icon: "el-icon-document",
          path: "/home/fillArea",
          child: [
            {
              name: "填报",
              path: "/home/fillArea"
            },
            {
              name: "填报记录",
              path: "/home/fillRecord"
            },
            {
              name: "填报日历",
              path: "/home/fillJournal"
            }
          ]
        },
        {
          name: "统计区",
          icon: "el-icon-pie-chart",
          child: [
            {
              name: "个人总工作状态统计",
              path: "/home/PersonalStatistics"
            },
            {
              name: "部室总工作状态统计",
              path: "/home/departmentStatistical"
            },
            {
              name: "工程项目工作状态统计",
              path: "/home/ProjectStatistics"
            },
            {
              name: "科研技术基础工作状态统计",
              path: "/home/ScientificStatistics"
            },
            {
              name: "管理、服务及其他工作状态统计",
              path: "/home/ManagementStatistical"
            }
          ]
        },
        {
          name: "明细查询",
          icon: "el-icon-s-data",
          child: [
            {
              name: "个人总工作状态明细",
              path: "/home/PersonalDetails"
            },
            {
              name: "部室总工作状态明细",
              path: "/home/departmentDetails"
            },
            {
              name: "工程项目工作状态明细",
              path: "/home/ProjectDetails"
            },
            {
              name: "科研技术基础工作状态明细",
              path: "/home/ScientificDetails"
            },
            {
              name: "管理、服务及其他工作状态明细",
              path: "/home/ManagementDetails"
            }
          ]
        },
        {
          name: "工程项目定制报表",
          icon: "el-icon-s-cooperation",
          child: [
            {
              name: "表格报表",
              path: "/home/ProjectReport_form"
            },
            {
              name: "图形报表",
              path: "/home/ProjectReport_graphics"
            },
            {
              name: "自制表格",
              path: "/home/ProjectReport_DIYform"
            }
          ]
        },
        {
          name: "科研技术基础工作定制报表",
          icon: "el-icon-s-order",
          child: [
            {
              name: "表格报表",
              path: "/home/ScientificReport_form"
            },
            {
              name: "图形报表",
              path: "/home/ScientificReport_graphics"
            },
            {
              name: "自制表格",
              path: "/home/ScientificReport_DIYform"
            }
          ]
        },
        // {
        //   name: "自定义报表",
        //   icon: "el-icon-s-order",
        //   child: [
        //     {
        //       name: "我的表格报表",
        //       path: "/home/CustomReport_form"
        //     },
        //     {
        //       name: "我的图形报表",
        //       path: "/home/CustomReport_graphics"
        //     },
        //     {
        //       name: "自定义报表",
        //       path: "/home/CustomReport_DIYform"
        //     }
        //   ]
        // },
        {
          name: "系统管理",
          icon: "el-icon-menu",
          child: [
            {
              name: "数据字典管理",
              path: "/home/DataDictionary"
            },
            {
              name: "查询权限设置",
              path: "/home/PermissionsSet"
            },
            /*{
              name:'科研技术基础工作数据导入',
              path:'/home/ScientificDataImport'
            },*/
            {
              name: "系统映射管理",
              path: "/home/GuardManagement"
            },
            // {
            //   name: "车辆门禁系统映射管理",
            //   path: "/home/VehicleManagement"
            // },
            // {
            //   name: "工程出差系统映射管理",
            //   path: "/home/BusinesstripManangment"
            // },
            /*{
              name:'页面导航管理',
              path:'/home/PageManagement'
            },
            {
              name:'API设置',
              path:'/home/APISet'
            },*/
            {
              name: "角色设置",
              path: "/home/CharacterSet"
            },
            {
              name: "班休计划设置",
              path: "/home/PlanSet"
            }
          ]
        }
      ]
    };
  },
  components: {
    // HelloWorld
  },
  methods: {
    openMenu(name) {
      let _index = this.navArr.find(val => {
        return val.name == name;
      });
      this.$router.push({
        path: _index.child[0].path
      });
    },
    closeMenu(name) {
      this.$refs.menuRef.open(name);
    },
    Cancellation(name) {
      this.$router.push({
        name: "login"
      });
      sessionStorage.clear();
    },

  },
  mounted() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.name = user.name;
  }
};
</script>
<style scoped>
.logobox{
  height: 55px;
}
.peccYg{
  font-size: 25px;
  color: #646464;
  padding-top: 16px
}
</style>
