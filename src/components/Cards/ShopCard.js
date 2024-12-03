import { Card, Select, Typography } from "antd";
import React from "react";
import "./shopCard.css";
import { useCart, useDispatchCart } from "./ContextReducer";

const { Meta } = Card;
const { Text } = Typography;

function ShopCard(props) {
  const { item } = props;
  console.log("🚀 ~ ShopCard ~ items:", item);

  const data = useCart();
  const dispatch = useDispatchCart();

  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState("full");
  const [price, setPrice] = React.useState(() => {
    // Set default price to "full" size
    const fullPrice = item?.options?.[0]?.full;
    return fullPrice ? parseFloat(fullPrice) : 0;
  });

  // Function to calculate price based on size and quantity
  const calculatePrice = (size, qty) => {
    const option = item?.options?.[0] || {};
    const basePrice = size === "full" ? option.full : option.half;
    return basePrice ? parseFloat(basePrice) * qty : 0;
  };

  // Update price whenever `size` or `qty` changes
  React.useEffect(() => {
    setPrice(calculatePrice(size, qty));
  }, [size, qty]);

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: item._id,
      name: item.name,
      price: price,
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
          {[...Array(10)].map((_, index) => (
            <Select.Option key={index + 1} value={index + 1}>
              {index + 1}
            </Select.Option>
          ))}
        </Select>
        <Select
          className="selectionQty"
          defaultValue="full"
          style={{
            width: "100px",
          }}
          onChange={(value) => setSize(value)}
        >
          <Select.Option value="full">Full</Select.Option>
          <Select.Option value="half">Half</Select.Option>
        </Select>
        <Text>Price: ₹ {price.toFixed(2)}</Text>
      </div>
      <hr />
      <button
        className={"btn btn-success justify-center ms-2"}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </Card>
  );
}

export default ShopCard;
