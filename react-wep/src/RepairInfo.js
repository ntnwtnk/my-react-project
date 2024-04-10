import { useState,useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'

import { db, app } from './backend/firebase_config';
import { addDoc, getDoc, deleteDoc, updateDoc, doc, getDocs, collection, serverTimestamp } from 'firebase/firestore';

import React from "react";
import BackButton from './Components/Project/BackButton';
import Bar from "./Components/Project/Bar";
import Details from "./Components/Project/Details";
import Popup from './Components/Project/Popup';
import Sidebaremployee from './Components/Project/sidebar/Sidebaremployee';
import ConfirmCancel from './Components/Project/ConfirmCancel';
import './RepairInfo.css'

function RepairInfo (){
    const [text,setText] = useState("");
    const [checkForm,setCheckForm] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isDetailReady, setIsDetailReady] = useState(false);
    const [dutyRef, setDutyRef] = useState(null);
    const [thisWorkRef, setThisWorkRef] = useState(null);
    const [detail, setDetail] = useState([]);
    const titleRef = 'check';
    const title = titleRef==='check' ? 'ผลการตรวจเช็ค' : 'ผลการซ่อมแซม';
    const DutyCollectionRef = doc(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'workers', 'DUbqx34IfLmRsg5yQunV', titleRef, 'GLpA1rqVL85iUXSMGAMB')
    useEffect(()=>{
        const getDetail = async () =>{
            const data = await getDoc(DutyCollectionRef);
            setThisWorkRef(data.ref);
            const filteredData = data.data();
            setDutyRef(filteredData.ref);
            const detailRef = await getDoc(filteredData.ref);
            const filteredDetail = detailRef.data();
            console.log('data : ',filteredDetail);
            setDetail(filteredDetail);
            setIsDetailReady(true);
        }
        getDetail();
    },[])
    useEffect(()=>{
        const checkdata = text.trim().length>0
        console.log(checkdata)
        setCheckForm(checkdata);
    },[text])

    const getAllBoss = async () =>{
        const WorkersCollectiomRef = collection(db, 'Garage' , 'pxtdYRPgJ2zYgAOAQf1W' , 'workers')
        const WorkersData = await getDocs(WorkersCollectiomRef);
        const WorkersDocs = WorkersData.docs;
        for(const worker of WorkersDocs){
            const isBoss = (worker.data().role==='หัวหน้าช่าง');
            if(isBoss){
                console.log('boss ref : ',worker.data().name)
                const checkReportCollectionRef = collection(worker.ref,'checkReport')
                await addDoc(checkReportCollectionRef, {
                    ref: dutyRef,
                    title: titleRef,
                    detail: text,
                    time: serverTimestamp(),
                    takerID: 'DUbqx34IfLmRsg5yQunV',
                    takerName: 'นายแซด อย่างบ่อย'
                });
            }
        }
        console.log('submitted!');
        await deleteDoc(thisWorkRef);
        console.log('deleted!');
    }

    const handleClick = () =>{
        console.log('submitting...');
        getAllBoss();
    }
    function togglePopup(){
        setShowPopup(!showPopup)        
    }

    return(
        <>
            <Bar/>
            <Sidebaremployee/>
            {isDetailReady && <Details detail={detail}/>}
            <div>
                <h2 className="detail-order"><b>{title}</b></h2>
                <textarea placeholder="ระบุรายละเอียด"  onChange={(e)=>setText(e.target.value)} className="order-container" ></textarea>
            </div>
            <div className="order-control">
                <button className="order-cancel"><FontAwesomeIcon icon={faXmark} /> ยกเลิก</button>
                <div class="space"></div>
                <button className="order-confirm" 
                    disabled={!checkForm} 
                    onClick={()=>{
                        togglePopup();
                        handleClick();
                    }}>
                    ยืนยัน
                </button>
                {showPopup && <Popup message="มอบหมายงานเรียบร้อยแล้ว" onClose={togglePopup}/>}
            </div>
            <BackButton des='/'/>
        </>
    )
}

export default RepairInfo