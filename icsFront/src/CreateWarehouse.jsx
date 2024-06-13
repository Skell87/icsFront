// import React, { useContext, useState } from "react";
// import { AuthContext } from "./Context";
// import { getToken, registerWarehouse } from "./api";

// function CreateWarehouse() {
//   const [vwName, setVwName] = useState("");
//   const [divisions, setDivisions] = useState([]);
//   const { auth } = useContext(AuthContext);

//   const addDivision = () => {
//     setDivisions([...divisions, { name: "", count: 1 }]);
//   };

//   const updateDivision = (index, key, value) => {
//     const newDivisions = divisions.map((div, i) =>
//       i === index ? { ...div, [key]: value } : div
//     );
//     setDivisions(newDivisions);
//   };

//   // dont forget to set up the response, missing elements
//   const handleSubmitCreateWarehouse = () => {
//     console.log("youve submitted nothing, good day sir");
//     console.log("sent data here", {
//       name: vwName,
//       divisions: divisions,
//     });
//     registerWarehouse({
//       auth,
//       name: vwName,
//       divisions: divisions,
//     })
//       .then((response) => {
//         console.log("registered warehouse", response);
//         setVwName("");
//         setDivisions([]);
//       })
//       .catch((error) => {
//         console.error(
//           "error registering warehouse:",
//           error.response ? error.respose.data : error.message
//         );
//       });
//   };

//   return (
//     <div>
//       <div>
//         <label>Warehouse Name:</label>
//         <input
//           type="text"
//           value={vwName}
//           onChange={(e) => setVwName(e.target.value)}
//           required
//         />
//       </div>
//       {divisions.map((division, index) => (
//         <div key={index} style={{ marginBottom: "10px" }}>
//           <label>Division Name:</label>
//           <input
//             type="text"
//             value={division.name}
//             onChange={(e) => updateDivision(index, "name", e.target.value)}
//             required
//           />
//           <label>Number of Divisions:</label>
//           <input
//             type="number"
//             value={division.count}
//             onChange={(e) =>
//               updateDivision(index, "count", parseInt(e.target.value))
//             }
//             min="1"
//             required
//           />
//         </div>
//       ))}
//       <button type="button" onClick={addDivision}>
//         Add Division
//       </button>
//       <button type="button" onClick={handleSubmitCreateWarehouse}>
//         Create Warehouse
//       </button>
//     </div>
//   );
// }

// export default CreateWarehouse;

// import React, { useState } from "react";

// const CreateWarehouse = () => {
//   const [warehouseName, setWarehouseName] = useState("");
//   const [aisles, setAisles] = useState(1);
//   const [rows, setRows] = useState(1);
//   const [columns, setColumns] = useState(1);
//   const [tableData, setTableData] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Calculate total cells
//     const totalCells = aisles * rows * columns;

//     // Generate tableData
//     const newTableData = [];
//     for (let aisle = 1; aisle <= aisles; aisle++) {
//       for (let row = 1; row <= rows; row++) {
//         for (let column = 1; column <= columns; column++) {
//           newTableData.push({
//             warehouseName,
//             aisle,
//             row,
//             column,
//           });
//         }
//       }
//     }
//     setTableData(newTableData);
//   };

//   return (
//     <div>
//       <h2>Create Warehouse</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Warehouse Name:
//           <input
//             type="text"
//             value={warehouseName}
//             onChange={(e) => setWarehouseName(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Number of Aisles:
//           <input
//             type="number"
//             value={aisles}
//             onChange={(e) => setAisles(parseInt(e.target.value))}
//           />
//         </label>
//         <br />
//         <label>
//           Number of Rows:
//           <input
//             type="number"
//             value={rows}
//             onChange={(e) => setRows(parseInt(e.target.value))}
//           />
//         </label>
//         <br />
//         <label>
//           Number of Columns:
//           <input
//             type="number"
//             value={columns}
//             onChange={(e) => setColumns(parseInt(e.target.value))}
//           />
//         </label>
//         <br />
//         <button type="submit">Create Warehouse</button>
//       </form>
//       <br />
//       {tableData.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>Warehouse Name</th>
//               <th>Aisle</th>
//               <th>Row</th>
//               <th>Column</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((cell, index) => (
//               <tr key={index}>
//                 <td>{cell.warehouseName}</td>
//                 <td>{cell.aisle}</td>
//                 <td>{cell.row}</td>
//                 <td>{cell.column}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CreateWarehouse;

import React, { useState } from "react";

const CreateWarehouse = () => {
  const [warehouseName, setWarehouseName] = useState("");
  const [divisions, setDivisions] = useState([{ name: "", quantity: 1 }]);
  const [tableData, setTableData] = useState([]);

  const handleDivisionChange = (index, key, value) => {
    const newDivisions = [...divisions];
    newDivisions[index][key] = value;
    setDivisions(newDivisions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total cells
    let totalCells = 1;
    divisions.forEach((division) => {
      totalCells *= division.quantity;
    });

    // Generate tableData
    const newTableData = [];
    let currentCombination = new Array(divisions.length).fill(1);

    for (let i = 0; i < totalCells; i++) {
      const cell = {};
      divisions.forEach((division, index) => {
        cell[division.name] = currentCombination[index];
      });
      newTableData.push({
        warehouseName,
        ...cell,
      });

      // Update current combination
      for (let j = divisions.length - 1; j >= 0; j--) {
        if (currentCombination[j] < divisions[j].quantity) {
          currentCombination[j]++;
          break;
        } else {
          currentCombination[j] = 1;
        }
      }
    }

    setTableData(newTableData);
  };

  const addDivision = () => {
    setDivisions([...divisions, { name: "", quantity: 1 }]);
  };

  const removeDivision = (index) => {
    const newDivisions = [...divisions];
    newDivisions.splice(index, 1);
    setDivisions(newDivisions);
  };

  return (
    <div>
      <h2>Create Warehouse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Warehouse Name:
          <input
            type="text"
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
          />
        </label>
        <br />
        {divisions.map((division, index) => (
          <div key={index}>
            <label>
              Division Name:
              <input
                type="text"
                value={division.name}
                onChange={(e) =>
                  handleDivisionChange(index, "name", e.target.value)
                }
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={division.quantity}
                onChange={(e) =>
                  handleDivisionChange(
                    index,
                    "quantity",
                    parseInt(e.target.value)
                  )
                }
              />
            </label>
            {index > 0 && (
              <button type="button" onClick={() => removeDivision(index)}>
                Remove Division
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addDivision}>
          Add Division
        </button>
        <br />
        <button type="submit">Create Warehouse</button>
      </form>
      <br />
      {tableData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Warehouse Name</th>
              {divisions.map((division, index) => (
                <th key={index}>{division.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((cell, index) => (
              <tr key={index}>
                <td>{cell.warehouseName}</td>
                {divisions.map((division, idx) => (
                  <td key={idx}>{cell[division.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateWarehouse;
