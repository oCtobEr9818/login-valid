import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosPnListApi from "../api/axiosPnListApi";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const PnList = () => {
  const [pnListData, setPnListData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("所有類別");
  const [filterPnListData, setFilterPnListData] = useState([]);

  const searchOptions = ["所有類別", "PN", "專案簡稱", "地點"];

  useEffect(() => {
    getPnListDatas();
  }, []);

  // fetch PN 資料
  const getPnListDatas = async () => {
    try {
      const response = await axiosPnListApi.get("/pn");
      const datas = response.data.data;

      setPnListData(datas);
      setFilterPnListData(datas);
    } catch (err) {
      console.error(err);
    }
  };

  // 渲染PN列表
  const renderPnRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filterPnListData
      .filter(
        (data) =>
          data.pn_name.includes(searchQuery) ||
          data.nickname.includes(searchQuery) ||
          data.location.includes(searchQuery)
      )
      .slice(startIndex, endIndex)
      .map((data) => (
        <tr key={data.id} className="h-16">
          <td className="pnList-table-td">{data.pn_name}</td>
          <td className="pnList-table-td">{data.nickname}</td>
          <td className="pnList-table-td">{data.location}</td>
          <td className="pnList-table-td">{data.updated_at}</td>
          <td className="pnList-table-td flex items-center justify-start">
            <Link
              to={`/pn-list/pn-summary-${data.pn_name}`}
              className="lg:p-2.5 p-1 rounded-md bg-blue-500 hover:bg-blue-600 text-slate-200 text-sm lg:text-base"
            >
              詳細資訊
            </Link>
            <Link
              to="/pn-history"
              className="lg:p-2.5 p-1 ml-3 -mr-3 rounded-md bg-blue-500 hover:bg-blue-600 text-slate-200 text-sm lg:text-base"
            >
              歷史資料
            </Link>
          </td>
        </tr>
      ));
  };

  // 搜尋功能過濾資料
  const handleSearch = (query) => {
    setSearchQuery(query);

    let filteredData;
    switch (selectedOption) {
      case "PN":
        filteredData = pnListData.filter((data) =>
          data.pn_name.includes(query)
        );
        break;
      case "專案簡稱":
        filteredData = pnListData.filter((data) =>
          data.nickname.includes(query)
        );
        break;
      case "地點":
        filteredData = pnListData.filter((data) =>
          data.location.includes(query)
        );
        break;
      default:
        filteredData = pnListData.filter(
          (data) =>
            data.pn_name.includes(query) ||
            data.nickname.includes(query) ||
            data.location.includes(query)
        );
        break;
    }

    setFilterPnListData(filteredData);
  };

  // 定義處理每頁顯示筆數變更
  const handleItemsPerPageChange = (e) => {
    // 將瀏覽頁面設定為第一頁
    setActivePage(1);
    // 更新每頁顯示筆數
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="w-full h-full pt-6 px-12">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className=" opacity-80">首頁{" > "}PN 列表</label>
      </div>

      <div className="h-auto w-full mt-4 text-mainText">
        <div className="my-4 flex items-start lg:justify-between lg:flex-row flex-col">
          <h2 className="text-[32px] font-bold text-center">PN列表</h2>
          <Search
            options={searchOptions}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            initialPlaceholder="搜尋PN、專案簡稱、地點"
          />
        </div>

        {/* 表格 */}
        <div className="listWrap lg:w-full h-full m-auto">
          <table className="lg:w-full h-full border-b-2">
            <thead>
              <tr>
                <th className="pnList-table-th">場域(PN)</th>
                <th className="pnList-table-th">專案簡稱</th>
                <th className="pnList-table-th">地點</th>
                <th className="pnList-table-th">最後上傳時間</th>
                <th className="pnList-table-th">PN總攬</th>
              </tr>
            </thead>
            {/* 表格內容 */}
            <tbody>{renderPnRows()}</tbody>
          </table>
        </div>

        {/* 分頁 */}
        <div className="pagination py-6 flex justify-end">
          <Pagination
            totalItems={pnListData.length}
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

export default PnList;
