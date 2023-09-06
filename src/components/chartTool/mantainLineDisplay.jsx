// 顯示or隱藏圖表線段
export const mantainLineDisplayState = (setLineVisibility, e) => {
  const seriesName = e.dataSeries.name;
  setLineVisibility((prevVisibility) => ({
    ...prevVisibility,
    [seriesName]: !prevVisibility[seriesName],
  }));
};
