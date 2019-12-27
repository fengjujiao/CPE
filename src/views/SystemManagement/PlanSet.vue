
<template>
  <div>
    <p class="mainTitle">班休计划</p>
    <div style="display:flex">
      <div style="width: 600px">
        <ele-calendar :render-content="renderContent" :data="datedef" :prop="prop" @pick="pick"></ele-calendar>
      </div>
      <div class="wengbeng">
        <p>{{mobang.date}}</p>
        <p class="daybox">{{mobang.day}}</p>
        <p>设置班休计划</p>
       <p>
         <button round @click="deleteFn(1)" class="btn">休息</button>
         <button @click="deleteFn(0)" class="btn">上班</button>
       </p>
      </div>
    </div>
  </div>
</template>
<script>
import eleCalendar from "ele-calendar";
import "ele-calendar/dist/vue-calendar.css";
export default {
  data() {
    return {
      //模板
      mobang: {
        date: this.$main.showTime('ymd'),
        content: null,
        cid: null,
        day: this.$main.showTime('s'),
        text: "上班"
      },
      datedef: [
        // {
        //   date: "2019-12-03",
        //   content: null,
        //   cid: null,
        //   day:3,
        //   text: "休息"
        // },
        // {
        //   date: "2019-12-01",
        //   content: null,
        //   cid: null,
        //   day:1,
        //   text: "上班"
        // }
      ],
      prop: "date" //对应日期字段名
    };
  },
  components: {
    eleCalendar
  },
  mounted(){
    this.tabledata()
  },
  methods: {
    async tabledata(){
      let url='/api/workPlan/findByDate'
      let parmas={
        beginDate: this.$main.getMonth("s", 0),
        endDate:this.$main.getMonth("e", 0)
      }
      let {data}=await this.$axios.get(url,{ params: parmas})
      if(data.code==0){
        data.data.forEach((item,index) =>{
          if(item.state==0){ //上班
            item.text='上班'
          }else if(item.state==1){ //休息
            item.text='休息'
          }
        })
        this.datedef=data.data
        console.log(this.datedef)

      }
    },
    renderContent(h, parmas) {
      const loop = data => {
        if (data.defvalue.value.text === "休息") {
          return data.defvalue.value ? (
            <div>
              <div>{data.defvalue.text}</div>
              <span>休息</span>
            </div>
          ) : (
            <div>{data.defvalue.text}</div>
          );
        } else if (data.defvalue.value.text === "上班") {
          return data.defvalue.value ? (
            <div>
              <div>{data.defvalue.text}</div>
              <span>上班</span>
            </div>
          ) : (
            <div>{data.defvalue.text}</div>
          );
        } else {
          return data.defvalue.value ? (
            <div>
              <div>{data.defvalue.text}</div>
            </div>
          ) : (
            <div>{data.defvalue.text}</div>
          );
        }
      };
      return <div style="min-height:60px;">{loop(parmas)}</div>;
    },
    pick(data, event, row, dom) {
     // console.log(data, event, row);
      let d = data;
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.mobang.date = datetime;
      this.mobang.day = row.text;
      console.log(datetime);
    },
    //todo 设置上班/休息
    async deleteFn(val){
      let url='/api/workPlan/save'
      let params={
        date:this.mobang.date,
        state:val
      }
      let {data}=await this.$axios.post(url,params)
      if(data.code==0){
        this.$message({
          message: data.msg,
          type: 'success'
        });
        this.tabledata()
      }else{
        this.$message.error(data.msg);
      }
    }
  }
};
</script>
<style scoped >
.wengbeng {
  border: 1px solid #ddd;
  box-shadow: 0px 4px 10px 1px #ddd;
  margin: 0 20px;
  width: 250px;
  text-align: center;
  padding: 10px;
  background: rgb(51, 119, 207);
  color: #fff;
  padding-top: 30px;
}
.daybox{
    font-size: 60px;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 50px;
    background: rgb(30, 9, 218);
    margin: 30px auto;
}
.btn:first-child{
  margin-right: 10%;
}
  .wengbeng .btn{
    cursor: pointer;
    margin-top: 5%;
    padding: 2px 8px;
    outline: none;
    border-radius: 5px;
    border: none;
  }
</style>
