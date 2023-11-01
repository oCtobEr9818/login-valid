export const SbmuTable = ({ sbmuData }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:col-span-6 md:row-span-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="daily-table-th">
              SBMU
            </th>
            <th scope="col" className="daily-table-th">
              BatSubSysCurr
            </th>
            <th scope="col" className="daily-table-th">
              BatSubSysVol
            </th>
          </tr>
        </thead>
        <tbody>
          {sbmuData.map((data) => {
            const dataJSON = JSON.parse(data.data);
            return (
              <tr
                key={data.device_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-100"
              >
                <td className="daily-table-td">{data.device_name}</td>
                <td className="daily-table-td">{dataJSON.BatSubsysCurrent}</td>
                <td className="daily-table-td">{dataJSON.BatSubsysVoltage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
