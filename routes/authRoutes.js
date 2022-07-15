import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  dashboard,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// test end-point
router.get("/dash", dashboard);

export default router;
