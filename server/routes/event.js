import { submitFormData } from "../controllers/event.js";
import express from "express";
const router = express.Router();

// const formController = require('./controllers/formController');
router.post('/api/submit', submitFormData);

export default router;