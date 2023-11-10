import { useEffect, useState } from "react";
import axiosPnListApi from "../../api/axiosPnListApi";
import PnSummaryLayout from "./PN_summary_layout";

const PnSummaryFEX0102 = () => {
  const [pnData, setPnData] = useState([]);
  const [snData, setSnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pnData
        const pnResponse = await axiosPnListApi.get("/pn");
        const pnJSON = pnResponse.data.data;
        const fex0102Data = pnJSON.find((item) => item.pn_name === "FEX0102");
        setPnData(fex0102Data);

        // Fetch snData
        const snResponse = await axiosPnListApi.get(`/pn/${fex0102Data.id}/sn`);
        const snJSON = snResponse.data.data;
        const fex0102SnData = snJSON.find(
          (item) => item.sn_name === "FEX0102_SN"
        );
        setSnData(fex0102SnData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {pnData && snData && (
        <PnSummaryLayout
          pnName={pnData.pn_name}
          pnNickName={pnData.nickname}
          pnLoaction={pnData.location}
          pnUpdatedAt={pnData.updated_at}
          pnID={pnData.id}
          snID={snData.id}
          imgUrl="花蓮華城大東455.png"
          imgAlt="花蓮華城大東455照片"
        />
      )}
    </>
  );
};

export default PnSummaryFEX0102;
