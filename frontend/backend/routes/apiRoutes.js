import express from 'express'
import { apiController } from '../controllers/apiController.js';

const router = express.Router();

router.post('/generate' , apiController)

export default router;