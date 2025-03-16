import express from 'express';
import contactRoutes from './contacts.js';
const router = express.Router();

router.use('/contacts', contactRoutes);

export default router;
