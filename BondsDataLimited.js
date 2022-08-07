
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
  

  
function BondsDataLimited() {

    const data = React.useMemo(
        () => [
         {isin: 'XS1988387210', type: 'CORP', issuer: 'Microsoft Corp', maturity: '05/08/21', face_value: "90"},
         {isin: 'XS1988387211', type: 'CORP', issuer: 'Other Corp', maturity: '05/08/21', face_value: "100"},
         {isin: 'XS1988387212', type: 'CORP', issuer: 'Face Corp', maturity: '04/08/21', face_value: "980"},
         {isin: 'XS1988387210', type: 'CORP', issuer: 'Microsoft Corp', maturity: '04/08/21', face_value: "90"},
         {isin: 'XS1988387211', type: 'CORP', issuer: 'Other Corp', maturity: '05/07/21', face_value: "100"},
         {isin: 'XS1988387212', type: 'CORP', issuer: 'Face Corp', maturity: '05/07/21', face_value: "980"}
        ],
        []
    )
   
    const columns = React.useMemo(
        () => [
          // accessor is the "key" in the data
          { Header: 'isin', accessor: 'isin' },
          { Header: 'type', accessor: 'type' },
          { Header: 'issuer', accessor: 'issuer' },
          { Header: 'maturity', accessor: 'maturity' },
          { Header: 'face value', accessor: 'face_value' }
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

   export default BondsDataLimited;