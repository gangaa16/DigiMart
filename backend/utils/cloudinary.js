const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
})
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY ? 'Loaded' : 'Not Loaded',
});

const cloudinaryUploadImg = async (fileToUploads) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUploads, { resource_type: "auto" });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
  }
};


const cloudinaryDeleteImg = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId); // Cloudinary delete method
    return result;
  } catch (error) {
    throw new Error(`Error deleting image from Cloudinary: ${error.message}`);
  }
};


module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
