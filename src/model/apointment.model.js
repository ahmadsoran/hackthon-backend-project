import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointment_date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: 60,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  startTime: {
    type: String,
    required: true,
  },
  d_isAvailable: {
    type: Boolean,
    default: true,
  },
  p_isAvailable: {
    type: Boolean,
    default: true,
  },
  appointmennt_type: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  appointment_taken_date: Date,
});

const UserSchema = mongoose.model("Appointment", appointmentSchema);
export default UserSchema;
