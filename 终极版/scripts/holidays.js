var lFestival=new Array(
	"0101  春节",
	"0115  元宵节",
	"0505  端午节",
	"0707  七夕节",
	"0715  中元节",
	"0815  中秋节",
	"0909  重阳节",
	"1208  腊八节"
	);

var solarTerm=new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至")
var sTermInfo=new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)

//国历节日  *表示放假日
var sFtv=new Array(
	"0101  元旦",
	"0214  情人节",
	"0308  妇女节",
	"0312  植树节",
	"0315  消费日",
	"0401  愚人节",
	"0501  劳动节",
	"0504  青年节",
	"0512  护士节",
	"0601  儿童节",
	"0701  建党节",
	"0801  建军节",
	"0910  教师节",
	"1001  国庆节",
	"1225  圣诞节"
	);
//某月的第几个星期几
var wFtv=new Array(
	"0520  母亲节",
	"0630  父亲节",
	"1144  感恩节");




function lHoliday(y,m){
	var holidayArray=new Array();
    var solarDate,lunarDate,lY,lM,lD=1,lL,lX=0,monDis,dayDis,length,firstWeek;
	var pos=new Array();
	var n=0;
	var firstLM=0;

	solarDate=new Date(y,m,1);            //当月一日日期
	length=solarMonthDays(y,m);           //国历当月天数
	firstWeek=solarDate.getDay();        //国历当月1日星期几

	for(var  i=0;i<length;i++){
		if(lD>lX) {
		solarDate=new Date(y,m,i+1);                  //当月一日日期
		lunarDate=new lunar(solarDate);                  //农历
		lY = lunarDate.year;                           //农历年
		lM = lunarDate.month;                          //农历月
		lD = lunarDate.day;                             //农历日
		lL = lunarDate.isLeap;                         //农历是否闰月
		lX = lL? leapDays(lY): monthDays(lY,lM);  //农历当月最後一天
		if(n==0) firstLM=lM;
		pos[n++]=i-lD+1;
		}
	lD++;
	}

	//农历节日
	for(i  in  lFestival)
		if(lFestival[i].match(/^(\d{2})(.{2})([\s])(.+)$/)){
			monDis=Number(RegExp.$1)-firstLM;
			if(monDis==-11)  
				monDis=1;
		if(monDis>=0&&monDis<n){
			dayDis = pos[monDis] + Number(RegExp.$2) -1;
		if(dayDis>=0&&dayDis<length){
			holidayArray[dayDis]=RegExp.$4+' ';
			}
		}
	   
	}
	return holidayArray; 
}

//某年的第n个节气为几日(从0小寒起算)
function  sTerm(y,n){
	var offDate=new Date((31556925974.7*(y-1900)+sTermInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
	return(offDate.getUTCDate());
}

function sTermHoliday(y,m){
	var first,second;
	var termArray=new Array();
	first=sTerm(y,m*2)-1;
	second=sTerm(y,m*2+1)-1;
	termArray[first]=solarTerm[m*2];
	termArray[second]=solarTerm[m*2+1];
	return termArray;
}

function sHoliday(y,m){
	var solarArray=new Array();
	for(var i in sFtv){
		if(sFtv[i].match(/^(\d{2})(.{2})([\s])(.+)$/)){
			if(Number(RegExp.$1)==(m+1)){
				solarArray[Number(RegExp.$2)-1]=RegExp.$4+" ";
			}
		}
	}
	return solarArray;
}

function yueZhouHoliday(y,m){
	var yueZhouArray=new Array();
	var weekth,dayth;
	var solarDate = new  Date(y,m,1);            //当月一日日期
	var firstWeek = solarDate.getDay();        //国历当月1日星期几
	for(var i in wFtv){
		if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s])(.+)$/)){
			if(Number(RegExp.$1)==(m+1)){
				weekth=Number(RegExp.$2);
				dayth=Number(RegExp.$3);
				yueZhouArray[(firstWeek>dayth?7:0)+7*(weekth-1)+dayth-firstWeek]=RegExp.$5+"";
			}
		}
	}
	return yueZhouArray;
}

function holidayComponent(solarYear,solarMonth){
	var holidayObject={};
	holidayObject.thisLHoliday=lHoliday(solarYear,solarMonth);
	holidayObject.thisTermHoliday=sTermHoliday(solarYear,solarMonth);
	holidayObject.thisSolarHoliday=sHoliday(solarYear,solarMonth);
	holidayObject.thisYueZhouHoliday=yueZhouHoliday(solarYear,solarMonth);

	 if(solarMonth===0){
	    holidayObject.lastLHoliday=lHoliday(solarYear-1,11);
	    holidayObject.nextLHoliday=lHoliday(solarYear,solarMonth+1);
	    holidayObject.lastTermHoliday=sTermHoliday(solarYear-1,11);
	    holidayObject.nextTermHoliday=sTermHoliday(solarYear,solarMonth+1);
	    holidayObject.lastSolarHoliday=sHoliday(solarYear-1,11);
	    holidayObject.nextSolarHoliday=sHoliday(solarYear,solarMonth+1);
	    holidayObject.lastYueZhouHoliday=yueZhouHoliday(solarYear-1,11);
	    holidayObject.nextYueZhouHoliday=yueZhouHoliday(solarYear,solarMonth+1);

	  }else if(solarMonth===11){
	    holidayObject.lastLHoliday=lHoliday(solarYear,solarMonth-1);
	    holidayObject.nextLHoliday=lHoliday(solarYear+1,0);
	    holidayObject.lastTermHoliday=sTermHoliday(solarYear,solarMonth-1);
	    holidayObject.nextTermHoliday=sTermHoliday(solarYear+1,0);
	    holidayObject.lastSolarHoliday=sHoliday(solarYear,solarMonth-1);
	    holidayObject.nextSolarHoliday=sHoliday(solarYear+1,0);
	    holidayObject.lastYueZhouHoliday=yueZhouHoliday(solarYear,solarMonth-1);
	    holidayObject.nextYueZhouHoliday=yueZhouHoliday(solarYear+1,0);
	  }else { 
	    holidayObject.lastLHoliday=lHoliday(solarYear,solarMonth-1);
	    holidayObject.nextLHoliday=lHoliday(solarYear,solarMonth+1);
	    holidayObject.lastTermHoliday=sTermHoliday(solarYear,solarMonth-1);
	    holidayObject.nextTermHoliday=sTermHoliday(solarYear,solarMonth+1);
	    holidayObject.lastSolarHoliday=sHoliday(solarYear,solarMonth-1);
	    holidayObject.nextSolarHoliday=sHoliday(solarYear,solarMonth+1);
	    holidayObject.lastYueZhouHoliday=yueZhouHoliday(solarYear,solarMonth-1);
	    holidayObject.nextYueZhouHoliday=yueZhouHoliday(solarYear,solarMonth+1);
	  }

	  return holidayObject;
}

function holidayHTML(lholidayCld,termholidayCld,solarHolidayCld,yueZhouHolidayCld,offset){
	var arr = new Array();
	var str=undefined;
	var strType=undefined;
	 if(lholidayCld[offset] != undefined)
      {
          str=lholidayCld[offset];
          strType="lunarHoliday";
        }else if(termholidayCld[offset] != undefined)
        {
          str=termholidayCld[offset];
          strType="sTermHoliday";
        }
        else if(solarHolidayCld[offset] != undefined)
        {
          str=solarHolidayCld[offset];
          strType="solarHoliday";
        }
        else if(yueZhouHolidayCld[offset] != undefined)
        {
          str=yueZhouHolidayCld[offset];
          strType="yueZhouHoliday";
      	}
      	arr[0]=str;
      	arr[1]=strType;
      return arr;
}