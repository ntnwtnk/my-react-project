import { BrowserRouter,Routes,Route,Link,useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons'
import { UserState } from "realm-web";

import Bar from "./Components/Project/Bar";
import Duty from './Components/Project/Duty';
import RepairInfo from "./RepairInfo";
import BackButton from "./Components/Project/BackButton";

import './OrderList.css'
import './Components/Project/BackButton.css'
import { useState } from "react";

import Sidebaremployee from './Components/Project/sidebar/Sidebaremployee'

function OrderList(){
    const c = false

    return(
        <>
            <Bar/>
            <Sidebaremployee/>
            <h2 className='detail-work'><b>งานทั้งหมด</b></h2>
            <div className='bg-duty-color'>
                {/* {detail.map((element)=>{
                    return <Duty {...element} key={element._id}/>
                })} */}
                <Duty/>
                <Duty/>
            </div>  
            <BackButton des='/Repair-info'/>
        </>
    );
}

export default OrderList