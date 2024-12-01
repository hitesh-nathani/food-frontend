import { Card, Select, Typography } from "antd";
import React from "react";
import "./shopCard.css";

const { Meta } = Card;
const { Text } = Typography;

function ShopCard() {
  return (
    <Card
      hoverable
      style={{
        margin:"20px 0px"
      }}
      cover={
        <img
          alt="example"
          style={{ width: "100%",
          height: "250px",
          objectFit: "cover",
           }}
          src="https://www.foodiesfeed.com/wp-content/uploads/2023/05/juicy-cheeseburger.jpg"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
      <div className="cardFooter">
        <Select className="selectionQty" defaultValue="1">
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select>
        <Text>Price</Text>
      </div>
    </Card>
  );
}

export default ShopCard;
