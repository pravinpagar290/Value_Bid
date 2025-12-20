import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ensure a fallback port if env var isn't set
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
