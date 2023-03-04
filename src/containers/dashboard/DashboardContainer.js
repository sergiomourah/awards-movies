import axios from "axios";
import React, { useEffect, useState } from "react";
import TableCustom from "../../components/Table";

  function DashboardContainer() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/?projection=years-with-multiple-winners`);
      setData(result.data);
    };

    fetchData();
   }, []);

   const createData = (year, winnerCount) => {
    return { year, winnerCount };
  }

   const rows = (data.years ?? []).map(({ year, winnerCount }) => createData(year, winnerCount));

   const labels = [ "year", "winnerCount"];
    return (
      <div>
        <TableCustom rows={rows} labels={labels} />
      </div>
    );
  }

  export default DashboardContainer;