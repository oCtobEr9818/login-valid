export const SocHistoryOptions = (socDatas) => {
  const SocOptions = {
    theme: "dark1",
    zoomEnabled: true, // 縮放
    exportEnabled: true, // 存成圖檔
    title: {
      text: "SOC Distribution",
    },
    axisY: {
      title: "SOC (%)",
      suffix: "%",
      maximum: 100,
      minimum: 0,
    },
    legend: {
      fontFamily: "Arial",
      fontSize: 16,
      cursor: "pointer",
      horizontalAlign: "center",
    },
    toolTip: {
      shared: true,
    },
    dataPointWidth: 20,
    data: [
      {
        type: "spline",
        name: "SOC",
        toolTipContent: "Time：{label}<br />{name}：{y} %",
        dataPoints: socDatas,
      },
    ],
  };

  return SocOptions;
};
