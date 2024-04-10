import './Assign.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheck,faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react';
import { db , storage} from "./backend/firebase_config"
import { getDocs, getDoc, collection, doc , addDoc , deleteDoc , updateDoc, onSnapshot } from "firebase/firestore"

import Bar from './Components/Project/Bar'
import Details from './Components/Project/Details'
import SelectEmployee from './Components/Project/SelectEmployee'
import Sidebarboss from './Components/Project/sidebar/Sidebarboss'
import BackButton from './Components/Project/BackButton'
import Popup from './Components/Project/Popup';

export default function Assign(){
    const [showPopup, setShowPopup] = useState(false);
    const [isDetailReady, setIsDetailReady] = useState(false);
    const [data,setData] = useState([]);
    const [detail ,setDetail] = useState([]);
    const [worker, setWorker] = useState(null);
    const detailCollectionRef = collection(db, "Garage")
    const workCollectionRef = collection(detailCollectionRef, 'pxtdYRPgJ2zYgAOAQf1W', 'workers')

    useEffect(()=>{
        const getData = async ()=>{
            try {
                const filteredData = [];
                const workersData = await getDocs(workCollectionRef);
                setWorker(workersData);
                filteredData.push(
                    workersData.docs.map((worker) => {
                        if (worker.data().role === 'ช่าง') {
                        return {
                            ...worker.data(),
                            id: worker.id
                        };
                        } else {
                        return null; // ส่งค่า null เพื่อไม่เก็บข้อมูลใน filteredData
                        }
                    }).filter((worker) => worker !== null) // ตัดค่า null ออกจาก filteredData
                );
                console.log('ช่างทั้งหมด : ',filteredData);
                setData(filteredData);
            } catch(err){
                console.error(err);
            }
        }
        const getDetail = async () =>{
            try {
                const detailCollectionRef = doc(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'Duty', 'uE2jt5vfboeqW4Chdm1b');
                const data = await getDoc(detailCollectionRef);
                console.log('data : ',data.data());
                setDetail(data.data())
                setIsDetailReady(true)
            } catch (error) {
                console.error(error);
            }
        }
        getData();
        getDetail();
    },[])

    const handleCheckboxChange = async (employeeId, isChecked) => {
        console.log('employeeid : ',employeeId.id)
        if (isChecked) {
            console.log('check!')
            // setSelectedEmployees([...selectedEmployees, employeeId]);
            const WorkerCollRef = collection(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'workers', employeeId.id, 'check')
            const dutyRef = doc(detailCollectionRef, 'pxtdYRPgJ2zYgAOAQf1W', 'Duty' , 'uE2jt5vfboeqW4Chdm1b')
            try{
                await addDoc(WorkerCollRef, {
                    title : 'ได้แบ้ว',
                    ref : dutyRef
                });
            }catch(err){
                console.error(err)
            }
        }
        setShowPopup(true);
    };

    // const workerCollectionRef = collection(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'workers'); 
    // const sendToEmpoyee = async ()=>{
    //     console.log('submiting')
    //     const workers = worker.docs;
    //     for(const worker of workers){
    //         const isSelected = selectedEmployees.find((employee) => employee.id === worker.id);
    //         if(isSelected){
    //             const workRef = collection(workerCollectionRef, worker.id, 'check')
    //             const dutyRef = doc(detailCollectionRef, 'pxtdYRPgJ2zYgAOAQf1W', 'Duty' , 'uE2jt5vfboeqW4Chdm1b')
    //             try{
    //                 await addDoc(workRef, {
    //                     title : 'ได้แบ้ว',
    //                     ref : dutyRef
    //                 });
    //             }catch(err){
    //                 console.error(err)
    //             }
    //         }
    //     }      
    // }

    function togglePopup(){
        setShowPopup(!showPopup);        
    }

    return(
        <div>
            <Bar/>
            <Sidebarboss/>
            {isDetailReady && <Details detail={detail}/>}
            <h2  className='selectemployee-container' style={{fontSize:"18px"}}><b>เลือกพนักงาน</b></h2>
            <div className="select-box-container">
                {data.flatMap((arr)=> arr.map((employee)=>{
                    return <SelectEmployee {...employee} key={employee.id} 
                            onCheckboxChange={(isChecked) => {
                                handleCheckboxChange(employee, isChecked)
                                // togglePopup();
                            }}/>
                }))}
            </div>
            {showPopup && <Popup message="มอบหมายงานเรียบร้อยแล้ว" onClose={togglePopup}/>}
            
            <BackButton/>
        </div>
    )
}