import { useState } from "react";

export const VoltageOptions = () => {
  const [lineVisibility, setLineVisibility] = useState({
    AvgCellVolt: true,
  });

  // 顯示or隱藏圖表線段
  const mantainLineDisplayState = (e) => {
    const seriesName = e.dataSeries.name;
    setLineVisibility((prevVisibility) => ({
      ...prevVisibility,
      [seriesName]: !prevVisibility[seriesName],
    }));
  };

  const VoltageOptions = {
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
      fontSize: 16,
      cursor: "pointer",
      horizontalAlign: "center",
      itemMaxWidth: 170,
      itemWrap: true,
      itemclick: mantainLineDisplayState,
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
        visible: lineVisibility["AvgCellVolt"],
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

  return VoltageOptions;
};
