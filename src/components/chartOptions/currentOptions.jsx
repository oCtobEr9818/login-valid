import { useState } from "react";

export const CurrentOptions = (
  sysCurrent,
  maxChargeCurrentAllow,
  maxDisChargeCurrentAllow
) => {
  const [lineVisibility, setLineVisibility] = useState({
    系統電流: true,
    允許最大充電電流: true,
    允許放電最大電流: true,
  });

  // 顯示or隱藏圖表線段
  const mantainLineDisplayState = (e) => {
    const seriesName = e.dataSeries.name;
    setLineVisibility((prevVisibility) => ({
      ...prevVisibility,
      [seriesName]: !prevVisibility[seriesName],
    }));
  };

  const CurrentOptions = {
    theme: "dark1",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: "電流折線圖",
      fontSize: 30,
    },
    axisY: {
      title: "電流 (A)",
      suffix: "(A)",
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
        toolTipContent: "時間：{label}<br />{name}：{y} A",
        name: "系統電流",
        showInLegend: true,
        visible: lineVisibility["系統電流"],
        dataPoints: sysCurrent,
      },
      {
        type: "spline",
        toolTipContent: "{name}：{y} A",
        name: "允許最大充電電流",
        showInLegend: true,
        visible: lineVisibility["允許最大充電電流"],
        dataPoints: maxChargeCurrentAllow,
      },
      {
        type: "spline",
        toolTipContent: "{name}：{y} A",
        name: "允許放電最大電流",
        showInLegend: true,
        visible: lineVisibility["允許放電最大電流"],
        dataPoints: maxDisChargeCurrentAllow,
      },
    ],
  };

  return CurrentOptions;
};
