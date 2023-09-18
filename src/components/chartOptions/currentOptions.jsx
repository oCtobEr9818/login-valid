import { useState } from "react";

export const CurrentOptions = (
  sysCurrent,
  maxChargeCurrentAllow,
  maxDisChargeCurrentAllow,
  soc
) => {
  const [lineVisibility, setLineVisibility] = useState({
    "System current": true,
    "Allow max": true,
    "Allow min": true,
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
      text: "System Current",
      fontSize: 30,
    },
    axisY: {
      title: "Current (A)",
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
        name: "System current",
        color: "#38BDF8",
        toolTipContent: "Time：{label}<br />{name}：{y} A",
        showInLegend: true,
        visible: lineVisibility["System current"],
        dataPoints: sysCurrent,
      },
      {
        type: "spline",
        name: "Allow max",
        color: "#4C1D95",
        toolTipContent: "{name}：{y} A",
        showInLegend: true,
        visible: lineVisibility["Allow max"],
        dataPoints: maxChargeCurrentAllow,
      },
      {
        type: "spline",
        name: "Allow min",
        color: "#991B1B",
        toolTipContent: "{name}：{y} A",
        showInLegend: true,
        visible: lineVisibility["Allow min"],
        dataPoints: maxDisChargeCurrentAllow,
      },
      {
        type: "spline",
        name: "MBMU SOC",
        color: "#065F46",
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
