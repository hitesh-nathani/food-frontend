import { Carousel, Input } from "antd";
import React from "react";

function CCarousel({ onSearchChange, search }) {
  const containerStyle = {
    position: "relative",
    height: "500px",
    overflow: "hidden",
    width: "100%",
  };

  const contentStyle = {
    width: "100%",
    maxWidth: "1024px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    objectFit: "cover",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Slightly darker overlay
    zIndex: 1,
  };

  const textStyle = {
    position: "absolute",
    zIndex: 2,
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    bottom: "20px",
    left: "20px",
  };

  const foodImages = [
    {
      src: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      label: "Burger",
    },
    {
      src: "https://rukminim2.flixcart.com/image/750/900/kxgfzbk0/wall-decoration/d/q/e/food-pizza-wallpaper-paper-poster-1-vp-221221-617-poster-smoky-original-imag9wjrxfzzhrpd.jpeg?q=20&crop=false",
      label: "Pizza",
    },
    {
      src: "https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Homemade-Grilled-Cheese-Sandwich-with-Tomatoes.png",
      label: "Sandwich",
    },
    {
      src: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
      label: "Pasta",
    },
  ];

  return (
    <div>
      <Carousel
        style={{
          maxHeight: "600px",
          objectFit: "contain !important",
        }}
        arrows
        autoplay
        effect="fade"
      >
        {foodImages.map((food, index) => (
          <div key={index} style={containerStyle}>
            <img
              className="d-block w-100"
              style={{ height: "600px", filter: "brightness(30%)" }}
              src={food.src}
              alt={food.label}
            />
            {/* <div style={overlayStyle}></div> */}
            {/* <h3 style={textStyle}>{food.label}</h3> */}
          </div>
        ))}
      </Carousel>
      <div>
        <Input.Search
          placeholder="Search"
          style={{
            width: "50%",
            position: "absolute",
            zIndex: 2,
            top: "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CCarousel;
