import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosPnListApi from "../api/axiosPnListApi";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const PnSummary = () => {
  const [snDatas, setSnDatas] = useState([]);
  const [filterSnDatas, setFilterSnDatas] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("所有類別");

  const searchOptions = ["所有類別", "SN", "裝置名稱"];

  useEffect(() => {
    getPnListDatas();
  }, []);

  // fetch PN 資料
  const getPnListDatas = async () => {
    try {
      const snResponse = await axiosPnListApi.get("/pn/1/sn");
      const deviceNameResponse = await axiosPnListApi.get("/pn/1/sn/1/device");
      const deviceDataResponse = await axiosPnListApi.get(
        "/pn/1/sn/1/device/1"
      );
      const deviceDataResponse2 = await axiosPnListApi.get(
        "/pn/1/sn/1/device/2"
      );
      const snJSON = snResponse.data.data;
      const deviceNameJSON = deviceNameResponse.data.data;
      const deviceData = deviceDataResponse.data.data;
      const deviceDataJSON = JSON.parse(deviceData[0].data);
      const deviceData2 = deviceDataResponse2.data.data;
      const deviceDataJSON2 = JSON.parse(deviceData2[0].data);
      console.log("https://essbackend.etica-inc.com/api/v2/pn/1/sn/1/device/1");
      console.log("MBMU 原始資料：", deviceData);
      console.log("MBMU JSON 資料：", deviceDataJSON);
      console.log("");
      console.log("https://essbackend.etica-inc.com/api/v2/pn/1/sn/1/device/2");
      console.log("SBMU 原始資料：", deviceData2);
      console.log("SBMU JSON 資料：", deviceDataJSON2);

      // 將SN、裝置名稱的資料合併
      const combineDatas = [];
      // 取長度較長的array
      const longerArray =
        snJSON.length >= deviceNameJSON.length ? snJSON : deviceNameJSON;

      longerArray.forEach((_, index) => {
        const snItem = snJSON[index] || {};
        const deviceItem = deviceNameJSON[index] || {};

        combineDatas.push({
          id: index + 1,
          pn_id: snItem.pn_id || deviceItem.pn_id,
          sn_id: snItem.sn_id || deviceItem.sn_id,
          device_name: deviceItem.device_name || "",
          sn_name: snItem.sn_name || "",
          created_at: deviceItem.created_at,
          updated_at: deviceItem.updated_at,
        });
      });
      setSnDatas(combineDatas);
      setFilterSnDatas(combineDatas);
    } catch (err) {
      console.log(err);
    }
  };

  // 渲染PN列表
  const renderPnRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filterSnDatas
      .filter(
        (data) =>
          data.sn_name?.includes(searchQuery) ||
          data.device_name?.includes(searchQuery)
      )
      .slice(startIndex, endIndex)
      .map((data) => (
        <tr key={data.id}>
          <td className="pnList-table-td">{data.sn_name}</td>
          <td className="pnList-table-td">{data.device_name}</td>
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
      filteredData = snDatas.filter((data) => data.sn_name?.includes(query));
    } else if (selectedOption === "裝置名稱") {
      filteredData = snDatas.filter((data) =>
        data.device_name?.includes(query)
      );
    } else {
      filteredData = snDatas.filter(
        (data) =>
          data.sn_name?.includes(query) || data.device_name?.includes(query)
      );
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
            totalItems={filterSnDatas.length}
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
