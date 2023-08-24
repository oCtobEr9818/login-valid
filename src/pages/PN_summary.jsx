import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosPnListApi from "../api/axiosPnListApi";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const PnSummary = () => {
  const [pnSummaryData, setPnSummaryData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("所有類別");
  const [filterPnSummaryData, setFilterPnSummaryData] = useState([]);

  const searchOptions = ["所有類別", "設備序號SN"];

  useEffect(() => {
    getPnListDatas();
  }, []);

  // fetch PN 資料
  const getPnListDatas = async () => {
    try {
      const response = await axiosPnListApi.get("/issummary/1");
      const datas = response.data.data;

      setPnSummaryData(datas);
      setFilterPnSummaryData(datas);
    } catch (err) {
      console.log(err);
    }
  };

  // 渲染PN列表
  const renderPnRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filterPnSummaryData
      .filter((data) => data.field_name.includes(searchQuery))
      .slice(startIndex, endIndex)
      .map((data) => (
        <tr key={data.id}>
          <td className="pnList-table-td">{data.field_name}</td>
          <td className="pnList-table-td">{}</td>
          <td className="pnList-table-td">{}</td>
          <td className="pnList-table-td">{}</td>
          <td className="pnList-table-td">
            <Link
              to={null}
              className="p-2.5 rounded-md bg-blue-500 hover:bg-blue-600 text-slate-200"
            >
              即時狀態
            </Link>
          </td>
        </tr>
      ));
  };

  // 搜尋功能過濾資料
  const handleSearch = (query) => {
    setSearchQuery(query);

    let filteredData;
    if (selectedOption === "設備序號SN") {
      filteredData = pnSummaryData.filter((data) =>
        data.field_name.includes(query)
      );
    } else {
      filteredData = pnSummaryData.filter((data) =>
        data.field_name.includes(query)
      );
    }

    setFilterPnSummaryData(filteredData);
  };

  // 定義處理每頁顯示筆數變更
  const handleItemsPerPageChange = (e) => {
    // 將瀏覽頁面設定為第一頁
    setActivePage(1);
    // 更新每頁顯示筆數
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="w-full h-full py-6 px-12">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-60">總攬{" > "}PN_summary</label>
      </div>

      <div className=" h-auto w-full mt-4">
        <div className="my-4 flex items-start lg:justify-between lg:flex-row flex-col">
          <h2 className="text-[32px] text-center font-bold">PN總攬</h2>
          <Search
            options={searchOptions}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>

        <div className="listWrap w-full h-full m-auto border-2">
          <div className="list4">
            <table className="w-full h-full">
              <thead>
                <tr>
                  <th className="pnList-table-th">設備序號(SN)</th>
                  <th className="pnList-table-th">最後更新時間</th>
                  <th className="pnList-table-th"></th>
                  <th className="pnList-table-th"></th>
                </tr>
              </thead>
              <tbody>{renderPnRows()}</tbody>
            </table>
          </div>
        </div>

        <div className="pagination py-6 flex justify-end">
          <Pagination
            totalItems={pnSummaryData.length}
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

export default PnSummary;
