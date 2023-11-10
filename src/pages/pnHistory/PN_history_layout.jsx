import { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axiosPnListApi from "../../api/axiosPnListApi";
import CanvasJSReact from "../../assets/canvasjs-chart-3.7.19/canvasjs.react";

import { HeartBeatOptions } from "../../components/chartOptions/heartBeatOptions";
import { SocHistoryOptions } from "../../components/chartOptions/socHistoryOptions";
import { VoltageOptions } from "../../components/chartOptions/voltageOptions";
import { CurrentOptions } from "../../components/chartOptions/currentOptions";
import { formatDate } from "../../components/formatDate";

// 比較漂亮的alert
const ReactSwal = withReactContent(Swal);

const PnHistoryLayout = ({ pnName, pnID, snID, deviceID, imgUrl, imgAlt }) => {
  const [pnDatas, setDatas] = useState([]);

  const [socDatas, setSocDatas] = useState([]);
  const [heartBeat, setHeartBeat] = useState([]);
  const [avgCellVoltage, setAvgCellVoltage] = useState([]);
  const [sysCurrent, setSysCurrent] = useState([]);
  const [maxChargeCurrentAllow, setMaxChargeCurrentAllow] = useState([]);
  const [maxDisChargeCurrentAllow, setMaxDisChargeCurrentAllow] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  // 讀取資料
  const handleReadData = useCallback(() => {
    loadingSwal();
    getPnHistoryDatas();
  }, [startDate]);

  // axios API
  const getPnHistoryDatas = async () => {
    try {
      const pnResponse = await axiosPnListApi.get("/pn");
      const pnJSON = pnResponse.data.data;

      for (const element of pnJSON) {
        if (element.pn_name === pnName) {
          setDatas(element);
        }
      }

      const historyAPI = `pn/${pnID}/sn/${snID}/device/${deviceID}/daily/${formatDate(
        startDate
      )}?paginate=30000`;
      const hbmuDailyHistoryData = await axiosPnListApi.get(historyAPI);

      const hbmuDailyHistoryJSON = hbmuDailyHistoryData.data.data;

      // BMS 心跳
      const filterdBMSHeartBeat = filterAndMapData(
        "BMSHeartBeat",
        hbmuDailyHistoryJSON
      );
      setHeartBeat(filterdBMSHeartBeat);

      // SOC
      const filterdSOC = filterAndMapData("SOC", hbmuDailyHistoryJSON);
      setSocDatas(filterdSOC);

      // 系統電流
      const filterdSysCurrent = filterAndMapData(
        "SysCurrent",
        hbmuDailyHistoryJSON
      );
      setSysCurrent(filterdSysCurrent);

      // 電芯平均電壓
      const filterdAvgCellVoltage = filterAndMapData(
        "AvgCellVoltage",
        hbmuDailyHistoryJSON
      );
      setAvgCellVoltage(filterdAvgCellVoltage);

      // 允許最大充電電流
      const filterdMaxChargeCurrentAllow = filterAndMapData(
        "MaxChargeCurrentAllow",
        hbmuDailyHistoryJSON
      );
      setMaxChargeCurrentAllow(filterdMaxChargeCurrentAllow);

      // 允許最大放電電流
      const filterdMaxDischargeCurrentAllow = filterAndMapData(
        "MaxDischargeCurrentAllow",
        hbmuDailyHistoryJSON
      );
      setMaxDisChargeCurrentAllow(filterdMaxDischargeCurrentAllow);

      closeSwal();
    } catch (err) {
      console.error(err);
      closeSwal();
    }
  };

  const filterAndMapData = (fieldName, arr) => {
    return arr
      .filter((data) => data.field_name === fieldName)
      .map((data, index) => {
        return {
          x: index,
          y: data.field_value,
          label: data.created_at,
        };
      });
  };

  function clearDatas() {
    setHeartBeat([]);
    setSocDatas([]);
    setSysCurrent([]);
    setAvgCellVoltage([]);
    setMaxChargeCurrentAllow([]);
    setMaxDisChargeCurrentAllow([]);
    return;
  }

  const handleStartDateTime = (date) => setStartDate(date);

  const loadingSwal = () => {
    return ReactSwal.fire({
      title: <i>資料量多，請耐心等待...</i>,
      didOpen: () => {
        ReactSwal.showLoading();
      },
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  };
  const closeSwal = () => ReactSwal.close();

  // CanvasJS chart
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div className="w-full pt-6 pb-40 px-12">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-80">
          首頁{" > "}PN 列表{" > "}
          {pnName}歷史資料
        </label>
      </div>

      <div className="w-full mt-4">
        <h2 className="text-[32px] text-left font-bold text-mainText">
          {pnName}歷史資料
        </h2>
      </div>

      {/* 內容 */}
      <div className="content grid md:grid-rows-3 md:grid-cols-6 md:gap-y-10 md:gap-x-8">
        {/* 表格 */}
        <div className="lg:w-full md:mb-auto md:mt-4 md:col-span-2 md:row-span-1">
          <table className="lg:w-full text-[#f3f3f3]">
            <thead>
              <tr>
                <th className="pnList-table-th pr-6">PN</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {pnDatas.pn_name}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="pnList-table-th pr-6">簡稱</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {pnDatas.nickname}
                </td>
              </tr>
              <tr>
                <th className="pnList-table-th pr-6">地點</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {pnDatas.location}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="date w-full mt-4 flex flex-col lg:flex-row lg:flex-nowrap lg:items-center items-start">
            <div className="flex flex-nowrap items-center">
              <span className="text-mainText text-lg font-bold">
                選擇日期：
              </span>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateTime}
                dateFormat="yyyy-MM-dd"
                className="outline-none w-[180px] px-2 py-1 rounded-lg border border-black dark:border-black"
              />
            </div>
            <div className="my-4 flex lg:items-center justify-center">
              <button
                className="w-16 h-8 bg-slate-300 hover:bg-slate-500 hover:text-slate-100 rounded mx-2 transition-all duration-150 active:scale-90"
                onClick={handleReadData}
              >
                讀取
              </button>
              <button
                className="w-16 h-8 bg-slate-300 hover:bg-slate-500 hover:text-slate-100 rounded mx-2 transition-all duration-100 active:scale-90"
                onClick={clearDatas}
              >
                清除
              </button>
            </div>
          </div>
        </div>

        {/* 案場照片 */}
        <div className="image md:col-span-4 md:row-span-1">
          <img
            className="object-contain w-1/2"
            src={`/image/${imgUrl}`}
            alt={imgAlt}
          />
        </div>

        {/* MBMU 心跳 */}
        <div className="MBMUheartBeat md:col-span-3 md:row-span-1">
          <CanvasJSChart options={HeartBeatOptions(heartBeat)} />
        </div>

        {/* SOC 圖表 */}
        <div className="SOC md:col-span-3 md:row-span-1">
          <CanvasJSChart options={SocHistoryOptions(socDatas)} />
        </div>

        {/* 電壓折線圖 */}
        <div className="md:col-span-3 md:row-span-1">
          <CanvasJSChart options={VoltageOptions(avgCellVoltage, socDatas)} />
        </div>

        {/* 電流折線圖 */}
        <div className="md:col-span-3 md:row-span-1">
          <CanvasJSChart
            options={CurrentOptions(
              sysCurrent,
              maxChargeCurrentAllow,
              maxDisChargeCurrentAllow,
              socDatas
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PnHistoryLayout;
