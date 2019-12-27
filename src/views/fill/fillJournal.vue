<template>
  <vue-event-calendar :events="demoEvents" title="填报提醒" @day-changed="handleDayChanged" @month-changed="handleMonthChanged">
                     <template slot-scope="props">
                        <div v-for="(event, index) in props.showEvents" class="event-item classItem" :key="index" @click="routerFn(event)">
                         <div class="wrapper">
                            <h3 class="title">{{index+1+'.'+event.title}} </h3>
                            <p class="time">{{event.date}}</p>
                            <p class="desc"></p>
                        </div>                     
                        </div>
                      </template>
</vue-event-calendar>
<!--    <div>-->
<!--        <div style="width: 600px">-->
<!--            <ele-calendar :render-content="renderContent" :data="datedef" :prop="prop" @pick="pick"></ele-calendar>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
  // import eleCalendar from "ele-calendar";
  // import "ele-calendar/dist/vue-calendar.css";
export default {
  data () {
    return {
      datedef:[],
      prop: "date", //对应日期字段名
            demoEvents: [
//   {
//         date: '2019/11/15',   //date必须是这个格式啊。如果后台给的数据不是这个格式还必须转化为这个格式
//         title: '未填报',
//       },{
//         date: '2019/11/1',
//         title: '未填报'
//       },{
//         date: '2019/11/2',
//         title: '未填报'
//       }
]
    }
  },
  // components: {
  //   eleCalendar
  // },
    methods: {
  async tabledata(){
    let _this=this
    let url='/api/mh/findBetweenDate'
    let user=JSON.parse(sessionStorage.getItem('user'))
    let params={
      empCode:user.empCode,
      beginDate:this.$main.getMonth("s", 0),
      endDate:this.$main.showTime("ymd")
    }
    let {data}=await this.$axios.post(url,params)
    data.forEach((item,index) =>{
      _this.demoEvents.push({
        date:item,
        title: '未填报'
      })
    })
    console.log(_this.demoEvents,77)
  },
    //todo 跳转到填报页
    routerFn(item){
    this.$router.push({name:'fillArea',params:{
      date:item.date
      }})
    console.log(item,88)
    },
    pick(data, event, row, dom) {
      // console.log(data, event, row);
      let d = data;
      // var datetime =
      //   d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      // this.mobang.date = datetime;
      // this.mobang.day = row.text;
      // console.log(datetime);
    },
    renderContent(h, parmas) {

    },
                handleMonthChanged (month) {
      console.log(month)
    },
    handleDayChanged (day) {
      console.log(day)
    }
  },
  mounted() {
  this.tabledata()
  }
}
</script>
<style scoped>
.wrapper {
  margin: 0 ;
  max-width: 1000px;
}
.classItem{
    cursor: pointer;
}
</style>
