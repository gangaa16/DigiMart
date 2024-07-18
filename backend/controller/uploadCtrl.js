const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    for (const file of files) {
      const { path } = file;
      try {
        const newpath = await uploader(path);
        console.log("Cloudinary response:", newpath);  // Log the response
        urls.push(newpath);
        fs.unlinkSync(path);
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
        throw new Error(`Error uploading file to Cloudinary: ${uploadError.message}`);
      }
    }

    const images = urls.map((file) => {
      return file;
    });
    console.log("Final image URLs:", images);  // Log final URLs
    res.json(images);
  } catch (error) {
    console.error("Upload error:", error);  // Log any errors
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await cloudinaryDeleteImg(id); // Call Cloudinary delete function
    res.json({ message: "Image deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};