import { useEffect, useState } from "react";
import axiosPnListApi from "../../api/axiosPnListApi";
import PnSummaryLayout from "./PN_summary_layout";

const PnSummaryFEX0100 = () => {
  const [pnData, setPnData] = useState([]);
  const [snData, setSnData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pnData
        const pnResponse = await axiosPnListApi.get("/pn");
        const pnJSON = pnResponse.data.data;
        const fex0100Data = pnJSON.find((item) => item.pn_name === "FEX0100");
        setPnData(fex0100Data);

        // Fetch snData
        const snResponse = await axiosPnListApi.get(`/pn/${fex0100Data.id}/sn`);
        const snJSON = snResponse.data.data;
        const fex0100SnData = snJSON.find(
          (item) => item.sn_name === "FEX0100_SN"
        );
        setSnData(fex0100SnData);
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
          imgUrl="觀音華城三廠.png"
          imgAlt="觀音華城三廠照片"
        />
      )}
    </>
  );
};

export default PnSummaryFEX0100;
