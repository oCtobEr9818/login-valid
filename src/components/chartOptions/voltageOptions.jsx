export const VoltageOptions = {
  theme: "dark1",
  animationEnabled: true,
  zoomEnabled: true, // 縮放
  exportEnabled: true, // 存成圖檔
  title: {
    text: "電壓折線圖",
    fontSize: 30,
  },
  axisY: {
    title: "電壓 (V)",
    suffix: "(V)",
    // viewportMinimum: minValue(voltage) - 50,
    // viewportMaximum: maxValue(voltage) + 50,
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
      toolTipContent: "Time：{label}<br />{name}：{y} V",
      name: "AvgCellVolt",
      showInLegend: true,
      dataPoints: [
        { x: new Date(2017, 0), y: 25060 },
        { x: new Date(2017, 1), y: 27980 },
        { x: new Date(2017, 2), y: 42800 },
        { x: new Date(2017, 3), y: 32400 },
        { x: new Date(2017, 4), y: 35260 },
        { x: new Date(2017, 5), y: 33900 },
        { x: new Date(2017, 6), y: 40000 },
        { x: new Date(2017, 7), y: 52500 },
        { x: new Date(2017, 8), y: 32300 },
        { x: new Date(2017, 9), y: 42000 },
        { x: new Date(2017, 10), y: 37160 },
        { x: new Date(2017, 11), y: 38400 },
      ],
    },
  ],
};
