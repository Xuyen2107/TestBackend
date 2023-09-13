import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
