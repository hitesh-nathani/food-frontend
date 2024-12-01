import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShopCard from "../components/Cards/ShopCard";
import "./Home.css";
import CCarousel from "../components/CCarousel/CCarousel";

function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <CCarousel />
      </div>
      <div className="shopCardContainer">
        <ShopCard />
        <ShopCard />
        <ShopCard />

      </div>
      <Footer />
    </div>
  );
}

export default Home;
