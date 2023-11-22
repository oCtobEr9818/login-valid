import { useState, useEffect } from "react";

import axiosPnListApi from "../api/axiosPnListApi";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const EventViewer = () => {
  const [eventViewer, setEventViewer] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("所有類別");
  const [filterEventViewerData, setFilterEventViewerData] = useState([]);
  const [filterDataLength, setFilterDataLength] = useState(0);

  const searchOptions = ["所有類別", "類型", "訊息", "時間"];

  useEffect(() => {
    getEventDatas();

    const interval = setInterval(() => {
      getEventDatas();
    }, 5000);

    return () => clearInterval(interval);
  }, [activePage, itemsPerPage]);

  // fetch PN 資料
  const getEventDatas = async () => {
    try {
      const response = await axiosPnListApi.get("/alerts");
      const datas = response.data.data;

      setEventViewer(datas);
      setFilterEventViewerData(datas);
    } catch (err) {
      console.error(err);
    }
  };

  // 渲染PN列表
  const renderPnRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filterEventViewerData
      .filter(
        (data) =>
          data.alert_type?.includes(searchQuery) ||
          data.message?.includes(searchQuery) ||
          data.created_at?.includes(searchQuery)
      )
      .slice(startIndex, endIndex)
      .map((data) => (
        <tr key={data.id}>
          <td className="pnList-table-td md:w-1/8">{data.alert_type}</td>
          <td className="pnList-table-td md:w-3/5">{data.message}</td>
          <td className="pnList-table-td md:w-1/4">
            {data.created_at.slice(0, 10) + " " + data.created_at.slice(11, 19)}
          </td>
        </tr>
      ));
  };

  // 搜尋功能過濾資料
  const handleSearch = (query) => {
    setSearchQuery(query);

    let filteredData;
    switch (selectedOption) {
      case "類型":
        filteredData = eventViewer.filter((data) =>
          data.alert_type?.includes(query)
        );
        break;
      case "訊息":
        filteredData = eventViewer.filter((data) =>
          data.message?.includes(query)
        );
        break;
      case "時間":
        filteredData = eventViewer.filter((data) =>
          data.created_at?.includes(query)
        );
        break;
      default:
        filteredData = eventViewer.filter(
          (data) =>
            data.alert_type?.includes(query) ||
            data.message?.includes(query) ||
            data.created_at?.includes(query)
        );
        break;
    }

    setFilterEventViewerData(filteredData);
    setFilterDataLength(filteredData.length);
  };

  // 定義處理每頁顯示筆數變更
  const handleItemsPerPageChange = (e) => {
    // 將瀏覽頁面設定為第一頁
    setActivePage(1);
    // 更新每頁顯示筆數
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="w-full pt-6 pb-40 px-12">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-80">首頁{" > "}事件通知</label>
      </div>

      <div className="h-auto w-full mt-4 text-mainText">
        <div className="my-4 flex items-start lg:justify-between lg:flex-row flex-col">
          <h2 className="text-[32px] font-bold text-center">事件通知</h2>
          <Search
            options={searchOptions}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            initialPlaceholder="類型、訊息、時間"
          />
        </div>

        {/* 表格 */}
        <div className="listWrap lg:w-full h-full m-auto">
          <table className="lg:w-full h-full border-b-2">
            <thead>
              <tr>
                <th className="pnList-table-th md:w-1/8">類型</th>
                <th className="pnList-table-th md:w-3/5">訊息</th>
                <th className="pnList-table-th md:w-1/4">時間</th>
              </tr>
            </thead>
            {/* 表格內容 */}
            <tbody>{renderPnRows()}</tbody>
          </table>
        </div>

        {/* 分頁 */}
        <div className="pagination py-6 flex justify-end">
          <Pagination
            totalItems={
              filterDataLength ? filterDataLength : eventViewer.length
            }
            itemsPerPage={itemsPerPage}
            activePage={activePage}
            onPageChange={setActivePage}
            onSelectChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EventViewer;
