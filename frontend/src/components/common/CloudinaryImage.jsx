// First, let's modify the CloudinaryImage component
import React from "react";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { scale, fill } from "@cloudinary/url-gen/actions/resize";
import cld from "../../utils/cloudinary";

const CloudinaryImage = ({ 
  publicId, 
  alt, 
  className, 
  style,
  transformations = {} 
}) => {
  const myImage = cld.image(publicId);
  
  // Apply transformations if provided
  if (transformations) {
    if (transformations.width && transformations.height) {
      if (transformations.crop === "scale") {
        myImage.resize(scale().width(transformations.width).height(transformations.height));
      } else {
        // Default to 'fill' which maintains aspect ratio and fills the area
        myImage.resize(fill().width(transformations.width).height(transformations.height));
      }
    }
  }

  return (
    <AdvancedImage 
      cldImg={myImage} 
      alt={alt || "Image"} 
      className={className || ""}
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