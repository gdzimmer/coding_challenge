import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';



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
  


function BondDataFull() {

    const data = React.useMemo(
        () => [
            
        //  {isin: "XS1988387210", cusip: "", maturity: "05/08/2021", issuer: "Microsoft Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_1", bond_currency: "USD", face_value: "1000", unit_price: "90", coupon_pct: "4.37", 
        //   quantity: "50", type: "CORP", trade_date: "13/05/2021", trade_type: "buy", trade_curr: "USD", trade_settle_date: "04/08/2021", status: "open"},
        //  {isin: "XS1988387210", cusip: "", maturity: "05/08/2021", issuer: "Microsoft Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_1", bond_currency: "USD", face_value: "1000", unit_price: "90", coupon_pct: "4.37", 
        //  quantity: "50", type: "CORP", trade_date: "13/05/2021", trade_type: "buy", trade_curr: "USD", trade_settle_date: "04/08/2021", status: "open"},
        //  {isin: "XS1988387210", cusip: "", maturity: "05/08/2021", issuer: "Microsoft Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_1", bond_currency: "USD", face_value: "1000", unit_price: "90", coupon_pct: "4.37", 
        //   quantity: "50", type: "CORP", trade_date: "13/05/2021", trade_type: "buy", trade_curr: "USD", trade_settle_date: "04/08/2021", status: "open"},
        //  {isin: "XS1988387210", cusip: "", maturity: "05/08/2021", issuer: "Microsoft Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_1", bond_currency: "USD", face_value: "1000", unit_price: "90", coupon_pct: "4.37", 
        //  quantity: "50", type: "CORP", trade_date: "13/05/2021", trade_type: "buy", trade_curr: "USD", trade_settle_date: "04/08/2021", status: "open"},
        {isin: "XS1988387210", cusip: "", maturity: "04/08/2021", issuer: "Microsoft Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_1", bond_currency: "USD", face_value: "1000",},
       {isin: "XS1988387211", cusip: "", maturity: "05/08/2021", issuer: "Microsoft Corp", bond_holder: "BZ Holdings Inc", book_name: "Trading_book_2", bond_currency: "USD", face_value: "9000", },
       {isin: "XS1988387212", cusip: "", maturity: "05/09/2021", issuer: "Facebook Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_2", bond_currency: "USD", face_value: "8000",},
      {isin: "XS1988387210", cusip: "", maturity: "05/08/2021", issuer: "Microsoft Corp", bond_holder: "AZ Holdings Inc", book_name: "Trading_book_1", bond_currency: "USD", face_value: "1100", },
        //  {isin: 'XS1988387210', type: 'CORP', issuer: 'Microsoft Corp', maturity: '05/08/21', face_value: "90"},
        //  {isin: 'XS1988387211', type: 'CORP', issuer: 'Other Corp', maturity: '05/08/21', face_value: "100"},
        //  {isin: 'XS1988387212', type: 'CORP', issuer: 'Face Corp', maturity: '04/08/21', face_value: "980"},
        //  {isin: 'XS1988387210', type: 'CORP', issuer: 'Microsoft Corp', maturity: '04/08/21', face_value: "90"},
        //  {isin: 'XS1988387211', type: 'CORP', issuer: 'Other Corp', maturity: '05/07/21', face_value: "100"},
        //  {isin: 'XS1988387212', type: 'CORP', issuer: 'Face Corp', maturity: '05/07/21', face_value: "980"}

         //{isin: , cusip: , maturity: , issuer: , bond_holder: , book_name: , bond_currency: , face_value: , unit_price: , coupon_pct: , 
         //  quantity: , type: , trade_date: , trade_type: , trade_curr: , trade_settle_date: , status: }}
        ],
        []
    )
   
    const columns = React.useMemo(
        () => [
          // accessor is the "key" in the data
          { Header: 'isin', accessor: 'isin' },
          { Header: 'cusip', accessor: 'cusip' },
          { Header: 'maturity', accessor: 'maturity' },
          { Header: 'issuer', accessor: 'issuer' },
          { Header: 'bond holder', accessor: 'bond_holder' },
          { Header: 'book name', accessor: 'book_name' },
          { Header: 'bond currency', accessor: 'bond_currency' },
          { Header: 'face value', accessor: 'face_value' },
        //   { Header: 'unit price', accessor: 'unit_price' },
        //   { Header: 'coupon %', accessor: 'coupon_pct' },
        //   { Header: 'quantity', accessor: 'quantity' },
        //   { Header: 'type', accessor: 'type' },
        //   { Header: 'trade date', accessor: 'trade_date' },
        //   { Header: 'trade type', accessor: 'trade_type' },
        //   { Header: 'trade currency', accessor: 'trade_curr' },
        //   { Header: 'trade settle date', accessor: 'trade_settle_date' },
        //   { Header: 'status', accessor: 'status' }
        ],
        []
    )
   
    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    )
   
    const {
      getTableProps, getTableBodyProps,headerGroups, rows, prepareRow, state, 
      visibleColumns, preGlobalFilteredRows, setGlobalFilter,
    } = useTable(
      // Be sure to pass the defaultColumn option
      { columns,  data, defaultColumn },
      useFilters, useGlobalFilter, useSortBy
    );
   
    return (
        <div>
          <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                         //  style={{
                         //    borderBottom: 'solid 3px red',
                         //    color: 'black',
                         //  }}
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
        </div>
    );
   }
   
export default BondDataFull;