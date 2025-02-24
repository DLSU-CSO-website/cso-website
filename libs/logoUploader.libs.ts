import cloudinary from "./cloudinary.libs"

export const uploadLogoeCloudinary = (imageBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder: "Organization Logos",
    },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(imageBuffer)
  })
}
