import cloudinary from "./cloudinary.libs"

export const uploadImageCloudinary = (imageBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder: "Announcement Images",
    },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(imageBuffer)
  })
}
