


/*************************************把样式中的px替换成rem***START***************************************/
var htmlStr=document.getElementsByTagName("style")[0].innerHTML;
var newStr=htmlStr.replace(/(\d+)px/g,function(a,b){
    return   ((b/75)+"").substr(0,6)+"rem";
})
document.getElementsByTagName("style")[0].innerHTML=newStr;
/*************************************把样式中的px替换成rem***END***************************************/

function getQueryParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null)
        return decodeURIComponent(r[2]);
    return null;
};
function dateFmt(date,fmt){


    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;

}
