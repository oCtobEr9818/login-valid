export const CurrentOptions = {
  theme: "dark1",
  animationEnabled: true,
  zoomEnabled: true,
  exportEnabled: true,
  title: {
    text: "電流折線圖",
    fontSize: 30,
  },
  axisY: {
    title: "電流 (A)",
    suffix: "(A)",
    interval: 50,
  },
  legend: {
    fontFamily: "Arial",
    cursor: "pointer",
    horizontalAlign: "center",
    // itemclick: lineDisplay,
  },
  toolTip: {
    shared: true,
  },
  data: [
    {
      type: "spline",
      toolTipContent: "Time：{label}<br />{name}：{y} A",
      name: "SystemCurrent",
      showInLegend: true,
      dataPoints: [
        { x: new Date(2017, 0), y: 9 },
        { x: new Date(2017, 1), y: 32 },
        { x: new Date(2017, 2), y: 47 },
        { x: new Date(2017, 3), y: 80 },
        { x: new Date(2017, 4), y: 10 },
        { x: new Date(2017, 5), y: 22 },
        { x: new Date(2017, 6), y: 57 },
        { x: new Date(2017, 7), y: 36 },
        { x: new Date(2017, 8), y: 98 },
        { x: new Date(2017, 9), y: 200 },
        { x: new Date(2017, 10), y: 14 },
        { x: new Date(2017, 11), y: 28 },
      ],
    },
    {
      type: "spline",
      toolTipContent: "{name}：{y} A",
      name: "ChargeCurrent",
      showInLegend: true,
      dataPoints: [
        { x: new Date(2017, 0), y: 1 },
        { x: new Date(2017, 1), y: 2 },
        { x: new Date(2017, 2), y: 3 },
        { x: new Date(2017, 3), y: 8 },
        { x: new Date(2017, 4), y: 10 },
        { x: new Date(2017, 5), y: 80 },
        { x: new Date(2017, 6), y: 60 },
        { x: new Date(2017, 7), y: 24 },
        { x: new Date(2017, 8), y: 94 },
        { x: new Date(2017, 9), y: 32 },
        { x: new Date(2017, 10), y: 41 },
        { x: new Date(2017, 11), y: 5 },
      ],
    },
    {
      type: "spline",
      toolTipContent: "{name}：{y} A",
      name: "DisChargeCurrent",
      showInLegend: true,
      dataPoints: [
        { x: new Date(2017, 0), y: 42 },
        { x: new Date(2017, 1), y: 31 },
        { x: new Date(2017, 2), y: 100 },
        { x: new Date(2017, 3), y: 152 },
        { x: new Date(2017, 4), y: 70 },
        { x: new Date(2017, 5), y: 63 },
        { x: new Date(2017, 6), y: 95 },
        { x: new Date(2017, 7), y: 57 },
        { x: new Date(2017, 8), y: 10 },
        { x: new Date(2017, 9), y: 28 },
        { x: new Date(2017, 10), y: 83 },
        { x: new Date(2017, 11), y: 68 },
      ],
    },
  ],
};
