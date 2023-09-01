import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosPnListApi from "../api/axiosPnListApi";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const PnSummary = () => {
  const [snDatas, setSnDatas] = useState([]);
  // const [deviceName, setDeviceName] = useState([]);
  const [filterSnDatas, setFilterSnDatas] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("所有類別");

  const searchOptions = ["所有類別", "SN"];

  useEffect(() => {
    getPnListDatas();
  }, []);

  // fetch PN 資料
  const getPnListDatas = async () => {
    try {
      const snResponse = await axiosPnListApi.get("/pn/1/sn");
      // const deviceResponse = await axiosPnListApi.get("/pn/1/sn/1/device");
      const snJSON = snResponse.data.data;
      // const deviceNameJSON = deviceResponse.data.data;

      setSnDatas(snJSON);
      setFilterSnDatas(snJSON);
      // setDeviceName(deviceNameJSON);
    } catch (err) {
      console.log(err);
    }
  };

  // 渲染PN列表
  const renderPnRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filterSnDatas
      .filter((data) => data.sn_name.includes(searchQuery))
      .slice(startIndex, endIndex)
      .map((data) => (
        <tr key={data.id}>
          <td className="pnList-table-td">{data.sn_name}</td>
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
    if (selectedOption === "SN") {
      filteredData = snDatas.filter((data) => data.sn_name.includes(query));
    } else {
      filteredData = snDatas.filter((data) => data.sn_name.includes(query));
    }

    setFilterSnDatas(filteredData);
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
            initialPlaceholder="SN、裝置名稱、裝置資料"
          />
        </div>

        <div className="listWrap w-full h-full m-auto border-2">
          <div className="list4">
            <table className="w-full h-full">
              <thead>
                <tr>
                  <th className="pnList-table-th">SN</th>
                  <th className="pnList-table-th">裝置名稱</th>
                  <th className="pnList-table-th">裝置資料</th>
                </tr>
              </thead>
              <tbody>{renderPnRows()}</tbody>
            </table>
          </div>
        </div>

        <div className="pagination py-6 flex justify-end">
          <Pagination
            totalItems={snDatas.length}
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
