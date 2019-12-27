<template>
  <div>
    <p class="mainTitle">个人总工作状态统计</p>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图表" name="0">
        <topStatistics :otherTop="7"></topStatistics>
        <p class="tabname">{{name}}</p>
        <ve-pie
          :data="chartData"
          :extend="chartExtend"
          :settings="chartSettings"
          :events="chartEvents"
        ></ve-pie>
      </el-tab-pane>
      <el-tab-pane label="表格" name="1">
        <topStatistics :otherTop="7"></topStatistics>
        <el-table show-summary :data="tableData1" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="workAttribute" label="工作属性" width="150"></el-table-column>
          <el-table-column prop="workTime" label="上班时间" width="150"></el-table-column>
          <el-table-column label="出差时间">
            <el-table-column prop="travelInnerCityTime" label="市内出差"></el-table-column>
            <el-table-column prop="travelOutOfCityTime" label="市外出差"></el-table-column>
            <el-table-column label="小计" prop="travelTimes"></el-table-column>
          </el-table-column>
          <el-table-column label="请/休假时间">
            <el-table-column prop="holidayOfficeTime" label="办公室"></el-table-column>
            <el-table-column prop="holidayInnerCityTime" label="市内出差"></el-table-column>
            <el-table-column prop="holidayOutOfCityTime" label="市外出差"></el-table-column>
            <el-table-column label="小计" prop="holidayWorkTimes"></el-table-column>
          </el-table-column>
          <el-table-column label="合计" prop="addhm"></el-table-column>
          <el-table-column label="占比" prop="occupy"></el-table-column>
        </el-table>
        <table class="_table">
          <tr>
            <td
              style="width: 60%"
              rowspan="3"
            >（额定人工时：7.5小时/人.天 总额定工时：{{totalwork}}小时 请假：{{myholidaytime}}小时）</td>
            <td style="width: 40%">实到工时：{{heji}}小时</td>
          </tr>
          <tr>
            <td>应到工时：{{totalwork-myholidaytime}}小时</td>
          </tr>
          <tr>
            <td>理论负荷率：{{lfe}}%</td>
          </tr>
          <tr>
            <td colspan="2">
              注:总额定工时=额定工时*员工人数*统计天数
              <br />应到工时=总额定工时-请假时间
              <br />理论负荷率=实到工时/应到工时*100%
            </td>
          </tr>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    topStatistics: () => import("../../components/topStatistics.vue")
  },
  data() {
    var self = this;
    this.chartEvents = {
      click: function(e) {
        self.name = e.name;
        self.tabledataFn(self.pageParams.beginDate, self.pageParams.endDate);
      }
    };
    return {
      totalwork: 0, //总额定工时
      heji: 0,
      yunrs: 10,
      lfe: 0.21,
      myholidaytime: 0, //请休假时间
      name: "工程项目",
      tableData1: [],
      activeName: "0",
      chartSettings: {
        level: [
          ["工程项目", "科研技术基础工作", "管理、服务及其它"],
          ["上班时间", "出差时间", "请/休假时间"]
        ],
        radius: 150
      },
      chartExtend: {},
      chartData: {
        columns: ["name", "val"],
        rows: [
          { name: "工程项目", val: 10 },
          { name: "科研技术基础工作", val: 10 },
          { name: "管理、服务及其它", val: 10 },
          { name: "上班时间", val: 1 },
          { name: "出差时间", val: 1 },
          { name: "请/休假时间", val: 1 }
        ]
      },
      pageParams: {
        employees: [],
        beginDate: "2019-11-01",
        endDate: "2019-12-30"
      }
    };
  },
  methods: {
    getTime: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      _this.gettime = yy + "-" + mm + "-" + dd;
    },

    // 个人/部室统计
    async tabledataFn(satrt, end, employees) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      let emPcode = user.empCode;
      let pageParams = {
        beginDate: satrt ? satrt : this.$main.getMonth("s", 0),
        endDate: end ? end : this.$main.getMonth("e", 0),
        employees: employees ? employees : [], // 查询的的员工
        empCode: emPcode
      };
      // console.log(satrt,end,employees)
      this.pageParams.beginDate = pageParams.beginDate;
      this.pageParams.endDate = pageParams.endDate;
      let { data } = await this.axios.post(
        "/api/mh/statisticalAnalysisDept",
        pageParams
      );
      let _data = data.data;
      let _sum = 0;
      let _rows = [];
      let muban1 = {};
      let worktime = 0,
        holidayW = 0,
        travelT = 0;
      _data.forEach((item, index) => {
        if (item.holidayWorkTime) {
          item.holidayWorkTimes =
            item.holidayWorkTime.innerCityTime +
            item.holidayWorkTime.officeTime +
            item.holidayWorkTime.outOfCityTime;
          item.holidayInnerCityTime = item.holidayWorkTime.innerCityTime;
          item.holidayOfficeTime = item.holidayWorkTime.officeTime;
          item.holidayOutOfCityTime = item.holidayWorkTime.outOfCityTime;
        }
        if (item.travelTime) {
          item.travelTimes =
            item.travelTime.innerCityTime +
            item.travelTime.officeTime +
            item.travelTime.outOfCityTime;
          item.travelInnerCityTime = item.travelTime.innerCityTime;
          item.travelOfficeTime = item.travelTime.officeTime;
          item.travelOutOfCityTime = item.travelTime.outOfCityTime;
        }
        item.addhm = item.holidayWorkTimes + item.travelTimes + item.workTime;
        _sum += item.addhm;
        this.myholidaytime += item.holidayWorkTimes;
        if (this.name == "工程项目") {
          if (item.workAttribute == "工程项目") {
            _rows.push(
              { name: "上班时间", val: item.workTime },
              { name: "出差时间", val: item.travelTimes },
              { name: "请/休假时间", val: item.holidayWorkTimes }
            );
          }
        } else if (this.name == "科研技术基础工作") {
          if (item.workAttribute == "科研技术基础工作") {
            _rows.push(
              { name: "上班时间", val: item.workTime },
              { name: "出差时间", val: item.travelTimes },
              { name: "请/休假时间", val: item.holidayWorkTimes }
            );
          }
        } else if (this.name == "管理、服务及其它") {
          if (item.workAttribute == "管理、服务及其它") {
            _rows.push(
              { name: "上班时间", val: item.workTime },
              { name: "出差时间", val: item.travelTimes },
              { name: "请/休假时间", val: item.holidayWorkTimes }
            );
          }
        }
      });
      _data.forEach(item => {
        item.occupy = ((item.addhm / _sum) * 100).toFixed(2) + "%";
        muban1 = { name: item.workAttribute, val: item.addhm };
        _rows.push(muban1);
      });
      this.heji = _sum;
      this.chartData.rows = _rows;
      // console.log(this.myholidaytime, 11111111111);
      this.tableData1 = data.data;
      this.myyangon();
      console.log(this.tableData1);
    },
    myyangon() {
      var begindate = this.pageParams.beginDate;
      var enddate = this.pageParams.endDate;
      begindate = new Date(Date.parse(begindate.replace(/-/g, "/")));
      enddate = new Date(Date.parse(enddate.replace(/-/g, "/")));
      var startDate = begindate.getTime();
      var endDate = enddate.getTime();
      var day = parseInt((endDate - startDate) / 1000 / 3600 / 24); //结束日期减去开始日期后转换成天数
      console.log("day", day); //day 457
      this.totalwork = 7.5 * day * this.yunrs;
      this.lfe = (
        (this.heji / (this.totalwork - this.myholidaytime)) *
        100
      ).toFixed(2);
    },
    handleClick() {},
    //导出报表
    async deptFX() {
      let pageParams = [];
      this.tableData1.forEach((item, index) => {
        let mypageParams = {
          id: index + 1,
          workAttributeName: item.workAttribute,
          workTotalHour: item.workTime,
          travelInCity: item.travelInnerCityTime,
          travelOutCity: item.travelOutOfCityTime,
          travelTotal: item.travelTimes,
          holidayOffice: item.holidayOfficeTime,
          holidayInCity: item.holidayInnerCityTime,
          holidayOutCity: item.holidayOutOfCityTime,
          holidaytotal: item.holidayWorkTimes,
          total: item.addhm,
          proportion: item.occupy
        };
        pageParams.push(mypageParams);
      });
      let datas = {
                method: 'post',
                url:'/api/easypoi/deptFX',
                fileName: '个人/部室总人工时统计',
                data:pageParams
            }
      this.$main.exportMethod(datas)
    }
  },
  mounted() {
    this.tabledataFn().then(() => {
      this.myyangon();
    });
  }
};
</script>
<style scoped>
._table {
  width: 100%;
  border-collapse: collapse;
}
._table tr td {
  border: 1px solid #ebeef5;
  text-align: center;
  padding: 12px 0;
  color: #606266;
}
.tabname {
  color: blue;
  font-size: 20px;
  margin: 10px 0 0 80px;
}
</style>
