import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { RollbackOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './cart.css'
import { Button, Card } from 'antd';
import styled from 'styled-components'
import Row from './Row';

const ProductCard = styled(Card)`
height: 80px;
display: flex;
flex-direction: row;
justify-content : center;
align-items : center;
`


export const styles = {
    icon: {
        marginRight: "auto",
        display: "flex",
        width: "10%",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
        transform: "scale(1.2)"
    },
    greenButton: { backgroundColor: "#4BB543", color: "white" },
    deleteIcon: {
        transform: "scale(1.5)",
        right: "5%",
        top: "40%",
        position: "absolute"
    }
}

function Cart() {

    const { state } = useLocation()
    const navigate = useNavigate()
    const [isCheckedOut, setIsCheckedOut] = useState(false)
    const [cartProduct, setcartProduct] = useState(Object.keys(state.cartProduct).length === 0 ? [] : state.cartProduct)
    const [total, setTotal] = useState();

    const goBack = () => {
        navigate(-1)
    }

    function clearAll() {
        setcartProduct([])
        setTotal(0)
    }

    function updateTotal() {
        let amount = 0
        cartProduct.map((product) => {
            amount += product.totalAmount
        })
        setTotal(amount.toFixed(2))
    }

    function calculateTotal() {
        if (Object.keys(cartProduct).length === 0) {
            return 0;
        }
        return total;
    }

    return (
        <div className='cart'>{
            isCheckedOut ?
                <>
                    <p>Success !!!</p>
                    <Button
                        style={styles.greenButton}
                        onClick={() => navigate("/")}
                    >Continue Shopping</Button>
                </>
                :
                <>
                    <RollbackOutlined
                        onClick={() => goBack()}
                        style={styles.icon}
                    />
                    <span className='title'>Cart Products</span>
                    <div className='products'>
                        {
                            state && (
                                Object.keys(cartProduct).length < 1 ?
                                    <div className='empty'>
                                        <ShoppingCartOutlined
                                            style={{
                                                transform: "scale(6)",
                                            }}
                                        />
                                        <span>Cart Is Empty</span>
                                    </div>
                                    :
                                    cartProduct.map((product) => {
                                        return (
                                            <ProductCard key={product.product_id}>
                                                <Row
                                                    updateTotal={updateTotal}
                                                    cartProduct={cartProduct}
                                                    setcartProduct={setcartProduct}
                                                    product={product}
                                                />
                                            </ProductCard>)
                                    })
                            )
                        }
                    </div>
                    <div className='total'>
                        <span>
                            Grand Total : &#x20b9;{calculateTotal()}
                        </span>
                    </div>
                    <div className='footer'>
                        <Button
                            danger
                            onClick={() => clearAll()}
                            disabled={Object.keys(cartProduct).length === 0}
                        >
                            Clear All
                        </Button>
                        <Button type='dashed' onClick={() => goBack()}>
                            Back
                        </Button>
                        <Button
                            style={styles.greenButton}
                            onClick={() => setIsCheckedOut(true)}
                            disabled={Object.keys(cartProduct).length === 0}
                        >
                            Checkout
                        </Button>
                    </div>
                </>
        }
        </div>
    )
}

export default Cart