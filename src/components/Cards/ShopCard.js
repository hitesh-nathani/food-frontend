import { Card, Select, Typography } from "antd";
import React from "react";
import "./shopCard.css";
import { useCart, useDispatchCart } from "./ContextReducer";

const { Meta } = Card;
const { Text } = Typography;

function ShopCard(props) {
  const { item } = props;
  console.log("🚀 ~ ShopCard ~ items:", item);
  let data = useCart();
  let dispatch = useDispatchCart();

  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState("S");
  const handleAddCArt = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: props.foodItem.finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  return (
    <Card
      hoverable
      style={{
        margin: "20px 0px",
      }}
      cover={
        <img
          alt="example"
          style={{ width: "100%", height: "250px", objectFit: "cover" }}
          src={
            item?.img ||
            "https://www.foodiesfeed.com/wp-content/uploads/2023/05/juicy-cheeseburger.jpg"
          }
        />
      }
    >
      <Meta title={item?.name || ""} description={item?.description || ""} />
      <div className="cardFooter">
        <Select
          className="selectionQty"
          defaultValue="1"
          onChange={(value) => setQty(value)}
        >
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select>
        <Select
          className="selectionQty"
          defaultValue="full"
          style={{
            width:"100px"
          }}
          // onChange={(value) => setQty(value)}
        >
          <Select.Option value="full">Full</Select.Option>
          <Select.Option value="half">Half</Select.Option>
        </Select>
        <Text>Price</Text>
      </div>
      <hr></hr>
      <button
        className={"btn btn-success justify-center ms-2"}
        onClick={handleAddCArt}
      >
        Add to Cart
      </button>
    </Card>
  );
}

export default ShopCard;
