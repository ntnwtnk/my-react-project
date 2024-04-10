import {useEffect, useState} from "react";
import BackButton from './Components/Project/BackButton';
import Bar from "./Components/Project/Bar";
import Details from "./Components/Project/Details";
import ConfirmCancel from "./Components/Project/ConfirmCancel";
import Popup from './Components/Project/Popup';
import Sidebarboss from './Components/Project/sidebar/Sidebarboss';
import './Components/Project/BackButton.css'
import './RepairReport.css'
// import 'firebase/firestore';
// import 'firebase';
import { db } from "./backend/firebase_config";
import { deleteDoc, getDocs, getDoc, addDoc, collection, doc, updateDoc } from "firebase/firestore";

function RepairReport (){
    const [showPopup, setShowPopup] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);
    const [data,setData] = useState([]);
    const [detail, setDetail] = useState([]);
    const [thisWorkRef, setThisWorkRef] = useState(null);
    const [title, setTitle] = useState('');
    const [message, setMessege] = useState("");
    function togglePopup(){
        setShowPopup(!showPopup);
    }

    const DutyCollectionRef = collection(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'workers', 'sv9H7iqgi3F5yrK9mjEQ', 'checkReport');
    const DutyDoc = doc(DutyCollectionRef, 'tYbFOdXNAqoQ0HwaDcL3');
    useEffect(()=>{
        const getDataBoss = async ()=>{
            const data = await getDoc(DutyDoc)
            setThisWorkRef(data.ref)
            const filteredData = {
                ...data.data(),
                id: data.id
            }
            console.log('data : ',filteredData);
            setData(filteredData);
            setIsDataReady(true);
        }
        getDataBoss()
    },[])
    useEffect(()=>{
        const text = data.title==='check' ? 'ผลการตรวจสภาพ' : 'ผลการซ่อมแซม'
        setTitle(text);
        const getDetail = async ()=>{
            console.log('getting detail.. ', typeof(data.ref))
            if(data && data.ref){
                const docData = await getDoc(data.ref)
                const filteredData = {
                    ...docData.data(),
                    id: docData.id
                }
                setDetail(filteredData);
                setShowDetail(true);
                console.log('detail duty : ',filteredData);
            }
        }
        getDetail()
        // console.log(detail.brand)
    },[data, isDataReady])

    const submitReport = async(col) =>{
        console.log('submitting...');  
        // console.log('type of nameCol : ',typeof(nameCol))  
        const workersCollectionRef = collection(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'workers', 'sv9H7iqgi3F5yrK9mjEQ' , col); 
        await addDoc(workersCollectionRef,{ref: data.ref});
    }

    const addToComplete = async () =>{
        console.log('adding to section complete...');
        const DutyCollectionReff = collection(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'Duty', detail.id, 'complete');
        await addDoc(DutyCollectionReff, data);
    }

    const deleteReport = async () =>{
        await deleteDoc(thisWorkRef);
        console.log('delete report from header.')
    }
    const sendToComplete = async () =>{
        const DutyDocRef = doc(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'Duty', detail.id)
        if(data.title==='ตรวจสภาพรถ'){
            console.log('ยืนยันการตรวจสภาพรถ');
            submitReport('assignRepair');
            await updateDoc(DutyDocRef, {status: 2});
        }else{
            console.log('ยืนยันการซ่อมแซมรถ');
            submitReport('calculate');
            await updateDoc(DutyDocRef, {status: 4});
        }
        addToComplete();
        deleteReport();
    }
    const sendToFailed = async () =>{
        const TakerDocRef = doc(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'workers', data.takerID)
        // const ref = data.title==='ตรวจสภาพรถ' ? 'check' : 'repair';
        console.log('ส่งกลับไปที่ : ',data.title)
        const TakerColRef = collection(TakerDocRef, data.title)
        await addDoc(TakerColRef, {ref:data.ref});
        deleteReport();
    }

    const handleClick = (num)=>{
        console.log('click ',num );
        togglePopup();
        if(num === 1){
            sendToComplete()
            setMessege('ยืนยันงานเรียบร้อยแล้ว')
        }else{
            sendToFailed()
            setMessege('ยกเลิกงานเรียบร้อยแล้ว')
        }
    }
    return(
        <>
            <Bar/>
            <Sidebarboss/>
            {showDetail && <Details detail={detail}/>}
            <div>
                <h2 className="detail-order"><b>{title}</b></h2>
                <label className="report-container" >{data.detail}</label>
            </div> 
            <div>
                <ConfirmCancel role={'boss'} onClick={(num)=>handleClick(num)}/>
                {showPopup && <Popup message={message} onClose={togglePopup}/>}
            </div>
            <BackButton des='/'/>
        </>
    )
}

export default RepairReport