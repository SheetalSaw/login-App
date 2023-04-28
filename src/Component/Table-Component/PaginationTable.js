import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination, useLocation } from "react-table";
// import "../Table-Component/Table.css";
import { columns } from "./columns";
import { Button } from "bootstrap";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Checkbox, Select, MenuItem } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

function PaginationTable() {
  const [planFilter, setPlanFilter] = useState(true);
  const [filter, setFilter] = useState(true);
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");

  const defaultMaterialTheme = createTheme();

  const [data, setData] = useState([]);
  // const [ dataforFilter, setDataForFilter] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userObj = JSON.parse(localStorage.getItem("userObj"));

    console.log("data ", data);
    // console.log(data);

    const hideUser = data.filter((user) => user.id !== userObj.id);

    setData(hideUser);
    // console.log(hideUser);

    // if (data.length > 0) {
    //   setData(data);
    //   // setDataForFilter(data);
    //   // setFilteredData(data)

    // }
  }, []);

  const [filteredData, setFilteredData] = useState(data);

  const handleChange = () => {
    setFilter(!filter);
  };

   const handleChangePlan =() => {
    setPlanFilter(!planFilter)
   }
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userObj = JSON.parse(localStorage.getItem("userObj"));

    console.log("data ", data);
    // console.log(data);

    const hideUser = data.filter((user) => user.id !== userObj.id);

    if (status === "All") {
      console.log("all", data);
      setFilteredData(hideUser);
      // setDataForFilter(data)
    } else {
      console.log("not all");
      setFilteredData(
        hideUser.filter((dt) => dt.subscription.status === status)
      );
    }

    console.log(typeof status);
  }, [status]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allUsers")) || [];
    const userObj = JSON.parse(localStorage.getItem("userObj"));

    console.log("data ", data);
    // console.log(data);

    const hideUser = data.filter((user) => user.id !== userObj.id);

    if (plan === "All") {
      console.log("all", data);
      setFilteredData(hideUser);
      // setDataForFilter(data)
    } else {
      console.log("not all");
      setFilteredData(
        hideUser.filter((dt) => dt.subscription.plan === plan)
      );
    }

  }, [plan]);

  return (
    <div
      style={{
        width: "1500px",
        height: "100%",
        fontSize: "15px",
        marginLeft: "10px",
      }}
    >
      <ThemeProvider theme={defaultMaterialTheme}>
        <Checkbox
          checked={filter}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: 100 }}
          value={status}
          // label="Age"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Blocked">Blocked</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Idle">Idle</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
        <Checkbox
          checked={planFilter}
          onChange={handleChangePlan}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{ width: 100 }}
          value={plan}
          // label="Age"
          onChange={(e) => setPlan(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Basic">Basic</MenuItem>
          <MenuItem value="Diamond">Diamond</MenuItem>
          <MenuItem value="Gold">Gold</MenuItem>
          <MenuItem value="Platinum">Platinum</MenuItem>
        </Select>
        <MaterialTable
          columns={columns}
          data={filteredData}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                setData([...data, newRow]);
                setFilteredData([...data, newRow]);

                localStorage.setItem(
                  "allUsers",
                  JSON.stringify([...data, newRow])
                );
                resolve();
              }),

            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [...data];
                // const index = oldRow.id;
                // updatedRows[index] = updatedRow;

                const thatUser = updatedRows.findIndex(
                  (edituser) => edituser.id === oldRow.id
                );

                // console.log(thatUser);

                if (thatUser !== -1) updatedRows[thatUser] = updatedRow;
                // console.log(existingEntries[thatUser]);
                // console.log(existingEntries);
                console.log(oldRow.id);
                setTimeout(() => {
                  setData(updatedRows);
                  setFilteredData(updatedRows);
                  localStorage.setItem("allUsers", JSON.stringify(updatedRows));
                  resolve();
                }, 500);
              }),

            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const updatedData = [...data];
                updatedData.splice(
                  updatedData.findIndex((a) => a.id === selectedRow.id),
                  1
                );
                console.log(updatedData);
                console.log(selectedRow);
                setData(updatedData);
                setFilteredData(updatedData);
                localStorage.setItem("allUsers", JSON.stringify(updatedData));

                setTimeout(() => resolve(), 1000);
              }),
          }}
          options={{
            sorting: true,
            search: true,
            searchFieldAllignment: "right",
            filtering: filter,
            paging: true,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "both",
            addRowPosition: "first",
            actionsColumnIndex: -1,
            paginationPosition: "bottom",
            rowStyle: {
              padding: "5px",
              margin: "5px ",
            },
            searchFieldAlignment: "right",
          }}
          title="User Information"
          icons={{ Add: () => <button>Add New User</button> }}
        />
      </ThemeProvider>
    </div>
  );
}

export default PaginationTable;

// function PaginationTable() {
//   // const {state} = useLocation();
//   // console.log(state.data);
//   const [tabledata, settableData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [updatedTableData, setupdatedTableData] = useState([]);
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("allUsers")) || [];
//     console.log("data ",data);
//     // console.log(data);
//     if (data.length > 0) {
//       settableData(data);
//     }

//   }, []);

//   console.log("tabledata: ", tabledata);

//   const data = useMemo(() => [...tabledata], [tabledata]);

//   console.log(data);
//   // console.log(tabledata);

//   const navigate = useNavigate();

//   const tableHooks = (hooks) => {
//     hooks.visibleColumns.push((columns) => [
//       ...columns,
//       {
//         id: "Edit",
//         Header: "Action",

//         Cell: ({ cell }) => (
//           <div>
//             <button
//               value={cell.row.values.name}
//               onClick={(e) => {
//                 navigate("/addnewuser", {
//                   state: { data: cell.row.original, action: "update" },
//                 });
//               }}
//             >
//               Edit
//             </button>{" "}
//             <button value={cell.row.values.name}>Delete</button>
//           </div>
//         ),
//       },
//     ]);
//   };

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     state: { pageIndex, pageSize },
//     gotoPage,
//     prepareRow,
//   } = useTable(
//     {
//       columns: columns,
//       data: tabledata,
//       initialState: { pageIndex: 2 },
//     },
//     tableHooks,
//     usePagination
//   );

//   return (
//     <div>
//       <button className="addnewuser-btn">Add New User</button>

//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getFooterGroupProps()} class="table-active">
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <span>
//         page{" "}
//         <strong>
//           {pageIndex + 1} of {pageOptions.length}
//         </strong>{" "}
//       </span>
//       <div>
//         <button onClick={previousPage} disabled={!canPreviousPage}>
//           Previous
//         </button>
//         <button onClick={nextPage} disabled={!canNextPage}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaginationTable;
