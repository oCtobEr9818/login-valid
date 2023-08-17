import React from "react";

const PnHistory = () => {
  return (
    <div className="w-full h-full p-6">
      <div className="h-auto pl-4 py-4 bg-slate-200 rounded-md text-sm select-none">
        <label className="opacity-60">總攬{" > "}PN_history</label>
      </div>

      <div className=" h-auto w-full mt-4">
        <div className="title my-4">
          <h2 className="text-[32px] font-bold">PN歷史資料</h2>
        </div>

        <div className="listWrap w-full h-full m-auto border-2"></div>
      </div>
    </div>
  );
};

export default PnHistory;
