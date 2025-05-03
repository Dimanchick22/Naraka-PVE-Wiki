// src/components/CloudinaryImage.jsx
import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import cld from "../../utils/cloudinary";

const CloudinaryImage = ({ publicId, alt, className }) => {
  const myImage = cld.image(publicId);

  return (
    <AdvancedImage 
      cldImg={myImage} 
      alt={alt || "Image"} 
      className={className || ""}
      onError={(e) => {
        e.target.src = ""; // Запасное изображение
        e.target.onerror = null;
      }}
    />
  );
};

export default CloudinaryImage;