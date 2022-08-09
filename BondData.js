
// must ==> npm install react-table

import React, { useState, useEffect } from "react";
import { findPets } from "../../services/PetServices";
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

import { Link } from "react-router-dom";
import {format} from 'date-fns';

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter, }) {

    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({ 
      column: { filterValue, preFilteredRows, setFilter }, }) {
   const count = preFilteredRows.length
  
   return (
     <input
       value={filterValue || ''}
       onChange={e => {
         setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
       }}
       placeholder={`Search ${count} records...`}
     />
   )
  }
  
export function dateBetweenFilterFn(rows, id, filterValues) {
  console.log("START FILTERING")
  const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
  const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
  if (ed || sd) {
    return rows.filter((r) => {
      console.log("RAW DATA: " + r.values[id])
      // format data
      var dateAndHour = r.values[id].split(" ");
      var hour = dateAndHour[1];
      const [day, month, year] = r.values[id].split('/');
      const date = new Date(+year, +month - 1, +day);
      var formattedData = date + " " + hour;

      // var [day, month, year] = dateAndHour[0].split("-");
      // var date = [day, month, year].join("/");
      var hour = dateAndHour[1];
      var formattedData = date + " " + hour;
      
        // const [day, month, year] = record.bond_maturity_date.split('/');
        // const date = new Date(+year, +month - 1, +day);
        // pets.bond_maturity_date = date
        // console.log(date); 

      console.log("Formatted : " + formattedData)
      const cellDate = new Date(formattedData);

      console.log("START : " + sd)
      console.log("END : " + ed)

      if (ed && sd) {
        return cellDate >= sd && cellDate <= ed;
      } else if (sd) {
        console.log("IS GREATER")
        return cellDate >= sd;
      } else {
        return cellDate <= ed;
      }
    });
  } else {
    return rows;
  }
}

export function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <input
        //min={min.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        type="date"
        value={filterValue[0] || ""}
      />
      {" to "}
      <input
        //max={max.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? val.concat("T23:59:59.999Z") : undefined
          ]);
        }}
        type="date"
        value={filterValue[1]?.slice(0, 10) || ""}
      />
    </div>
  );
}




function BondData() {
  
    const [pets, setPets] = useState([]);

    useEffect(() => {
        findPets().then(({data}) => {  setPets(data); });
    }, []);

    
  //  Object.values(pets).forEach(record => {

  //     if (record.bond_maturity_date) {
  //       const [day, month, year] = record.bond_maturity_date.split('/');
  //       const date = new Date(+year, +month - 1, +day);
  //       pets.bond_maturity_date = date
  //       console.log(date); 
  //     }
  //     // console.log(month); 
  //     // console.log(day); 
  //     // console.log(year); 
  //   }
  //   );

    

    const data = pets
                
    //{isin: , cusip: , maturity: , issuer: , bond_holder: , book_name: , bond_currency: , face_value: , unit_price: , coupon_pct: , 
    //  quantity: , type: , trade_date: , trade_type: , trade_curr: , trade_settle_date: , status: }}
       
   
    const columns = React.useMemo(
        () => [
          // accessor is the "key" in the data
          { Header: 'isin', accessor: 'isin' },
          { Header: 'cusip', accessor: 'cusip' },
          { Header: 'maturity', accessor: 'bond_maturity_date', 
          Filter: DateRangeColumnFilter, filter: dateBetweenFilterFn },
          { Header: 'issuer', accessor: 'issuer_name' },
          { Header: 'bond holder', accessor: 'bond_holder' },
          // { Header: 'book name', accessor: 'book_name' },
          // { Header: 'bond currency', accessor: 'bond_currency' },
          // { Header: 'face value', accessor: 'face_value' },
          // { Header: 'unit price', accessor: 'unit_price' },
          // { Header: 'coupon %', accessor: 'coupon_pct' },
          // { Header: 'quantity', accessor: 'quantity' },
          // { Header: 'type', accessor: 'type' },
          // { Header: 'trade date', accessor: 'trade_date' },
          // { Header: 'trade type', accessor: 'trade_type' },
          // { Header: 'trade currency', accessor: 'trade_curr' },
          // { Header: 'trade settle date', accessor: 'trade_settle_date' },
          // { Header: 'status', accessor: 'status' }
        ],
        []
    )
   
    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter, DateRangeColumnFilter, dateBetweenFilterFn
      }),
      []
    )
   
    const {
      getTableProps, getTableBodyProps,headerGroups, rows, prepareRow, state, 
      visibleColumns, preGlobalFilteredRows, setGlobalFilter,
    } = useTable(
      // Be sure to pass the defaultColumn option
      { columns,  data, defaultColumn },
      useFilters, useGlobalFilter, useSortBy, 
    );
   
    return (
        <div>
          <center>

          <h2>The Fixed Income & Currencies Technology (FIC) Database.</h2>
           <text>To filter the records in the Fixed Income & Currencies Technology (FIC) database by isin, 
           date, issuer, etc. use the search boxes below. You can also toggle the '▼' and '◼' symbols 
           to sort the data in ascending and descending order.
           </text>
           
           <h2></h2>
           <text>If you want to view all attributes of a specific bond :  </text>
          <Link to = "/AllBondData">Search All Bond Data</Link>
           <h2></h2>
           <text>If you want to filter bond data by maturity date :  </text>
          <Link to = "/Picker">Filter FIC Bond Data by Date</Link>
           <h2></h2>

          <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                              ? column.isSortedDesc
                                  ? ' ▼'
                                  : ' ▼'
                              : ' ◼'}
                       </span>
                       <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                  ))}
                </tr>
            ))}
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'left',
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                          <td
                              {...cell.getCellProps()}
                              style={{
                                padding: '5px',
                                border: 'solid 1px gray',
                              }}
                          >
                            {cell.render('Cell')}
                          </td>
                      )
                    })}
                  </tr>
              )
            })}
            </tbody>
          </table>
          </center>
        </div>
    );
   }
   
export default BondData;