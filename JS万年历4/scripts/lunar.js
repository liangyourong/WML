/*
*15行，每行10个数据。每个数据代表一年，从阳历1900.1.31日起，为第一个数据年的开始，
*即阳历1900.1.31＝阴历0.1.1。150个数据可推150年的阴历，因此目前最大只能推算到
*2049年，以后的推导，还需要从天文台得到新的数据后才能推导，否则出现误差。要推算阴
*历，关键是理解这些数据的意义。
*拿第一个数据来说，代表阳历1900.1.31为始的阴历0年，0x04bd8是5个16进制数，共20bit。
*前4位，即0在这一年是润年时才有意义，它代表这年润月的大小月，为1则润大月，为0则润小
*月。中间12位，即4bd，每位代表一个月，为1则为大月，为0则为小月。最后4位，即8，代表
*这一年的润月月份，为0则不润。首4位要与末4位搭配使用。
*/
var  lunarInfo=new  Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)
var  Gan=new  Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var  Zhi=new  Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var  solarTerm  =  new  Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至")
var  sTermInfo  =  new  Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)
var  nStr1  =  new  Array('日','一','二','三','四','五','六','七','八','九','十');
var  nStr2  =  new  Array('初','十','廿','卅','　');
var  nStr3  =  new  Array('日','一','二','三','四','五','六','七','八','九','十','十一','十二');
var  Animals=new  Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");

//y年的农历总天数
function lYearDays(y){
    var  i, sum=348;
    for(i=0x8000;i>0x8;i>>=1)  
        sum+=(lunarInfo[y-1900] & i)? 1: 0;
    return(sum+leapDays(y));
}

//y年农历闰月的天数
function  leapDays(y){
    if(leapMonth(y))    
        return((lunarInfo[y-1900] & 0x10000)? 30: 29);
    else  
        return(0);
}

//y年闰哪个月1-12,没闰传回0；
function  leapMonth(y)  {
    return(lunarInfo[y-1900] & 0xf);
}

//y年m月的总天数
function  monthDays(y,m)  {
    return(  (lunarInfo[y-1900] & (0x10000>>m))?  30:  29  );
}

//传回干支,0=甲子
function  cyclical(num)  {
return(Gan[num%10]+Zhi[num%12])
}

function lunar(solarDate){
    var options={
        "year":0,
        "month":0,
        "day":0,
        "yearC":0,
        "monthC":0,
        "dayC":0,
        "isLeap":false
    }
    var  i,leap=0,reduce=0;
    var  baseDate=new  Date(1900,0,31);
    var  offset=(solarDate - baseDate)/86400000;

    options.dayC=offset+40;
    options.monthC=14;

    for(i=1900; i<2050 && offset>0;i++){
        reduce=lYearDays(i);
        offset -= reduce;
        options.monthC += 12;
    }
    if(offset<0){
        offset  +=  reduce;
        i--;
        options.monthC -=  12;
        }
    options.year=i;
    options.yearC=i-1864;

    leap=leapMonth(i);
    options.isLeap=false;

    for(i=1;i<13&&offset>0;i++){
        if(leap>0 &&i==(leap+1)&&options.isLeap==false){  
            --i;  
            options.isLeap = true;  
            reduce = leapDays(options.year);  
        }
        else
        {  
            reduce = monthDays(options.year, i);  
        }

        if(options.isLeap == true && i== (leap+1)) 
            options.isLeap = false;

        offset -= reduce;
        if(options.isLeap == false)  
            options.monthC ++;
    }

    if(offset==0  && leap>0 && i==leap+1)
        if(options.isLeap){ 
            options.isLeap = false; 
        }
        else{
            options.isLeap = true;  
            --i;  
            --options.monthC;
        }

    if(offset<0)
        {  
        offset += reduce;  
        --i; 
        --options.monthC;  
    }
    options.month = i;
    options.day = offset + 1;
    return options;
}

//==============================  月历属性
function  Element(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay)  {
    var options={
        "sYear":0,
        "sMonth":0,
        "sDay":0,
        "week":0,
        "lYear":0,
        "lMonth":0,
        "lDay":0,
        "isLeap":false,
        "cYear":0,
        "cMonth":0,
        "cDay":0,
        "lunarFestival":"",
        "solarFestival":"",
        "solarTerms":""
    }
    //国历
    options.sYear            =  sYear;
    options.sMonth          =  sMonth;
    options.sDay              =  sDay;
    options.week              =  week;
    //农历
    options.lYear            =  lYear;
    options.lMonth          =  lMonth;
    options.lDay              =  lDay;
    options.isLeap          =  isLeap;
    //干支
    options.cYear            =  cYear;
    options.cMonth          =  cMonth;
    options.cDay              =  cDay;

    return options;
}
//传回农历日历  (y年,m+1月)
function  lunarCalender(y,m)  {
    var lunarArray=new Array();
    var  solarDate,lunarDate,lY,lM,lD=1,lL,monthEnd=0,length,firstWeek;
    solarDate = new  Date(y,m,1);                                //当月一日日期
    length = solarMonthDays(y,m);                                //国历当月天数
    firstWeek = solarDate.getDay();                             //国历当月1日星期几

    for(var  i=0;i<length;i++)  {
        if(lD>monthEnd)  {
            solarDate = new  Date(y,m,i+1);                     //当月一日日期
            lunarDate = lunar(solarDate);                       //农历
            lY = lunarDate.year;                                //农历年
            lM = lunarDate.month;                               //农历月
            lD = lunarDate.day;                                 //农历日
            lL = lunarDate.isLeap;                              //农历是否闰月
            monthEnd  = lL? leapDays(lY): monthDays(lY,lM);     //农历当月最後一天
        }
        lunarArray[i] = Element(y, m+1, i+1, nStr1[(i+firstWeek)%7],lY, lM, lD++, lL,
        cyclical(lunarDate.yearC) ,cyclical(lunarDate.monthC), cyclical(lunarDate.dayC++) );
        }
        return lunarArray;
}



//农历中文日期
function  chineseDay(d){
var  s;
switch  (d)  {
    case  10:
        s = "初十"; 
        break;
    case  20:
        s = "二十";
        break;
    case  30:
        s = "三十";
        break;
    default  :
        s = nStr2[Math.floor(d/10)];
        s += nStr1[d%10];
    }
    return(s);
}

function lunarCalenderComponent(solarYear,solarMonth){
    var lunnarObject={};
    lunnarObject.thisMonth=lunarCalender(solarYear,solarMonth);

    if(solarMonth===0){
        lunnarObject.lastMonth=lunarCalender(solarYear-1,11);
        lunnarObject.nextMonth=lunarCalender(solarYear,solarMonth+1);
      }else if(solarMonth===11){
        lunnarObject.lastMonth=lunarCalender(solarYear,solarMonth-1);
        lunnarObject.nextMonth=lunarCalender(solarYear+1,0);
      }else { 
        lunnarObject.lastMonth=lunarCalender(solarYear,solarMonth-1);
        lunnarObject.nextMonth=lunarCalender(solarYear,solarMonth+1);
      }

      return lunnarObject;
}