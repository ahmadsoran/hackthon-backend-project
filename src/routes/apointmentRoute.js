import { Router } from "express";
import Appointment from "../model/apointment.model.js";
import RegisterAuth from "../middlewear/auth.middlewear.js";

let router = Router();

router.get("/appointments", RegisterAuth, (req, res) => {
  let filter = {};
  if (req.user.role[0] === "user") {
    filter = { patient: req.user.id };
  } else if (req.user.role[0] === "doctor") {
    filter = { doctor: req.user.id };
  }
  console.log(filter);
  Appointment.find(filter)
    .then((data) => {
      if (data) {
        res.status(200).json({ appointments: data });
      } else {
        res.status(404).json({ message: "no appointmen found " });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Interal server error" });
    });
});

router.get("/appointments/:id", (req, res) => {
  let id = req.params.id;
  Appointment.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({ appointment: data });
      } else {
        res.status(404).json({ message: "no appoint ment found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error", err });
    });
});

router.put("/appointments/:id", (req, res) => {
  let id = req.params.id;
  Appointment.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({ appointment: data });
      } else {
        res.status(404).json({ message: "no appoint ment found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error", err });
    });
});

router.post("/appointments", (req, res) => {
  let { appointDate, duration, doctor, startTime, appointmentType } = req.body;
  console.log({ appointDate, duration, doctor, startTime, appointmentType });
  let newAppo = {
    appointment_date: appointDate,
    duration,
    doctor,
    patient: "61bf8ea59c27d58cdbf7072b",
    startTime,
    appointmennt_type: appointmentType,
    appointment_taken_date: new Date(Date.now()),
  };
  let newAppointment = new Appointment(newAppo);
  newAppointment
    .save()
    .then((createdData) => {
      if (createdData) {
        res
          .status(201)
          .json({ message: "apointment created", apointment: createdData });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
