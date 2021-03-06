// Global加载其他函数

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

//获取本地时间
var today=new Date();
var now=document.getElementById("clock");
function nowTime(){
  var shiJian=new Date();
  var h=shiJian.getHours()<10?"0"+shiJian.getHours():shiJian.getHours();
  var m=shiJian.getMinutes()<10?"0"+shiJian.getMinutes():shiJian.getMinutes();
  var s=shiJian.getSeconds()<10?"0"+shiJian.getSeconds():shiJian.getSeconds();
	now.innerHTML="北京时间："+h+":"+m+":"+s;
	setTimeout('nowTime()',500);
}

//日历框架
function cFrame(){
  //年选择器，月选择器
  var str="";
  var nian=document.getElementById("nian");
  for(var i=1900;i<2050;i++){
    if (i!=today.getFullYear())
      str+="<option value="+i+">"+i+"</option>";
    else
      str+="<option value="+i+" selected='selected'>"+i+"</option>";
  }
  nian.innerHTML=str;
  nian.addEventListener("change",changeCalender);

  str="";
  var yue =document.getElementById("yue");
  for(var i=1;i<=12;i++){
    if(i!=(today.getMonth()+1))
      str+="<option value="+i+">"+i+"</option>";
    else
      str+="<option value="+i+" selected='selected'>"+i+"</option>";
  }
  yue.innerHTML=str;
  yue.addEventListener("change",changeCalender);


  //日历部分
	var frame=document.getElementById("calendar");
  var sframe="";
  var i,j,num=0;
  for(i=0;i<6;i++){
    sframe+="<tr>"
    for(j=0;j<7;j++){
      num=i*7+j;
      sframe+="<td id='"+num+"'></td>";
    }
    sframe+="</tr>"
  }
  frame.innerHTML=sframe;
}

/*//日历类,定义了全局变量solarYear,solarMonth,solarDay,solarWeek,leapYear,leapMonth,leapDay,isLeap
function element(solarYear,solarMonth,solarDay,solarWeek,leapYear,leapMonth,leapDay,isLeap)
{
  this.isToday=false;
  this.solarYear=solarYear;
  this.solarMonth=solarMonth;
  this.solarDay=solarDay;
  this.solarWeek=solarWeek;

  this.leapYear=leapYear;
  this.leapMonth=leapMonth;
  this.leapDay=leapDay;
  this.isLeap=isLeap;
}*/


//国历部分：求国历某年某月的天数（y年m+1月（m：0~11））
function solarMonthDays(y,m){
  if(m>11||m<0) return ;
  if(m==1){
    return ((((y%4==0)&&(y%100!=0))||(y%400==0))?29:28);
  }
  else
  {
    switch(m){
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
        break;
      default:
        return 30;
        break;
    }
  }
}

//日历组件
function calenderComponent(solarYear,solarMonth){

  var cal={};
  var thisDay=new Date(solarYear,solarMonth,1);
  //firstDay--国历当月第一天是星期几
  cal.firstDay=thisDay.getDay();
  //thisMLength--国历当月长度 
  cal.thisMLength=solarMonthDays(solarYear,solarMonth);
  if(solarMonth===0){
    //lastMLength--国历上一个月长度 
    cal.lastMLength=solarMonthDays(solarYear-1,11);
    //nextMLength--国历下一个月长度
    cal.nextMLength=solarMonthDays(solarYear,solarMonth+1);
  }else if(solarMonth===11){
    cal.lastMLength=solarMonthDays(solarYear,solarMonth-1);
    cal.nextMLength=solarMonthDays(solarYear+1,0);
  }else { 
    cal.lastMLength=solarMonthDays(solarYear,solarMonth-1);
    cal.nextMLength=solarMonthDays(solarYear,solarMonth+1);
  }

  return cal;
}

//渲染日历
function drawCalendar(solarYear,solarMonth){
  var cal=calenderComponent(solarYear,solarMonth);
  var offset1=cal.firstDay-1;
  var offset2=cal.firstDay+cal.thisMLength-1;

  //work2
  var lunarCld  =lunarCalenderComponent(solarYear,solarMonth);



  for(var i=0;i<42;i++){
    var dayNum=document.getElementById(i);
        dayNum.innerHTML=" ";
        dayNum.removeAttribute("class");
  }
  
  for(var i=0;i<42;i++){
    var dayNum=document.getElementById(i);
    var day1,day2,day3;
    if(i<=offset1){
      day1=cal.lastMLength-offset1+i;
      dayNum.innerHTML+=day1;
      dayNum.setAttribute("class","cross-month");

      //work2
      dayNum.innerHTML  +=  chineseDay(lunarCld.lastMonth[day1-1].lDay);

    }else if(i>offset2){
      day2=i-offset2;
      dayNum.innerHTML+=day2;
      dayNum.setAttribute("class","cross-month");

      //work2
      if(lunarCld.nextMonth[day2-1].lDay==1)  
          dayNum.innerHTML  +=  nStr3[lunarCld.nextMonth[day2-1].lMonth]  +  "月"  +  (monthDays(lunarCld.nextMonth[day2-1].lYear,lunarCld.nextMonth[day2-1].lMonth)==29?"小":"大");
      else  
          dayNum.innerHTML  +=  chineseDay(lunarCld.nextMonth[day2-1].lDay);

    }else{
      day3=i-offset1;
      dayNum.innerHTML+=day3;

      //work2
      if(lunarCld.thisMonth[day3-1].lDay==1)  
          dayNum.innerHTML  +=  nStr3[lunarCld.thisMonth[day3-1].lMonth]  +  "月"  +  (monthDays(lunarCld.thisMonth[day3-1].lYear,lunarCld.thisMonth[day3-1].lMonth)==29?"小":"大");
      else  
          dayNum.innerHTML  +=  chineseDay(lunarCld.thisMonth[day3-1].lDay);
      }


  }
}

function changeCalender(){
  var nian=document.getElementById("nian").selectedIndex+1900;
  var yue=document.getElementById("yue").selectedIndex;
  drawCalendar(nian,yue);
}

function initial(){
	nowTime();
  cFrame();
  drawCalendar(today.getFullYear(),today.getMonth());
}
addLoadEvent(initial);