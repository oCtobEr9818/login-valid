import { useEffect, useState } from "react";

import axiosPnListApi from "../../api/axiosPnListApi";
import CanvasJSReact from "../../assets/canvasjs-chart-3.7.19/canvasjs.react";

import { HeartBeatOptions } from "../../components/chartOptions/heartBeatOptions";
import { SocOptions } from "../../components/chartOptions/socOptions";
import { VoltageOptions } from "../../components/chartOptions/voltageOptions";
import { CurrentOptions } from "../../components/chartOptions/currentOptions";

const PnSummaryLayout = ({ pnName, pnID, snID, imgUrl, imgAlt }) => {
  const [pnDatas, setDatas] = useState([]);

  const [soc, setSoc] = useState([]);
  const [socDatas, setSocDatas] = useState([]);
  const [heartBeat, setHeartBeat] = useState([]);
  const [systemStatus, setSystemStatus] = useState(0);
  const [bmsPowerOn, setBmsPowerOn] = useState(0);
  const [bmsStatus, setBmsStatus] = useState(0);
  const [emsCmd, setEmsCmd] = useState(0);
  const [avgCellVoltage, setAvgCellVoltage] = useState([]);
  const [sysCurrent, setSysCurrent] = useState([]);
  const [maxChargeCurrentAllow, setMaxChargeCurrentAllow] = useState([]);
  const [maxDisChargeCurrentAllow, setMaxDisChargeCurrentAllow] = useState([]);
  const [updatedTime, setUpdatedTime] = useState("");

  useEffect(() => {
    // 進入頁面先獲取第一筆資料
    getPnListDatas();

    // 每5秒向後端發送一次request
    const interval = setInterval(() => {
      getPnListDatas();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPnListDatas = async () => {
    try {
      const pnResponse = await axiosPnListApi.get("/pn");
      const pnJSON = pnResponse.data.data;

      for (const element of pnJSON) {
        if (element.pn_name === pnName) {
          setDatas(element);
        }
      }

      const deviceResponse = await axiosPnListApi.get(
        `/pn/${pnID}/sn/${snID}/device/all`
      );
      if (deviceResponse.status === 200) {
        const deviceDatas = deviceResponse.data.data;
        const MbmuJSON = JSON.parse(deviceDatas[0].data);
        const chartLabel = deviceDatas[0].created_at?.slice(11); // 圖表時間

        // SOC 資料集
        const updatedSocDatas = deviceDatas.map((data) => {
          const dataJSON = JSON.parse(data.data);
          return {
            x: data.device_id,
            y: Number(dataJSON.SOC),
            time: chartLabel,
            label: data.device_name,
            color: "#429200",
          };
        });
        setSocDatas(updatedSocDatas);

        // SOC 單獨資料
        setSoc((prev) =>
          [
            ...prev,
            {
              y: Number(MbmuJSON.SOC),
              label: chartLabel,
              color: "#429200",
            },
          ].filter((curr, i, arr) => !i || curr.label !== arr[i - 1].label)
        );
        // BMS 心跳
        setHeartBeat((prev) =>
          [
            ...prev,
            {
              y: Number(MbmuJSON.BMSHeartBeat),
              label: chartLabel,
            },
          ].filter((curr, i, arr) => !i || curr.label !== arr[i - 1].label)
        );
        // 系統電壓
        setAvgCellVoltage((prev) =>
          [
            ...prev,
            {
              y: Number(MbmuJSON.SysVoltag),
              label: chartLabel,
            },
          ].filter((curr, i, arr) => !i || curr.label !== arr[i - 1].label)
        );
        // 系統電流
        setSysCurrent((prev) =>
          [
            ...prev,
            {
              y: Number(MbmuJSON.SysCurrent),
              label: chartLabel,
            },
          ].filter((curr, i, arr) => !i || curr.label !== arr[i - 1].label)
        );
        // 允許最大充電電流
        setMaxChargeCurrentAllow((prev) =>
          [
            ...prev,
            {
              y: Number(MbmuJSON.MaxChargeCurrentAllow),
              label: chartLabel,
            },
          ].filter((curr, i, arr) => !i || curr.label !== arr[i - 1].label)
        );
        // 允許最大放電電流
        setMaxDisChargeCurrentAllow((prev) =>
          [
            ...prev,
            {
              y: Number(MbmuJSON.MaxDischargeCurrentAllow),
              label: chartLabel,
            },
          ].filter((curr, i, arr) => !i || curr.label !== arr[i - 1].label)
        );

        setSystemStatus(MbmuJSON.SysStatus); // 系統狀態
        setBmsPowerOn(MbmuJSON.BMSPowerOn); // 上下電狀態
        setBmsStatus(MbmuJSON.BMSStatus); // MBMU 狀態
        setEmsCmd(MbmuJSON.EMSCmd); // EMS 指令
        setUpdatedTime(deviceDatas[0].created_at); // 資料更新時間
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CanvasJS chart
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div className="w-full pt-6 pb-40 px-12">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-80">
          首頁{" > "}PN 列表{" > "}
          {pnName}
        </label>
      </div>

      <div className="w-full mt-4">
        <h2 className="text-[32px] text-left font-bold text-mainText">
          {pnName}
        </h2>
      </div>

      {/* 內容 */}
      <div className="content grid md:grid-rows-3 md:grid-cols-6 md:gap-y-10 md:gap-x-8">
        {/* 表格 */}
        <div className="lg:w-full md:mb-auto md:col-span-2 md:row-span-1">
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
              <tr>
                <th className="pnList-table-th pr-6">上傳時間</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {pnDatas.updated_at}
                </td>
              </tr>
            </tbody>
          </table>
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
        <div className="MBMUheartBeat md:col-span-2 md:row-span-1">
          <CanvasJSChart options={HeartBeatOptions(heartBeat)} />
        </div>

        {/* SOC 圖表 */}
        <div className="SOC md:col-span-2 md:row-span-1">
          <CanvasJSChart options={SocOptions(socDatas)} />
        </div>

        {/* 整體狀態表 */}
        <div className="lg:w-1/2 m-auto md:col-span-2 md:row-span-1">
          <h2 className="text-center text-[32px] text-[#f3f3f3] font-bold mb-4 -mt-4">
            整體狀態
          </h2>
          <table className="lg:w-full text-[#f3f3f3]">
            <thead>
              <tr>
                <th className="pnList-table-th pr-4">系統狀態</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {systemStatus}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="pnList-table-th pr-4">上下電狀態</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {bmsPowerOn}
                </td>
              </tr>
              <tr>
                <th className="pnList-table-th pr-4">MBMU 狀態</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {bmsStatus}
                </td>
              </tr>
              <tr>
                <th className="pnList-table-th pr-4">EMS 指令</th>
                <td className="pnList-table-td border-l-1 pl-12">{emsCmd}</td>
              </tr>
              <tr>
                <th className="pnList-table-th pr-4">資料更新時間</th>
                <td className="pnList-table-td border-l-1 pl-12">
                  {updatedTime}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 電壓折線圖 */}
        <div className="md:col-span-3 md:row-span-1">
          <CanvasJSChart options={VoltageOptions(avgCellVoltage, soc)} />
        </div>

        {/* 電流折線圖 */}
        <div className="md:col-span-3 md:row-span-1">
          <CanvasJSChart
            options={CurrentOptions(
              sysCurrent,
              maxChargeCurrentAllow,
              maxDisChargeCurrentAllow,
              soc
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PnSummaryLayout;
