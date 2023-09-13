export const SocOptions = (socDatas) => {
  const SocOptions = {
    theme: "dark1",
    zoomEnabled: true, // 縮放
    exportEnabled: true, // 存成圖檔
    title: {
      text: "SOC 圖表",
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
        toolTipContent: "時間：{time}<br />{label}：{y} %",
        dataPoints: socDatas,
      },
    ],
  };

  return SocOptions;
};
