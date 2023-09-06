import { useState } from "react";

export const HeartBeatOptions = () => {
  const [lineVisibility, setLineVisibility] = useState({
    "MBMU 心跳": true,
  });

  // 顯示or隱藏圖表線段
  const mantainLineDisplayState = (e) => {
    const seriesName = e.dataSeries.name;
    setLineVisibility((prevVisibility) => ({
      ...prevVisibility,
      [seriesName]: !prevVisibility[seriesName],
    }));
  };

  const HeartBeatOptions = {
    theme: "dark1",
    animationEnabled: true,
    zoomEnabled: true, // 縮放
    exportEnabled: true, // 存成圖檔
    title: {
      text: "MBMU 心跳",
    },
    axisY: {
      title: "heart beat (%)",
      suffix: "%",
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2, // 刻度間距
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
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        name: "MBMU 心跳",
        showInLegend: true,
        visible: lineVisibility["MBMU 心跳"],
        dataPoints: [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          { x: 11, y: 61 },
          { x: 12, y: 60 },
          { x: 13, y: 55 },
          { x: 14, y: 60 },
          { x: 15, y: 56 },
          { x: 16, y: 60 },
          { x: 17, y: 59.5 },
          { x: 18, y: 63 },
          { x: 19, y: 58 },
          { x: 20, y: 54 },
          { x: 21, y: 59 },
          { x: 22, y: 64 },
          { x: 23, y: 59 },
        ],
      },
    ],
  };

  return HeartBeatOptions;
};
