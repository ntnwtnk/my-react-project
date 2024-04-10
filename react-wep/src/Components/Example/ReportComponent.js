import { useContext } from "react";
import DataContext from "../../Data/DataContext";
import './ReportComponent.css'

const ReportComponent =()=>{
    const {income,expense} = useContext(DataContext)
    const formatNumber=(num)=>{
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return(
        <div>
            <h3>ยอดคงเหลือ (บาท)</h3>
            <h2>฿{formatNumber((income-expense).toFixed(2))}</h2>
            <div className="report-container">
                <div>
                    <h3>รายได้ทั้งหมด</h3>
                    <p className="report plus">฿{formatNumber(income)}</p>
                </div>
                <div>
                    <h3>รายจ่ายทั้งหมด</h3>
                    <p className="report minus">฿{formatNumber(expense)}</p>
                </div>
            </div>
        </div>
    );
}

export default ReportComponent