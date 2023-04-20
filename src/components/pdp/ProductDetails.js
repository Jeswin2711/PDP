import React, { useState, useEffect } from 'react';
import Product from '../product/Product';
import './productdetails.css';
import { message, Pagination } from 'antd'
import axios from 'axios'
import { baseUrl } from '../../utils/Utils';
import { FilterOutlined, FilterFilled, ShoppingCartOutlined } from '@ant-design/icons'
import CircularProgress from '@mui/material/CircularProgress';
import Filter from '../filters/Filter';
import { useNavigate } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../utils/constants';


function ProductDetails() {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setisLoading] = useState(true)
    const [categorySearch, setCategorySearch] = useState("")
    const [brandSearch, setBrandSearch] = useState("")
    const [modelSearch, setModelSearch] = useState("")
    const [showFilters, setshowFilters] = useState(false)
    const [cartProducts, setCartProducts] = useState([])


    const navigate = useNavigate()


    useEffect(() => {
        async function getProducts() {
            await axios.get(`${baseUrl}/product/list_products`)
                .then((res) => { setProducts(res.data); })
                .catch((err) => console.log("Error", err))
        }
        getProducts()
        setisLoading(false)
    }, [])

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredData = products.filter((product) => {
        return product.product_category_name.includes(categorySearch)
            && product.product_brand_name.includes(brandSearch)
            && product.product_model_name.includes(modelSearch);
    }).slice(startIndex, endIndex)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (e) => {
        if (e == "") {
            setCategorySearch("");
            return
        }
        setCategorySearch(e.target.value)
    }

    const handleBrandChange = (e) => {
        if (e == "") {
            setBrandSearch("");
            return
        }
        setBrandSearch(e.target.value)
    }

    const handleModelChange = (e) => {
        if (e == "") {
            setModelSearch("");
            return
        }
        setModelSearch(e.target.value)
    }

    const handleFilterClick = () => {
        setshowFilters(!showFilters)
    }

    function addProductToCart(item) {
        cartProducts.map((product) => {
            if (product.product_id == item.product_id) {
                message.error("Product Already Added", 1);
                return;
            }
        })
        setCartProducts([...cartProducts, item])
        message.success("Added to Cart", 1);
    }

    function removeCardProduct(product) {
        setCartProducts(cartProducts.filter((item) => item.id === product.id))
    }

    function handleCartClick() {
        navigate("/cart", {
            state: {
                cartProduct: cartProducts,
            }
        })
    }


    return (
        <div>
            <div className='header'>
                <h1>Product Details Page</h1>
                <div className='icon'>
                    {
                        showFilters ? <FilterFilled onClick={handleFilterClick} /> : <FilterOutlined onClick={handleFilterClick} />
                    }
                    {
                        Object.keys(cartProducts).length > 0 ? <ShoppingCartOutlined disabled={true} onClick={handleCartClick} /> : null
                    }
                </div>
                {
                    showFilters ?
                        <Filter
                            category={categorySearch}
                            brand={brandSearch}
                            model={modelSearch}
                            handleCategoryChange={handleCategoryChange}
                            handleBrandChange={handleBrandChange}
                            handleModelChange={handleModelChange}
                            handleFilterClick={handleFilterClick}
                        /> :
                        null
                }
            </div>            <div className='page'>
                {
                    isLoading ? <CircularProgress color="secondary" /> :
                        (
                            filteredData.map((product) => (
                                <div key={product.product_id}>
                                    {
                                        <Product
                                            item={product}
                                            addProductToCart={addProductToCart}
                                        />
                                    }
                                </div>
                            ))
                        )

                }
            </div>
            <div className='pagination'>
                <Pagination
                    current={currentPage}
                    total={products.length}
                    pageSize={ITEMS_PER_PAGE}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}
export default ProductDetails;