// 차트 데이터
var data = {
  labels: ['서울','부산','대구','인천','광주','대전','울산','세종','경기','강원','충북','충남','전북','전남','경북','경남','제주'],
  datasets: [{
    data: [4,2,1,9,0,3,0,2,32,1,3,3,2,1,0,5,0],
    barPercentage: 0.5,
    backgroundColor: function(context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      return value < 30 ? 'rgb(177,211,89)' : 'rgb(227,53,29)';
    }
  }]
};
// 차트 외부 모양 변경
var options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
        stepSize: 4,
        max: 32
      }
    }]
  },
  tooltips: {
    displayColors: false,
    borderWidth: 1,
    caretPadding: 0,
    caretSize:0,
    bodyAlign: 'center',
    titleFontColor: 'rgb(0,0,0)',
    bodyFontColor: 'rgb(0,0,0)',
    backgroundColor:'rgba(255,255,255,0.9)',
    xPadding: 10,
    yPadding: 10,
    callbacks: {
      title: function(tooltipItem, data) {
        return;
      },
      label: function(tooltipItem, data) {
        return tooltipItem.xLabel+" "+tooltipItem.yLabel;
      }
    },
    custom: function(tooltipModel) {
      if (tooltipModel.opacity !== 0 && data.labels.length && data.datasets.length) {
        var value = tooltipModel.dataPoints[0].value;
        if(value < 30) {
          tooltipModel.borderColor = 'rgb(177,211,89)';
        } else {
          tooltipModel.borderColor = 'rgb(227,53,29)';
        }
      }
    }
  }
}
var ctx = document.getElementById('chart_school').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});

