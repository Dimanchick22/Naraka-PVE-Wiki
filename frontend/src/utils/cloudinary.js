// src/utils/cloudinary.js
import { Cloudinary } from "@cloudinary/url-gen";

// Создайте экземпляр Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dymwaamsx' // Замените на ваш cloud name из панели Cloudinary
  }
});

export default cld;