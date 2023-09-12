// import CanvasJSReact from "../../assets/canvasjs-chart-3.7.19/canvasjs.react";

export const SocOptions = (socDatas) => {
  // CanvasJSReact.addColorSet("socChart", [
  //   "#0066CC",
  //   "#00AEAE",
  //   "#02C874",
  //   "#C6A300",
  //   "#EA7500",
  //   "#9F4D95",
  //   "#CE0000",
  //   "#5B5B5B",
  //   "#D9B3B3",
  //   "#C7C7E2",
  //   "#A6FFFF",
  //   "#F0F0F0",
  //   "#D3A4FF",
  // ]);
  const colorSet = [
    "#0066CC",
    "#00AEAE",
    "#02C874",
    "#C6A300",
    "#EA7500",
    "#9F4D95",
    "#CE0000",
    "#5B5B5B",
    "#D9B3B3",
    "#C7C7E2",
    "#A6FFFF",
    "#F0F0F0",
    "#D3A4FF",
  ];

  const SocOptions = {
    theme: "dark1",
    zoomEnabled: true, // 縮放
    exportEnabled: true, // 存成圖檔
    colorSet: colorSet,
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
    data: [
      {
        type: "column",
        // indexLabel: "{y} %",
        // indexLabelPlacement: "outside",
        toolTipContent: "時間：{time}<br />{label}：{y} %",
        dataPoints: socDatas,
      },
    ],
  };

  return SocOptions;
};
