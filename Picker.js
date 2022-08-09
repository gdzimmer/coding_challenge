import React from "react";
import "./styles.css";
import DateRangeFilter from "./DateRangeFilter";

export default function Picker() {

  const onChange = ranges => {
    // log the ranges ...
    console.log(ranges);
  };

  // get and filter the data here (then display it below the picker)

  return (
    <div className="Picker">
      <DateRangeFilter onChange={onChange} />
    <center><h2>Filtered FIC Data based on maturity date</h2></center>

    </div>
  );
}
