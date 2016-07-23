/*
小功能模块，点具体日期会改变具体信息模块，实现上一年，下一年，上一个月，下一个月，回到今天。
*/

//按某个日子会改变DETAIL的信息
var container = document.getElementById("detailContainer");
function clickDate(){
        var frame=document.getElementById("calendar");
        frame.addEventListener("click",function(event){
                var td;
                if(event.target.tagName.toLowerCase() =="td"){
                        td=event.target;
                }else if(event.target.tagName.toLowerCase() =="span"){
                        td=event.target.parentNode;
                }else {
                        return;
                }
                var y = parseInt(td.getAttribute("solarNian"));
                var m = parseInt(td.getAttribute("solarYue"));
                var d = parseInt(td.getAttribute("solarRi"));
                dateDetail(y,m-1,d);
                shiYi();
        },false);
}

//给五个按钮添加监听事件
function buttonInit(){
        var lastYear = document.getElementById("lastYear");
        lastYear.addEventListener("click",subYear);
        var nextYear = document.getElementById("nextYear");
        nextYear.addEventListener("click",addYear);
        var lastMonth = document.getElementById("lastMonth");
        lastMonth.addEventListener("click",subMonth);
        var nextMonth = document.getElementById("nextMonth");
        nextMonth.addEventListener("click",addMonth);
        var JiTian = document.getElementById("JiTian");
        JiTian.addEventListener("click",backToJiTian);
}

function addYear(){
        var niannum = document.getElementById("nian").selectedIndex+1;
        if(niannum<=149){
                document.getElementById('nian').getElementsByTagName('option')[niannum].selected=true;
                changeCalender();
        }else{
                return;
        }
}
function subYear(){
        var niannum = document.getElementById("nian").selectedIndex-1;
        if(niannum>0){
                document.getElementById('nian').getElementsByTagName('option')[niannum].selected=true;
                changeCalender();
        }else{
                return;
        }
}

function subMonth(){
        var yuenum = document.getElementById("yue").selectedIndex-1;
        var niannum = document.getElementById("nian").selectedIndex;
        if(yuenum>=0){
                document.getElementById('yue').getElementsByTagName('option')[yuenum].selected=true;
                changeCalender();
        }else if(niannum-1 >0) {
                var niannum=niannum-1;
                var yuenum=11;
                document.getElementById('nian').getElementsByTagName('option')[niannum].selected=true;
                document.getElementById('yue').getElementsByTagName('option')[yuenum].selected=true;
                changeCalender();
        }
        else {
                return ;
        }
}

function addMonth(){
        var yuenum = document.getElementById("yue").selectedIndex+1;
        var niannum = document.getElementById("nian").selectedIndex;
        if(yuenum<12){
                document.getElementById('yue').getElementsByTagName('option')[yuenum].selected=true;
                changeCalender();
        }else if(niannum+1 <=149) {
                var niannum=niannum+1;
                var yuenum=0;
                document.getElementById('nian').getElementsByTagName('option')[niannum].selected=true;
                document.getElementById('yue').getElementsByTagName('option')[yuenum].selected=true;
                changeCalender();
        }
        else {
                return ;
        }
}

function backToJiTian(){
        var niannum=today.getFullYear();
        var yuenum=today.getMonth();
        document.getElementById('nian').getElementsByTagName('option')[niannum-1900].selected=true;
        document.getElementById('yue').getElementsByTagName('option')[yuenum].selected=true;
        changeCalender();
        dateDetail(today.getFullYear(),today.getMonth(),today.getDate());
        shiYi();
}


buttonInit();

