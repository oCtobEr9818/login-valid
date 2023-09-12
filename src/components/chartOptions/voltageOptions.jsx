import { useState } from "react";

export const VoltageOptions = (avgCellVoltage) => {
  const [lineVisibility, setLineVisibility] = useState({
    電芯平均電壓: true,
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
        toolTipContent: "時間：{label}<br />{name}：{y} V",
        name: "電芯平均電壓",
        showInLegend: true,
        visible: lineVisibility["電芯平均電壓"],
        dataPoints: avgCellVoltage,
      },
    ],
  };

  return VoltageOptions;
};
