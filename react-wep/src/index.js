import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from './Test';
import Map from './Map';
import OrderList from './OrderList';
import RepairInfo from './RepairInfo';
import Assign from './Assign';
import reportWebVitals from './reportWebVitals';
import SearchPlace from './Components/Project/SearchPlace'

import { BrowserRouter,Routes,Route,Link} from "react-router-dom";
import  Auth from './Quotes'
import RepairReport from './RepairReport';
import RepairRecord from './ReportRecord';
import PinLocation from './PinLocation';

export default function Index(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OrderList/>}/>
        <Route path='/Repair-info' element={<RepairInfo/>}/>
        <Route path='/Repair-report' element={<RepairReport/>}/>
        <Route path='/Assign-header' element={<Assign/>}/>
        <Route path='/Map' element={<Map/>}/>
        <Route path='/test' element={<Auth/>}/>
        <Route path='/test2' element={<SearchPlace/>}/>
        <Route path='/PinLocation' element={<PinLocation/>}/>
        <Route path='/Repair-record' element={<RepairRecord/>}/>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(< Index/>);
// ReactDOM.render(<h1>Hello</h1>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
