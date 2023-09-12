import { useState } from "react";

export const HeartBeatOptions = (heartBeat) => {
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
    zoomEnabled: true, // 縮放
    exportEnabled: true, // 存成圖檔
    title: {
      text: "MBMU 心跳",
    },
    axisY: {
      title: "heart beat (%)",
      suffix: "%",
      minimum: 0,
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
        toolTipContent: "時間：{label}<br />{name}: {y} %",
        name: "MBMU 心跳",
        showInLegend: true,
        visible: lineVisibility["MBMU 心跳"],
        dataPoints: heartBeat,
      },
    ],
  };

  return HeartBeatOptions;
};
