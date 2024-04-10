import { useContext } from "react";

import Item from "./Items";
import './Transaction.css'
import DataContext from "../../Data/DataContext";

const Transactions = (props)=>{
    const {items} = props
    // const name = useContext(DataContext)
    return (
        <div>
            <ul className="item-list">
                {items.map((element)=>{
                    return <Item {...element} key={element.id}/>
                })}
            </ul>
        </div>
    );
}


export default Transactions