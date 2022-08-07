
// import App from './App';

// import React from 'react'
import React, { useState } from "react"
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, useParams } from 'react-router-dom';

import BondsDataLimited from './BondsDataLimited';
import BondsDataFull from './BondsDataFull';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element= {<Home />} >
        <Route exact path="/bonds" element={<Bonds />} />
      </Route>

      <Route path="/nav" element= {<Navigate replace to="/bonds" />} />

      <Route path="/bonds" element= {<Bonds />} >
        <Route path="page1" element={<Page1 />} >
          <Route path=":bondid" element={<BondId />}/>
        </Route>
        
        <Route path="page2" element={<Page2 />} />
      </Route>

    </Routes>
  </Router>,
  document.getElementById("root")
);


function Home() {
  return (
    <div>
      <center>
        <h2>Welcome to Our Bond Database!</h2>
        <h3>(For Security Purposes : login to continue to the bond data)</h3>
        <Link to = "/">Some Way to Log in Securely</Link>
        <h3> </h3>
        <Link to = "/bonds">Shortcut To Bonds Page</Link>
        <Outlet />
      </center>
    </div>
  )
}

function Bonds() {
  return (
    <div>
      <center>
        <h1>You now have access to all the bond data below:</h1>
        <h2>Filters :</h2>
        <Link to = "/bonds/page1">See all data (with 8 selected attributes)</Link>
        <h3> </h3>
        <Link to = "/bonds/page2">See all data (with 5 selected attributes)</Link>
        <Outlet/>
      </center>
    </div>
  )
}



function Page1() {
    
  const [bond_num, setBondNum] = useState("")

  const handleChange = e => {
    setBondNum(e.target.value)
  }

  return (
    <div>
      <h2>You are looking at all bonds in the database</h2>
      <text>To see more information type a bond number identifier and search: </text>
      <h2> </h2>
      <form>
        <label>
          Bond Number: {" "}
          <input type="text"placeholder="Enter a Bond Number"  value={bond_num} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </label>
      </form>
      {/* <h5>Bond Number: {bond_num}</h5> */}
      <h2> </h2>
      <h3>(to filter the bonds by isin, date, issuer, etc... use the search boxes below)</h3>
      <BondsDataFull />
      <Outlet />
    </div>
  )
}

function Page2() {
  
  const [bond_num, setBondNum] = useState("")

  const handleChange = e => {
    setBondNum(e.target.value)
  }

  return (
    <div>
      <h2>You are looking at all bonds in the database</h2>
      <text>To see more information type a bond number identifier and search: </text>
      <h2> </h2>
      <form>
        <label>
          Bond Number: {" "}
          <input type="text"placeholder="Enter a Bond Number"  value={bond_num} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </label>
      </form>
      {/* <h5>Bond Number: {bond_num}</h5> */}
      <h2> </h2>
      <h3>(to filter the bonds by isin, date, issuer, etc... use the search boxes below)</h3>
      <BondsDataLimited />
      <Outlet />
    </div>
  )
}


function BondId() {
  const {bondid} = useParams();
  return (
    <div>
      <h2>URL param is : {bondid}</h2>
    </div>
  );
}


reportWebVitals();

