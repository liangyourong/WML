/*某一天具体信息模块*/

var YiJi = new Array(
        "祭祀","祈福","塑像","开光","求嗣","斋醮","出行","出火","入学",
        "剃头","分居","冠笄","嫁娶","安床","拆卸","修造","挂匾","开市",
        "纳财","捕捉","纳畜","入殓","除灵","破土","移柩","启攒","安葬","谢土");

//某天的详细信息
function dateDetail(y,m,d){
  var solar = document.getElementById("solar");
  var day = document.getElementById("day");
  var lunar = document.getElementById("lunar");
  var TianDi = document.getElementById("TianDi");
  var animal = document.getElementById("animal");
  var solardate = new Date(y,m,d);
  var lunarCld = lunarCalender(y,m);
  var detailDay = solardate.getDate();

  solar.innerHTML = ""+solardate.getFullYear()+"-"+((solardate.getMonth()+1)<10?("0"+(solardate.getMonth()+1)):(solardate.getMonth()+1))+"-"+(detailDay<10?("0"+detailDay):detailDay);
  solar.innerHTML += " 星期"+nStr1[solardate.getDay()];
  day.innerHTML = ""+detailDay;
  lunar.innerHTML = "农历"+nStr1[lunarCld[detailDay-1].lMonth]+"月"+chineseDay(lunarCld[detailDay-1].lDay);
  TianDi.innerHTML = ""+lunarCld[detailDay-1].cYear+"年"+lunarCld[detailDay-1].cMonth+"月"+lunarCld[detailDay-1].cDay+"日";
  animal.innerHTML = "["+Animals[(solardate.getFullYear()-1900)%12]+"年]";

/*
  //设置容器背景
  var container = document.getElementById("detailContainer");
  var firstWeek = solardate.getDay();
  var position = detailDay+firstWeek-1;
  var detailTd = document.getElementById(position);
  var dayType = detailTd.getAttribute("daytype");
  container.setAttribute("class",dayType);
  */
}

//模拟黄历择日事宜
function shiYi(){
  var array = [];
  var flag = 0;
  for(var i=0; i<10; i++){
      var r = (Math.ceil(Math.random() * 28)-1);
      for(var j=0; j<array.length; j++){
          if(array[j] == YiJi[r]){
              i--;
              break;
              flag = 1;
          }
      }

      if(flag == 1){
          flag = 0;
      }
      else{
          array[array.length] = YiJi[r];
      }
  }

  var yiSpan = document.getElementById("Yi");
  var jiSpan = document.getElementById("Ji");
  yiSpan.innerHTML = " ";
  jiSpan.innerHTML = " ";
  var index = Math.ceil(Math.random() * 10)-1;
  var str1 = "",str2 = "";
  while(index<2 || index>6)
    index = Math.ceil(Math.random() * 10)-1;
    for(var i=0; i<index; i++){
          str1 += " "+array[i]+"&nbsp;";
          if(i%2 == 1)
            str1 += "<br/>";
    }

    var count = 0;
    for(var i=index; i<10; i++){
          str2 += " "+array[i]+"&nbsp;";
          count++;
          if(count%2 == 0)
            str2 += "<br/>";
    }
    yiSpan.innerHTML = str1;
    jiSpan.innerHTML = str2;

}