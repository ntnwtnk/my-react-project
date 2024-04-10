import Transactions from "./Components/Example/Transactions";
import FormComponents from "./Components/Example/FormComponents";
import ReportComponent from "./Components/Example/ReportComponent";
import {useState,useEffect,useReducer} from "react";
import './Test.css'
import DataContext from "./Data/DataContext";
import { BrowserRouter,Routes,Route,Link} from "react-router-dom";


const design =  {color:'red',textAlign:"center",fontSize:'1.5rem'}
const Title = ()=><h1 style={design}> แอพบัญชีรายรับ - รายจ่าย</h1>

function Test(){
    const init0state = [
        {id:1,title:"ค่าเช่าบ้าน",amount:-12500},
        {id:2,title:"เงินเดือน",amount:25000},
        {id:3,title:"ค่าน้ำ",amount:-312},
        {id:4,title:"ค่าไฟ",amount:-902}
    ]
    const [items,setItems] = useState(init0state)
    const [reportIncome,setReportIncome] = useState(0)
    const [reportExpense,setReportExpense] = useState(0)

    const onAddNewItem = (newItem)=>{
        setItems((prevItem)=>{
            return [newItem,...prevItem]
        })
        
    }
    // console.log(items)

    useEffect(()=>{
        const amounts = items.map(items=>items.amount)
        const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
        const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1

        setReportIncome(income.toFixed(2))
        setReportExpense(expense.toFixed(2))
    },[items,reportIncome,reportExpense])

    //reducer state
    // const [showReport,setShowReport] = useState(false)
    // const reducer = (state,action)=>{
    //     switch(action.type){
    //         case "SHOW" :
    //             return setShowReport(true)
    //         case "HIDE" :    
    //             return setShowReport(false)
    //     }
    // }
    // const [result,dispatch] = useReducer(reducer,showReport)
    return (
        <DataContext.Provider value={
            {
                income : reportIncome,
                expense : reportExpense
            }
        }>
         <div className="Container">
             <Title/>
             <BrowserRouter>
                <div>
                    <ul className="horizontal-menu">
                        <li>
                            <Link to="/">ข้อมูลบัญชี</Link>
                        </li>
                        <li>
                            <Link to="/insert">บันทึกข้อมูล</Link>
                        </li>
                    </ul>
                    <Routes>
                        <Route path='/' element={<ReportComponent/>}></Route>
                        <Route path='/insert' element={
                            <div>
                                <FormComponents onAddItem={onAddNewItem}/> 
                                <Transactions items={items}/> 
                            </div>}>
                        </Route>
                    </Routes>
                </div>
             </BrowserRouter>
             {/* <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
             <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button> */}
         </div>            
        </DataContext.Provider>
    );
}

export default Test