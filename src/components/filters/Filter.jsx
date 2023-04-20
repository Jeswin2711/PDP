import { Button, Card, Input } from "antd";
import React from "react";
import "./filter.css";
import styled from "styled-components";

const FilterCard = styled(Card)`
  width: 40%;
  height: 200px;
  position: absolute;
  z-index: 1;
  top: 70px;
  left: 56%;
  background-color: white;
`;

function Filter(props) {
  const {
    handleCategoryChange,
    handleModelChange,
    handleBrandChange,
    handleFilterClick,
    category,
    model,
    brand,
  } = props;

  function handleClearAll() {
    handleBrandChange("");
    handleCategoryChange("");
    handleModelChange("");
  }

  return (
    <FilterCard>
      <div className="filter">
        <Input
          placeholder="Enter Category"
          onChange={handleCategoryChange}
          value={category}
        />
        <Input
          placeholder="Enter Model"
          onChange={handleModelChange}
          value={model}
        />
        <Input
          placeholder="Enter Brand"
          onChange={handleBrandChange}
          value={brand}
        />
      </div>
      <div className="footer">
        <Button type="dashed" onClick={handleClearAll}>
          Clear All
        </Button>
        <Button danger onClick={handleClearAll && handleFilterClick}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleFilterClick}>
          Submit
        </Button>
      </div>
    </FilterCard>
  );
}

export default Filter;
