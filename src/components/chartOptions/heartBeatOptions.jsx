import { useState } from "react";

export const HeartBeatOptions = (heartBeat) => {
  const [lineVisibility, setLineVisibility] = useState({
    Heartbeat: true,
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
      text: "MBMU Heartbeat",
    },
    axisY: {
      title: "heart beat",
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
        toolTipContent: "Time：{label}<br />{name}: {y}",
        name: "Heartbeat",
        showInLegend: true,
        visible: lineVisibility["Heartbeat"],
        dataPoints: heartBeat,
      },
    ],
  };

  return HeartBeatOptions;
};
