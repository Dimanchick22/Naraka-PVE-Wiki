// components/common/CloudinaryImage.jsx
import React from "react";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { scale, fill } from "@cloudinary/url-gen/actions/resize";
import cld from "../../utils/cloudinary";

const CloudinaryImage = ({ 
  publicId, 
  alt, 
  className = "", 
  style = {},
  transformations = {},
  width,
  height,
  fit = "fill"
}) => {
  if (!publicId) {
    return (
      <div 
        className={`cloudinary-placeholder ${className}`}
        style={{
          width: width || '100%',
          height: height || '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      >
        <span>Изображение недоступно</span>
      </div>
    );
  }

  const myImage = cld.image(publicId);
  
  // Применяем трансформации при наличии
  if (width && height) {
    if (fit === "scale") {
      myImage.resize(scale().width(width).height(height));
    } else {
      // По умолчанию "fill" - сохраняет соотношение сторон и заполняет область
      myImage.resize(fill().width(width).height(height));
    }
  }

  // Применяем дополнительные трансформации
  if (transformations) {
    if (transformations.width && transformations.height) {
      if (transformations.crop === "scale") {
        myImage.resize(scale().width(transformations.width).height(transformations.height));
      } else {
        myImage.resize(fill().width(transformations.width).height(transformations.height));
      }
    }
  }

  return (
    <AdvancedImage 
      cldImg={myImage} 
      alt={alt || "Изображение"} 
      className={className} 
      style={style}
      plugins={[responsive(), placeholder()]}
      onError={(e) => {
        e.target.src = ""; // Fallback image
        e.target.onerror = null;
      }}
    />
  );
};

export default CloudinaryImage;