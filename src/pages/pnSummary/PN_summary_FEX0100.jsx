import { useEffect, useState } from "react";

import axiosPnListApi from "../../api/axiosPnListApi";
import CanvasJSReact from "../../assets/canvasjs-chart-3.7.19/canvasjs.react";

import { HeartBeatOptions } from "../../components/chartOptions/heartBeatOptions";
import { SocOptions } from "../../components/chartOptions/socOptions";
import { VoltageOptions } from "../../components/chartOptions/voltageOptions";
import { CurrentOptions } from "../../components/chartOptions/currentOptions";

const PnSummaryFEX0100 = () => {
  const [snFEX0100, setSnFEX0100] = useState([]);

  useEffect(() => {
    getPnListDatas();
  }, []);

  const getPnListDatas = async () => {
    try {
      const snResponse = await axiosPnListApi.get("/pn");
      const snJSON = snResponse.data.data;

      for (const element of snJSON) {
        if (element.pn_name === "FEX0100") {
          setSnFEX0100(element);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CanvasJS chart
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div className="w-full pt-6 pb-40 px-12">
      {/* 導覽列 */}
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-80">
          首頁{" > "}PN 列表{" > "}FEX0100
        </label>
      </div>

      <div className="w-full mt-4">
        <div className="my-4">
          <h2 className="text-[32px] text-left font-bold text-mainText">
            FEX0100
          </h2>
        </div>

        {/* 內容 */}
        <div className="content grid md:grid-rows-3 md:grid-cols-6 md:gap-y-10 md:gap-x-8">
          {/* 表格 */}
          <div className="lg:w-full md:mb-auto md:col-span-2 md:row-span-1">
            <table className="lg:w-full text-[#f3f3f3]">
              <thead>
                <tr>
                  <th className="pnList-table-th">PN</th>
                  <td className="pnList-table-td border-l-1 pl-12">
                    {snFEX0100.pn_name}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="pnList-table-th">簡稱</th>
                  <td className="pnList-table-td border-l-1 pl-12">
                    {snFEX0100.nickname}
                  </td>
                </tr>
                <tr>
                  <th className="pnList-table-th">地點</th>
                  <td className="pnList-table-td border-l-1 pl-12">
                    {snFEX0100.location}
                  </td>
                </tr>
                <tr>
                  <th className="pnList-table-th">上傳時間</th>
                  <td className="pnList-table-td border-l-1 pl-12">
                    {snFEX0100.updated_at}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 案場照片 */}
          <div className="image md:col-span-4 md:row-span-1">
            <img
              className="object-contain w-1/2"
              src="/image/觀音華城三廠.jpg"
              alt="觀音華城三廠案照片"
            />
          </div>

          {/* MBMU 心跳 */}
          <div className="MBMUheartBeat md:col-span-2 md:row-span-1">
            <CanvasJSChart options={HeartBeatOptions()} />
          </div>

          {/* SOC 圖表 */}
          <div className="SOC md:col-span-2 md:row-span-1">
            <CanvasJSChart options={SocOptions()} />
          </div>

          {/* 表格 */}
          <div className="lg:w-1/2 m-auto md:col-span-2 md:row-span-1">
            <h2 className="text-center text-[32px] text-[#f3f3f3] font-bold mb-4 -mt-4">
              整體狀態
            </h2>
            <table className="lg:w-full text-[#f3f3f3]">
              <thead>
                <tr>
                  <th className="pnList-table-th">系統狀態</th>
                  <td className="pnList-table-td border-l-1 pl-12">123</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="pnList-table-th">上下電狀態</th>
                  <td className="pnList-table-td border-l-1 pl-12">456</td>
                </tr>
                <tr>
                  <th className="pnList-table-th">MBMU 狀態</th>
                  <td className="pnList-table-td border-l-1 pl-12">789</td>
                </tr>
                <tr>
                  <th className="pnList-table-th">EMS 指令</th>
                  <td className="pnList-table-td border-l-1 pl-12">147</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 電壓折線圖 */}
          <div className="md:col-span-3 md:row-span-1">
            <CanvasJSChart options={VoltageOptions()} />
          </div>

          {/* 電流折線圖 */}
          <div className="md:col-span-3 md:row-span-1">
            <CanvasJSChart options={CurrentOptions()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnSummaryFEX0100;
