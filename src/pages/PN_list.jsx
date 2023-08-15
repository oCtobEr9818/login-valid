import { useState, useEffect } from "react";
import { axiosPnListApi } from "../api/axiosPnListApi";

const PnList = () => {
  const [pnListDatas, setPnListDatas] = useState([]);

  const getPnListDatas = async () => {
    try {
      const response = await axiosPnListApi();

      if (response.status === 200) {
        setPnListDatas(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPnListDatas();
  }, []);

  return (
    <div className="w-full h-full p-6">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label>總攬 {">"} PN_list</label>
      </div>

      <div className=" h-auto w-full mt-4">
        <div className="title my-4">
          <h2 className="text-[32px] font-bold">PN列表</h2>
        </div>

        <div className="listWrap w-full h-full m-auto border-2">
          <div className="dataTableLength pl-6 py-6">
            <label>
              顯示資料數
              <select
                name="dataTableLength"
                id="dataTableLength"
                className="ml-3 border-2 border-slate-600 rounded-md focus:border-slate-600"
              >
                <option value="10">10 / 頁</option>
                <option value="25">25 / 頁</option>
                <option value="50">50 / 頁</option>
                <option value="100">100 / 頁</option>
              </select>
            </label>
          </div>

          <div className="list4 border-t-2">
            <table className="w-full h-full">
              <thead>
                <tr>
                  <th className="pnList-table-th">場域(PN)</th>
                  <th className="pnList-table-th">設備序號(SN)</th>
                  <th className="pnList-table-th">最新上傳時間</th>
                  <th className="pnList-table-th">詳細內容</th>
                </tr>
              </thead>
              <tbody>
                {pnListDatas.map((data) => (
                  <tr key={data.id}>
                    <td className="pnList-table-td">{data.pn_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnList;
