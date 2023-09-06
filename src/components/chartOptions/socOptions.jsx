import { useState } from "react";

export const SocOptions = () => {
  const [lineVisibility, setLineVisibility] = useState({
    SOC: true,
  });

  // 顯示or隱藏圖表線段
  const mantainLineDisplayState = (e) => {
    const seriesName = e.dataSeries.name;
    setLineVisibility((prevVisibility) => ({
      ...prevVisibility,
      [seriesName]: !prevVisibility[seriesName],
    }));
  };

  const SocOptions = {
    theme: "dark1",
    animationEnabled: true,
    zoomEnabled: true, // 縮放
    exportEnabled: true, // 存成圖檔
    title: {
      text: "SOC 圖表",
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
        type: "column",
        toolTipContent: "Time：{label}<br />{name}：{y}",
        name: "SOC",
        showInLegend: true,
        visible: lineVisibility["SOC"],
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 25 },
          { label: "Mango", y: 30 },
          { label: "Grape", y: 28 },
        ],
      },
    ],
  };

  return SocOptions;
};
