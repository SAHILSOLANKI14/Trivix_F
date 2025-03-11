import React from "react";
import { ImageGroup, Image } from "semantic-ui-react";
import useWindowSize from "../../hooks/Screen/index";

const ImageGroupSize = ({ PostImage = [] }) => {
  const { width } = useWindowSize();

  const imageSize = width < 768 ? "small" : width < 1024 ? "small" : "medium";

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "100%",
    overflow: "hidden",
    gap: "10px",
    padding: "10px",
  };

  return (
    <div style={containerStyle}>
      <ImageGroup size={imageSize}>
        {PostImage.length > 0 ? (
          PostImage.map((item, index) => (
            <Image
              key={index}
              src={typeof item === "string" ? item : item.src}
              alt={`Post Image ${index + 1}`}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </ImageGroup>
    </div>
  );
};

export default ImageGroupSize;
