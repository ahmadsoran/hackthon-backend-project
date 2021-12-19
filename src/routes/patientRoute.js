import { Router } from "express";
import UserSchema from "../model/userRegisterModel.js";

let router = Router();

router.get("/patient/:id", (req, res) => {
  let { id } = req.params;
  UserSchema.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({ patient: data });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error !!!" });
    });
});
