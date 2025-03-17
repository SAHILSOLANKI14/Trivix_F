import React from "react";
import img from "../../../assets/images/pexels-souvenirpixels-414612.jpg";
import img2 from "../../../assets/images/ai-generated-mysterious-night-sky-illuminates-tranquil-forest-revealing-cosmic-beauty-generated-by-ai-photo.jpg";
import CustomSlider from "../../../components/Slider";
import CustomCard from "../../../components/Cards";

const PackageCard = () => {
  const data = [
    {
      name: "Elliot",
      meta: "Gandhinagar",
      src: img2,
    },
    {
      name: "Elliot",
      meta: "Ahemdabad",
      src: img,
    },
    {
      name: "Elliot",
      meta: "Gandhinagar",
      src: img,
    },
    {
      name: "Elliot",
      meta: "Ahemdabad",
      src: img,
    },
    {
      name: "Elliot",
      meta: "Gandhinagar",
      src: img,
    },
    {
      name: "Elliot",
      meta: "Ahemdabad",
      src: img,
    },
  ];
  return (
    <div>
      <CustomSlider>
        {data.map((item, index) => (
          <div key={index} style={{ padding: "10px" }}>
            <CustomCard
              item={item}
              style={{ position: "absolute", bottom: 0 }}
            />
          </div>
        ))}
      </CustomSlider>
    </div>
  );
};

export default PackageCard;
