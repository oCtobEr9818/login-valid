import { useEffect, useState } from "react";
import axiosPnListApi from "../../api/axiosPnListApi";
import PnSummaryLayout from "./PN_summary_layout";

const PnSummaryFEX0101 = () => {
  const [pnData, setPnData] = useState([]);
  const [snData, setSnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pnData
        const pnResponse = await axiosPnListApi.get("/pn");
        const pnJSON = pnResponse.data.data;
        const fex0101Data = pnJSON.find((item) => item.pn_name === "FEX0101");
        setPnData(fex0101Data);

        // Fetch snData
        const snResponse = await axiosPnListApi.get(`/pn/${fex0101Data.id}/sn`);
        const snJSON = snResponse.data.data;
        const fex0101SnData = snJSON.find(
          (item) => item.sn_name === "FEX0101_SN"
        );
        setSnData(fex0101SnData);
      } catch (error) {
        console.error(error);
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
          imgUrl="花蓮華城大東244.png"
          imgAlt="花蓮華城大東244照片"
        />
      )}
    </>
  );
};

export default PnSummaryFEX0101;
