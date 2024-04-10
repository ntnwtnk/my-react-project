import { useState,useEffect } from "react"
import { db } from "./backend/firebase_config"

import Bar from "./Components/Project/Bar"
import Details from "./Components/Project/Details"
import BackButton from "./Components/Project/BackButton"
import Sidebarboss from "./Components/Project/sidebar/Sidebarboss"
import { getDoc,doc } from "firebase/firestore"

import './RepairInfo.css'
function RepairRecord(){
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState([]);
    const [isDetailReady, setIsDetailReady] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);
    const [title, setTitle] = useState("")

    const DutyDocionRef = doc(db, 'Garage', 'pxtdYRPgJ2zYgAOAQf1W', 'Duty', 'uE2jt5vfboeqW4Chdm1b', 'complete','mZIt2MYboKBxAUSbcthQ')
    useEffect(()=>{
        const getDataBoss = async ()=>{
            const data = await getDoc(DutyDocionRef)
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
        data.title==='ตรวจสภาพรถ'? setTitle('ผลการตรวจสภาพรถ'):setTitle('ผลการซ่อมแซม');
        const getDetail = async ()=>{
            console.log('getting detail.. ', typeof(data.ref))
            if(data && data.ref){
                const docData = await getDoc(data.ref)
                const filteredData = {
                    ...docData.data(),
                }
                setDetail(filteredData);
                setIsDetailReady(true);
                console.log('detail duty : ',filteredData);
            }
        }
        getDetail()
    },[data, isDataReady])

    return(
        <>
            <Bar/>
            <Sidebarboss/>
            {isDetailReady && <Details detail={detail}/>}
            <div>
                <h2 className="detail-order"><b>{title}</b></h2>
                <label className="report-container" >{data.detail}</label>
            </div> 
            <BackButton des='/'/>
        </>
    )
}

export default RepairRecord