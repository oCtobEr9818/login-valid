export const MbmuOptions = () => {
  const MbmuOption = {
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
        type: "column",
        indexLabel: "{y} %",
        indexLabelPlacement: "outside",
        toolTipContent: "Time：{time}<br />{label}：{y} %",
        dataPoints: [],
      },
    ],
  };

  return MbmuOption;
};
