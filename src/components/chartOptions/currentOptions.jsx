import { useState } from "react";

export const CurrentOptions = (
  sysCurrent,
  maxChargeCurrentAllow,
  maxDisChargeCurrentAllow,
  soc
) => {
  const [lineVisibility, setLineVisibility] = useState({
    系統電流: true,
    允許最大充電電流: true,
    允許放電最大電流: true,
    "MBMU SOC": true,
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
    axisY2: {
      title: "MBMU SOC (%)",
      suffix: "%",
      maximum: 100,
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
        type: "spline",
        name: "系統電流",
        color: "#B9B9FF",
        toolTipContent: "時間：{label}<br />{name}：{y} A",
        showInLegend: true,
        visible: lineVisibility["系統電流"],
        dataPoints: sysCurrent,
      },
      {
        type: "spline",
        name: "允許最大充電電流",
        color: "#FFB5B5",
        toolTipContent: "{name}：{y} A",
        showInLegend: true,
        visible: lineVisibility["允許最大充電電流"],
        dataPoints: maxChargeCurrentAllow,
      },
      {
        type: "spline",
        name: "允許放電最大電流",
        color: "#D94600",
        toolTipContent: "{name}：{y} A",
        showInLegend: true,
        visible: lineVisibility["允許放電最大電流"],
        dataPoints: maxDisChargeCurrentAllow,
      },
      {
        type: "spline",
        name: "MBMU SOC",
        color: "#429200",
        toolTipContent: "{name}：{y} %",
        axisYType: "secondary",
        showInLegend: true,
        visible: lineVisibility["MBMU SOC"],
        dataPoints: soc,
      },
    ],
  };

  return CurrentOptions;
};
