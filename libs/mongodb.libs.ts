import mongoose from "mongoose"

export const connectDatabase = () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI!)
  } catch (e) {
    const err = e as Error
    console.log(err.message)
  }
}
