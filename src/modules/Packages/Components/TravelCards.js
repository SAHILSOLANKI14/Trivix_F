import React, { useState, useEffect } from "react";
import CustomSlider from "../../../components/Slider";
import TravelCard from "../../../components/Cards/TravelCard";

const TravelCards = ({ handleNavigateDetailpage, data = [] }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    lazyLoad: "ondemand",
    responsive: [
      { breakpoint: 1444, settings: { slidesToShow: 5, slidesToScroll: 3 } },
      { breakpoint: 1025, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 769, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 450, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div style={{ padding: "20px 20px" }}>
      <CustomSlider settings={settings}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "20px 5px",
                justifyContent: "flex-start",
                display: "flex",
              }}
            >
              <TravelCard
                item={item}
                handleNavigateDetailpage={handleNavigateDetailpage}
              />
            </div>
          ))
        ) : (
          <p>No travel cards available</p>
        )}
      </CustomSlider>

      {/* {limit < data.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={loadMore}
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </div>
      )} */}
    </div>
  );
};

export default TravelCards;
