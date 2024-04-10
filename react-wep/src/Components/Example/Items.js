import { useContext } from 'react';

import PropTypes from 'prop-types';
import './Item.css'
import DataContext from '../../Data/DataContext';

const Item = ({title,amount})=>{
    const status = amount<0 ? "expense":"income"
    const symbol = amount<0 ? "-":"+"
    const name = useContext(DataContext)
    
    const formatNumber=(num)=>{
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return(
        <li className={status}>
            {title}<span> {symbol}{formatNumber(Math.abs(amount))}</span>
            {/* {name} */}
        </li>
    );
}

Item.propTypes={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Item