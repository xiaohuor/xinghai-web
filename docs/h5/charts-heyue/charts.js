const charts = {
  medicine: [
    {
      date: "1.22",
      value: 800,
    },
    {
      date: "1.23",
      value: 800,
    },
    {
      date: "1.24",
      value: 800,
    },
    {
      date: "1.25",
      value: 800,
    },
    {
      date: "1.26",
      value: 700,
    },
    {
      date: "1.27",
      value: 700,
    },
    {
      date: "1.28",
      value: 700,
    },
    {
      date: "1.29",
      value: 700,
    },
    {
      date: "1.30",
      value: 600,
    },
    {
      date: "1.31",
      value: 600,
    },
    {
      date: "2.1",
      value: 600,
    },
    {
      date: "2.2",
      value: 600,
    },
    {
      date: "2.3",
      value: 800,
    },
    {
      date: "2.4",
      value: 600,
    },
    {
      date: "2.5",
      value: 600,
    },
    {
      date: "2.6",
      value: 500,
    },
  ],
  shopping: [
    {
      date: "1.25",
      value: 1,
    },
    {
      date: "1.26",
      value: 0,
    },
    {
      date: "1.27",
      value: 0,
    },
    {
      date: "1.28",
      value: 0,
    },
    {
      date: "1.29",
      value: 1,
    },
    {
      date: "1.30",
      value: 2,
    },
    {
      date: "1.31",
      value: 1,
    },
    {
      date: "2.1",
      value: 0,
    },
    {
      date: "2.2",
      value: 3,
    },
    {
      date: "2.3",
      value: 4,
    },
    {
      date: "2.4",
      value: 1,
    },
    {
      date: "2.5",
      value: 3,
    },
    {
      date: "2.6",
      value: 5,
    },
  ],
  init() {
    this.drawChart();
  },
  drawChart() {
    let medicine = document.getElementById("medicine");
    echarts.init(medicine).setOption(this.medicineOption());
  },
  medicineOption() {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: "日期：{b}<br>药量：{c0} mg<br>购物程度：{c1}",
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: 60,
        right: 20,
        top: 20,
      },
      xAxis: {
        type: 'category',
        data: this.medicine.map(item => item.date),
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} mg',
        },
      },
      series: [{
        type: 'bar',
        color: "#7dbdf8",
        data: this.medicine.map(item => item.value),
      }, {
        type: 'line',
        color: "#0b89fc",
        data: this.shopping.map(item => item.value*100),
      }]
    }
  },
};
charts.init();