let moment = require("./moment.min.js")
function getDays() {
  let days = [];
  let d = new Date("2020-01-01");
  for(let i = 0; i<366; i++){
    if(d.getDay()===0||d.getDay()===6) {
      days.push(moment(new Date(d)).format("YYYY-MM-DD"));
    }
    d=new Date(d.getTime()+24*3600*1000);
  }
  console.log(days);
}
getDays();