import React from 'react';
import data from "./Data";


function Table() {
 
  let tb_data = data.map((rowdata, index) =>
 
    <tr key={index}>
     {(typeof(rowdata.Gadgets) === 'object') ?

     <>
           <th>Gadgets</th>

      {rowdata.Gadgets.map((subrowdata, k) =>
      <td>
       {subrowdata.name}
       </td>
      )}
      
      {rowdata.Gadgets.map((subrowdata, k) =>
      <td>
       {subrowdata.image}
       </td>
      )}
      </>
     : null
      }
      </tr>
    )
  
    let tb_2ndrow =  data.map((rowdata, index) =>
   
    <tr key={index}>
     {(typeof(rowdata.Books) === 'object') ?

     <>
           <th>Books</th>

      {rowdata.Books.map((subrowdata, k) =>
      <td>
       {subrowdata.name}
       </td>
      )}
      {rowdata.Books.map((subrowdata, k) =>
      <td>
       {subrowdata.image}
       </td>
      )}
      </>
     : null
      }
      </tr>
    )



  return (
    <div>

       <table className='table-striped'>
        <thead></thead>
        <tbody>
          {tb_data}
          {tb_2ndrow}
        </tbody>
       </table>
    </div>
  )
}

export default Table;
