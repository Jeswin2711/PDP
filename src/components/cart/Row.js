import React, { useState, useEffect } from 'react'
import './cart.css'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { styles } from './Cart';

const Count = styled(InputNumber)`
width: 70px;
position: absolute;
top: 23px;
right: 50px;
`

const Row = (props) => {

    const [itemNeeded, setitemNeeded] = useState(1)

    useEffect(() => {
        props.updateTotal()
    }, [itemNeeded, props.cartProduct])


    function getProductPrice(product) {
        const price = (parseFloat(product.product_price) * itemNeeded).toFixed(2)
        product.totalAmount = parseFloat(price);
        return price;
    }

    function removeProduct(item) {
        props.setcartProduct(props.cartProduct.filter((product) => product.product_id !== item.product_id))
        props.updateTotal()
    }

    return (
        <div>
            <img className="row-img" src='' />
            <div className='row-details'>
                <span>Product Name : {props.product.product_name}</span>
                <span>Product Price : &#x20b9;{getProductPrice(props.product)}</span>
            </div>
            <div>
                <Count
                    defaultValue={itemNeeded}
                    onChange={(value) => setitemNeeded(value)}
                    min={1}
                    max={10}
                />
                <DeleteOutlined
                    style={styles.deleteIcon}
                    onClick={() => removeProduct(props.product)}
                />
            </div>
        </div>
    )
}

export default Row