import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./columns";

function BasicTable() {
  const [tabledata, settableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://random-data-api.com/api/users/random_user?size=30`
      );
      const c = await response.json();
      const newData = JSON.stringify(c);
      const newData1 = JSON.parse(newData);
      if (newData.length > 0) {
        settableData(newData1);
      }
    };

    fetchData();
  }, []);
  console.log(tabledata);
  


  useEffect(() => {
    const data = localStorage.getItem("allUsers");
    console.log(data, "localstorage data hey")
})

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => [...tabledata], [tabledata]);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getFooterGroupProps()} class="table-active">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage} >Previous</button>
        <button onClick={() => nextPage} disabled={!canNextPage}>Next</button>
      </div>
    </div>
  );
}

export default BasicTable;
