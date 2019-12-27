import router from '../../router'
import Axios from 'axios'
import qs from 'qs'
export default {
  goPage(urlName){
    let paths=urlName ? '/'+urlName:'/'
    router.push({
      path: paths
    });
  },
  showTime(type) {
    let show_day=new Array('星期一','星期二','星期三','星期四','星期五','星期六','星期日');
    let time=new Date();
    let year=time.getFullYear();
    let month=time.getMonth();
    let date=time.getDate();
    let day=time.getDay();
    let hour=time.getHours();
    let minutes=time.getMinutes();
    let second=time.getSeconds();
    month=month+1;
    month<10?month='0'+month:month;
    date<10?date='0'+date:date;
    hour<10?hour='0'+hour:hour;
    minutes<10?minutes='0'+minutes:minutes;
    second<10?second='0'+second:second;
    if (type === 'ymd'){
      let now_time=year+'-'+month+'-'+date;
      return now_time
    }else if(type === 'hms'){
      let now_time=hour+':'+minutes+':'+second;
      return now_time
    }else if(type === 'y'){
      let now_time= year;
      return now_time
    }else if(type === 'w'){
      let now_time= show_day[day-1];
      return now_time
    }else if(type === 'm'){
      let now_time=month;
      return now_time;
    }else if(type === 's'){
      let now_time=date;
      return now_time;
    }else {
      let now_time=year+'-'+month+'-'+date+' '+hour+':'+minutes+':'+second;
      return now_time;
    }
  },
  timeDifference(startTime,endTime,type) {
    /*
    let date1= '2015/05/01 00:00:00';  //开始时间
    let date2 = new Date();    //结束时间
  */
    let date1= startTime;  //开始时间
    let date2 = endTime;    //结束时间
    // let date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数
    let date3 = new Date(date2).getTime() - new Date(date1).getTime();   //时间差的毫秒数
//------------------------------
//计算出相差天数
    let days=Math.floor(date3/(24*3600*1000));
//计算出小时数
    let leave1=date3%(24*3600*1000);   //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000));
//计算相差分钟数
    let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000));
//计算相差秒数
    let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000);
    hours<10?hours='0'+hours:hours;
    minutes<10?minutes='0'+minutes:minutes;
    seconds<10?seconds='0'+seconds:seconds;
    if (type === 'hms'){
      let data = hours+ ':'+ minutes+ ':'+ seconds;
      return data
    }else if(type === 'dhms'){
      let data = days+"天 "+hours+ ':'+ minutes+ ':'+ seconds;
      return data
    }else if(type==='dh'){
      let data = days+"天 "+hours+"小时";
      return data
    }
    // alert(days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
  },
  //获取本周开始/结束时间 "s"代表开始,"e"代表结束
  getMonday(type, dates) {
  var now = new Date();
  var nowTime = now.getTime();
  var day = now.getDay();
  var longTime = 24 * 60 * 60 * 1000;
  var n = longTime * 7 * (dates || 0);
  if (type == "s") {
    var dd = nowTime - (day - 1) * longTime + n;
  };
  if (type == "e") {
    var dd = nowTime + (7 - day) * longTime + n;
  };
  dd = new Date(dd);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  m = m < 10 ? "0" + m: m;
  d = d < 10 ? "0" + d: d;
  var day = y + "-" + m + "-" + d;
  return day;
},
//  获取本月开始/结束时间
   getMonth(type, months) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  };
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + months;
    };
  };
  month = month < 10 ? "0" + month: month;
  var date = d.getDate();
  var firstday = year + "-" + month + "-" + "01";
  var lastday = "";
  if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
    lastday = year + "-" + month + "-" + 31;
  } else if (month == "02") {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + "-" + month + "-" + 29;
    } else {
      lastday = year + "-" + month + "-" + 28;
    };
  } else {
    lastday = year + "-" + month + "-" + 30;
  };
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  };
  return day;
},
  //获取本年开始/结束时间
  getYear(type, dates) {
    var dd = new Date();
    var n = dates || 0;
    var year = dd.getFullYear() + Number(n);
    if (type == "s") {
      var day = year + "-01-01";
    };
    if (type == "e") {
      var day = year + "-12-31";
    };
    if (!type) {
      var day = year + "-01-01/" + year + "-12-31";
    };
    return day;
  },
  //todo 获取季度区间
  getQuarterMonth:function(btn,type){
    var now = new Date();
    var year = now.getFullYear();
    if(btn == "0"){
      var nowMonth = now.getMonth();
    }else{
      var nowMonth = now.getMonth()-3;
      if (nowMonth <= 0) {
        nowMonth = nowMonth + 12;
        year = year - 1;
      }
    }
    var quarterStartMonth = 1;
    if(nowMonth<3){
      quarterStartMonth = 1;
    }
    if(2<nowMonth && nowMonth<6){
      quarterStartMonth = 4;
    }
    if(5<nowMonth && nowMonth<9){
      quarterStartMonth = 7;
    }
    if(nowMonth>8){
      quarterStartMonth = 10;
    }
    if (type == "s") {
      var day = year+"-"+quarterStartMonth+"-01";
    };//1-3 4-6 7-9 10-12
    if (type == "e") {
      if(quarterStartMonth==1){
        var day = year+"-"+(quarterStartMonth+2)+"-31";
      }
      if(quarterStartMonth==10){
        var day = year+"-"+(quarterStartMonth+2)+"-31";
      }
      if(quarterStartMonth==4){
        var day = year+"-"+(quarterStartMonth+2)+"-30";
      }
      if(quarterStartMonth==7){
        var day = year+"-"+(quarterStartMonth+2)+"-30";
      }
    };
    return day;
  },
  //获取本季度开始/结束日期
  getquarter(type){
    let time=this.getQuarterMonth(0,type)
    return time
  },
 
// 导出Excel公用方法
exportMethod(data) {
  console.log(data)
  Axios({
      method: data.method,
      url: `${data.url}${data.params ? '?' + data.params : ''}`,
      responseType: 'blob',
      data:data.data
  }).then((res) => {
      const link = document.createElement('a')
      let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)

      // link.download = res.headers['content-disposition'] //下载后文件名
      link.download = data.fileName //下载的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  }).catch(error => {
      this.$Notice.error({
          title: '错误',
          desc: '网络连接错误',
         
      })
      console.log(error)
  })
},
}
