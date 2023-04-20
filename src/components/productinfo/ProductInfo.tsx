import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import './productinfo.css';


interface IProductInfo {
  isModalOpen: boolean,
  setIsModalOpen: any,
  item: object | any,
  addProductToCart: (product: object) => void
}

const ProductInfo: React.FC<IProductInfo> = (props: IProductInfo) => {

  const [size, setSize] = useState(1)

  const handleOk = () => {
    props.addProductToCart(props.item);
    props.setIsModalOpen(false);
  };


  const handleCancel = () => {
    props.setIsModalOpen(false);
  };


  const items = props.item.product_size.map((data) => {
    return {
      lable: data.size_name,
      value: data.product_size_id
    }
  })

  function handleChange(value: number) {
    setSize(value)
  }


  return (
    <>
      <Modal title={`Product ${props.item.product_name}`}
        open={props.isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Add to Cart
          </Button>,
        ]}
      >
        <div className='modal-data'>
          <span className='key'>
            Product Name
            <span className='value'>{props.item.product_name}</span>
          </span>
          <span className='key'>
            Brand
            <span className='value'>{props.item.product_brand_name}</span>
          </span>
          <span className='key'>
            Product Category Name
            <span className='value'>{props.item.product_category_name}</span>
          </span>
          <span className='key'>
            Product Prize
            <span className='value'>{props.item.product_price}</span>
          </span>
          <span className='key'>Product Size
            <Select
              defaultValue={1}
              style={{ width: 60, marginLeft: "10px" }}
              onChange={handleChange}
              options={items}
            />
          </span>
          <div className='product-footer'>
            {
              [1, 2, 3, 4, 5].map((data) => {
                return <img src={`https://picsum.photos/200/300?random=${data}}`} />
              })
            }
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductInfo