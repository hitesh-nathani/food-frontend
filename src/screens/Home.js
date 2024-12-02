import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShopCard from "../components/Cards/ShopCard";
import "./Home.css";
import CCarousel from "../components/CCarousel/CCarousel";
import axios from "axios";

function Home() {
  const [foodCat, setFoodCat] = React.useState([]);
  const [foodItem, setFoodItem] = React.useState([]);
  console.log("🚀 ~ Home ~ foodItem:", foodItem, foodCat);
  const [search, setSearch] = React.useState("");

  async function getData() {
    try {
      const response = await axios.get("http://localhost:9000/food-item");
      setFoodItem(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCatData() {
    try {
      const response = await axios.get("http://localhost:9000/food-category");
      setFoodCat(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
    getCatData();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <CCarousel onSearchChange={(e) => setSearch(e)} search={search} />
      </div>
      <div className="shopCardContainer">
        {foodCat?.length > 0 && (
          <div>
            {foodCat?.map((data) => {
              return (
                <div key={data._id}>
                  <h3>{data.category_name}</h3>
                  <hr />
                  {foodItem
                    .filter(
                      (item) =>
                        item?.categoryName === data?.category_name &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item) => {
                      return <ShopCard key={item._id} item={item} />;
                    })}
                </div>
              );
            })}
          </div>
        )}
        {/* <ShopCard /> */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
