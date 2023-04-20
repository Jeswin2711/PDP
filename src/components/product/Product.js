import React, { useState } from 'react';
import './product.css';
import { Card } from 'antd';
import styled from 'styled-components'
import { convertToIndianCurrency } from '../../utils/Utils';
import { ExpandAltOutlined } from '@ant-design/icons'
import ProductInfo from '../productinfo/ProductInfo.tsx';

const ProductCard = styled(Card)`
width : 250px;
height : auto;
opacity : 0.8;
transition : opacity ease-in-out .2s;
&:hover{
    opacity : 1
};
cursor : pointer;
`

const styles = {
    icon: {
        textAlign: "right",
        position: "absolute",
        top: "0%",
        right: "5%",
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "30px",
        paddingTop: "5px",
        transition: "transform ease-in .2s"
    },
    iconStyle: {
        transform: "scale(1.3)",
    }
}

function Product({ item, addProductToCart }) {


    const [hover, setHover] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const iconStyle = hover ? { ...styles.icon, ...styles.iconStyle } : styles.icon

    function handleIconClick() {
        setIsModalOpen(true)
    }

    return (
        <ProductCard>
            {
                isModalOpen &&
                <ProductInfo
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    item={item}
                    addProductToCart={addProductToCart}
                />
            }
            <ExpandAltOutlined
                style={iconStyle}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                onClick={handleIconClick}
            />
            <img src={`https://picsum.photos/200/300?random=${item.product_id}}`} className='image' />
            <div className='product-details'>
                <span>Product Name : {item.product_name}</span>
                <span>Price : {convertToIndianCurrency(item.product_price)}</span>
            </div>
        </ProductCard>
    )
}

export default Product