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

  const getPnListDatas = async () => {
    try {
      const response = await axiosPnListApi.get("/pn");
      const datas = response.data.data;

      setPnListData(datas);
      setFilterPnListData(datas);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPnListDatas();
  }, []);

  // 渲染PN列表
  const renderPnList = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filterPnListData
      .filter(
        (data) =>
          data.pn_name.includes(searchQuery) ||
          data.nickname.includes(searchQuery)
      )
      .slice(startIndex, endIndex)
      .map((data) => (
        <tr key={data.id}>
          <td className="pnList-table-td">{data.pn_name}</td>
          <td className="pnList-table-td">{data.nickname}</td>
          <td className="pnList-table-td">{data.location}</td>
          <td className="pnList-table-td">{data.updated_at}</td>
          <td className="pnList-table-td">
            <Link
              to="/pn-summary"
              className="p-2.5 rounded-md bg-blue-500 hover:bg-blue-600 text-slate-200"
            >
              詳細資訊
            </Link>
          </td>
        </tr>
      ));
  };

  // 搜尋功能過濾資料
  const handleSearch = (query) => {
    setSearchQuery(query);

    let filteredData;

    if (selectedOption === "PN") {
      filteredData = pnListData.filter((data) => data.pn_name.includes(query));
    } else if (selectedOption === "專案簡稱") {
      filteredData = pnListData.filter((data) => data.nickname.includes(query));
    } else {
      filteredData = pnListData.filter(
        (data) => data.pn_name.includes(query) || data.nickname.includes(query)
      );
    }

    setFilterPnListData(filteredData);
  };

  const handlePageNumber = (pageNumber) => setActivePage(pageNumber);

  return (
    <div className="w-full h-full py-6 px-12">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-60">總攬{" > "}PN_list</label>
      </div>

      <div className="h-auto w-full mt-4">
        <div className="title my-4 flex md:justify-between md:flex-row flex-col">
          <h2 className="text-[32px] font-bold text-center">PN列表</h2>
          <Search
            options={["所有類別", "PN", "專案簡稱"]}
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
                  <th className="pnList-table-th">場域(PN)</th>
                  <th className="pnList-table-th">專案簡稱</th>
                  <th className="pnList-table-th">地點</th>
                  <th className="pnList-table-th">最後上傳時間</th>
                  <th className="pnList-table-th">PN總攬</th>
                </tr>
              </thead>
              {/* 列表內容 */}
              <tbody>{renderPnList()}</tbody>
            </table>
          </div>
        </div>

        <div className="pagination py-6 flex justify-end">
          <Pagination
            totalItems={pnListData.length}
            itemsPerPage={itemsPerPage}
            activePage={activePage}
            onPageChange={handlePageNumber}
          />

          <select
            name="pagination"
            id="pagination"
            className="ml-7 border-2 border-slate-600 rounded-md focus:border-slate-600"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10">10 / 頁</option>
            <option value="25">25 / 頁</option>
            <option value="50">50 / 頁</option>
            <option value="100">100 / 頁</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PnList;
